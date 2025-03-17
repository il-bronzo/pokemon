import './App.css'
import PokemonList from './components/PokemonList'


function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Bolttedex</h1>
        <p>Start the adventure and become a Pokémon Champion!</p>
      </header>
      <PokemonList />
    </div>
  )
}

export default App
