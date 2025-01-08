
import { createServer } from './config/server';


// Set up the port from environment variables
const PORT = process.env.PORT || 5000;

createServer().then(server => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error(err);
  }
);  
