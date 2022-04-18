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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var web3_js_1 = require("@solana/web3.js");
var core_1 = require("@material-ui/core");
var Swap_1 = require("./Swap");
var TokenList_1 = require("../context/TokenList");
var core_2 = require("@material-ui/core");
var useStyles = (0, core_1.makeStyles)(function (theme) { return ({
    dialogContent: {
        padding: 0,
    },
    textField: {
        marginBottom: "8px",
        color: "#fff",
    },
    tab: {
        minWidth: "134px",
    },
    tabSelected: {
        color: theme.palette.grey[50],
        fontWeight: 700,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
    },
    tabIndicator: {
        opacity: 0,
    },
    input: {
        color: "white !important"
    },
}); });
function TokenDialog(_a) {
    var open = _a.open, onClose = _a.onClose, setMint = _a.setMint;
    var _b = (0, react_1.useState)(0), tabSelection = _b[0], setTabSelection = _b[1];
    var _c = (0, react_1.useState)(""), tokenFilter = _c[0], setTokenFilter = _c[1];
    var filter = tokenFilter.toLowerCase();
    var styles = useStyles();
    var _d = (0, TokenList_1.useSwappableTokens)(), swappableTokens = _d.swappableTokens, swappableTokensSollet = _d.swappableTokensSollet, swappableTokensWormhole = _d.swappableTokensWormhole;
    var displayTabs = !(0, core_2.useMediaQuery)("(max-width:450px)");
    var selectedTokens = tabSelection === 0
        ? swappableTokens
        : tabSelection === 1
            ? swappableTokensWormhole
            : swappableTokensSollet;
    var tokens = tokenFilter === ""
        ? selectedTokens
        : selectedTokens.filter(function (t) {
            return t.symbol.toLowerCase().startsWith(filter) ||
                t.name.toLowerCase().startsWith(filter) ||
                t.address.toLowerCase().startsWith(filter);
        });
    console.log("Token List");
    console.log(selectedTokens);
    return ((0, jsx_runtime_1.jsxs)(core_1.Dialog, __assign({ open: open, onClose: onClose, scroll: "paper", PaperProps: {
            style: {
                borderRadius: "10px",
                background: "#22242a",
                color: "white !important",
                width: "420px",
            },
        } }, { children: [(0, jsx_runtime_1.jsxs)(core_1.DialogTitle, __assign({ style: { fontWeight: "bold" } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ variant: "h6", style: { paddingBottom: "16px", color: "white" } }, { children: "Select a token" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TextField, { className: styles.textField, InputProps: {
                            classes: {
                                input: styles.input,
                            },
                        }, placeholder: "Search name", value: tokenFilter, fullWidth: true, variant: "outlined", onChange: function (e) { return setTokenFilter(e.target.value); } }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(core_1.DialogContent, __assign({ className: styles.dialogContent, dividers: true }, { children: (0, jsx_runtime_1.jsx)(core_1.List, __assign({ disablePadding: true }, { children: tokens.map(function (tokenInfo) { return ((0, jsx_runtime_1.jsx)(TokenListItem, { tokenInfo: tokenInfo, onClick: function (mint) {
                            setMint(mint);
                            onClose();
                        } }, tokenInfo.address)); }) }), void 0) }), void 0)] }), void 0));
}
exports.default = TokenDialog;
function TokenListItem(_a) {
    var tokenInfo = _a.tokenInfo, onClick = _a.onClick;
    var mint = new web3_js_1.PublicKey(tokenInfo.address);
    return ((0, jsx_runtime_1.jsxs)(core_1.ListItem, __assign({ button: true, onClick: function () { return onClick(mint); }, style: { padding: "10px 20px" } }, { children: [(0, jsx_runtime_1.jsx)(Swap_1.TokenIcon, { mint: mint, style: { width: "30px", borderRadius: "15px", color: "white" } }, void 0), (0, jsx_runtime_1.jsx)(TokenName, { tokenInfo: tokenInfo }, void 0)] }), void 0));
}
function TokenName(_a) {
    var tokenInfo = _a.tokenInfo;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { marginLeft: "16px" } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: { fontWeight: "bold", color: "#fff" } }, { children: tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.symbol }), void 0), (0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: { fontSize: "14px", color: "#999" } }, { children: tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.name }), void 0)] }), void 0));
}
