CS07: Economic Recovery Dashboard
==========
Dashboard Website: https://spokaneeconomicdashboard.herokuapp.com/
Admin Page: https://spokaneeconomicdashboard.herokuapp.com/login

### Contributers:
* Simon Watkins
* Zac Foteff
* Jessica Robertson
* Lucas Abeln

### Mentor:
* Dan Lenz

### Client:
* Greater Spokane Inc.
* Gary Ballew

## BUILD:
Install NPM dependancies
```bash
npm install
```

Install pip packages
```bash
pip3 install -r requirements.txt
```

# RUN: 
```bash
npm start
```
After saving changes to site, restart the server.

* This can be avoided by changing the start script in package.json to use 
the nodemon keyword instead of the node keyword

# Generate Swagger documentation
Update the routers included in the ./doc/swagger.js file then run this command
```bash
node ./doc/swagger.js
```