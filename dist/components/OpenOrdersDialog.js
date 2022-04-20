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
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var useStyles = (0, core_1.makeStyles)(function (theme) { return ({
    table: {},
    closeAccount: {
        color: theme.palette.error.main,
    },
}); });
function OpenOrdersDialog(_a) {
    var open = _a.open, onClose = _a.onClose;
    return ((0, jsx_runtime_1.jsxs)(core_1.Dialog, __assign({ maxWidth: "lg", open: open, onClose: onClose, PaperProps: {
            style: {
                borderRadius: "10px",
            },
        } }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ style: {
                    display: "flex",
                    justifyContent: "flex-end",
                } }, { children: (0, jsx_runtime_1.jsx)(core_1.IconButton, __assign({ onClick: onClose, style: {
                        padding: 10,
                    } }, { children: (0, jsx_runtime_1.jsx)(icons_1.Close, {}, void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.DialogContent, __assign({ style: { paddingTop: 0 } }, { children: (0, jsx_runtime_1.jsx)(OpenOrdersAccounts, {}, void 0) }), void 0)] }), void 0));
}
exports.default = OpenOrdersDialog;
function OpenOrdersAccounts() {
    var styles = useStyles();
    return ((0, jsx_runtime_1.jsx)(core_1.TableContainer, __assign({ component: core_1.Paper, elevation: 0 }, { children: (0, jsx_runtime_1.jsxs)(core_1.Table, __assign({ className: styles.table, "aria-label": "simple table" }, { children: [(0, jsx_runtime_1.jsx)(core_1.TableHead, { children: (0, jsx_runtime_1.jsxs)(core_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(core_1.TableCell, { children: "Market" }, void 0), (0, jsx_runtime_1.jsx)(core_1.TableCell, __assign({ align: "center" }, { children: "Open Orders Account" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TableCell, __assign({ align: "center" }, { children: "Base Used" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TableCell, __assign({ align: "center" }, { children: "Base Free" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TableCell, __assign({ align: "center" }, { children: "Quote Used" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TableCell, __assign({ align: "center" }, { children: "Quote Free" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TableCell, __assign({ align: "center" }, { children: "Settle" }), void 0), (0, jsx_runtime_1.jsx)(core_1.TableCell, __assign({ align: "center" }, { children: "Close" }), void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(core_1.TableBody, {}, void 0)] }), void 0) }), void 0));
}
