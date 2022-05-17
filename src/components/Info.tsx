import {
  makeStyles,
  Typography,
  Link,
  Popover,
  IconButton,
} from "@material-ui/core";
import { Info } from "@material-ui/icons";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useTokenMap } from "../context/TokenList";
import { useSwapContext } from "../context/Swap";
import { SettingsButton } from "./Settings";

const useStyles = makeStyles((theme) => ({
  infoLabel: {
    color: theme.palette.secondary.main,
    marginTop: "20px",
    marginBottom: "20px",
    alignItems: "left"
  },
  labelWithButton: {
    display: "flex",
    justifyContent: "flex-start"
  },
  labelText: {
    fontSize: "12px", 
    width: '150%'
  },
  labelValue: {
    fontSize: "12px", 
    textAlign: 'center', 
    width: '20%'
  },
  infoButton: {
    marginLeft: "5px",
    padding: 0,
    fontSize: "14px",
  },
}));

export function InfoLabel() {
  const styles = useStyles();

  const { fromMint, toMint } = useSwapContext();

  const tokenMap = useTokenMap();

  return (
    <div className={styles.infoLabel}>
      <div className={styles.labelWithButton}>
        <Typography className={styles.labelText}>
          Transaction Settings
        </Typography>
        <Typography className={styles.labelValue}>
          <SettingsButton />
        </Typography>
      </div>
      <div className={styles.labelWithButton}>
        <Typography className={styles.labelText}>
          Slippage Tolerance
        </Typography>
        <Typography className={styles.labelValue}>
          0
        </Typography>
      </div>

      <div className={styles.labelWithButton}>
        <Typography className={styles.labelText}>
          Minimum Received
        </Typography>
        <Typography className={styles.labelValue}>
          0
        </Typography>
      </div>

      <div className={styles.labelWithButton}>
        <Typography className={styles.labelText}>
          Swap Fee
        </Typography>
        <Typography className={styles.labelValue}>
          0
        </Typography>
      </div>
    </div>
  );
}

function InfoButton() {
  const styles = useStyles();
  return (
    <PopupState variant="popover">
      {
        //@ts-ignore
        (popupState) => (
          <div style={{ display: "flex" }}>
            <IconButton
              {...bindTrigger(popupState)}
              className={styles.infoButton}
            >
              <Info fontSize="small" />
            </IconButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{ style: { borderRadius: "10px" } }}
              disableRestoreFocus
            >
              <InfoDetails />
            </Popover>
          </div>
        )
      }
    </PopupState>
  );
}

function InfoDetails() {
  const { fromMint, toMint } = useSwapContext();
  const tokenMap = useTokenMap();
  const fromMintTicker = tokenMap.get(fromMint.toString())?.symbol;
  const toMintTicker = tokenMap.get(toMint.toString())?.symbol;
  const addresses = [
    { ticker: fromMintTicker, mint: fromMint },
    { ticker: toMintTicker, mint: toMint },
  ];

  return (
    <div style={{ padding: "15px", width: "250px" }}>
      <div>
        <Typography
          color="textSecondary"
          style={{ fontWeight: "bold", marginBottom: "5px" }}
        >
          Trade Route
        </Typography>
        <Typography color="textSecondary">NaN</Typography>
      </div>
      <div style={{ marginTop: "15px" }}>
        <Typography
          color="textSecondary"
          style={{ fontWeight: "bold", marginBottom: "5px" }}
        >
          Tokens
        </Typography>
        {addresses.map((address) => {
          return (
            <div
              key={address.mint.toString()}
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link
                href={`https://explorer.solana.com/address/${address.mint.toString()}`}
                target="_blank"
                rel="noopener"
              >
                {address.ticker}
              </Link>
              <code style={{ width: "128px", overflow: "hidden" }}>
                {address.mint.toString()}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
