import React from "react";

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

  const friendLists = friends.map((f) => {
    return (
      <div className="FriendComponent" key={f.id}>
        <p>{f.id}</p>
        <p>{f.name}</p>
        <p>{f.element}</p>
      </div>
    );
  });

  return (
    <div className="SuspectComponent">
      <p>Element: {element}</p>
      {friendLists}
    </div>
  );
};
