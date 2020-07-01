import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

export default ({ friend, fetchID }) => {
  return (
    <ListItem button onClick={() => fetchID(friend.id)}>
      <ListItemText primary={friend.name} secondary={`Suspect #${friend.id}`} />
    </ListItem>
  );
};
