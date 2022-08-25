//Behövs inte på functional comp.
//import { Component } from "react";
//för att använda Hooks i func.comp. importera useSate
import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

///Functional Component nedan
//När ett state ändras så körs alltid hela funktionen
const App = () => {
  const [searchField, setSearchField] = useState(''); //[värde, setVärde]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  ///callback körs bara om värdet i arrayen ändras.
  ///Vi vill bara köra denna callback-funktionen en gång, därför skickar vi in en tom array.
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField); //Om namnet på ett monster innehåller den sökta strängen event.target.name, returnera då true
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]); //filtrera bara när monstersarrayen eller searchField ändras

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  ///Samma UI i class som i functional
  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>

      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

/*
*************************************
//Olika typer av funktioner
pureFunc - ger alltid samma värde
const pureFunc = (a, b) => {
  return a + b;
}

sideEffect - fungerar på samma sätt som pureFunctions men att något händer utanför funktionen.
c = 3;
const funcB = (a, b) =Z {
  c = a + b;
  return a * b;
}

Impure function - om funktionen är beroende av något utanför scopet eller invärde till parametrarna
Vi använder Hooks för att göra impure functions.
************************************
*/

/*******************************************
///Classcomponent nedan
///För classcomp. behöver du ha en konstruktor och render samt componentDidMount-metoder
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  ///När man har en classcomponent som måste gå igenpom ett api-anrop använd componentDidMount()
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  ///Funktion/component som körs när fältet fylls i
  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField); //Om namnet på ett monster innehåller den sökta strängen event.target.name, returnera då true
    });

    return (
      <div className="App">
        <h1 className="app-title">
          Monsters Rolodex
        </h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          className="monsters-search-box"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
***************************************************/
export default App;
