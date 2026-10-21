import { Grid, GridItem} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";

function App() {
  return (
    <Grid templateAreas={{
      base:`"nav" "main" `,
      lg:`"nav nav" "aside main" `}}>
      <GridItem area="nav">
        <Navbar />
      </GridItem>
      <GridItem area="aside" bg="#12111B" color="white" display={{base:"none",lg:"block"}}>
        Aside
      </GridItem>
      <GridItem area="main" bg="#201D2E" color="white">
        <GameGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
