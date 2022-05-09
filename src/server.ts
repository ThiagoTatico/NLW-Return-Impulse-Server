import express from 'express';
import cors from "cors";
import { routes } from './routes';

const app = express();

// in cors -> origin: 'exemple.localhost:3000' to define who sites can access the back end.
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Sever ON !!!');
});
