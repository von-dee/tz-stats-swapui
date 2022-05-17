import { useState } from "react";
import {
  makeStyles,
  Popover,
  IconButton,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Switch,
  FormControlLabel,
  FormGroup,
  useTheme,
} from "@material-ui/core";

import { SettingsOutlined as Settings } from "@material-ui/icons";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useSwapContext } from "../context/Swap";
import OpenOrdersDialog from "./OpenOrdersDialog";

const useStyles = makeStyles((theme) => ({
  tab: {
    width: "50%",
  },
  table: {},
  settingsButton: {
    padding: 0,
    color: theme.palette.grey[50],
  },
  closeAccountSwitchLabel: {
    color: theme.palette.text.secondary,
  },
  fairAutoSelected: {
    backgroundColor: theme.palette.primary.main,
    padding: "3px 5px",
    borderRadius: "10px",
    color: theme.palette.grey[50],
    fontWeight: 700,
  },
  fairAuto: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[50]
        : theme.palette.grey[100],
    padding: "3px 5px",
    borderRadius: "10px",
    boxShadow: "none",
  },
  input: {
    color: "#ccc !important"
  },
}));

export function SettingsButton() {
  const styles = useStyles();

  return (
    <PopupState variant="popover">
      {
        //@ts-ignore
        (popupState) => (
          <div>
            <IconButton
              {...bindTrigger(popupState)}
              className={styles.settingsButton}
            >
              <Settings fontSize="small" />
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
              PaperProps={{
                style: {
                  borderRadius: "10px",
                  boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.075)",
                },
              }}
            >
              <SettingsDetails />
            </Popover>
          </div>
        )
      }
    </PopupState>
  );
}

function SettingsDetails() {
  const styles = useStyles();
  const theme = useTheme();

  const { slippage, setSlippage, fairOverride, setFairOverride } =
    useSwapContext();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const fair = 0;

  const setSlippageHandler = (value?: number) => {
    setSlippage(!value || value < 0 ? 0 : value);
  };

  return (
    <div style={{ padding: "15px", width: "305px", background: theme.palette.primary.main }}>
      <Typography style={{ fontWeight: "bold", color: "white" }}>Settings</Typography>
      <div>
        <div style={{ marginTop: "10px" }}>
          <Typography style={{ fontSize: "12px", color: "white" }}>
            Slippage tolerance
          </Typography>
          <TextField
            type="number"
            placeholder="Error tolerance percentage"
            value={slippage}
            onChange={(e) => setSlippageHandler(parseFloat(e.target.value))}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              color: "#fff"
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              classes: {
                input: styles.input,
              }
            }}
          />
        </div>
        <div style={{ margin: "10px 0px" }}>
          <CloseNewAccountsSwitch />
        </div>
        <Button
          variant="contained"
          fullWidth
          style={{ color: "#fff", background: theme.palette.primary.main }}
          onClick={() => setShowSettingsDialog(false)}
        >
          Set Slippage
        </Button>
      </div>
      <OpenOrdersDialog
        open={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
      />
    </div>
  );
}

function CloseNewAccountsSwitch() {
  const styles = useStyles();
  const { isClosingNewAccounts, setIsClosingNewAccounts } = useSwapContext();

  return (
    <FormGroup style={{ display: "none" }} row>
      <FormControlLabel
        classes={{ label: styles.closeAccountSwitchLabel }}
        labelPlacement="start"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 0,
          width: "100%",
        }}
        control={
          <Switch
            checked={isClosingNewAccounts}
            onChange={() => setIsClosingNewAccounts(!isClosingNewAccounts)}
            color="primary"
          />
        }
        label="Close new accounts"
      />
    </FormGroup>
  );
}
