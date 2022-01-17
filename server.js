import { dirname } from "path";
import { fileURLToPath } from "url";

import Application from "./app.js";

Application(dirname(fileURLToPath(import.meta.url)), 8080);
