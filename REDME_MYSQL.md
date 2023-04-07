sudo service mysql status 
sudo service mysql restart 
sudo service mysql stop
mysql -u root -p

## INSTALL PHPMYADMIN
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-20-04 

- sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl
- select apache when prompted
- select Yes when asked whether to use dbconfig-common to set up the database
- choose a phpadmin password (see the env file for that anyway is phpadmin_mysql)
- sudo phpenmod mbstring
- sudo systemctl restart apache2

Configuring Password Access for the MySQL Root Account
- sudo mysql
- SELECT user,authentication_string,plugin,host FROM mysql.user;


## NO MODULE NAMED mySQLdb
Probably mysqlclient not installed. Using just pip is most likely not going to work, check if it's in the requirements.txt and run the installs from there again

pip install --proxy=http://proxy-bc-el.regione.fvg.it:801 -r requirements.txt

You can find the latest version here too
https://archive.linux.duke.edu/pypi/simple/mysqlclient/
