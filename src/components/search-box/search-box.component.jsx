//import { Component } from "react";
import "./search-box.styles.css";

const SearchBox = ({ className, placeholder, onChangeHandler }) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
);

/*
class SearchBox extends Component {

    render() {
        return(
                <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
        )
    }
}
*/
export default SearchBox;
