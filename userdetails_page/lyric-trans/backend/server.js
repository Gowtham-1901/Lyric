const app = require('./app')
const PORT = 3008;
app.listen(PORT,()=>{ 
    console.log(`Server is running on ${PORT}`);
})