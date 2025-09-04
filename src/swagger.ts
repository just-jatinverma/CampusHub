import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Auto-generated API documentation using swagger-autogen',
  },
  host: 'localhost:4000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
