## Starting backend

Yarn installation:
`npm install --global yarn`

[Other options for installing yarn.](https://classic.yarnpkg.com/lang/en/docs/install/)

Install packages using your chosen package manager (yarn by default - see lockfile):

`yarn`

Initialize the database by running the command from the backend folder (see the `Database` section for more information):

`yarn db:reset`

Launch the backend with the command:

`yarn start:dev`
 

## Documentation API

API documentation is available after running the backend server at `http://localhost:9595/docs`.

All requests have been described in detail, both what the endpoint expects and what it returns, including possible errors.

Schema descriptions for requests also take into account validation (minimum and maximum number of characters).

## Database

The backend repository uses a `sqlite` database. To create the database and generate initial data, go to the backend folder, make sure the server is turned off and run the command:

```
yarn db:reset
```

This command will delete the database if it exists, create a new one and start data migration.

Note - this command will delete the data you have modified in the database!

## Communication with API

For authorization on the Backend side, you should attach a Bearer Token to the Authorization header of each query. Example:

```
Authorization: Bearer eyJhbGc3OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAZXhhbXBsZS5jb20iLCJzd1IiOjE2NzQxMjcvMzcxMzEsImZpcnN0bmFtZSI6InRlc3QiLCJsYXN0bmFtZSI6InRlc3QiLCJpYXQiOjE2NzQxNDE4ODcsImV4cCI6MTY3NDE0aTQ4N30.SOU2GqpndnREZsrSiEbx7_cwcqXkA1jG5jkvDLX5emw
```

Where the token following the word Bearer is the token returned by the login endpoint.
