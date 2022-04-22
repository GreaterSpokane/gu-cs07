const swaggerAutogen = require('swagger-autogen')();
const OUTPUT_FILE = "./doc/swagger_output.json"
const ENDPOINTS = [
    "./routes/auth.js",
    "./routes/averageRent.js",
    "./routes/employed.js",
    "./routes/housing.js",
    "./routes/housingAffordability.js",
    "./routes/index.js",
    "./routes/laborForce.js",
    "./routes/laborParticipation.js",
    "./routes/medianIncome.js",
    "./routes/naturalChange.js",
    "./routes/netDomesticMigration.js",
    "./routes/unemployed.js",
]

swaggerAutogen(OUTPUT_FILE, ENDPOINTS);