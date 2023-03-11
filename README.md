# See it in Action!

https://www.monstersandmyriads.com/read

# About

This is a custom, serial, image-hosting website for a graphic-novel I'm writing and my wife is illustrating. There aren't many great off-the-shelf products for supporting page-style webcomic publishing, so this was started as a simple image hosting site that has evolved over time. It's a passion project that I might one day generalize for others to easily start their own custom graphic-novel site. If you would like help with your own site, please reach out and I'd love to talk! You can reach me on [LinkedIn](https://www.linkedin.com/in/nathaneharris/) or [Email](mailto:harrihaven2@gmail.com).

# TODO

- 1. BUILD EMAIL LIST

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
