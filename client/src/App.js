import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  // curl -X POST -u "apikey:Tsp6V8lAz5Pkw95z7NubBWRiv9Tfg4ciTBdHAPlWIKrx" --header "Content-Type: audio/flac" --data-binary "@audio-file.flac" "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/d64c60a7-5eeb-4ce4-a321-e3c0bcef6f3c/v1/recognize"

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
