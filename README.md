CS07: Economic Recovery Dashboard
==========
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat&logo=javascript)
![Nodejs](https://img.shields.io/badge/-Node.js-black?style=flat&logo=Node.js)
![Python3](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)

Dashboard Website: https://spokaneeconomicdashboard.herokuapp.com/  
Admin Page: https://spokaneeconomicdashboard.herokuapp.com/login

# About the Project
Our group has developed a web based tool that visualizes a series of economic indicators to provide a snapshot of the Spokane economy, and other similar cities. Our project is to take this data and present it in a way that is easily digestible.  
The project also seeks to automate the data entry as much as possible, identifying the cycle that data may be updated from sources and posted on-line and then incorporated into the dashboard. For the dashboards that are not automatically updated, an admin page allows a limited set of users to make manual updates to key indicators. 

# Contributers:
* Simon Watkins: swatkins2@zagmail.gonzaga.edu
* Zac Foteff: zfoteff@zagmail.gonzaga.edu
* Jessica Robertson: jrobertson@zagmail.gonzaga.edu
* Lucas Abeln: labeln@zagmail.gonzaga.edu

# Mentor:
Dan Lenz

# Sponsor:
Greater Spokane Inc.

# Build:
Install NPM dependancies
```bash
npm install
```

Install pip packages
```bash
pip install -r requirements.txt
```

## Generate Swagger documentation
Update the route included in the ./doc/swagger.js file to include all endpoints in the project, then run this command
```bash
node ./doc/swagger.js
```

# Run: 
```bash
npm start
```
After saving changes to site, restart the server.

* This can be avoided by changing the start script in package.json to use 
the nodemon keyword instead of the node keyword

# Usage


## Dashboard

## About Page
The link to the [about page](https://spokaneeconomicdashboard.herokuapp.com/about) is found in the footer of the dashboard page. It includes some infomation about the project and the group developing it.

## Admin Page

### Logging In 

### Manual Inputs