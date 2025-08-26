import app from './app';
import { constants } from './config/constants';

const port = constants.port || 8080;

app.listen(port, () => {
  console.log(`app running ${port}`);
});
