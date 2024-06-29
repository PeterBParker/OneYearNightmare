# See it in Action!

https://www.monstersandmyriads.com/read

# About

This is a custom, serial, image-hosting website for a graphic-novel I'm writing and my wife is illustrating. There aren't many great off-the-shelf products for supporting page-style webcomic publishing, so this was started as a simple image hosting site that has evolved over time. It's a passion project that I might one day generalize for others to easily start their own custom graphic-novel site. If you would like help with your own site, please reach out and I'd love to talk! You can reach me on [LinkedIn](https://www.linkedin.com/in/nathaneharris/) or [Email](mailto:harrihaven2@gmail.com).

# TODO

- 1. BUILD EMAIL LIST - DONE

  - Integrate email service and start mailing list
  - Add email settings to User page

- 2. POLISHED COMMENTS

  - add like button and display to comments
  - Retrieve top three comments by likes, and the rest sorted by date newest first
  - add pagination
  - On User Profile add the ability to dynamically update the avatar

- 3. POLISH NAVIGATION

  - Add infinite scroll instead of button navigation
  - Add tap on either side of page to navigate

- 4. MISC

  - Move/animate bookmark icon to top right of comic page.
  - Optimize performance
    - Use svgo to optimize svg's
      - `svgo -f ./path/to/svgFolder -o ./path/to/output`
    - Scan with Lighthouse and GTmetrix
  - Introduce logging and log all errors
  - Fix Scroll to Top of Page sometimes not working
    - Problem seems to be that the onClick function is not getting called?
      - is the onClick event not getting triggered?
      - is the prop null and there is not function provided TO call?
      - IF the function is called it seems to work as expected. Replacing it with a console log I was able to replicate the bug, but with a much smaller success rate (the bug only triggered 2-3% of the time instead of 15-20% of the time)

- 5. ADD ONLINE CMS FEATURES

  - Refactor the entire website to pull pages from online db instead of statically built
    - **DONE** Write a script to migrate all of the json data to the Firebase data solutions (Firestore for data, Database for images)
    - Update the "Add Page" script to push the data to the Firebase data solutions (intermediate solution until entire feature is done)
    - Change `./src/api/ComicPageAPI.js` to query Firebase for the info that's in pagesData.json
      - getFirstPageId to make a call to Firebase for the first page Id
      - getFilePath to return the page image path in Firebase Database ()
    - Change `./src/components/comics/ComicViewer.js`
      - getRelValidObjs on line 65 should be changed to a function that returns if the page exists with the given uuid
      - getFilePath should return the image path in the Firebase Database given a page uuid
      - The DesktopPageView and MobilePageView should be refactored to just take the page uuid and then make the relevant API calls to get the data they need rather than passing a big json object through.
    - Change `./src/components/comics/PageDetailsCard.js` to call the API to get the data rather than using an object with the data passed into the props
    - Do the same for `./src/components/comments/Comments.jsx`
  - Add an "admin" type to user accounts
  - Add an nav button for admin accounts to "Page Management"
  - Translate the Python Data API to Javascript/Typescript
  - Add a Page Management page
    - Implement Add Page
      - Create Form Components for Page Info
        - Page Title
        - Page Image
        - Page Description
        - Page insert/append
    - Implement Update Page Data
    - Implement Remove Page

- 6. Add tests
