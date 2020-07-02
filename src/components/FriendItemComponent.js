import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import ElementIcon from "./ElementIcon";

export default ({ friend, fetchID }) => {
  // console.log(friend.element);
  return (
    <React.Fragment>
      <ListItem button onClick={() => fetchID(friend.id)}>
        <ListItemIcon>
          <ElementIcon element={friend.element} />
        </ListItemIcon>
        <ListItemText
          primary={friend.name}
          secondary={`Suspect #${friend.id}`}
        />
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};
