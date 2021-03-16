# Welcome to AU Cares Database

# SETUP
Will need to setup MySQL,DataGrip(kinda optional) and PHPMyAdmin

## Setting up XAAMP with PHPMyAdmin and MySQL

1. Click on the link [here](https://www.apachefriends.org/index.html)
1. Download XAAMP for your OS 
    *(For Mac) If you have errors downloading the file above, go to https://sourceforge.net/projects/xampp/files/ or https://www.apachefriends.org/download.html          -> "More Downloads." Click on “XAMPP Mac OS X” folder. Download the latest one (folder on the top). Click and download “xampp-ox-#-installer.dmg” NOT the            “xampp-ox-#-vm.dmg”
1. file which was downloaded
1. (For Windows) If warning pops up for Windows with UAC and msConfig,
    1. Click on Windows Search bar and type "Run"
    1. Enter "msconfig" and click "OK"
    1. Select the "Tools" tab
    1. Select "Change UAC Settings" and click "Launch"
    1. Move slide bar to "Never Notify" and press "OK"
    1. Click "OK" in the window.
    1. Select "OK" for where the warning popped up
    
1. In window for things to download, only keep checkmarks for:
    * Apache
    * MySQL
    * PHP
    * phpMyAdmin
        *(For Mac) Click the check box with “XAMPP Core Files” only. 
1. Click "Next"
1. Select location to save your XAAMP and click "Next"
1. Select "English" for language and click "Next"
1. Remove checkmark to "Learn more about Bitnami for XAAMP" and click next. (XAAMP will be installing)
1. Upon installing: go to xaamp->phpMyAdmin-> open "config.inc"
1. Set blowfish_secret on line 6 from "xaamp" to something else by one of the two options:
    * Do this command in node: require('crypto').randomBytes(32).toString('hex')
    * Use my secret which is '174258d118d15909cb5568a13479d53dedfe2fad3fb5299bb1e3b882e026f59a'

1. Go to next steps with "Setting password for MySQL"


##Setting password for MySQL

1. Open "XAAMP Control Panel"
1. In the row with MySQL, click "Start" (starts MySQL)
1. In the row with MySQL, click "Admin" (Open phpMyAdmin)
1. Select "User Accounts" tab at the top bar
1. In the row with hostname "127.0.0.1", click "Edit priviledges"
1. Click "change password"
1. Type in and retype password. Save password somewhere
1. Click "Go"

#Starting the Database

1. Open "XAAMP Control Panel"
1. In the row with Apache, click "Start"
1. (To start MySQL) In the row with MySQL, click "Start"
1. (To start PHPMyAdmin) In the row with MySQL, click "Admin".


