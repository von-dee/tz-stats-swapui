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
exports.useRouteVerbose = exports.useRoute = exports.useFairRoute = exports.useBbo = exports.useMarketName = exports.useOrderbook = exports.useMarket = exports.useOpenOrders = exports.useDexContext = exports.DexContextProvider = exports.FEE_MULTIPLIER = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var react_async_hook_1 = require("react-async-hook");
var serum_1 = require("@project-serum/serum");
var TokenList_1 = require("./TokenList");
var Sollet_1 = require("./Sollet");
var BASE_TAKER_FEE_BPS = 0.0022;
exports.FEE_MULTIPLIER = 1 - BASE_TAKER_FEE_BPS;
var _DexContext = react_1.default.createContext(null);
function DexContextProvider(props) {
    var _this = this;
    var _a = (0, react_1.useState)(new Map()), ooAccounts = _a[0], setOoAccounts = _a[1];
    var swapClient = props.swapClient;
    // Removes the given open orders from the context.
    var closeOpenOrders = function (openOrder) { return __awaiter(_this, void 0, void 0, function () {
        var newOoAccounts, openOrders;
        var _a;
        return __generator(this, function (_b) {
            newOoAccounts = new Map(ooAccounts);
            openOrders = (_a = newOoAccounts
                .get(openOrder.market.toString())) === null || _a === void 0 ? void 0 : _a.filter(function (oo) { return !oo.address.equals(openOrder.address); });
            if (openOrders && openOrders.length > 0) {
                newOoAccounts.set(openOrder.market.toString(), openOrders);
            }
            else {
                newOoAccounts.delete(openOrder.market.toString());
            }
            setOoAccounts(newOoAccounts);
            return [2 /*return*/];
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(_DexContext.Provider, __assign({ value: {
            openOrders: ooAccounts,
            closeOpenOrders: closeOpenOrders,
            swapClient: swapClient,
        } }, { children: props.children }), void 0));
}
exports.DexContextProvider = DexContextProvider;
function useDexContext() {
    var ctx = (0, react_1.useContext)(_DexContext);
    if (ctx === null) {
        throw new Error("Context not available");
    }
    return ctx;
}
exports.useDexContext = useDexContext;
function useOpenOrders() {
    var ctx = useDexContext();
    return ctx.openOrders;
}
exports.useOpenOrders = useOpenOrders;
// Lazy load a given market.
function useMarket(market) {
    var _this = this;
    var swapClient = useDexContext().swapClient;
    var asyncMarket = (0, react_async_hook_1.useAsync)(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!market) {
                return [2 /*return*/, undefined];
            }
            if (_MARKET_CACHE.get(market.toString())) {
                return [2 /*return*/, _MARKET_CACHE.get(market.toString())];
            }
            return [2 /*return*/];
        });
    }); }, [swapClient.program.provider.connection, market]);
    if (asyncMarket.result) {
        return asyncMarket.result;
    }
    return undefined;
}
exports.useMarket = useMarket;
// Lazy load the orderbook for a given market.
function useOrderbook(market) {
    var _this = this;
    var swapClient = useDexContext().swapClient;
    var marketClient = useMarket(market);
    var _a = (0, react_1.useState)(0), refresh = _a[0], setRefresh = _a[1];
    var asyncOrderbook = (0, react_async_hook_1.useAsync)(function () { return __awaiter(_this, void 0, void 0, function () {
        var orderbook;
        var _this = this;
        return __generator(this, function (_a) {
            if (!market || !marketClient) {
                return [2 /*return*/, undefined];
            }
            if (_ORDERBOOK_CACHE.get(market.toString())) {
                return [2 /*return*/, _ORDERBOOK_CACHE.get(market.toString())];
            }
            orderbook = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var _a, bids, asks;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                marketClient.loadBids(swapClient.program.provider.connection),
                                marketClient.loadAsks(swapClient.program.provider.connection),
                            ])];
                        case 1:
                            _a = _b.sent(), bids = _a[0], asks = _a[1];
                            resolve({
                                bids: bids,
                                asks: asks,
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            _ORDERBOOK_CACHE.set(market.toString(), orderbook);
            return [2 /*return*/, orderbook];
        });
    }); }, [refresh, swapClient.program.provider.connection, market, marketClient]);
    // Stream in bids updates.
    (0, react_1.useEffect)(function () {
        var listener;
        if (marketClient === null || marketClient === void 0 ? void 0 : marketClient.bidsAddress) {
            listener = swapClient.program.provider.connection.onAccountChange(marketClient === null || marketClient === void 0 ? void 0 : marketClient.bidsAddress, function (info) { return __awaiter(_this, void 0, void 0, function () {
                var bids, orderbook, oldBestBid, newBestBid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            bids = serum_1.Orderbook.decode(marketClient, info.data);
                            return [4 /*yield*/, _ORDERBOOK_CACHE.get(marketClient.address.toString())];
                        case 1:
                            orderbook = _a.sent();
                            oldBestBid = orderbook === null || orderbook === void 0 ? void 0 : orderbook.bids.items(true).next().value;
                            newBestBid = bids.items(true).next().value;
                            if (orderbook &&
                                oldBestBid &&
                                newBestBid &&
                                oldBestBid.price !== newBestBid.price) {
                                orderbook.bids = bids;
                                setRefresh(function (r) { return r + 1; });
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        return function () {
            if (listener) {
                swapClient.program.provider.connection.removeAccountChangeListener(listener);
            }
        };
    }, [
        marketClient,
        marketClient === null || marketClient === void 0 ? void 0 : marketClient.bidsAddress,
        swapClient.program.provider.connection,
    ]);
    // Stream in asks updates.
    (0, react_1.useEffect)(function () {
        var listener;
        if (marketClient === null || marketClient === void 0 ? void 0 : marketClient.asksAddress) {
            listener = swapClient.program.provider.connection.onAccountChange(marketClient === null || marketClient === void 0 ? void 0 : marketClient.asksAddress, function (info) { return __awaiter(_this, void 0, void 0, function () {
                var asks, orderbook, oldBestOffer, newBestOffer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            asks = serum_1.Orderbook.decode(marketClient, info.data);
                            return [4 /*yield*/, _ORDERBOOK_CACHE.get(marketClient.address.toString())];
                        case 1:
                            orderbook = _a.sent();
                            oldBestOffer = orderbook === null || orderbook === void 0 ? void 0 : orderbook.asks.items(false).next().value;
                            newBestOffer = asks.items(false).next().value;
                            if (orderbook &&
                                oldBestOffer &&
                                newBestOffer &&
                                oldBestOffer.price !== newBestOffer.price) {
                                orderbook.asks = asks;
                                setRefresh(function (r) { return r + 1; });
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        return function () {
            if (listener) {
                swapClient.program.provider.connection.removeAccountChangeListener(listener);
            }
        };
    }, [
        marketClient,
        marketClient === null || marketClient === void 0 ? void 0 : marketClient.bidsAddress,
        swapClient.program.provider.connection,
    ]);
    if (asyncOrderbook.result) {
        return asyncOrderbook.result;
    }
    return undefined;
}
exports.useOrderbook = useOrderbook;
function useMarketName(market) {
    var _a, _b;
    var tokenMap = (0, TokenList_1.useTokenMap)();
    var marketClient = useMarket(market);
    if (!marketClient) {
        return null;
    }
    var baseTicker = marketClient
        ? (_a = tokenMap.get(marketClient === null || marketClient === void 0 ? void 0 : marketClient.baseMintAddress.toString())) === null || _a === void 0 ? void 0 : _a.symbol
        : "-";
    var quoteTicker = marketClient
        ? (_b = tokenMap.get(marketClient === null || marketClient === void 0 ? void 0 : marketClient.quoteMintAddress.toString())) === null || _b === void 0 ? void 0 : _b.symbol
        : "-";
    var name = baseTicker + " / " + quoteTicker;
    return name;
}
exports.useMarketName = useMarketName;
// Fair price for a given market, as defined by the mid.
function useBbo(market) {
    var orderbook = useOrderbook(market);
    if (orderbook === undefined) {
        return undefined;
    }
    var bestBid = orderbook.bids.items(true).next().value;
    var bestOffer = orderbook.asks.items(false).next().value;
    if (!bestBid && !bestOffer) {
        return {};
    }
    if (!bestBid) {
        return { bestOffer: bestOffer.price };
    }
    if (!bestOffer) {
        return { bestBid: bestBid.price };
    }
    var mid = (bestBid.price + bestOffer.price) / 2.0;
    return { bestBid: bestBid.price, bestOffer: bestOffer.price, mid: mid };
}
exports.useBbo = useBbo;
// Fair price for a theoretical toMint/fromMint market. I.e., the number
// of `fromMint` tokens to purchase a single `toMint` token. Aggregates
// across a trade route, if needed.
function useFairRoute(fromMint, toMint) {
    var route = useRoute(fromMint, toMint);
    var fromBbo = useBbo(route ? route[0] : undefined);
    var fromMarket = useMarket(route ? route[0] : undefined);
    var toBbo = useBbo(route ? route[1] : undefined);
    if (route === null) {
        return undefined;
    }
    if (route.length === 1 && fromBbo !== undefined) {
        if (fromMarket === undefined) {
            return undefined;
        }
    }
    if (fromBbo === undefined ||
        fromBbo.bestBid === undefined ||
        toBbo === undefined ||
        toBbo.bestOffer === undefined) {
        return undefined;
    }
    return toBbo.bestOffer / fromBbo.bestBid;
}
exports.useFairRoute = useFairRoute;
function useRoute(fromMint, toMint) {
    var route = useRouteVerbose(fromMint, toMint);
    if (route === null) {
        return null;
    }
    return route.markets;
}
exports.useRoute = useRoute;
// Types of routes.
//
// 1. Direct trades on USDC quoted markets.
// 2. Transitive trades across two USDC qutoed markets.
// 3. Wormhole <-> Sollet one-to-one swap markets.
// 4. Wormhole <-> Native one-to-one swap markets.
//
function useRouteVerbose(fromMint, toMint) {
    var _this = this;
    var swapClient = useDexContext().swapClient;
    var _a = (0, TokenList_1.useTokenListContext)(), wormholeMap = _a.wormholeMap, solletMap = _a.solletMap;
    var asyncRoute = (0, react_async_hook_1.useAsync)(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); }, [fromMint, toMint, swapClient]);
    if (asyncRoute.result) {
        return asyncRoute.result;
    }
    return null;
}
exports.useRouteVerbose = useRouteVerbose;
// Maps fromMint || toMint (in sort order) to swap market public key.
// All markets for wormhole<->native tokens should be here, e.g.
// USDC <-> wUSDC.
// const WORMHOLE_NATIVE_MAP = new Map<string, PublicKey>([
//   [wormKey(WORM_USDC_MINT, USDC_MINT), WORM_USDC_MARKET],
//   [wormKey(WORM_USDT_MINT, USDT_MINT), WORM_USDT_MARKET],
// ]);
function wormKey(fromMint, toMint) {
    var _a = fromMint < toMint ? [fromMint, toMint] : [toMint, fromMint], first = _a[0], second = _a[1];
    return first.toString() + second.toString();
}
// Returns the market address of the 1-1 sollet<->wormhole swap market if it
// exists. Otherwise, returns null.
function wormholeSolletMarket(conn, fromMint, toMint, wormholeMap, solletMap) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var fromWormhole, isFromWormhole, toWormhole, isToWormhole, fromSollet, isFromSollet, toSollet, isToSollet, base, _b, quote, wormholeInfo, solletInfo;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fromWormhole = wormholeMap.get(fromMint.toString());
                    isFromWormhole = fromWormhole !== undefined;
                    toWormhole = wormholeMap.get(toMint.toString());
                    isToWormhole = toWormhole !== undefined;
                    fromSollet = solletMap.get(fromMint.toString());
                    isFromSollet = fromSollet !== undefined;
                    toSollet = solletMap.get(toMint.toString());
                    isToSollet = toSollet !== undefined;
                    if (!((isFromWormhole || isToWormhole) && isFromWormhole !== isToWormhole)) return [3 /*break*/, 2];
                    if (!((isFromSollet || isToSollet) && isFromSollet !== isToSollet)) return [3 /*break*/, 2];
                    base = isFromSollet ? fromMint : toMint;
                    _b = isFromWormhole
                        ? [fromMint, fromWormhole]
                        : [toMint, toWormhole], quote = _b[0], wormholeInfo = _b[1];
                    return [4 /*yield*/, (0, Sollet_1.fetchSolletInfo)(base)];
                case 1:
                    solletInfo = _c.sent();
                    if (solletInfo.erc20Contract !== ((_a = wormholeInfo.extensions) === null || _a === void 0 ? void 0 : _a.address)) {
                        return [2 /*return*/, null];
                    }
                    _c.label = 2;
                case 2: return [2 /*return*/, null];
            }
        });
    });
}
var _ORDERBOOK_CACHE = new Map();
var _MARKET_CACHE = new Map();
