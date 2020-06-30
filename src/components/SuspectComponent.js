import React from "react";
import FriendListComponent from "./FriendListComponent";

export default (props) => {
  const { id, name, element, friends: raw_friends } = props.suspect;

  const freq = {}; // handle double nodes in api response
  const friends = [];
  raw_friends.forEach((f) => {
    if (!freq[f.id]) {
      freq[f.id] = 1;
      friends.push(f);
    }
  });

  return (
    <div className="SuspectComponent">
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Element: {element}</p>
      {/* {friendLists} */}
      <FriendListComponent friends={friends} fetch={props.fetch} />
    </div>
  );
};
