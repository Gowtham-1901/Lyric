/* jslint es6 */
/* jslint node */
const Pool = require("pg").Pool;
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "190401",
    database: "texta",
    port: "5432"
});

module.exports = pool;