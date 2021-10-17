# TODO

- Add loading icon for images
- Fix dates
- Add cookie analytics
    * Connect to Firestore
    * Write functions to grab info from cookies and store in database
    * Examine rules for data access
    * Things we want to know:
        > Number of unique visitors
            - Total
            - Per Day
        > Number of reads
            - Per page
            - Per Day
        > Number of shares
            - Per page
            - Per day
        > Location of visitors
    * Use a cookie to store a uuid on the user's machine
    * Firestore collection is already setup
- Add motion controls for mobile
- In the footer read link: jump to the comic page element id when it is clicked.
- Update header vol number to reflect the current page instead of latest page
- Add loading screen to only show the page when all content has loaded
- Investigate making the header sticky and shrink down on mobile.
- Optimize performance
    * Use svgo to optimize svg's
        - `svgo -f ./path/to/svgFolder -o ./path/to/output`
    * Scan with Lighthouse and GTmetrix