# TODO

- 1. BASIC COMMENTS

- 2. BUILD EMAIL LIST

  - Integrate email service and start mailing list
  - Add email settings to User page

- 3. POLISHED COMMENTS

  - On User Profile add the ability to dynamically update the avatar
  - add pagination
  - add like button and display to comments
  - Retrieve top three comments by likes, and the rest sorted by date newest first

- 4. POLISH NAVIGATION

  - Add infinite scroll instead of button navigation
  - Add tap on either side of page to navigate

- 5. MISC

  - Move/animate bookmark icon to top right of comic page.
  - Optimize performance
    - Use svgo to optimize svg's
      - `svgo -f ./path/to/svgFolder -o ./path/to/output`
    - Scan with Lighthouse and GTmetrix
  - Introduce logging and log all errors

- BUG FIXES
  - When a user comments and then replies to their own comment and no one else does, when they go to delete their account, the original comment will persist as a "This comment was deleted." It would be nice if the database updated whether or not the comment has children as each comment is deleted.
