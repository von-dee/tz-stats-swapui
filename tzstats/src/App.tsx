
import { useState, useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";

import Swap from "@project-serum/swap-ui";
import "./App.css";

// App illustrating the use of the Swap component.
// One needs to just provide an Anchor `Provider` and a `TokenListContainer`
// to the `Swap` component, and then everything else is taken care of.

function App() {
  return (
      <AppInner />
  );
}



const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    background: "#101535"
  },
}));

function AppInner() {
  const styles = useStyles();
  const [isConnected, setIsConnected] = useState(false);
  const [tokenList, setTokenList] = useState();

  async function getToken(){
    try{
      
      const response = await fetch('https://raw.githubusercontent.com/von-dee/swaptzstats/main/tezos.tokenlist.json');
      const data = await response.json();
      console.log(data);
      setTokenList(data.tokens);

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getToken();  
  }, []);


  
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={styles.root}
    >
      <Button
        variant="outlined"
        style={{ position: "fixed", color: "white", right: 24, top: 24 }}
      >
        {!isConnected ? "Connect" : "Disconnect"}
      </Button>
      {tokenList && <Swap tokenList={tokenList} />}
    </Grid>
  );
}

export default App;
