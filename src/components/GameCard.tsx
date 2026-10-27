import React from 'react'
import type { Game } from '../hooks/useGames'
import { Card, CardBody, Heading, Image } from "@chakra-ui/react"

interface Props {
  game: Game
}

const GameCard = ({ game }: Props) => {
  return (
    <Card.Root overflow="hidden" borderRadius="lg" boxShadow="md"> 
        <Image src={game.imageUrl} alt={game.game_title} objectFit="cover" width="100%" height="200px" />
        <CardBody>
            <Heading size="md">{game.game_title}</Heading>
        </CardBody>
    </Card.Root>
  )
}

export default GameCard