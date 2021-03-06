# Installation

Instructions for setting up the Backend and Frontend of the application.

---

### 1. Set up environment for Ubuntu 16.04.
Install packages as superuser:
```bash
$ sudo su
# apt-get update
# apt-get install apache2 libapache2-mod-php7.0
# apt-get install php7.0 php7.0-gd php7.0-mcrypt php7.0-curl php7.0-mysql php7.0-mbstring php7.0-xml php7.0-zip php7.0-sybase
# apt-get install git
# apt-get install curl
```
allow a2enmod headers and rewrite:
```bash
# a2enmod headers
# a2enmod rewrite
```
Restart the Apache2 server:
```bash
# service apache2 restart
```
Install mySQL Server:
```bash
# apt-get install mysql-server
```
mySQL will load a prompt and ask you to supply a password for root user. Enter the password as the following, then hit ok.
```bash
dbpass
```
Edit mySQL server settings:
```bash
# cd /etc/mysql/mysql.conf.d
# nano mysqld.cnf
```
Add the following line to the **mysqld.cnf** file:
```bash
sql_mode=IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```
Restart mySQL server:
```bash
# service mysql restart
```

### 2. Git Clone this project.
It is recommended you create a new folder/directory for the project first. Then, git clone the project into that folder.
```bash
# git clone https://github.com/devaughnpenn/UCCTF
```

### 3. Installing Composer.
```bash
# curl -sS https://getcomposer.org/installer | php
# mv composer.phar /usr/local/bin/composer
```

### 4. Installing dependencies.
cd (change directory) to the project Backend folder.
```bash
# cd backend
# composer install
```

### 5. Add app config file.
cd to the project Backend folder.
```bash
# cd backend
# cp .env.example .env
```

### 6. Set up connection to the mySQL database.
Open the new **.env** file in a text editor.
```bash
# nano .env
```
Change **.env** settings to the following:
```ini
DB_DSN           = mysql:host=localhost;port=3306;dbname=app_db
DB_USERNAME      = root
DB_PASSWORD      = dbpass
```

### 7. Create app_db database.
Login to mySQL on the command line.
```bash
# mysql -u root -p
```
type the password when prompted and hit Enter.
```bash
dbpass
```
Create an **app_db** database.
```bash
> CREATE DATABASE app_db;
```
Verify the database was created:
```bash
> SHOW DATABASES;
```
Exit mySQL.
```bash
> exit
```
*Note: when using mySQL on the command line, remember to close your commands with ; (semicolon). If you don't supply a semicolon, mySQL will keep asking for more input because it doesn't know that's the end of the command.*

### 8. Configuring RBAC (Role-Based Access Control).
cd to project Backend folder.
```bash
# cd backend
# ./yii migrate --migrationPath=@yii/rbac/migrations/
```

### 9. Run database migration.
cd to project Backend folder.
```bash
# cd backend
# ./yii migrate
```

### 10. Install Node Version Manager (nvm)
cd to project frontend folder.
```bash
# cd frontend
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
In order to use nvm, exit your terminal and open a new one. Then, cd to the Frontend project folder, and use the following command to install the latest version of Node JS.
```bash
# cd frontend
# nvm install 12.16.2
```
You can check the version of Node JS to confirm installation.
```bash
# node -v
```

### 11. Set Root Privileges.
cd to project frontend folder.
```bash
# cd frontend
# npm config set user 0
# npm config set unsafe-perm true
```

### 12. Install Angular.
cd to project Frontend folder.
```bash
# cd frontend
```
Install Angular and dependencies.
```bash
# npm install -g @angular/cli@latest
# npm install --save-dev @angular/cli@latest
# npm install
```
Finally, update Angular to the latest version.
```bash
# ng update
# ng update @angular/core --allow-dirty
```
You're now fully set up to run the project. To run the application, visit the [Quickstart](https://github.com/devaughnpenn/UCCTF/blob/master/docs/Quickstart.md) documentation.
