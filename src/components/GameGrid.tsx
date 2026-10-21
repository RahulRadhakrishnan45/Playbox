import { useState, useEffect } from 'react'
import apiClient from '../services/api-client'

interface Game {
    id: number;
    game_title: string;
    release_date?: string;
    platform:number;
    region_id:number;
    country_id:number;
}

interface FetchGamesResponse {
    code: number;
    status: string;
    data: {
        count: number;
        games: Game[];
    };
}

const GameGrid = () => {
    const [games, setGames] = useState<Game[]>([])
    const [error, setError] = useState('')
    useEffect(() => {
        apiClient.get<FetchGamesResponse>('/Games/ByGameID', {
            params: {
                id: 139430,
            },
        })
        .then(response => setGames(response.data.data.games))
        .catch(error => setError(error.message))
        },[])
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