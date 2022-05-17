import React,{ useState} from "react";
import {
  makeStyles,
  Card,
  Button,
  Typography,
  TextField,
  useTheme,
  CircularProgress
} from "@material-ui/core";
import { ImportExportRounded } from "@material-ui/icons";
import { useSwapContext } from "../context/Swap";


import { useTokenMap } from "../context/TokenList";
import { useMint, useOwnedTokenAccount } from "../context/Token";
import TokenDialog from "./TokenDialog";
import { SettingsButton } from "./Settings";
import { InfoLabel } from "./Info";
import { swapcall, fromAmountChange, toAmountChange } from "../core/main";

import {
  getBalance,
  getNetwork
} from "../core/quipuswapv1/core";


const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    borderRadius: theme.spacing(2),
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    padding: theme.spacing(2),
  },
  tab: {
    width: "50%",
  },
  settingsButton: {
    padding: 0,
  },
  swapButton: {
    width: "100%",
    textTransform: "capitalize",
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: 16,
    fontWeight: 700,
    padding: theme.spacing(1.5),
  },
  swapToFromButton: {
    display: "block",
    margin: "5px auto 5px auto",
    cursor: "pointer",
  },
  amountInput: {
    fontSize: 22,
    fontWeight: 600,
    color: theme.palette.secondary.main
  },
  input: {
    textAlign: "left",
    color: theme.palette.secondary.main,
    background: theme.palette.primary.main,
    // border: "1px solid #f1f1f1 !important",
    border: "none !important"
  },
  swapTokenFormContainer: {
    borderRadius: theme.spacing(2),
    boxShadow: "0px 0px 15px 2px rgb(84 93 100 / 0.1)",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    padding: "5px 10px 5px 15px",
    border: "1px solid #ffffff1c"
  },
  swapTokenSelectorContainer: {
    marginLeft: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "40%",
  },
  balanceContainer: {
    display: "flex",
    alignItems: "center",
    padding: "2px 0px",
    fontSize: "60%",
    color: "#bebebe"
  },
  maxButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: "12px",
    cursor: "pointer",
  },
  tokenButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: theme.spacing(1),
    border: "1px solid #f1f1f1 !important",
    borderRadius: "20px",
  },
}));

export default function SwapCard({
  containerStyle,
  contentStyle,
  swapTokenContainerStyle
}: {
  containerStyle?: any;
  contentStyle?: any;
  swapTokenContainerStyle?: any;
}) {
  
  const styles = useStyles();

  return (
    <Card className={styles.card} style={containerStyle}>
      <div style={contentStyle}>
        <SwapFromForm style={swapTokenContainerStyle} />
        <ArrowButton />
        <SwapToForm style={swapTokenContainerStyle} />
        <InfoLabel />
        <SwapButton />
      </div>
    </Card>
  );
}

export function SwapHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}
    >
      <SettingsButton />
    </div>
  );
}

export function ArrowButton() {
  const styles = useStyles();
  const theme = useTheme();
  const { swapToFromMints } = useSwapContext();
  return (
    <ImportExportRounded
      className={styles.swapToFromButton}
      fontSize="medium"
      htmlColor={theme.palette.secondary.main}
      onClick={swapToFromMints}
    />
  );
}

function SwapFromForm({ style }: { style?: any }) {
  const { tezosWallet, isLoading, setisLoading, fromMint, toMint,  setFromMint, fromAmount, toAmount, setFromAmount, setToAmount } = useSwapContext();
  return (
    <SwapTokenForm
      tezosWallet={tezosWallet}
      isLoading={isLoading}
      setisLoading={setisLoading}
      from
      style={style}
      mint={fromMint.address}
      fromToken={fromMint}
      toToken={toMint}
      setMint={setFromMint}
      amount={fromAmount}
      fromamount={fromAmount}
      toamount={toAmount}
      setAmountFrom={setFromAmount}
      setAmountTo={setToAmount}
    />
  );
}

