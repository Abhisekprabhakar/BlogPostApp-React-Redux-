Blog Post App using React (Redux and context api):

How to start(after de-compressing folder):
1.) Open the terminal in Root directory and run "npm install"
2.) after installation type "npm start" to start the application.
note: run the application on port 3000 only as application is using google-login and configure for port http://localhost:3000
3.) to run test for blogform component type "npm t" in terminal.

How app works:
1.) On running app "http://localhost:3000 user will land on landing page.
2.) On landing page user can access list of blogs and can login to site using their google id.
note: Edit blog, add blog, like/unlike blog feature are only accessible to logged in users.
3.) user can read the blog by clicking the blog card.
4.) Post login user can add blog, edit existing blogs and like/unlike blog.

#ContextApi is used for storing authentication details like user details, isSignedIn.
#Redux is for storing blogs and performing blog operations.
