import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { 
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import 'fontsource-roboto';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import { useDarkMode } from './Hooks';

const ReactApplication: React.FunctionComponent = () => {

  const [currentTheme, toggleDarkMode] = useDarkMode();

  const themeConfig = createMuiTheme(currentTheme);

  return (
    <MuiThemeProvider theme={themeConfig}>
      <BrowserRouter>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <App toggleDarkMode={toggleDarkMode} />
        </Provider>
      </BrowserRouter>
    </MuiThemeProvider>
  );

};

ReactDOM.render(
  <ReactApplication />,
  document.getElementById('root'),
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
