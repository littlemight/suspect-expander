import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

export default ({ friend, fetch }) => {
  return (
    <ListItem button onClick={() => fetch(friend.id)}>
      <ListItemText primary={friend.name} secondary={`Suspect #${friend.id}`} />
    </ListItem>
  );
};
