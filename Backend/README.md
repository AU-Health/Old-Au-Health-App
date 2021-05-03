# Welcome to the AU Cares Backend!!

# Introduction
This is the backend to AUCares application. The backend is uses NodeJS with JavaScript as the backend language, and Express is the technology used to create API(Application Programming Interface) endpoints and send responses to requests.

## Application Setup
The backend is divided


# SETUP
Tools to be installed: Node.JS, some IDE for backend, Insomnia (for testing API)

## Installing Node.JS
1. Click [here](https://nodejs.org/en/download/) and download Node JS for your OS
1. Go through all of the steps with default settings and install

## Setting up IDE and Backend

1. Download preferred IDE. I recommend VS Code
1. Open the au_cares_backend folder in terminal. Install the required packages by typing: *npm install express jsonwebtoken dotenv nodemon nodemailer mysql bcrypt crypto moment*
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
