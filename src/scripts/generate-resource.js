import * as fs from "fs";
import {
  controllerTemplate,
  routerTemplate,
  serviceTemplate,
} from "../helpers/resource-generator-templates.js";
import { countReset } from "console";

// Access command line arguments
const args = process.argv.slice(2);
// process.argv[0] is the node path
// process.argv[1] is the script path
// process.argv[2] and beyond are the actual arguments

// Example usage
if (args.length === 0) {
  console.log(
    "Please provide arguments. Example: npm run generate-resource <resource-name>"
  );
  process.exit(1);
}

console.log("Arguments received:", args);

// Access specific arguments
const resourceName = args[0];

let controller = controllerTemplate.replace(/<resourcename>/g, resourceName);
let service = serviceTemplate.replace(/<resourcename>/g, resourceName);
let router = routerTemplate.replace(/<resourcename>/g, resourceName);

try {
  await fs.promises.writeFile(
    `src/controllers/${resourceName}.controller.js`,
    controller
  );
  console.log(`Created controller file: ${resourceName}.controller.js`);
  await fs.promises.writeFile(
    `src/services/${resourceName}.service.js`,
    service
  );
  console.log(`Created service file: ${resourceName}.service.js`);

  await fs.promises.writeFile(`src/routes/${resourceName}.router.js`, router);
  console.log(`Created router file: ${resourceName}.routes.js`);
} catch (err) {
  console.error("Error creating controller file:", err);
  process.exit(1);
}
