import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// constants
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'dev';

const server = express();

// serve OpenAPI docs
const openApiSpec = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, 'openapi.yml'), { encoding: 'utf8' })
);
server.use('/openapi', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// middleware
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

// routes
// TBA

// start server
if (NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default server;
