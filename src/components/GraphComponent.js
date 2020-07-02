import React, { Component } from "react";
import { Graph } from "react-d3-graph";
import { Container } from "@material-ui/core";

class GraphComponent extends Component {
  state = {
    id: null,
  };

  static getColor(element) {
    let color = "red";
    switch (element) {
      case "air":
        color = "#fad672";
        break;
      case "water":
        color = "#81d3e8";
        break;
      case "fire":
        color = "#d46628";
        break;
      case "earth":
        color = "#6e6d2d";
        break;
      default:
        break;
    }
    return color;
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.suspect.id || props.suspect.id !== state.id) {
      const { suspect, friends, fetchID } = props;
      return {
        id: suspect.id,
        data: {
          nodes: [suspect, ...friends].map((p) => {
            return {
              id: p.id,
              color: GraphComponent.getColor(p.element),
            };
          }),
          links: friends.map((f) => {
            return { source: suspect.id, target: f.id };
          }),
        },
        fetchID: fetchID,
      };
    }
    return null;
  }

  config = {
    automaticRearrangeAfterDropNode: true,
    directed: true,
    width: 480,
  };

  expandGraphNode = async (id) => {
    const response = await fetch("https://avatar.labpro.dev/friends/" + id, {
      method: "GET",
    });
    const json = await response.json();
    const newSuspect = json.payload;
    const newFriends = newSuspect.friends;
    const oldData = { ...this.state.data };

    newFriends.forEach((f) => {
      const newNode = {
        id: f.id,
        color: GraphComponent.getColor(f.element),
      };
      if (!oldData.nodes.some((node) => node.id === newNode.id)) {
        oldData.nodes.push(newNode);
      }

      const newEdge = {
        source: newSuspect.id,
        target: f.id,
      };
      if (
        !oldData.links.some(
          (edge) =>
            edge.source === newEdge.source && edge.target === newEdge.target
        )
      ) {
        oldData.links.push(newEdge);
      }
    });

    this.setState({
      data: oldData,
    });
  };

  render() {
    return (
      <Graph
        id="graph-id"
        data={this.state.data}
        onClickNode={this.state.fetchID}
        onDoubleClickNode={this.expandGraphNode}
        config={this.config}
      />
    );
  }
}

export default GraphComponent;
