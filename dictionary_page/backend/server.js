const app = require('./controller');
const port = 3002;
app.listen(port, () => {
    'use strict';
    console.log(`Server is running on ${port}`);
});