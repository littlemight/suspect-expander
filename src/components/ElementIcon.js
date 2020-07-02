import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faTint,
  faWind,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

export default ({ element }) => {
  let elColor = null;
  let elIcon = null;
  switch (element) {
    case "air":
      elColor = "#fad672";
      elIcon = faWind;
      break;
    case "water":
      elColor = "#81d3e8";
      elIcon = faTint;
      break;
    case "fire":
      elColor = "#d46628";
      elIcon = faFire;
      break;
    case "earth":
      elColor = "#6e6d2d";
      elIcon = faMountain;
      break;
    default:
      break;
  }
  return <FontAwesomeIcon icon={elIcon} color={elColor} size="lg" />;
};
