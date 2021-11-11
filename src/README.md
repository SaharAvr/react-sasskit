
# React-SassKit

`react-sasskit` is a useful and helpful tool for creating and styling web application with ReactJs and Sass.

## Installation

`npm i react-sasskit`

or

`yarn add react-sasskit`

## Usage

`import sassKit from 'react-sasskit';`

You can use following functions:

***extend(`Component, scss`)***

***makeStyles(`{ [className]: scss, ... }`)***

***freeStyle(`scss`)***

#
### > sassKit.extend

This function extends Component with scss styles

```javascript
const GreenButton = sassKit.extend(Button)`
  background-color: green;
  color: white;

  &:focus, &:hover {
    background-color: lightgreen;
    color: ${props => props.hoverColor};
  } 
`;
```

#
### > sassKit.makeStyles

This function creates an object of scss styles

```javascript
const useStyles = props => sassKit.makeStyles({
  greenButton: `
    background-color: green;
    font-size: ${props.fontSize}px;
  `,
});
```
#
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)