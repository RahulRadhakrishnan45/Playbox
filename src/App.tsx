import { Grid, GridItem} from "@chakra-ui/react";

function App() {
  return (
    <Grid templateAreas={{
      base:`"nav" "main" `,
      lg:`"nav nav" "aside main" `}}>
      <GridItem area="nav" bg="#171522" color="white">
        Nav
      </GridItem>
      <GridItem area="aside" bg="#12111B" color="white" display={{base:"none",lg:"block"}}>
        Aside
      </GridItem>
      <GridItem area="main" bg="#201D2E" color="white">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
