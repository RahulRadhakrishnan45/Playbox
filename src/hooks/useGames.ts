import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  game_title: string;
  release_date?: string;
  platform: number;
  region_id: number;
  country_id: number;
}

interface FetchGamesResponse {
  code: number;
  status: string;
  data: {
    count: number;
    games: Game[];
  };
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      const results = await Promise.allSettled([
        apiClient.get<FetchGamesResponse>("/Games/ByPlatformID", {
          params: { id: 1 },
          signal: controller.signal,
        }),
        apiClient.get<FetchGamesResponse>("/Games/ByPlatformID", {
          params: { id: 4919 },
          signal: controller.signal,
        }),
      ]);

      if(controller.signal.aborted) return;

      const successfulGames: Game[] = [];
      const errors: string[] = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          successfulGames.push(...result.value.data.data.games);
        } else {
          errors.push(result.reason?.message || "An API request failed");
        }
      });

      setGames(successfulGames);

      if (errors.length > 0) {
        setError(errors.join(", "));
      }
    };

    fetchGames();

    return () => {
      controller.abort();
    }
    
  }, []);

  return { games, error };
};

export default useGames;
