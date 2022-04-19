import Express from 'express';
import login from './routes/login.js'
import cors from 'cors';

const app = Express();
app.use(Express.json());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/login', login);
app.listen(3030, () => console.log('listening on port 3030'));


// Use this after the variable declaration