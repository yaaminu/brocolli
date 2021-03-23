import React from 'react'
import ShoppingList from './components/board'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ShoppingList name="Aminu"/>
      </div>
    );

  }
}

export default App;
