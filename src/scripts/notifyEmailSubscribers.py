import os
import json
from gzip import decompress
from pandas import read_csv
from requests import get, RequestException
from io import StringIO
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To, From, ReplyTo, Asm, GroupId, GroupsToDisplay, TemplateId
from time import sleep


class EmailNotifier:
    """Handles notifying users and completing the email html template"""
    def __init__(self, from_email, new_page_link, contact_list_id, unsub_group):
        self.list_id = contact_list_id
        self.new_page_link = new_page_link
        self.sg = SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
        self.from_email = from_email
        self.unsub_group = unsub_group
    
    def get_email_export_urls(self, pending_export_id):
        """Handles requesting an export and returning a list of the ready-to-download url files"""
        print("Waiting for email contacts to export...")
        export_pending = True
        download_urls = None
        def handle_pending():
            sleep(5)
        while export_pending:
                # check status
                response = self.sg.client.marketing.contacts.exports._(pending_export_id).get()
                if response.status_code != 200:
                    print(f"Error: Encountered {response.status_code} error in checking that status of the export.")
                    print(response.body)
                    handle_pending()
                else:
                    json_response = json.loads(response.body)
                    status = json_response["status"]
                    if status == "pending":
                        handle_pending()
                    elif status == "failed":
                        print(json_response["message"])
                        print("Contacts export failed.")
                        export_pending = False
                    elif status == "ready":
                        download_urls = json_response["urls"]
                        export_pending = False
        return download_urls

    def download_and_extract_emails(self, download_urls):
        """Takes SendGrid's export urls and builds a list of emails"""
        if len(download_urls) > 0:
            emails = []
            for url in download_urls:
                response = get(url)
                out_file = decompress(response.content).decode('utf8')
                pd = read_csv(StringIO(out_file), dtype=str)
                emails.extend(pd["EMAIL"].tolist())
            return emails

    def subscriber_emails(self):
        """Provides the complete list of subscribers"""
        try:
            response = self.sg.client.marketing.contacts.exports.post(request_body={"list_ids":["887040bc-71a4-489a-874a-c4cc0391f890"], "file_type":"csv"})
            if response.status_code != 202:
                print(response.status_code)
                print(response.body)
                print(response.headers)

            pending_export_id = json.loads(response.body)["id"]
            download_urls = self.get_email_export_urls(pending_export_id)
            return self.download_and_extract_emails(download_urls)
        except Exception as e:
            print(e.__dict__)

    def make_template_message(self, to_emails):
        # Return a mail object that has the updated template as its content
        # Send the dynamic template hosted on teh SendGrid server
        message = Mail()

        # Set recipients
        message.to = to_emails

        message.from_email = From(
            email="nate-and-mo@monstersandmyriads.com",
            name="Nate and Mo"
        )
        message.reply_to = ReplyTo(
            email="nate-and-mo@monstersandmyriads.com",
            name="Nate and Mo"
        )
        message.asm = Asm(
            group_id=GroupId(self.unsub_group),
            groups_to_display=GroupsToDisplay([self.unsub_group])
        )
        message.template_id = TemplateId("d-4c1f1f057e4f4063afc43e1cc7f20be4")
        if self.new_page_link:
            message.dynamic_template_data = {"readUrl": self.new_page_link}
        return message
    
    def notify_subscribers(self):
        """The main function of this class. Builds and sends the template email."""
        to_emails = self.subscriber_emails()
        message = self.make_template_message(to_emails)
        response = self.sg.send(message=message)
        if response.status_code == 202:
            print("Notifications successfully sent!")
        else:
            print(response.status_code)
            print(response.body)


if __name__ == "__main__":
    new_page_link = input("Enter the url of the new page: ")
    # Validates the link is valid and works
    try:
        r = get(new_page_link)
    except RequestException:
        new_page_link = None

    en = EmailNotifier(from_email="nate-and-mo@monstersandmyriads.com",
                       contact_list_id="887040bc-71a4-489a-874a-c4cc0391f890",
                       new_page_link=new_page_link,
                       unsub_group=22796)
    en.notify_subscribers()
