import { OpenAPIV3 } from "openapi-types";

const swagger: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "API treinamento",
    description: "Documentação",
    contact: {
      email: "pedro.souza@polijunior.com.br",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Local server",
    },
  ],
  paths: {},
};

export default swagger;
