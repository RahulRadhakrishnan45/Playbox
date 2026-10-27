import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Game {
  id: number;
  game_title: string;
  release_date?: string;
  platform: number;
  region_id: number;
  country_id: number;
  imageUrl?: string;
}
interface FetchGamesResponse {
  code: number;
  status: string;
  data: {
    count: number;
    games: Game[];
  };
}

interface GameImage {
  id: number;
  type: string;
  side: string | null;
  filename: string;
  resolution: string;
}

interface FetchGameImagesResponse {
  code: number;
  status: string;
  data: {
    count: number;
    base_url: {
      original: string;
      small: string;
      thumb: string;
      cropped_center_thumb: string;
      medium: string;
      large: string;
    };
    images: Record<string, GameImage[]>;
  };
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      try {
        const results = await Promise.allSettled([
          apiClient.get<FetchGamesResponse>("/Games/ByPlatformID", {
            params: { id: 1 },
            signal: controller.signal,
          }),
          // apiClient.get<FetchGamesResponse>("/Games/ByPlatformID", {
          //   params: { id: 4919 },
          //   signal: controller.signal,
          // }),
        ]);

        if (controller.signal.aborted) return;

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

        const imageResults = await Promise.allSettled(
          successfulGames.map(async (game) => {
            const respone = await apiClient.get<FetchGameImagesResponse>(
              `/Games/Images`,
              {
                params: { games_id: game.id },
                signal: controller.signal,
              },
            );

            const imageData = respone.data.data;
            const gameImages = imageData.images[String(game.id)] || [];

            const originalImage = gameImages.find(
              (image) => image.type === "boxart" && image.side === "front",
            );
            const fallbackImage = gameImages.find(
              (image) => image.type === "screenshot" || image.type === "fanart",
            );

            const selectedImage = originalImage || fallbackImage;

            return {
              gameId: game.id,
              imageUrl: selectedImage
                ? imageData.base_url.medium + selectedImage.filename
                : undefined,
            };
          }),
        );

        if (controller.signal.aborted) return;

        const imageMap = new Map<number, string>();

        imageResults.forEach((result) => {
          if (result.status === "fulfilled" && result.value.imageUrl) {
            imageMap.set(result.value.gameId, result.value.imageUrl);
          }
        });

        setGames((currentGames) =>
          currentGames.map((game) => ({
            ...game,
            imageUrl: imageMap.get(game.id) || game.imageUrl,
          })),
        );
      } catch (error) {
        if (controller.signal.aborted) return;
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        );
      }
    };

    fetchGames();

    return () => {
      controller.abort();
    };
  }, []);

  return { games, error };
};

export default useGames;
