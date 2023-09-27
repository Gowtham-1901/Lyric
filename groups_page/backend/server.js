/* jslint es6 */
/* jslint devel */
/* jslint node */
const app = require('./controller');
const PORT = 3008;
app.listen(PORT, ()=> {
    'use strict';
    console.log(`Server is running on ${PORT}`);
});