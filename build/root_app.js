var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var react = require("react");
var sys = load_python_module('sys');
var lib = load_python_module('brocolli.lib');
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        return React.createElement("input", { type: "button", value: "hello" });
    };
    return Button;
}(react.Component));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        _this.state = {
            name: "Brocolli"
        };
        return _this;
    }
    App.prototype.render = function () {
        var today = lib.Date();
        return (React.createElement("div", null,
            React.createElement("h1", null,
                "Hello world ",
                this.state.name),
            React.createElement("p", null, today.year + "-" + today.month + "-" + today.day),
            React.createElement("p", null, "Python Version " + sys.version),
            React.createElement(Button, null)));
    };
    return App;
}(react.Component));
module.exports = App;
