const swaggerAutogen = require('swagger-autogen')();
const OUTPUT_FILE = "./doc/swagger_output.json"
const ENDPOINTS = [
    "./routes/auth.js",
    "./routes/index.js",
    "./routes/dashboard.js",
    "./routes/housing.js",
    "./routes/housingAffordability.js",
    "./routes/laborForce.js",
    "./routes/laborParticipation.js"
]

swaggerAutogen(OUTPUT_FILE, ENDPOINTS);