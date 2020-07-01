import React from "react";
import FriendListComponent from "./FriendListComponent";
import GraphComponent from "./GraphComponent";

export default (props) => {
  const { id, name, element, friends: raw_friends } = props.suspect;

  const freq = {}; // handle double nodes in api response
  const friends = [];
  raw_friends.forEach((f) => {
    if (!freq[f.id] && f.id !== id) {
      freq[f.id] = 1;
      friends.push(f);
    }
  });

  friends.sort((a, b) => {
    a = parseInt(a.id);
    b = parseInt(b.id);
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  return (
    <div className="SuspectComponent">
      <GraphComponent
        suspect={{ id, name, element }}
        friends={friends}
        fetchID={props.fetchID}
      />
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Element: {element}</p>
      <FriendListComponent friends={friends} fetchID={props.fetchID} />
    </div>
  );
};
