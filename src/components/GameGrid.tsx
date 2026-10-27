import useGames from '../hooks/useGames'

const GameGrid = () => {
const { games, error } = useGames()
  return (
    <>
    {error && <p>{error}</p>}
    <ul>
      {games.map(game => (
        <li key={game.id}>{game.game_title}</li>
      ))}
    </ul>
    </>
  )
}

export default GameGrid