# Chieve
[Chieve](https://chieve.herokuapp.com/) is a goal tracking web app built on Node.js, Express, MongoDB, and React.

## Features/Implementation
### User Onboarding
When the user first enters the landing page of the application, they can scroll down and go through an onboarding process that prompts the user for a goal and a set of tasks, before creating an account for the user. [Async](http://caolan.github.io/async/index.html) is used here to safely handle the multiple requests to MongoDB.
![Landing Page Onboarding](/screenshots/chieveLandingOnboarding.png)

### Users
Users are stored on MongoDB, which we interact with through Mongoose. OAuth and local authentication both use Passport, and saves a cookie to the client browser for permissions.
In our design, Users know about their own Goals and past Goals. This decision was made in order to make sure accessing Goals and Tasks would be scalable, and that a we would not need to perform a search through the Goals document.

### Goals & Tasks
In the same way that Users know about their own Goals, Goals contain a reference to the object ID of their own tasks. Both Goals and Tasks also contain a reference to their creator, in order to manage permissions of who can edit a particular Goal or Task.
An example of populating a user's information would be the user dashboard, the first page a user sees after they log in.
![Dashboard](/screenshots/chieveDashboard.png)
In our React app, we use the fetch API/Polyfill to update the state of the dashboard state container using two API routes, one that fetches the goal objects referenced by the user object, and the task objects referenced by the goal objects. While this is likely slower for a small amount of users, it should replace some forms of indexing on a larger scale.

##UX/UI
To make it easy to progress towards a goal, I made creating tasks frictionless, and their association with goals intuitive with a two-tab layout.

To keep the UI simple, I collapsed actions a user could make into expandable elements that were clearly connected to their results. For example, to complete, delete, or edit the description of a task, a user clicks on an elipsis next to the title of the task.

I wanted to build a goal tracker that was elegant and simple, so I opted for a black and white color scheme, and focused more on nice animations and an intuitive UX.
![Landing Page](/screenshots/chieveLandingPage.png)
![Landing Page Log In](/screenshots/chieveLandingLogIn.png)

## Future Direction
The eventual goal of the application is to allow users to publicize how they completed certain goals, and socialize the app by allowing users to see how others have done what they plan to do.

A more immediate goal is to optimize the application for all modern browsers and mobile, as well as enable offline use of the application. Currently, the application is only optimized for Google Chrome.









