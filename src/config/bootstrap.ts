import { config } from "dotenv";

const boot = new Promise((resolve) => {
  switch (process.env.NODE_ENV) {
    case "development":
      resolve(config({ path: ".env.dev" }));
      break;
    case "test":
      resolve(config({ path: ".env.test" }));
      break;
    default:
      resolve(config({ path: ".env" }));
      break;
  }
});

export default boot;
