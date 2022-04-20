"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var material_ui_popup_state_1 = __importStar(require("material-ui-popup-state"));
var Swap_1 = require("../context/Swap");
var OpenOrdersDialog_1 = __importDefault(require("./OpenOrdersDialog"));
var useStyles = (0, core_1.makeStyles)(function (theme) { return ({
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
        backgroundColor: theme.palette.type === "dark"
            ? theme.palette.grey[50]
            : theme.palette.grey[100],
        padding: "3px 5px",
        borderRadius: "10px",
        boxShadow: "none",
    },
    input: {
        color: "#ccc !important"
    },
}); });
function SettingsButton() {
    var styles = useStyles();
    return ((0, jsx_runtime_1.jsx)(material_ui_popup_state_1.default, __assign({ variant: "popover" }, { children: 
        //@ts-ignore
        function (popupState) { return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(core_1.IconButton, __assign({}, (0, material_ui_popup_state_1.bindTrigger)(popupState), { className: styles.settingsButton }, { children: (0, jsx_runtime_1.jsx)(icons_1.SettingsOutlined, { fontSize: "small" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Popover, __assign({}, (0, material_ui_popup_state_1.bindPopover)(popupState), { anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    }, transformOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    }, PaperProps: {
                        style: {
                            borderRadius: "10px",
                            boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.075)",
                        },
                    } }, { children: (0, jsx_runtime_1.jsx)(SettingsDetails, {}, void 0) }), void 0)] }, void 0)); } }), void 0));
}
exports.SettingsButton = SettingsButton;
function SettingsDetails() {
    var styles = useStyles();
    var _a = (0, Swap_1.useSwapContext)(), slippage = _a.slippage, setSlippage = _a.setSlippage, fairOverride = _a.fairOverride, setFairOverride = _a.setFairOverride;
    var _b = (0, react_1.useState)(false), showSettingsDialog = _b[0], setShowSettingsDialog = _b[1];
    var fair = 0;
    var setSlippageHandler = function (value) {
        setSlippage(!value || value < 0 ? 0 : value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { padding: "15px", width: "305px", background: "#22242a" } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: { fontWeight: "bold", color: "white" } }, { children: "Settings" }), void 0), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ style: { marginTop: "10px" } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: { fontSize: "12px", color: "white" } }, { children: "Slippage tolerance" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TextField, { type: "number", placeholder: "Error tolerance percentage", value: slippage, onChange: function (e) { return setSlippageHandler(parseFloat(e.target.value)); }, style: {
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    color: "#fff"
                                }, InputProps: {
                                    endAdornment: (0, jsx_runtime_1.jsx)(core_1.InputAdornment, __assign({ position: "end" }, { children: "%" }), void 0),
                                    classes: {
                                        input: styles.input,
                                    }
                                } }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { marginTop: "10px" } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: { fontSize: "12px", color: "white" } }, { children: "Fair price" }), void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { display: "flex" } }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextField, { type: "number", placeholder: "Fair price override", value: fair, onChange: function (e) { return setFairOverride(parseFloat(e.target.value)); }, style: {
                                            marginRight: "10px",
                                            flex: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }, InputProps: {
                                            classes: {
                                                input: styles.input,
                                            }
                                        }, disabled: fairOverride === null }, void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ component: "div", variant: "contained", onClick: function () {
                                            if (fair === undefined) {
                                                console.error("Fair is undefined");
                                                return;
                                            }
                                            if (fairOverride === null) {
                                                setFairOverride(fair);
                                            }
                                            else {
                                                setFairOverride(null);
                                            }
                                        }, className: fairOverride === null
                                            ? styles.fairAutoSelected
                                            : styles.fairAuto }, { children: "Auto" }), void 0)] }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ style: { margin: "10px 0px" } }, { children: (0, jsx_runtime_1.jsx)(CloseNewAccountsSwitch, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ variant: "contained", fullWidth: true, style: { color: "#fff" }, onClick: function () { return setShowSettingsDialog(true); } }, { children: "Manage Dex Accounts" }), void 0)] }, void 0), (0, jsx_runtime_1.jsx)(OpenOrdersDialog_1.default, { open: showSettingsDialog, onClose: function () { return setShowSettingsDialog(false); } }, void 0)] }), void 0));
}
function CloseNewAccountsSwitch() {
    var styles = useStyles();
    var _a = (0, Swap_1.useSwapContext)(), isClosingNewAccounts = _a.isClosingNewAccounts, setIsClosingNewAccounts = _a.setIsClosingNewAccounts;
    return ((0, jsx_runtime_1.jsx)(core_1.FormGroup, __assign({ style: { display: "none" }, row: true }, { children: (0, jsx_runtime_1.jsx)(core_1.FormControlLabel, { classes: { label: styles.closeAccountSwitchLabel }, labelPlacement: "start", style: {
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 0,
                width: "100%",
            }, control: (0, jsx_runtime_1.jsx)(core_1.Switch, { checked: isClosingNewAccounts, onChange: function () { return setIsClosingNewAccounts(!isClosingNewAccounts); }, color: "primary" }, void 0), label: "Close new accounts" }, void 0) }), void 0));
}
