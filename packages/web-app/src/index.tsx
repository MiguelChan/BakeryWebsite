import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  createTheme, 
  ThemeProvider, 
  Theme, 
  StyledEngineProvider,
} from '@mui/material/styles';
import 'fontsource-roboto';
import { BrowserRouter } from 'react-router-dom';
import { useDarkMode } from './Hooks';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const ReactApplication: React.FunctionComponent = () => {

  const [currentTheme, toggleDarkMode] = useDarkMode();
  const theme = createTheme({
    ...currentTheme,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App toggleDarkMode={toggleDarkMode} />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
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
