import Express from 'express';
import login from './routes/login.js'
const app = Express();

app.use(Express.json());
app.use('/api/login', login);
app.listen(3030, () => console.log('listening on port 3030'));
