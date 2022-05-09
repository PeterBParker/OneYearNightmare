# TODO

- Make Comments
  - Make Comment header sticky
  - Style Form
  - Hook up to Database
      * add error handling if comment submission failed
        * add visual state to indicate pending server write
        * add visual state to indicate completed server write
      * add ability to edit comment
      * add pagination
      * add like button and display to comments
      * Retrieve top three comments by likes, and the rest sorted by date newest first
  - Add Authentication/User data
      * add login interaction
      * add sign up interaction
        * store email and password
        * get terms and conditions
          * add display module for terms and conditions
      * add database enforcement of editing only comments owned by the currently signed in user
      * populate comment data with user info
- Add tap on either side of page to navigate
- Move/animate bookmark icon to top right of comic page.
- Optimize performance
  - Use svgo to optimize svg's
    - `svgo -f ./path/to/svgFolder -o ./path/to/output`
  - Scan with Lighthouse and GTmetrix
