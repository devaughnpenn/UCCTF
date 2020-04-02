# Installation

Instructions for setting up the Ubuntu backend server for the application.

---

### 1. Set up environment for Ubuntu 16.04.
Install packages:
```bash
$ sudo apt-get install apache2 libapache2-mod-php7.0
$ sudo apt-get install php7.0 php7.0-gd php7.0-mcrypt php7.0-curl php7.0-mysql php7.0-mbstring php7.0-xml php7.0-zip php7.0-sybase
$ sudo apt-get install git
$ sudo apt-get install curl
```
allow a2enmod headers and rewrite:
```bash
$ sudo a2enmod headers
$ sudo a2enmod rewrite
```
Restart the Apache2 server:
```bash
$ sudo service apache2 restart
```
Install mySQL Server:
```bash
$ sudo apt-get install mysql-server
```
mySQL will load a prompt and ask you to supply a password for root user. Enter the password as the following, then hit ok.
```bash
dbpass
```
Edit mySQL server settings:
```bash
$ cd /etc/mysql/mysql.conf.d
$ sudo nano mysqld.cnf
```
Add the following line to the **mysqld.cnf** file:
```bash
sql_mode=IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```
Restart mySQL server:
```bash
$ sudo service mysql restart
```

### 2. Git Clone this project.
It is recommended you create a new folder/directory for the project first. Then, git clone the project into that folder.
```bash
$ sudo git clone https://github.com/devaughnpenn/UCCTF
```

### 3. Installing Composer.
```bash
$ sudo curl -sS https://getcomposer.org/installer | php
$ sudo mv composer.phar /usr/local/bin/composer
```

### 4. Installing dependencies.
cd (change directory) to the project Backend folder.
```bash
$ cd backend
$ sudo composer install
```

### 5. Add app config file.
cd to the project Backend folder.
```bash
$ cd backend
$ sudo cp .env.example .env
```

### 6. Set up connection to the mySQL database.
Open the new **.env** file in a text editor.
```bash
$ sudo nano .env
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
$ sudo mysql -u root -p
```
type the password when prompted and hit Enter.
```bash
dbpass
```
Create an **app_db** database.
```bash
CREATE DATABASE app_db;
```
Verify the database was created:
```bash
SHOW DATABASES;
```
Exit mySQL.
```bash
exit
```
*Note: when using mySQL on the command line, remember to close your commands with ; (semicolon). If you don't supply a semicolon, mySQL will keep asking for more input because it doesn't know that's the end of the command.*

### 8. Configuring RBAC
cd to project Backend folder.
```bash
$ cd backend
$ sudo ./yii migrate --migrationPath=@yii/rbac/migrations/
```

### 9. Run database migration.
cd to project Backend folder.
```bash
$ cd backend
$ sudo ./yii migrate
```

### 10. Install Node JS with curl.
cd to project Frontend folder.
```bash
$ cd frontend
$ sudo curl -s https://nodejs.org/dist/v10.12.0/node-v10.12.0-linux-x64.tar.gz | sudo tar -zx --strip-components=1
```

### 11. Install NPM.
cd to project Frontend folder.
```bash
$ cd frontend
$ sudo npm install
```
