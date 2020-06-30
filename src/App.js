import React, { Component } from "react";
import "./App.css";
import SuspectComponent from "./components/SuspectComponent";

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
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let suspectComponent = null;
    if (this.state.response && this.state.response.status === 200) {
      suspectComponent = (
        <SuspectComponent
          suspect={this.state.response.payload}
          fetch={this.fetchID}
        />
      );
    }
    return (
      <div className="App">
        <h1>Suspect Expander Speedrun</h1>
        <input type="number" onChange={(e) => this.fetchID(e.target.value)} />
        {suspectComponent}
      </div>
    );
  }
}

export default App;
