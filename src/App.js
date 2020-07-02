import React, { Component } from "react";
import { Container, Box, TextField } from "@material-ui/core";
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
      <Container maxWidth="sm">
        <Box my={4}>
          <h1>Suspect Expander Speedrun</h1>
          <TextField
            id="standard-basic"
            placeholder="69"
            label="Search your suspect"
            type="number"
            value={this.state.id || ""}
            helperText={
              this.state.response && this.state.response.status === 200
                ? `Showing result for Suspect #${this.state.id}. Click a node to search that node, double click to expand it.`
                : ""
            }
            onChange={(e) => this.fetchID(e.target.value)}
            fullWidth
          />
          {suspectComponent}
        </Box>
      </Container>
    );
  }
}

export default App;
