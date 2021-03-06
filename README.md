[![Build Status](https://travis-ci.org/andela-nekekwe/docMan.svg?branch=fix)](https://travis-ci.org/andela-nekekwe/docMan)
[![Coverage Status](https://coveralls.io/repos/github/andela-nekekwe/docMan/badge.svg?branch=fix)](https://coveralls.io/github/andela-nekekwe/docMan?branch=fix)
[![Code Climate](https://codeclimate.com/github/andela-nekekwe/docMan/badges/gpa.svg)](https://codeclimate.com/github/andela-nekekwe/docMan)
# DOCUMENT MANAGEMENT SYSTEM 

About the Application
-------------
Document Management System, complete with roles and privileges. Each document defines access rights; the document defines which roles can access it. 
Also, each document specifies the date it was published.

### **API Features**

The following features make up the Document Management System API:

##### Authentication
- It uses JSON Web Token (JWT) for authentication.  
- It generates a token upon successul login / account creation and returns it to the client.   
- It verifies the token to ensures a user is authenticated to access some endpoints.

##### Users
- It allows users to be created.  
- It allows users to login and obtain a token  
- It allows authenticated users to retrieve and edit their information only.   
- All users can be retrieved, modified and deleted by the admin user.

##### Roles
- It ensures that users have roles.   
- It ensures user roles could be `admin` or `regular`, or as created by the admin .   
- It ensures roles can be created, retrieved, updated and deleted by an admin user. 
- A non-admin user cannot create, retrieve, modify, or delete roles.  

##### Documents
- It allows new documents to be created by authenticated users.  
- It ensures all documents have access roles defined as `public` or `private`.  
- It allows admin users to create, retrieve, modify, and delete documents.
- It allows the admin user to retrieve all documents.   
- It allows `private` and `public` access documents to be retrieved by its owners.    
- It ensures users can delete, edit and update documents that they own.   
- It allows users to retrieve all documents they own.
- It allows users to set a type for any document they create.   

##### Types
- It allows documents to be defined based on types. Eg. Note, Report etc.   
- It allows users to add types to any document they create.   
- It allows users to create and retrieve types.
- It allows only admin user to modify and delete types   

##### Search
- It allows users to search `public` documents that belong to other users (as well as documents that belong to the user).
- It allows admin to retrieve all documents that matches search term, be it `public` or `private`.

Tech Stack
--------------
* [React] - A javascript library for building user interfaces
* [Redux] - A predictable state container for JavaScript apps.
* [Enzyme] - A JavaScript Testing utility for React
* [Materialize] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Webpack] - the streaming build system
* [Sequelize] - Sequelize is a promise-based ORM for Node.js and io.js.
* [JWT] - To authenticate routes
* [Postgresql and Sequelize ORM]

Local Development
--------------
Document Mnagement System requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd docMan
$ npm install -d
$ node app
$ Create Postgresql database and run migrations npm run db:setup.
$ Start the express server npm start.
$ Run test npm test.
```


Postman Collection
--------------

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2bbeeaa6b317239f5cdd)

Create a Postman environment and set url and token variables or download and import a production environment from this 




# API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
## Authentication
Users are assigned a token when signup or signin. This token is needed for subsequent HTTP requests to the API for authentication and can be attached as values to the header's `x-acess-token` or `authorization` key. API requests made without authentication will fail with the status code `401: Unauthorized Access`.
## Below are the API endpoints and their functions
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/users/login         |   Logs a user in.
POST /api/users/logout        |   Logs a user out.
POST /api/users/              |   Creates a new user.
GET /api/users/               |   Find matching instances of user.
GET /api/users/<id>           |   Find user.
PUT /api/users/<id>           |   Update user attributes.
DELETE /api/users/<id>        |   Delete user.
POST /api/documents/          |   Creates a new document instance.
GET /api/documents/           |   Find matching instances of document.
GET /api/documents/<id>       |   Find document.
PUT /api/documents/<id>       |   Update document attributes.
DELETE /api/documents/<id>    |   Delete document.
GET /api/users/<id>/documents |   Find all documents belonging to the user.
GET /search/users/<term>      |   Gets all users with full Names contain the search term
GET /search/roles/:term       |   Get all roles with title containing the search term
GET /search/document/:userId/:term| Get all document owned by `userId` with title containing the search term
GET /search/documents/:term | Get all documents with title containing the search term
GET /search/documents/:userId/:term |   Get all document owned or accessible by `userId` with title containing the search term
The following are some sample request and response from the API.
- [Roles](#roles)
  - [Get roles](#get-roles)
- [Users](#users)
  - [Create user](#create-user)
  - [Get user](#get-user)
- [Documents](#documents)
  - [Get All documents](#get-all-documents)
  - [Create document](#create-document)
  - [Get document](#get-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)
- [Search](#search)
  - [Search Documents](#search-documents)
  - [Search Users] (#search-users)
## Roles
Endpoint for Roles API.
### Get Roles
#### Request
- Endpoint: GET: `/api/roles`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "Admin",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }, {
    "id": 2,
    "title": "Registered",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }
]
```
## Users
Endpoint for Users API.
### Create User
#### Request
- Endpoint: POST: `api/users`
- Body `(application/json)`
```json
{
  "username": "uniqueuser",
  "fullNames": "Unique User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "password": "password"
}
```
#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "user": {
    "id": 141,
    "username": "uniqueuser",
    "fullNames": "Unique User",
    "email": "uniqueuser@unique.com",
    "RoleId": 1,
    "createdAt": "2017-02-19T17:34:19.992Z",
    "updatedAt": "2017-02-19T17:34:19.992Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE0MSwiUm9sZUlkIjoxLCJpYXQiOjE0ODc1MjU2NjAsImV4cCI6MTQ4NzY5ODQ2MH0.ddCQXZB2_woJ32xZNHqPBhNXfjBRg6T3ZsSmF8GCplA",
  "expiresIn": "2 days"
}
```
### Get Users
#### Request
- Endpoint: GET: `api/users`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "id": 140,
  "username": "uyi2",
  "fullNames": "wuyi2AH",
  "email": "uyi2@uyi.com",
  "RoleId": 1,
  "password": "$2a$08$ErbiyXkXAXsGXLoG2VOIIucUwzaCXGJz.d5YKkL/0SQIM3xhdbib2",
  "createdAt": "2017-02-17T19:41:30.837Z",
  "updatedAt": "2017-02-17T19:41:30.837Z"
},
{
  "id": 141,
  "username": "uniqueuser",
  "fullNames": "Unique User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "password": "$2a$08$eggCuipNKnau7CJcxGVaUeEssqo5OjbQedfV1.gGNT2GNTyloD6MS",
  "createdAt": "2017-02-19T17:34:19.992Z",
  "updatedAt": "2017-02-19T17:34:19.992Z"
}]
```
## Documents
Endpoint for document API.
### Get All Documents
#### Request
- Endpoint: GET: `/api/documents`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
    "id": 45,
    "title": "Another new document",
    "content": "Test Epic things like lorem etc",
    "permission": "Public",
    "OwnerId": 29,
    "createdAt": "2017-02-17T17:40:45.146Z",
    "updatedAt": "2017-02-17T17:40:45.146Z"
  },
  {
    "id": 44,
    "title": "New Title",
    "content": "The unique content of a document does not lie in the presence of the word unique",
    "permission": "1",
    "OwnerId": 1,
    "createdAt": "2017-02-06T22:55:43.747Z",
    "updatedAt": "2017-02-06T22:55:43.747Z"
  }]
```
### Create Document
#### Request
- Endpoint: POST: `/api/documents`
- Requires: Authentication
- Body `(application/json)`
```json
{
  "title": "Just a Title",
  "content": "This placeholder should not always be a lorem generated document",
  "OwnerId": 1,
  "permission": "private"
}
```
#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "Just a Title",
  "content": "This placeholder should not always be a lorem ipsum generated document",
  "OwnerId": 1,
  "permission": "private",
  "createdAt": "2017-02-05T05:51:51.217Z",
  "updatedAt": "2016-02-05T05:51:51.217Z"
}
```
### Get Document
#### Request
- Endpoint: GET: `/api/documents/:id`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "Just a Title",
  "content": "This placeholder should not always be a lorem ipsum generated document",
  "OwnerId": 1,
  "permission": "private",
  "createdAt": "2017-02-05T05:51:51.217Z",
  "updatedAt": "2016-02-05T05:51:51.217Z"
}
```
### Edit Document
#### Request
- Endpoint: PUT: `/api/documents/:id`
- Requires: Authentication
- Body `(application/json)`:
```json
{
  "title": "Updated Title",
}
```
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
  {
    "id": 1,
    "title": "Updated Title",
    "content": "This placeholder should not always be a lorem ipsum generated document",
    "OwnerId": 1,
    "permission": "private",
    "createdAt": "2017-02-05T05:51:51.217Z",
    "updatedAt": "2016-02-05T05:51:51.217Z"
  }
```
### Delete Document
#### Request
- Endpoint: DELETE: `/api/documents/:id`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Deleted Document with id:42"
}
```
### Search
#### Documents
#### Request
- Endpoint: GET: `/search/documents/:term`
- Requires: Authentication
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
    "id": 45,
    "title": "Another new document",
    "content": "Test Epic things like lorem etc",
    "permission": "Public",
    "OwnerId": 29,
    "createdAt": "2017-02-17T17:40:45.146Z",
    "updatedAt": "2017-02-17T17:40:45.146Z"
  },
  {
    "id": 44,
    "title": "New Title",
    "content": "The unique content of a document does not lie in the presence of the word unique",
    "permission": "1",
    "OwnerId": 1,
    "createdAt": "2017-02-06T22:55:43.747Z",
    "updatedAt": "2017-02-06T22:55:43.747Z"
  }]
```
### Users
#### Request
- Endpoint: GET: `/search/users/:term`
- Requires: Authentication, Admin Role
#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "id": 140,
  "username": "uyi2",
  "fullNames": "wuyi2AH",
  "email": "uyi2@uyi.com",
  "RoleId": 1,
  "password": "$2a$08$ErbiyXkXAXsGXLoG2VOIIucUwzaCXGJz.d5YKkL/0SQIM3xhdbib2",
  "createdAt": "2017-02-17T19:41:30.837Z",
  "updatedAt": "2017-02-17T19:41:30.837Z"
},
{
  "id": 141,
  "username": "uniqueuser",
  "fullNames": "Unique User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "password": "$2a$08$eggCuipNKnau7CJcxGVaUeEssqo5OjbQedfV1.gGNT2GNTyloD6MS",
  "createdAt": "2017-02-19T17:34:19.992Z",
  "updatedAt": "2017-02-19T17:34:19.992Z"
}]
```

#### Limitations:
The limitations to the Document Management System API are as follows:

* Users can only create plain textual documents and retrieve same when needed. 
* Users cannot share documents with people, but can make document `public` to make it available to other users.
* Users cannot delete their accounts unless via the action of an admin of the system.
* Users login and obtain a token which is verified on every request, but users cannot logout (nullify the token), however tokens become invalid when it expires (after 1 day).

#### _**Contributing**_
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:




[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>

