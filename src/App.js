import React, { Component } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  SvgIcon,
} from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { animateScroll as scroll } from "react-scroll";
import "./App.css";
import SuspectComponent from "./components/SuspectComponent";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Nunito, Roboto, sans-serif",
  },
});

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
      scroll.scrollToTop();
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
      <MuiThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Box my={4}>
            <Typography
              component="h1"
              variant="h4"
              display="block"
              align="center"
              gutterBottom
            >
              Suspect Expander
            </Typography>
            <TextField
              id="standard-basic"
              placeholder="69"
              label="Search your suspect"
              type="number"
              value={this.state.id || ""}
              error={
                (!this.state.response || this.state.response.status !== 200) &&
                this.state.id
              }
              helperText={
                this.state.response && this.state.response.status === 200
                  ? `Showing result for Suspect #${this.state.id}. Click a node to search that suspect, double click to expand it.`
                  : this.state.response && this.state.id
                  ? `API Message: ${this.state.response.message}`
                  : "Got anyone you suspect? Search 'em here. (IDs only, sadly.)"
              }
              onChange={(e) => this.fetchID(e.target.value)}
              fullWidth
            />
            {suspectComponent}
          </Box>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
