# skyspec code samples

## running the project
1. clone the project

2. for the backend
There is a race condition in with the docker compose file spinning up the postgres container in time for the app to contact it. Because of this `docker-compose up` must be run twice.
There is a workaround for this with programs like `dockerize` that will make the container wait, but that was out of the scope of the project to address. It can be fixed by the following
`cd backed && docker-compose up`
`ctrl-c` to kill, `docker-compose up` again to bring the app up.

There is a graqhql playground included at `http://localhost:3000/graphql`

3. for the frontend 
`cd frontend && yarn && yarn start`

The backend dev server and frontend dev server both want to start on port `3000`, but the react dev server will ask in you would prefer another port and start on 3001

The UI has some rough edges, I was shooting for mostly feature complete.

The intended deployment for this would be a containerized env like kubernetes or heroku or aws, or gcp for the backend, and a static bucket behind a CDN to serve the frontend

included if time permitted was a plan to push the backend to heroku for this and use github pages to host the frontend.

## Scenario
Your mission is to create a public gist viewer. Once finished, we should be able to
search for a GitHub username and see all the public gists for that user. From each
gist, we should be able to view all the files in that gist. To make things a little
more interesting, we also want to be able to mark our favorite files inside a gist.
Deliverables
There are a few deliverables for this project:
- A small JavaScript library that wraps the GitHub REST API for gists.
- An API Ideally GraphQL written in JavaScript, that connects to a permanent
data store Ideally PostgreSQL
- A single page React app that consumes your REST/GraphQL API.

## Specs
### Library:
Your library should provide a function that, given a username, retrieves the
public gists for that particular user.
Your library should provide a function that, given a gist ID, retrieves a specific
gist.
Your library will be an internal module inside your project for now. No need to
separately package it.
You don't have to worry about authentication. Anonymous access is fine,
since you're only retrieving public gists.
Feel free to use any data-fetching libraries like axios, etc., if you prefer.
Vanilla fetch tends to work just as well for this project though.
Do not use any libraries specifically related to GitHub, for example a library
that wraps GitHub’s REST API.
Keep in mind that in the future, this API may grow to support more methods of
GitHub's REST API.

Documentation for the gist REST API can be found
here: https://developer.github.com/v3/gists/
Note that GitHub’s API allows any origin, and you can assume modern browsers,
so there are no cross-origin or legacy issues to worry about.
GitHub's API is rate limited to 60 requests per hour for anonymous users; if you
run into rate-limiting issues, feel free to communicate with us if you need more
time.

### API
- Your API should expose an endpoint/query that, given a username, returns the
public gists for that particular user
- Your API should expose an endpoint/query that, given a gist ID, returns a
specific gist
- Your API should expose an endpoint/mutation that, given a gist ID, marks the
gist as favorited
- Your API should expose an endpoint/mutation that, given a gist ID, marks the
gist as not-favorited
- Your API should expose an endpoint/query that returns all gists marked as
favorites.
- You don't have to worry about authentication; you may assume that this app
will only be used by a single user, and that all favorites are for that single user

### App
- A text box should be provided to enter a username.

- After entering the username, it should list the public gists for that user in
summary form. The summary should contain at least the description and the
date the gist was created. Feel free to provide additional properties if you
want.)

- Clicking on a gist should open up a detail page for that gist.
The detail of the gist should list all the files for that gist.

- Using a button, link, icon, etc., you should be able to mark a particular gist as
a favorite. Once marked as a favorite, it should be clear (via text, icon, button
state, etc.) that a particular gist is a favorite. It should also be possible to
unmark a particular gist as a favorite.

- The list of favorites should be retained across different page views and
between server restarts. So, for example, if a gist is marked as a favorite for
username "foouser", and then a search is done for "baruser", the gist by
"foouser" should still be marked as a favorite if we later search for "foouser"
again.

- Some basic navigation/header should make it possible to return from a
particular gist to the list of gists for a user and to perform a search for a
different user, without having to refresh the browser or use the back button. It
is okay if the browser’s URL doesn’t change while navigating.
The navigation/header should make it possible to access a view with a list of
favorited gists. Each item in the list should open up a detail page for that gist.
Don’t worry too much about presentation. This means no particular CSS,
fonts, or images are required. This is a coding activity and not a design
activity. That’s not to say we don’t appreciate great design or that we don’t
value those skills if you have them! It’s just that we won’t be considering
design when scoring this particular project.
Do make sure the available interactions are intuitive. In other words, we will
be considering usability.

- Keep in mind that in the future, this app may grow to support additional features.
Other
Feel free to use any utility libraries like Lodash, Ramda, Moment.js, etc.

- Your project should have a package.json with all dependencies listed so that
we can install with npm.

Feel free to google for code examples, look at Stackoverflow, peek at React
components on GitHub, etc. But please do not copy-paste third-party code
into your project.