function SwapToForm({ style }: { style?: any }) {
  const { tezosWallet, isLoading, setisLoading, toMint, fromMint, setToMint, fromAmount, toAmount, setFromAmount, setToAmount } = useSwapContext();
  return (
    <SwapTokenForm
      tezosWallet={tezosWallet}
      isLoading={isLoading}
      setisLoading={setisLoading}
      from={false}
      style={style}
      mint={toMint.address}
      toToken={toMint}
      fromToken={fromMint}
      setMint={setToMint}
      amount={toAmount}
      fromamount={fromAmount}
      toamount={toAmount}
      setAmountTo={setToAmount}
      setAmountFrom={setFromAmount}
    />
  );
}

export function SwapTokenForm({
  tezosWallet,
  isLoading,
  setisLoading,
  from,
  style,
  mint,
  toToken,
  fromToken,
  setMint,
  amount,
  fromamount,
  toamount,
  setAmountFrom,
  setAmountTo,
}: {
  from: boolean;
  isLoading: boolean;
  setisLoading: (m: any) => void;
  style?: any;
  tezosWallet: any;
  mint: any;
  toToken: any;
  fromToken: any;
  setMint: (m: any) => void;
  amount: number;
  fromamount: number;
  toamount: number;
  setAmountFrom: (a: number) => void;
  setAmountTo: (a: number) => void;
}) {
  const styles = useStyles();

  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const tokenAccount = useOwnedTokenAccount(mint);
  const mintAccount = useMint(mint);


  const [bal, setBal] = React.useState(0);
  
  const network = getNetwork();

  const me  = tezosWallet.walletSdk.wallet._pkh;

  const selectedToken = from? fromToken : toToken;

  selectedToken.id = selectedToken.address;
  selectedToken.tokenType = "FA1.2"
  

  let balance =
    tokenAccount &&
    mintAccount &&
    tokenAccount.account.amount.toNumber() / 10 ** mintAccount.decimals;
  
  if(me !== undefined){   
    const balanc = getBal(me, selectedToken);
  }

  async function getBal(me: any, selectedToken: any) {
    let response = await getBalance(me, selectedToken).then(time => {
      return time;
    })
    .catch(error => {
      console.log(error);
    });
    
    if(response != undefined){
      response = response.toNumber() / 10 ** selectedToken.decimals;
    }else{
      response = 0;
    }

    setBal(response);
    
    return response;
  }

  const formattedAmount =
    mintAccount && amount
      ? amount.toLocaleString("fullwide", {
          maximumFractionDigits: mintAccount.decimals,
          useGrouping: false,
        })
      : amount;

  async function calculateAmount(amt: any) {

    let tokens = null;

    if(from){
      setAmountFrom(amt); 
      tokens = {
        inputToken: fromToken,
        outputToken: toToken,
        inputDexAddress: fromToken.dexaddress,
        outputDexAddress: toToken.dexaddress,
        inputAmount: amt,
        outputAmount: toamount
      };
    }else{
      setAmountTo(amt);
      tokens = {
        inputToken: fromToken,
        outputToken: toToken,
        inputDexAddress: fromToken.dexaddress,
        outputDexAddress: toToken.dexaddress,
        inputAmount: fromamount,
        outputAmount: amt
      };
    }    

    if(from){
      setAmountFrom(amt); 
      setisLoading(true);
      const amts = await fromAmountChange(tokens);
      setAmountTo(amts);
      setisLoading(false);
      
    }else{
      setAmountTo(amt);
      setisLoading(true);
      const amts = await toAmountChange(tokens);
      setAmountFrom(amts); 
      setisLoading(false);
    }

  }

  function closeTokenDialog(){
    setShowTokenDialog(false);

    let amt: any;
    if(from){
      amt = fromamount;
    }else{
      amt = toamount;
    }

    calculateAmount(amt);
  }



  return (
    <div className={styles.swapTokenFormContainer} style={style}>
      
      <TokenDialog
        setMint={setMint}
        open={showTokenDialog}
        onClose={() => closeTokenDialog()}
      />
      <div>
        <Typography className={styles.balanceContainer}>
        {from
            ? `From`
            : `To`
        }
        </Typography>
        <TextField
          type="number"
          value={formattedAmount}
          onChange={(e) => calculateAmount(parseFloat(e.target.value))}
          InputProps={{
            disableUnderline: true,
            classes: {
              root: styles.amountInput,
              input: styles.input,
            },
          }}
        />
      </div>
      <div className={styles.swapTokenSelectorContainer}>
        <Typography className={styles.balanceContainer}>

          {bal
            ? `${bal}`
            : `Bal : 0.00`}

          {from && !!balance ? (
            <span
              className={styles.maxButton}
              onClick={() => calculateAmount(balance)}
            >
              MAX
            </span>
          ) : null}
        </Typography>
        <TokenButton mint={mint} onClick={() => setShowTokenDialog(true)} />
      </div>
    </div>
  );
}

