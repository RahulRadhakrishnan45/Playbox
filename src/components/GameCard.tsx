import type { Game } from "../hooks/useGames";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card.Root overflow="hidden" borderRadius="lg" boxShadow="md">
      <Image
        src={game.imageUrl}
        alt={game.game_title}
        objectFit="contain"
        width="100%"
      />
      <CardBody>
        <Heading size="md">{game.game_title}</Heading>
        <PlatformIconList platforms={game.platforms ?? []} />
      </CardBody>
    </Card.Root>
  );
};

export default GameCard;
