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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoLabel = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var material_ui_popup_state_1 = __importStar(require("material-ui-popup-state"));
var TokenList_1 = require("../context/TokenList");
var Swap_1 = require("../context/Swap");
var Token_1 = require("../context/Token");
var Dex_1 = require("../context/Dex");
var Settings_1 = require("./Settings");
var useStyles = (0, core_1.makeStyles)(function () { return ({
    infoLabel: {
        color: "white !important",
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
}); });
function InfoLabel() {
    var styles = useStyles();
    var _a = (0, Swap_1.useSwapContext)(), fromMint = _a.fromMint, toMint = _a.toMint;
    var fromMintInfo = (0, Token_1.useMint)(fromMint);
    var fair = (0, Swap_1.useSwapFair)();
    var tokenMap = (0, TokenList_1.useTokenMap)();
    var fromTokenInfo = tokenMap.get(fromMint.toString());
    var toTokenInfo = tokenMap.get(toMint.toString());
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.infoLabel }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.labelWithButton }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.labelText }, { children: "Transaction Settings" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.labelValue }, { children: (0, jsx_runtime_1.jsx)(Settings_1.SettingsButton, {}, void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.labelWithButton }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.labelText }, { children: "Slippage Tolerance" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.labelValue }, { children: "0" }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.labelWithButton }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.labelText }, { children: "Minimum Received" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.labelValue }, { children: "0" }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.labelWithButton }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.labelText }, { children: "Swap Fee" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ className: styles.labelValue }, { children: "0" }), void 0)] }), void 0)] }), void 0));
}
exports.InfoLabel = InfoLabel;
function InfoButton() {
    var styles = useStyles();
    return ((0, jsx_runtime_1.jsx)(material_ui_popup_state_1.default, __assign({ variant: "popover" }, { children: 
        //@ts-ignore
        function (popupState) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { display: "flex" } }, { children: [(0, jsx_runtime_1.jsx)(core_1.IconButton, __assign({}, (0, material_ui_popup_state_1.bindTrigger)(popupState), { className: styles.infoButton }, { children: (0, jsx_runtime_1.jsx)(icons_1.Info, { fontSize: "small" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Popover, __assign({}, (0, material_ui_popup_state_1.bindPopover)(popupState), { anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                    }, transformOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    }, PaperProps: { style: { borderRadius: "10px" } }, disableRestoreFocus: true }, { children: (0, jsx_runtime_1.jsx)(InfoDetails, {}, void 0) }), void 0)] }), void 0)); } }), void 0));
}
function InfoDetails() {
    var _a, _b;
    var _c = (0, Swap_1.useSwapContext)(), fromMint = _c.fromMint, toMint = _c.toMint;
    var route = (0, Dex_1.useRoute)(fromMint, toMint);
    var tokenMap = (0, TokenList_1.useTokenMap)();
    var fromMintTicker = (_a = tokenMap.get(fromMint.toString())) === null || _a === void 0 ? void 0 : _a.symbol;
    var toMintTicker = (_b = tokenMap.get(toMint.toString())) === null || _b === void 0 ? void 0 : _b.symbol;
    var addresses = [
        { ticker: fromMintTicker, mint: fromMint },
        { ticker: toMintTicker, mint: toMint },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { padding: "15px", width: "250px" } }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ color: "textSecondary", style: { fontWeight: "bold", marginBottom: "5px" } }, { children: "Trade Route" }), void 0), route ? (route.map(function (market) {
                        return (0, jsx_runtime_1.jsx)(MarketRoute, { market: market }, market.toString());
                    })) : ((0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ color: "textSecondary" }, { children: "Route not found" }), void 0))] }, void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { marginTop: "15px" } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ color: "textSecondary", style: { fontWeight: "bold", marginBottom: "5px" } }, { children: "Tokens" }), void 0), addresses.map(function (address) {
                        return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                                marginTop: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                            } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Link, __assign({ href: "https://explorer.solana.com/address/" + address.mint.toString(), target: "_blank", rel: "noopener" }, { children: address.ticker }), void 0), (0, jsx_runtime_1.jsx)("code", __assign({ style: { width: "128px", overflow: "hidden" } }, { children: address.mint.toString() }), void 0)] }), address.mint.toString()));
                    })] }), void 0)] }), void 0));
}
function MarketRoute(_a) {
    var market = _a.market;
    var marketName = (0, Dex_1.useMarketName)(market);
    var bbo = (0, Dex_1.useBbo)(market);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
        } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Link, __assign({ href: "https://dex.projectserum.com/#/market/" + market.toString(), target: "_blank", rel: "noopener" }, { children: marketName }), void 0), (0, jsx_runtime_1.jsx)("code", __assign({ style: { marginLeft: "10px" } }, { children: bbo && bbo.mid ? bbo.mid.toFixed(6) : "-" }), void 0)] }), void 0));
}
