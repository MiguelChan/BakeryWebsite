import 'reflect-metadata';
import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import {
  CommonRoutesConfig,
} from './routes/CommonRouteConfig';
import {
  SuppliersRoutes,
} from './routes/SuppliersRoutes';
import { InversifyContainer } from './utils/InversifyContainer';
import { Types } from './utils';

// Server Initialization
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3030;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

// Setting up the DI Container
const inversifyContainer: InversifyContainer = new InversifyContainer(app);

// Adding middleware for parsing all incoming requests as JSON
app.use(express.json());

// Here we're adding the middleware that allows cross-origin requests.
app.use(cors());

// Setting up expressWinstong logging.
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({
      all: true,
    }),
  ),
};

// Adding a process-stop on unhandled errors and spitting out a strack trace.
// Only occurs in Debug Mode.
if (process.env.DEBUG) {
  process.on('unhandledRejection', ((reason) => {
    debugLog('Unhandled Rejection: ', reason);
    process.exit(1);
  }));
} else {
  loggerOptions.meta = false; // When not debuggin make terse.
}

// Initializd the Logger with the above configuration.
app.use(expressWinston.logger(loggerOptions));

// Adding Routes to the Routes Array.
const suppliersRoutes: SuppliersRoutes = inversifyContainer.getContainer().get<SuppliersRoutes>(Types.SuppliersRoutes);
routes.push(suppliersRoutes);

app.get('/', (request: express.Request, response: express.Response) => {
  response.status(200).send('Server up and Running');
});

// The actual server Setup.
server.listen(port, () => {
  debugLog(`Server running @ http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    route.configureRoutes();
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
