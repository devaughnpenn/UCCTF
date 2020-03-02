# Installation
---

### Set up environment for Ubuntu 16.04
Install packages:
```bash
# apt-get install mysql-server
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
# sudo service apache2 restart
```
Edit mySQL server settings:
```bash
# cd /etc/mysql/mysql.conf.d
# nano mysqld.cnf
```
Add the following line to the mysqld.cnf file:
```bash
sql_mode=IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```
Restart mySQL server:
```bash
# sudo service mysql restart
```

### Git Clone this project:
```bash
# git clone https://github.com/devaughnpenn/UCCTF
```

### Installing Composer
```bash
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```

### Installing dependencies
```bash
$ cd app_path
$ composer install
```

### Add app config file
```bash
$ cd app_path
$ cp .env.example .env
```

### Set up connection to database
Open the new .env file.
```bash
# nano .env
```
Change .env settings to the following:
```ini
DB_DSN           = mysql:host=localhost;port=3306;dbname=app_db
DB_USERNAME      = root
DB_PASSWORD      = dbpass
```

### Configuring RBAC
```bash
$ cd app_path
$ ./yii migrate --migrationPath=@yii/rbac/migrations/
```
### Run database migration.
```bash
$ cd app_path
$ ./yii migrate
```

### You can install npm by shell script
```bash
# curl -s https://nodejs.org/dist/v10.12.0/node-v10.12.0-linux-x64.tar.gz | sudo tar -zx --strip-components=1
```

### Installing dependencies via npm for frontend
```bash
$ npm install
```


