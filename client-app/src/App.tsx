import React from "react";
import { Header, Icon, List } from "semantic-ui-react";
import "./App.css";
import { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    values: [],
  };
  componentDidMount() {
    axios.get("http://localhost:5000/Api/values").then((response) => {
      console.log(response);
      this.setState({
        values: response.data,
      });
    });
  }
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />

          <Header.Content>Reactivities</Header.Content>
        </Header>

        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;

/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
}

export default App;
*/
