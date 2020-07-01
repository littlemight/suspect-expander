import React, { Component } from "react";
import { Graph } from "react-d3-graph";

class GraphComponent extends Component {
  constructor(props) {
    super(props);
    const { suspect, friends } = props;
    this.state = {
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
    };
  }

  static getColor(element) {
    let color = "red";
    switch (element) {
      case "air":
        color = "cyan";
        break;
      case "water":
        color = "blue";
        break;
      case "fire":
        color = "red";
        break;
      case "earth":
        color = "green";
        break;
      default:
        break;
    }
    return color;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.suspect.id !== state.id) {
      const { suspect, friends } = props;
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
      };
    }
    return null;
  }

  config = {
    automaticRearrangeAfterDropNode: true,
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
        onClickNode={this.props.fetchID}
        onDoubleClickNode={this.expandGraphNode}
        config={this.config}
      />
    );
  }
}

export default GraphComponent;
