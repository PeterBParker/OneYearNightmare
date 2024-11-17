# See it in Action!

https://www.monstersandmyriads.com/read

# About

This is a custom, serial, image-hosting website for a graphic-novel I'm writing and my wife is illustrating. There aren't many great off-the-shelf products for supporting page-style webcomic publishing, so this was started as a simple image hosting site that has evolved over time. It's a passion project that I might one day generalize for others to easily start their own custom graphic-novel site. If you would like help with your own site, please reach out and I'd love to talk! You can reach me on [LinkedIn](https://www.linkedin.com/in/nathaneharris/) or [Email](mailto:harrihaven2@gmail.com).

# Local Dev Setup

1. Install firebase CLI
2. Install gcloud CLI
3. (Recommended) Create a virtual env
4. Run `pip3 install -r ./requirements.txt`
5. Use Node v18.18.0

# Local Testing

## Setup Emulators

### Do Once

1. If missing test data, export the project data with `gcloud firestore export  gs://oneyearnightmarefirstsite.appspot.com/firestore_export`

- You may need to remove the data from the Storage db before running the command if you've done this before.

2. Downloaded the test data `gsutil -m cp -R gs://oneyearnightmarefirstsite.appspot.com/firestore_export .`

### Do every time

1. Start emulators with `firebase emulators:start --import ./firestore_export`
2. Stop emulators with `npm run emulators:stop`

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
  - Make buttons more contrasting with the rest of the site to draw the user's eye there quicker

- 4. MISC

  - Style up the Global Error Page
  - Move/animate bookmark icon to top right of comic page.
  - Optimize performance
    - Use svgo to optimize svg's
      - `svgo -f ./path/to/svgFolder -o ./path/to/output`
    - Scan with Lighthouse and GTmetrix
  - Introduce logging and log all errors
  - Replace ComicViewer's error page to use the React Router's errorelement field on the route
  - Fix Scroll to Top of Page sometimes not working
    - Problem seems to be that the onClick function is not getting called?
      - is the onClick event not getting triggered?
      - is the prop null and there is not function provided TO call?
      - IF the function is called it seems to work as expected. Replacing it with a console log I was able to replicate the bug, but with a much smaller success rate (the bug only triggered 2-3% of the time instead of 15-20% of the time)

- 5. ADD ONLINE CMS FEATURES

  - Refactor the entire website to pull pages from online db instead of statically built

    - **DONE** Write a script to migrate all of the json data to the Firebase data solutions (Firestore for data, Database for images)
    - **SKIP** Update the "Add Page" script to push the data to the Firebase data solutions (intermediate solution until entire feature is done)
    - Change `./src/api/ComicPageAPI.js` to query Firebase for the info that's in pagesData.json
      - Use the Suspense feature of React 18 which handles all the async and loading state nastiness for me. (https://swizec.com/blog/react-18-and-the-future-of-async-data/)
      - **DONE** Figure out how to asynchronously retrieve data without query waterfalls, effective caching, etc.
    - **DONE** Fix the ComicRouter. Upgrading the react-router lib has broken the website. doh.
    - Change the components to pull from the server
      - **DONE** Navigation buttons
      - **DONE** Pages in the db are missing their chapter id (and season id?)
      - **DONE** Augment data import script to generate and save public urls as a part of the page data
      - Create development test data because page download urls
        - Add avatars to the test data
        - Remove actual user's comments and avatars from test data
      - **DONE** Add page info to the page cards
        - **DONE** Pull display name from server
        - **DONE** Pull display icon from server
          - **DONE** Expand avatar helpers to store not just the image in the storage bucket, but also the public url of the image as a field in the user document
      - **DONE** The firebase auth UI isn't compatible with the firebase v9 SDK, so I have to build my own auth UI.
        - **DONE**Create a dedicated "Login" Page. Make it a form that collects the user's email and calls the function to send a sign in link. Make the url in the email direct to the "profile" page
        - **DONE** Create a dedicated "Profile" Page.
        - In the root App route make a data loader to grab the signed-in user data
        - **DONE** In the nav bar render the Login nav button if no user data is found. If user data is found, render the Profile button. Default to Login, but make it essential so that the react router doesn't render the page until that data has been fetched.
        - **DONE** On Login button click, transform the card into a display saying "Check your email for the link!"
        - **DONE** Fix the layout on the Login and Display Name page
        - **DONE** Once the display name is set make the page auto re-render
        - **DONE** Test on mobile
    - **DONE** Load the icons on the archive page
    - **GOOD NUFF** Add loading animations
    - **DONE** Fix auth appearance on mobile
    - Make fallback a joint avatar stored locally
    - **DONE** Figure out how to reduce the number of unnecessary queries
    - **DONE** Fix the desktop styling
    - **DONE** Fix the mobile comments
    - Add error handling on login errors

  - **DONE** Add an "admin" type to user accounts
    - Currently done manually via python script
  - **DONE**Make it so multiple users can post on using the management page.
    - **DONE**We need to make avatar url available in user data
      - **DONE**For new users
        - **DONE** when a user is created, add that field to their doc
        - **DONE** when a user updates their image, upload the new image to the store, set the user's avatar url, and delete the old image
        - **DONE** update avatar helper utils to grab the image url from the user's doc instead of directly from storage
        - **DONE** Determine if we can consolidate the user's display name to one storage loc instead of using both firestore and auth. Update: We can't because we need to query the display names of all the users, not just the logged in user.
        - **DONE**Don't show the display name set menu if display name is already set (on first login a placeholder is set and should count but doesn't)
    - **DONE** When a user deletes their account, delete their profile pic, user entry, and comments?
  - **DONE**Add an nav button for admin accounts to "Page Management"
    - **DONE** Add a nav link to the desktop bar
    - **DONE** Add "Manage" link to mobile navigation menu if admin
  - **DONE** Check for admin in firebase rules using claims instead of database
  - **DONE** Make author avatars load correctly
  - **DONE** Make sure comments work with new user data
  - **DONE** Translate the Python Data API to Javascript/Typescript

  - Add a Page Management page

    - Implement Add Page
      - Create Form Components for Page Info
        - **DONE**Page Title
        - **DONE**Page Image
        - **DONE**Page Description
        - **DONE** Make Page Desc a bigger text entry field
        - **DONE** Chapter Select
          - "Add Chapter" to the Select Dropdown?
        - Investigate why adding pages isn't expanding the archive
    - **DONE** Expand interface UI to include an action selection
    - Implement Update Page Data
      - **DONE** Update title, message, icon, and page image
      - Add a confirmation modal
      - Style it to not look like garbage
      - **DONE** If a page doesn't exist handle that
    - Implement Remove Page

  - **DONE** Fix bug where a valid uuid that doesn't correlate to an existing page is provided to the read URL and the page crashes
  - **DONE** Make the styling for the user profile on mobile not suck
  - **DONE** move the exit button of the mobile menu on top of the php banner

- 6. Add tests

# Notes

## Importing Data from JSON to Firebase/Storage

### Production

```
cd src/scripts
python ./importPageData.py ../api/data/pagesData.json oneyearnightmarefirstsite
```

### Emulators

Same as Production but with the env variable set:

```
export FIREBASE_STORAGE_EMULATOR_HOST="127.0.0.1:9199"
export FIRESTORE_EMULATOR_HOST="127.0.0.1:8080"
cd src/scripts
python ./importPageData.py ../api/data/pagesData.json oneyearnightmarefirstsite
```

## Switching Feature Branches

If a branch needs updated packages/updated version of npm:

- Switch to required npm version
- Delete node_modules/\*
- Delete package-lock.json
- # Run `npm install`
  - Build Docker images for building and deploying the website
    > > > > > > > master
