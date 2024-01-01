import 'dotenv/config';
import server from './server';
import 'db/database';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
