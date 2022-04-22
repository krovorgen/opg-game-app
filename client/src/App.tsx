import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

function App() {
  const [mockData, setMockData] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get<AxiosResponse>("http://localhost:4000/api/users")
      // @ts-ignore
      setMockData(user.data || [])
    }

    getUser()
  }, [])

  return (
    <div className="App">
      <ul>

      {mockData.length > 0 && mockData.map(item => <li>{JSON.stringify(item)}</li>)}
      </ul>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer">
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer">
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer">
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer">
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
