#Welcome to AU Cares Database

<h1>Setup</h1>



<ol>
    <li>Download MySql
        <ul>
            <li>Apple</li>
            <ol>
                <li>Step 1</li>
            </ol>
            <li>Windows (reference: https://www.youtube.com/watch?v=GIRcpjg-3Eg)</li>
            <ol>
                <li>Go to <a href="https://dev.mysql.com/downloads/installer/">MySql windows installer</a></li>
                <li> Select "Download" button for the smaller size file (Web version) by clicking download</li>
                <li>Select "No thanks, just start my download." at the bottom the new screen --- Download of MySql starts after clicking</li>
                <li>Open MySql installer which was downloaded</li>
                <li>(Setup)Select "Developer Default" and click next</li>
                <li>(Downloads) Download what is asked and click execute. Keep clicking "Try Again" on those that fail</li>
                <li>(Installation) Go through installation .... might take some time</li>
                <li>(Product Configuration) All should be ready to configure. Just click next</li>
                <li>(Type and networking) Ensure config type is "Development Computer" and port 3306. Leave defaults and Click next</li>
                <li>(Authentication Method) Select User Strong password and click next</li>
                <li>(Accounts and Roles) MySQL pass: "AuHealthApp123987$%^" .... I might need to add people?</li>
                <li>(Windows Service) Remove checkmark for "Start the MySQL Server at System Startup". Click next</li>
                <li>(Apply configuration steps) Click execute</li>
                <li>(Product configuration) Click next</li>
                <li>(Connect to server) At the bottom, leave user as root and put password from earlier step. Click check. After this step server should be connected. Click next</li>
                <li>(Apply configuration) Click execute</li>
                <li>(Installation complete) Click finish</li>
            </ol>
        </ul>
    </li>
    <li>Set up database with DataGrip (reference https://www.jetbrains.com/help/datagrip/connecting-to-a-database.html#connect-to-mysql-database)</li>
    <ol>
        <li>Download Datagrip</li>
        <li>In the project folder, go to File-> New Project ->Datasource -> MySQL</li>
        <ul>
            <li>Leave all as default and add comment if you would like</li>
            <li>For user, put "root"</li>
            <li>For pass: put password from earlier</li>
            <li>Click test connection. Download needed drivers</li>
            <li>Click OK -- datagrip should connect with server</li>
        </ul>
    </ol>
</ol>