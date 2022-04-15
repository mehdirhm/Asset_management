import Express from 'express';
const app = Express();

app.use(Express.json());
app.listen(3030, () => console.log('listening on port 3030'));
