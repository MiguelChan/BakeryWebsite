"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const SuppliersRouteConfig_1 = require("./routes/SuppliersRouteConfig");
const debug_1 = __importDefault(require("debug"));
// Server Initialization
const app = express_1.default();
const server = http.createServer(app);
const port = 3030;
const routes = [];
const debugLog = debug_1.default('app');
// Adding middleware for parsing all incoming requests as JSON
app.use(express_1.default.json());
// Here we're adding the middleware that allows cross-origin requests.
app.use(cors_1.default());
// Setting up expressWinstong logging.
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({
        all: true,
    })),
};
// Adding a process-stop on unhandled errors and spitting out a strack trace.
// Only occurs in Debug Mode.
if (process.env.DEBUG) {
    process.on('unhandledRejection', ((reason) => {
        debugLog('Unhandled Rejection: ', reason);
        process.exit(1);
    }));
}
else {
    loggerOptions.meta = false; // When not debuggin make terse.
}
// Initializd the Logger with the above configuration.
app.use(expressWinston.logger(loggerOptions));
// Adding Routes to the Routes Array.
routes.push(new SuppliersRouteConfig_1.SuppliersRoutes(app));
app.get('/', (request, response) => {
    response.status(200).send('Server up and Running');
});
// The actual server Setup.
server.listen(port, () => {
    debugLog(`Server running @ http://localhost:${port}`);
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsMkNBQTZCO0FBRTdCLGlEQUFtQztBQUNuQyxnRUFBa0Q7QUFDbEQsZ0RBQXdCO0FBSXhCLHdFQUV1QztBQUN2QyxrREFBMEI7QUFFMUIsd0JBQXdCO0FBQ3hCLE1BQU0sR0FBRyxHQUF3QixpQkFBTyxFQUFFLENBQUM7QUFDM0MsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLE1BQU0sTUFBTSxHQUE4QixFQUFFLENBQUM7QUFDN0MsTUFBTSxRQUFRLEdBQW9CLGVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUvQyw4REFBOEQ7QUFDOUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFeEIsc0VBQXNFO0FBQ3RFLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUVoQixzQ0FBc0M7QUFDdEMsTUFBTSxhQUFhLEdBQWlDO0lBQ2hELFVBQVUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLEdBQUcsRUFBRSxJQUFJO0tBQ1osQ0FBQyxDQUNMO0NBQ0osQ0FBQztBQUVGLDZFQUE2RTtBQUM3RSw2QkFBNkI7QUFDN0IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtJQUNuQixPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN6QyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ1A7S0FBTTtJQUNILGFBQWEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsZ0NBQWdDO0NBQy9EO0FBRUQsc0RBQXNEO0FBQ3RELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBRTlDLHFDQUFxQztBQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksc0NBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXRDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBd0IsRUFBRSxRQUEwQixFQUFFLEVBQUU7SUFDbEUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQztBQUVILDJCQUEyQjtBQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDckIsUUFBUSxDQUFDLHFDQUFxQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDekMsUUFBUSxDQUFDLHlCQUF5QixLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==