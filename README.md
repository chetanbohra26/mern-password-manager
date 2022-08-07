# Introduction

The project is built using the following technologies:

1. React
2. Express.js (Node.js)
3. Bootstrap 5
4. Sequelize v6
5. Postgresql (Free tier)
6. Courier (A service to send mails via Node.js) (Free tier)
7. Redis (Free tier)

The application is deployed on Heroku: [https://pwd-pro.herokuapp.com](https://pwd-pro.herokuapp.com)

While working with the project, I came across a few challenges:

1. Sequelize is slower to use than native DB at the cost of convenience of not writing queries.
2. Sequelize takes a few seconds to initialize/sync models. This is problematic during development as I wait for models to load for testing even tiny endpoint changes.
3. Sequelize is an ORM that aims to provide convenience to use any database interchangeably. However, in some scenarios similar behavior is not displayed. For eg: if a record is updated, Postgresql returns the updated record while Sql doesn't. Similarly, when creating a record with Sequelize, Postgresql returns the created user id while Sql doesn't. If a user is aware of the DB syntaxes, there is not much benefit from using Sequelize.
4. Bootstrap sites tend to look similar due to similar classes being used.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the express server which provides endpoints and PROD UI\
Open [http://localhost:7500](http://localhost:7500) to view it in your browser.
The server will not reload when making changes.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

### `num run start-watch`

Runs the express server in development mode and PROD UI
Open [http://localhost:7500](http://localhost:7500) to view it in your browser.
The server will reload when making changes.

### `num run serve`

Runs the React development server in development mode
Open [http://localhost:3000](http://localhost:7500) to view it in your browser.
The server will reload when making changes.
