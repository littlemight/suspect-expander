import React, { Component } from "react";
import "./App.css";
import SuspectComponent from "./components/SuspectComponent";

class App extends Component {
  state = {
    id: null,
    response: null,
  };

  fetchID = async (id) => {
    try {
      const response = await fetch("https://avatar.labpro.dev/friends/" + id, {
        method: "GET",
      });
      const json = await response.json();
      this.setState({
        id: id,
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
          fetchID={this.fetchID}
        />
      );
    }
    return (
      <div className="App">
        <h1>Suspect Expander Speedrun</h1>
        <input
          type="number"
          value={this.state.id || ""}
          onChange={(e) => this.fetchID(e.target.value)}
        />
        {suspectComponent}
      </div>
    );
  }
}

export default App;