function TokenButton({
  mint,
  onClick,
}: {
  mint: any;
  onClick: () => void;
}) {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <div onClick={onClick} className={styles.tokenButton}>
      <TokenIcon mint={mint} style={{ height: theme.spacing(2), width: theme.spacing(3), paddingLeft: theme.spacing(1) }} />
      <TokenName mint={mint} style={{ fontSize: "80%", fontWeight: 700 }} />
    </div>
  );
}

export function TokenIcon({ mint, style }: { mint: any; style: any }) {
  const tokenMap = useTokenMap();
  let tokenInfo = tokenMap.get(mint.toString());
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "5px 5px"
      }}
    >
      {tokenInfo?.logoURI ? (
        <img alt="Logo" style={style} src={tokenInfo?.logoURI} />
      ) : (
        <div style={style}></div>
      )}
    </div>
  );
}

function TokenName({ mint, style }: { mint: any; style: any }) {
  const tokenMap = useTokenMap();
  const theme = useTheme();
  let tokenInfo = tokenMap.get(mint.toString());

  return (
    <Typography
      style={{
        marginRight: theme.spacing(1),
        ...style,
      }}
    >
      {tokenInfo?.symbol}
    </Typography>
  );
}

export function SwapButton() {
  const styles = useStyles();
  const {
    isLoading,
    toMint, 
    fromMint, 
    fromAmount, 
    toAmount,
    tezosWallet,
    setisLoading
  } = useSwapContext();

  const canSwap = (tezosWallet.walletSdk.wallet._pkh == undefined) ? false :true;
  

  let tokens = {
    inputToken: fromMint,
    outputToken: toMint,
    inputDexAddress: fromMint.dexaddress,
    outputDexAddress: toMint.dexaddress,
    inputAmount: fromAmount,
    outputAmount: toAmount,
    tezosWallet: tezosWallet.walletSdk
  }

  async function swapTokenCall(tokens: any, wallet: any) {
    
    if(canSwap){
      if(!isLoading && (tokens.inputAmount == 0 || tokens.inputAmount == 0)){
        const Msg = () => (
          <div style={{ fontSize: '1.1em', textAlign: 'center' }} >
            <b> Ops, please enter an amount </b>
          </div>
        )
    
        wallet.toast.success(<Msg />, {
          autoClose: false
        });
        
      }else{
        setisLoading(true);
        await swapcall(tokens, wallet);
        setisLoading(false);
      }

    }else{
      tezosWallet.connectWallet();
    }
    
  }

  return (
    <Button
      variant="contained"
      className={styles.swapButton}
      onClick={() => swapTokenCall(tokens, tezosWallet)}
    >
      {isLoading
            ? <CircularProgress color="secondary" />
            : <div>
                {canSwap
                    ? `Swap`
                    : `Connect Wallet`}
              </div>
      }
      
      
    </Button>
  );
}


