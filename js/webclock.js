var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var zerofill = function zerofill(num) {
  return num < 10 && num >= 0 ? "0" + num : num;
};

var SvgCircle = function SvgCircle(props) {
  var className = props.className,
      done = props.done,
      max = props.max,
      radius = props.radius,
      stroke = props.stroke,
      strokeWidth = props.strokeWidth;

  var size = (radius + strokeWidth) * 2;
  var length = Math.ceil(2 * radius * Math.PI);
  var remainingLength = length - Math.ceil(2 * radius * Math.PI) * (done / max);
  return React.createElement(
    "svg",
    {
      className: className,
      width: size,
      height: size,
      viewBox: "0 0 " + size + " " + size,
      xmlns: "http://www.w3.org/2000/svg"
    },
    React.createElement(
      "g",
      null,
      React.createElement("circle", {
        className: "circle",
        r: radius,
        cx: radius + strokeWidth,
        cy: radius + strokeWidth,
        stroke: stroke,
        strokeDasharray: length,
        strokeDashoffset: remainingLength,
        strokeLinecap: "round",
        strokeWidth: strokeWidth,
        fill: "none"
      }),
      React.createElement("circle", {
        className: "circle--bg",
        r: radius,
        cx: radius + strokeWidth,
        cy: radius + strokeWidth,
        stroke: "rgba(0, 0, 0, .1)",
        strokeLinecap: "round",
        strokeWidth: strokeWidth,
        fill: "none"
      })
    )
  );
};

SvgCircle.defaultProps = {
  done: 0,
  max: 24,
  radius: 72,
  stroke: '#e91e63',
  strokeWidth: 8
};

var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    return _this;
  }

  _createClass(Clock, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getTimeUntil(this.props.deadline);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.timerId = setInterval(function () {
        return _this2.getTimeUntil(_this2.props.deadline);
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timerId);
    }
  }, {
    key: "getTimeUntil",
    value: function getTimeUntil(deadline) {
      var time = Date.parse(deadline) - Date.parse(new Date());
      var seconds = Math.floor(time / 1000 % 60);
      var minutes = Math.floor(time / 1000 / 60 % 60);
      var hours = Math.floor(time / (1000 * 60 * 60) % 24);
      var days = Math.floor(time / (1000 * 60 * 60 * 24));

      this.setState({ days: days, hours: hours, minutes: minutes, seconds: seconds });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "clock" },
        React.createElement(
          "div",
          { className: "clock__display" },
          React.createElement(SvgCircle, { className: "clock__circle", max: 365, done: this.state.days }),
          React.createElement(
            "div",
            { className: "clock__text clock__text--days" },
            React.createElement(
              "span",
              { className: "clock__amount" },
              zerofill(this.state.days)
            ),
            React.createElement(
              "span",
              { className: "clock__unit" },
              "days"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "clock__display" },
          React.createElement(SvgCircle, { max: 24, done: this.state.hours }),
          React.createElement(
            "div",
            { className: "clock__text clock__text--hours" },
            React.createElement(
              "span",
              { className: "clock__amount" },
              zerofill(this.state.hours)
            ),
            React.createElement(
              "span",
              { className: "clock__unit" },
              "hours"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "clock__display" },
          React.createElement(SvgCircle, { max: 60, done: this.state.minutes }),
          React.createElement(
            "div",
            { className: "clock__text clock__text--minutes" },
            React.createElement(
              "span",
              { className: "clock__amount" },
              zerofill(this.state.minutes)
            ),
            React.createElement(
              "span",
              { className: "clock__unit" },
              "minutes"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "clock__display" },
          React.createElement(SvgCircle, { max: 60, done: this.state.seconds }),
          React.createElement(
            "div",
            { className: "clock__text clock__text--seconds" },
            React.createElement(
              "span",
              { className: "clock__amount" },
              zerofill(this.state.seconds)
            ),
            React.createElement(
              "span",
              { className: "clock__unit" },
              "seconds"
            )
          )
        )
      );
    }
  }]);

  return Clock;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this3.state = {
      deadline: '2020-05-31',
      error: undefined,
      newDeadline: undefined
    };
    _this3.handleChange = _this3.handleChange.bind(_this3);
    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    return _this3;
  }

  _createClass(App, [{
    key: "handleChange",
    value: function handleChange(e) {
      this.setState({ newDeadline: e.target.value.trim() });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      if (isNaN(Date.parse(this.state.newDeadline))) {
        this.setState({
          error: "That doesn't seem to be a valid date"
        });
      } else if (Date.parse(this.state.newDeadline) < new Date()) {
        this.setState({ error: 'This date is in the past' });
      } else {
        this.setState({
          deadline: this.state.newDeadline,
          newDeadline: undefined,
          error: undefined
        });
      }

      this.inputRef.value = '';
    }
  }, {
    key: "formatDate",
    value: function formatDate() {
      return new Date(Date.parse(this.state.deadline)).toDateString();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        "div",
        { className: "app" },
        React.createElement(
          "h1",
          { className: "app__title" },
          "Hey welcome Students..!! Countdown to UPSC Exam on ",
          this.formatDate()
        ),
        React.createElement(Clock, { deadline: this.state.deadline }),
        React.createElement(
          "form",
          { className: "form", onSubmit: this.handleSubmit },
          React.createElement("input", {
            className: "form__field",
            type: "text",
            placeholder: "Set new deadline",
            onChange: this.handleChange,
            ref: function ref(node) {
              _this4.inputRef = node;
            }
          }),
          React.createElement(
            "button",
            { className: "btn", type: "submit" },
            "Set Date"
          )
        ),
        this.state.error && React.createElement(
          "div",
          { className: "message message--error" },
          this.state.error
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));