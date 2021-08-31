# Welcome to the AU Cares Backend!!

# Introduction
The backend of this application uses Node.JS as its runtime environment, and JavaScript is used as the programming language used in Node JS. We are using Express as our backend framework to create API (Application Programming Interface) and handle user requests to the server and respond to them. The main requests of our application are logging a user end and tracking users’ progress, along with giving new truths, dares, and questions upon spinning the wheel daily.
## Application Setup
The code and the back end are organized based on a structure similar to the MVC model, with each service being in its layer. Data is sent between the layers, however, only the service function layer has access to the database to ensure consistency. Each layer also has its functions divided into separate files based on the tasks they provide. For example, all API routes that have to do with authentication are in their file, and API requests that have to do with accessing resources are in another file.


The entry point of the backend is app.js file. All requests go through app.js, and then are directed to their request based on the query. 

For example: http://localhost:3000/authentication/login
* localhost:3000 sends request to backend, so request arrives to app.js
* /authentication sends request to authentication folder
* /login sends request to login function

### Folder structure of Backend
* api-routes - Location to where a request arrives to. This is the API-Routes layer. All function calls that needs to be done to suffice the requests are done here. The response of the request is also sent here. Each file in api-routes is divided based on the subject of the routes. Example: Authentication is for authentication routes only
* database - Location to where all database requests are stored. This is the database layer. The database.js is the file which holds all functions the database.
* Insomnia - Folder with JSON of current endpoints created. This JSON is to be imported in Insomnia and updated when new endpoints are created for testing.
* config (to be created) - Folder which holds all passwords and private data of the application, as well as any configurations. This folder should be added to gitignore and not tracked by git 
* middleware - Location where all middleware functions occur. This is the middleware layer. Middleware functions are functions run in between the request arriving to the api-routes and the service functions being called. Most of them are mainly to authorize a user to ensure that by the time service functions are called, the request is fully valid. Middleware functions are also split into files based on topic
* services - Location to where all service functions are located. This is the Service/Controller layer, and connects the api-routes layer to the database layer. The service functions are the workhorse of the requests. Service functions are also split into files based on topic



# SETUP
Tools to be installed: Node.JS, some IDE for backend, Insomnia (for testing API)

## Installing Node.JS
1. Click [here](https://nodejs.org/en/download/) and download Node JS for your OS
1. Go through all of the steps with default settings and install

## Setting up IDE and Backend

1. Download preferred IDE. I recommend VS Code
1. Open the au_cares_backend folder in terminal. Install the required packages by typing: *npm install*. This will install express, jsonwebtoken, dotenv, nodemon, nodemailer, mysql, bcrypt, crypto, moment
1. Create a config folder in au_cares_backend, and  create a *dot.env* file in the config folder.
1. Setup the dot.env file
    1. Create the following template in your dot.env file

    ```env
    #Will hold various API keys in here and DB

    #DB pass
    DB_HOST=
    DB_USER=
    DB_PASS=


    #JWT SECRETS
    ACCESS_TOKEN_SECRET =
    REFRESH_TOKEN_SECRET =
    ```

    1. Update your DB_HOST,DB_USER, and DB_PASS to the credentials of your database. For example, **DB_HOST=127.0.0.1** for localhost
    1. To create your ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET, 
        1. open terminal
        1. Type "node" command to start node in your terminal.
        1. Type *require('crypto').randomBytes(32).toString('hex')* command to create a secret
        1. Copy the result to be your ACCESS_TOKEN_SECRET.
        1. Do the same steps as above for REFRESH_TOKEN_SECRET. Both secrets have to be different
    1. Add *.env* to  your gitignore
1. Start the server by running *nodemon app.js* or *npm devStart* in the terminal. You should see some yellow and green text in the terminal, but no red text/ errors when doing so.
1. Test your connection to backend by testing the *ping* route and connection to backend and database by testing the *user_create* in Insomnia or some API tester. If responses are showing up, it works!

## Setting up API testing
API's can be tested using requests.rest file in VS Code or Insomnia for a nicer interface.

* With VS Code (worse interface but no application download required)
    1. Add extension called "REST Client" created by Huachao Mao
    1. Use the one existing or create a "requests.rest" file. Do all API testing here. Check the manual for the extension. Also, use "###" between each API call being tested
* With Insomnia (way better interface, but requires downloading application)
    1. Download Insomnia [here](https://insomnia.rest/download)
    1. Open Insomnia
    1. Create a new Request Collection by clicking "create" button in top right corner and selecting "Request Collection"
    1. Name your collection how you want. I am using "AU_Cares"
    1. After createing a new collection, in the top left corner where you see "Dashboard/(name of collection)", click on the name of your collection, and select "Import/Export"
    1. Select "Import Data" and select "From File". Get file from au_cares_backend -> Insomnia -> (Insomnia JSON file)
    1. Test out the API's how you want :)

## Starting the server
Start the server by going into au_cares folder in terminal, and typing *nodemon app.js*. This command can only be done after setup
