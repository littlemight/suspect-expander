# Suspect Expander

This project was made as part of Bandung Institute of Technology's Programming Laboratory selection task. This webapp uses an API to fetch the query and render the result to the user.

## Usage

![demo](demo/demo.gif)

Input the suspect's ID to the search bar, you can click a node to explore that node (suspect), or double click to add friends from that suspect to the graph. You can zoom in/out on the graph view with the scroll wheel. You can also click a friend in the friend list to investigate that person.
Each suspect's element is represented by a logo.

## API Review

Fetching of the suspect datas is using [labpro's API](https://avatar.labpro.dev). The endpoint of the API is GET `/friends/{id}`
. There are some flaws with the API

- The suspect can be included in the friend list from the response
- Duplicate friends in the friend list of a suspect

I'm not sure if this is intended to be a flaw, but is worth mentioning:

- One sided friendship (if a is friend with b, b may or may not be friends with a)

Some recommendation for the API is to filter the generated data first, so that we don't need to filter the nodes and edges when constructing the graph.

## Installation and Setup Instructions

To run this project on your local machine, clone this repository. You will need `node` and `npm` installed on your machine.

### Installation

`npm install`

### Starting Local Server

`npm start`

This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

`npm run deploy`

This project is deployed on [Github Pages](https://pages.github.com/) at https://littlemight.github.io/suspect-expander/

## Built With

- [React](https://reactjs.org/) - Javascript library for front end development
- [Material-UI](https://material-ui.com/) - Frontend framework for React applications
- [react-d3-graph](https://github.com/danielcaldas/react-d3-graph) - React component to visualize graphs with [d3](https://react-d3-library.github.io/)

## Kudos

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

The element icons are from [fontawesome](https://fontawesome.com/)

- [Fire Element](https://fontawesome.com/icons/fire?style=solid)
- [Water Element](https://fontawesome.com/icons/tint?style=solid)
- [Air Element](https://fontawesome.com/icons/wind?style=solid)
- [Earth Element](https://fontawesome.com/icons/mountain?style=solid)

## Author

- **Michel Fang** - _13518137_ - Teknik Informatika ITB 2018
