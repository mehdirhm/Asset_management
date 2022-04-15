import Express from 'express';
import login from './routes/login.js'
import cors from 'cors';
// var cors = require('cors')


const app = Express();
app.use(cors()) // Use this after the variable declaration
app.use(Express.json());
app.use('/api/login', login);
app.listen(3030, () => console.log('listening on port 3030'));



// Use this after the variable declaration