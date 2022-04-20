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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReferral = exports.useCanSwap = exports.useSwapContext = exports.SwapContextProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var assert = __importStar(require("assert"));
var react_1 = __importStar(require("react"));
var react_async_hook_1 = require("react-async-hook");
var pubkeys_1 = require("../utils/pubkeys");
var TokenList_1 = require("./TokenList");
var Token_1 = require("../context/Token");
var DEFAULT_SLIPPAGE_PERCENT = 0.5;
var _SwapContext = react_1.default.createContext(null);
function SwapContextProvider(props) {
    var _a, _b, _c, _d;
    var _e = (0, react_1.useState)((_a = props.fromMint) !== null && _a !== void 0 ? _a : pubkeys_1.TEZ_MINT), fromMint = _e[0], setFromMint = _e[1];
    var _f = (0, react_1.useState)((_b = props.toMint) !== null && _b !== void 0 ? _b : pubkeys_1.QUP_MINT), toMint = _f[0], setToMint = _f[1];
    var _g = (0, react_1.useState)((_c = props.fromAmount) !== null && _c !== void 0 ? _c : 0), fromAmount = _g[0], _setFromAmount = _g[1];
    var _h = (0, react_1.useState)((_d = props.toAmount) !== null && _d !== void 0 ? _d : 0), toAmount = _h[0], _setToAmount = _h[1];
    var _j = (0, react_1.useState)(false), isClosingNewAccounts = _j[0], setIsClosingNewAccounts = _j[1];
    var _k = (0, react_1.useState)(false), isStrict = _k[0], setIsStrict = _k[1];
    var _l = (0, react_1.useState)(DEFAULT_SLIPPAGE_PERCENT), slippage = _l[0], setSlippage = _l[1];
    var _m = (0, react_1.useState)(null), fairOverride = _m[0], setFairOverride = _m[1];
    var referral = props.referral;
    assert.ok(slippage >= 0);
    var swapToFromMints = function () {
        var oldFrom = fromMint;
        var oldTo = toMint;
        var oldToAmount = toAmount;
        _setFromAmount(oldToAmount);
        setFromMint(oldTo);
        setToMint(oldFrom);
    };
    var setFromAmount = function (amount) {
        _setFromAmount(amount);
    };
    var setToAmount = function (amount) {
        _setToAmount(amount);
    };
    return ((0, jsx_runtime_1.jsx)(_SwapContext.Provider, __assign({ value: {
            fromMint: fromMint,
            setFromMint: setFromMint,
            toMint: toMint,
            setToMint: setToMint,
            fromAmount: fromAmount,
            setFromAmount: setFromAmount,
            toAmount: toAmount,
            setToAmount: setToAmount,
            swapToFromMints: swapToFromMints,
            slippage: slippage,
            setSlippage: setSlippage,
            fairOverride: fairOverride,
            setFairOverride: setFairOverride,
            isClosingNewAccounts: isClosingNewAccounts,
            isStrict: isStrict,
            setIsStrict: setIsStrict,
            setIsClosingNewAccounts: setIsClosingNewAccounts,
            referral: referral,
        } }, { children: props.children }), void 0));
}
exports.SwapContextProvider = SwapContextProvider;
function useSwapContext() {
    var ctx = (0, react_1.useContext)(_SwapContext);
    if (ctx === null) {
        throw new Error("Context not available");
    }
    return ctx;
}
exports.useSwapContext = useSwapContext;
// Returns true if the user can swap with the current context.
function useCanSwap() {
    var _a = useSwapContext(), fromMint = _a.fromMint, toMint = _a.toMint, fromAmount = _a.fromAmount, toAmount = _a.toAmount;
    var _b = (0, TokenList_1.useTokenListContext)(), wormholeMap = _b.wormholeMap, solletMap = _b.solletMap;
    var fromWallet = (0, Token_1.useOwnedTokenAccount)(fromMint);
    return (
    // From wallet exists.
    fromWallet !== undefined &&
        fromWallet !== null &&
        // Mints are distinct.
        fromMint.equals(toMint) === false &&
        // Trade amounts greater than zero.
        fromAmount > 0 &&
        toAmount > 0);
}
exports.useCanSwap = useCanSwap;
function useReferral(fromMarket) {
    var _this = this;
    var referral = useSwapContext().referral;
    var asyncReferral = (0, react_async_hook_1.useAsync)(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!referral) {
                return [2 /*return*/, undefined];
            }
            if (!fromMarket) {
                return [2 /*return*/, undefined];
            }
            return [2 /*return*/, null];
        });
    }); }, [fromMarket]);
    if (!asyncReferral.result) {
        return undefined;
    }
    return asyncReferral.result;
}
exports.useReferral = useReferral;
