import React from "react";
import { List, ListSubheader, Typography } from "@material-ui/core";
import FriendItemComponent from "./FriendItemComponent";

export default ({ friends, fetchID }) => {
  return (
    <List
      component="div"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography variant="subtitle1" align="left">
            {friends.length > 1 ? "Friends" : "Friend"}
          </Typography>
        </ListSubheader>
      }
    >
      {friends.map((f) => {
        return <FriendItemComponent friend={f} key={f.id} fetchID={fetchID} />;
      })}
    </List>
  );
};
