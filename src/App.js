import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    response: null,
  };

  fetchID = async (id) => {
    try {
      const response = await fetch("https://avatar.labpro.dev/friends/" + id, {
        method: "GET",
      });
      const json = await response.json();
      this.setState({
        response: json,
      });
      console.log(json);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Suspect Expander Speedrun</h1>
        <input
          type="number"
          onChange={(e) => this.fetchID(e.target.value)}
        ></input>
      </div>
    );
  }
}

export default App;
