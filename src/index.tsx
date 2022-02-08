import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import App from "./App";
import { ThemeProvider } from '@mui/material/styles';
import Styles from './assets/themes';

ReactDOM.render(
  <div><App /></div>
  // <div><ThemeProvider theme={Styles.theme}><App /></ThemeProvider></div>
  , document.getElementById("root"));
reportWebVitals();