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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapButton = exports.TokenIcon = exports.SwapTokenForm = exports.ArrowButton = exports.SwapHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var Swap_1 = require("../context/Swap");
var TokenList_1 = require("../context/TokenList");
var Token_1 = require("../context/Token");
var Swap_2 = require("../context/Swap");
var TokenDialog_1 = __importDefault(require("./TokenDialog"));
var Settings_1 = require("./Settings");
var Info_1 = require("./Info");
var useStyles = (0, core_1.makeStyles)(function (theme) { return ({
    card: {
        width: theme.spacing(50),
        borderRadius: theme.spacing(2),
        background: "#22242a",
        border: "1px solid #aaaaaa36",
        color: "white !important",
        boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.075)",
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
        backgroundColor: "#323741",
        color: "white !important",
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
        color: "white !important"
    },
    input: {
        textAlign: "left",
        color: "white !important"
    },
    swapTokenFormContainer: {
        borderRadius: theme.spacing(2),
        boxShadow: "0px 0px 15px 2px rgba(33,150,243,0.1)",
        display: "flex",
        justifyContent: "space-between",
        background: "#323741",
        padding: "5px 10px 5px 15px",
        border: "1px solid #ffffff1c"
    },
    swapTokenSelectorContainer: {
        marginLeft: theme.spacing(1),
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        width: "30%",
    },
    balanceContainer: {
        display: "flex",
        alignItems: "center",
        padding: "2px 0px",
        fontSize: "12px",
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
        border: "1px solid #585858",
        borderRadius: "20px",
        background: "#161616"
    },
}); });
function SwapCard(_a) {
    var containerStyle = _a.containerStyle, contentStyle = _a.contentStyle, swapTokenContainerStyle = _a.swapTokenContainerStyle;
    var styles = useStyles();
    return ((0, jsx_runtime_1.jsx)(core_1.Card, __assign({ className: styles.card, style: containerStyle }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ style: contentStyle }, { children: [(0, jsx_runtime_1.jsx)(SwapFromForm, { style: swapTokenContainerStyle }, void 0), (0, jsx_runtime_1.jsx)(ArrowButton, {}, void 0), (0, jsx_runtime_1.jsx)(SwapToForm, { style: swapTokenContainerStyle }, void 0), (0, jsx_runtime_1.jsx)(Info_1.InfoLabel, {}, void 0), (0, jsx_runtime_1.jsx)(SwapButton, {}, void 0)] }), void 0) }), void 0));
}
exports.default = SwapCard;
function SwapHeader() {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
        } }, { children: (0, jsx_runtime_1.jsx)(Settings_1.SettingsButton, {}, void 0) }), void 0));
}
exports.SwapHeader = SwapHeader;
function ArrowButton() {
    var styles = useStyles();
    var theme = (0, core_1.useTheme)();
    var swapToFromMints = (0, Swap_1.useSwapContext)().swapToFromMints;
    return ((0, jsx_runtime_1.jsx)(icons_1.ImportExportRounded, { className: styles.swapToFromButton, fontSize: "medium", htmlColor: theme.palette.primary.main, onClick: swapToFromMints }, void 0));
}
exports.ArrowButton = ArrowButton;
function SwapFromForm(_a) {
    var style = _a.style;
    var _b = (0, Swap_1.useSwapContext)(), fromMint = _b.fromMint, setFromMint = _b.setFromMint, fromAmount = _b.fromAmount, setFromAmount = _b.setFromAmount;
    return ((0, jsx_runtime_1.jsx)(SwapTokenForm, { from: true, style: style, mint: fromMint, setMint: setFromMint, amount: fromAmount, setAmount: setFromAmount }, void 0));
}
function SwapToForm(_a) {
    var style = _a.style;
    var _b = (0, Swap_1.useSwapContext)(), toMint = _b.toMint, setToMint = _b.setToMint, toAmount = _b.toAmount, setToAmount = _b.setToAmount;
    return ((0, jsx_runtime_1.jsx)(SwapTokenForm, { from: false, style: style, mint: toMint, setMint: setToMint, amount: toAmount, setAmount: setToAmount }, void 0));
}
function SwapTokenForm(_a) {
    var from = _a.from, style = _a.style, mint = _a.mint, setMint = _a.setMint, amount = _a.amount, setAmount = _a.setAmount;
    var styles = useStyles();
    var _b = (0, react_1.useState)(false), showTokenDialog = _b[0], setShowTokenDialog = _b[1];
    var tokenAccount = (0, Token_1.useOwnedTokenAccount)(mint);
    var mintAccount = (0, Token_1.useMint)(mint);
    var balance = tokenAccount &&
        mintAccount &&
        tokenAccount.account.amount.toNumber() / Math.pow(10, mintAccount.decimals);
    var formattedAmount = mintAccount && amount
        ? amount.toLocaleString("fullwide", {
            maximumFractionDigits: mintAccount.decimals,
            useGrouping: false,
        })
        : amount;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.swapTokenFormContainer, style: style }, { children: [(0, jsx_runtime_1.jsx)(TokenDialog_1.default, { setMint: setMint, open: showTokenDialog, onClose: function () { return setShowTokenDialog(false); } }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.balanceContainer }, { children: from
                            ? "From"
                            : "To" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TextField, { type: "number", value: formattedAmount, onChange: function (e) { return setAmount(parseFloat(e.target.value)); }, InputProps: {
                            disableUnderline: true,
                            classes: {
                                root: styles.amountInput,
                                input: styles.input,
                            },
                        } }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.swapTokenSelectorContainer }, { children: [(0, jsx_runtime_1.jsxs)(core_1.Typography, __assign({ className: styles.balanceContainer }, { children: [tokenAccount && mintAccount
                                ? "Balance: " + (balance === null || balance === void 0 ? void 0 : balance.toFixed(mintAccount.decimals))
                                : "Balance : 0.00", from && !!balance ? ((0, jsx_runtime_1.jsx)("span", __assign({ className: styles.maxButton, onClick: function () { return setAmount(balance); } }, { children: "MAX" }), void 0)) : null] }), void 0), (0, jsx_runtime_1.jsx)(TokenButton, { mint: mint, onClick: function () { return setShowTokenDialog(true); } }, void 0)] }), void 0)] }), void 0));
}
exports.SwapTokenForm = SwapTokenForm;
function TokenButton(_a) {
    var mint = _a.mint, onClick = _a.onClick;
    var styles = useStyles();
    var theme = (0, core_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ onClick: onClick, className: styles.tokenButton }, { children: [(0, jsx_runtime_1.jsx)(TokenIcon, { mint: mint, style: { height: theme.spacing(3), paddingLeft: theme.spacing(1) } }, void 0), (0, jsx_runtime_1.jsx)(TokenName, { mint: mint, style: { fontSize: 14, fontWeight: 700 } }, void 0)] }), void 0));
}
function TokenIcon(_a) {
    var mint = _a.mint, style = _a.style;
    var tokenMap = (0, TokenList_1.useTokenMap)();
    var tokenInfo = tokenMap.get(mint.toString());
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "5px 5px"
        } }, { children: (tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.logoURI) ? ((0, jsx_runtime_1.jsx)("img", { alt: "Logo", style: style, src: tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.logoURI }, void 0)) : ((0, jsx_runtime_1.jsx)("div", { style: style }, void 0)) }), void 0));
}
exports.TokenIcon = TokenIcon;
function TokenName(_a) {
    var mint = _a.mint, style = _a.style;
    var tokenMap = (0, TokenList_1.useTokenMap)();
    var theme = (0, core_1.useTheme)();
    var tokenInfo = tokenMap.get(mint.toString());
    return ((0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: __assign({ marginLeft: theme.spacing(2), marginRight: theme.spacing(1) }, style) }, { children: tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.symbol }), void 0));
}
function SwapButton() {
    var styles = useStyles();
    var _a = (0, Swap_1.useSwapContext)(), fromMint = _a.fromMint, toMint = _a.toMint;
    var canSwap = (0, Swap_2.useCanSwap)();
    return ((0, jsx_runtime_1.jsx)(core_1.Button, __assign({ variant: "contained", className: styles.swapButton }, { children: canSwap
            ? "Swap"
            : "Connect Wallet" }), void 0));
}
exports.SwapButton = SwapButton;
