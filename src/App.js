import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto';
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const App = () => (
    <div className="App">
      <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"><MenuIcon /></IconButton>
        <Typography variant="h6">Home</Typography>
      </Toolbar>
    </AppBar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
);

export default App;
