import {
  Main,
} from 'cmd';
import {
  InversifyContainer,
} from 'di';

const inversifyContainer: InversifyContainer = new InversifyContainer();
const mainApp: Main = inversifyContainer.getApp();
mainApp.runApp();
