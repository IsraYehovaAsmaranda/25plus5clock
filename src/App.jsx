import { Component } from "react";
import { ArrowDownward, ArrowUpward, Pause, PlayArrow, RestartAlt } from "@mui/icons-material";


class App extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      isOnBreak: false,
      breakLength: 5,
      sessionLength: 25,
      breakTimer: 5 * 60,
      timer: 25 * 60,
      isRunning: false,
    }
    this.state = {
      isOnBreak: false,
      breakLength: 5,
      sessionLength: 25,
      breakTimer: 5 * 60,
      timer: 25 * 60,
      isRunning: false,
    }
    this.incrementSessionLength = this.incrementSessionLength.bind(this);
    this.decrementSessionLength = this.decrementSessionLength.bind(this);
    this.incrementBreakLength = this.incrementBreakLength.bind(this);
    this.decrementBreakLength = this.decrementBreakLength.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  incrementSessionLength() {
    if (this.state.isRunning || this.state.sessionLength === 60) {
      return;
    }
    this.setState({ sessionLength: this.state.sessionLength + 1, timer: (this.state.sessionLength + 1) * 60 });
  }
  decrementSessionLength() {
    if (this.state.isRunning || this.state.sessionLength === 1) {
      return;
    }
    this.setState({ sessionLength: this.state.sessionLength - 1, timer: (this.state.sessionLength - 1) * 60 });
  }
  incrementBreakLength() {
    if (this.state.isRunning || this.state.breakLength === 60) {
      return;
    }
    this.setState({ breakLength: this.state.breakLength + 1, breakTimer: (this.state.breakLength + 1) * 60 });
  }
  decrementBreakLength() {
    if (this.state.isRunning || this.state.breakLength === 1) {
      return;
    }
    this.setState({ breakLength: this.state.breakLength - 1, breakTimer: (this.state.breakLength - 1) * 60 });
  }
  toggleTimer() {
    if (this.state.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
      this.setState({ isRunning: true });
    }
  }
  stopTimer() {
    this.setState({ isRunning: false });
    clearInterval(this.timerId);
    if (this.state.isOnBreak) {
      clearInterval(this.breakTimerId);
    }
  }
  startTimer() {
    if (this.state.isOnBreak) {
      this.breakTimerId = setInterval(() => {
        if (this.state.breakTimer === 0) {
          this.setState({ isRunning: false });
          clearInterval(this.breakTimerId);
        } else {
          this.setState({ breakTimer: this.state.breakTimer - 1 });
        }
      }, 1000);
    } else {
      this.timerId = setInterval(() => {
        if (this.state.timer === 0) {
          this.setState({ isRunning: true, isOnBreak: true });
          this.breakTimerId = setInterval(() => {
            if (this.state.breakTimer === 0) {
              this.setState(this.defaultState)
              clearInterval(this.breakTimerId);
            } else {
              this.setState({ breakTimer: this.state.breakTimer - 1 });
            }
          }, 1000);
          clearInterval(this.timerId);
        } else {
          this.setState({ timer: this.state.timer - 1 });
        }
      }, 1000);
    }
  }
  resetTimer() {
    this.stopTimer();
    this.setState(this.defaultState);
  }
  render() {
    return (
      <div className="flex flex-col items-center space-y-2 justify-center h-screen bg-gray-500 text-white">
        <h1 className="text-6xl font-bold mb-5">25 + 5 Clock</h1>

        <div className="flex flex-row flex-wrap justify-center">

          <div className="flex flex-col flex-nowrap p-4">
            <div className="text-3xl font-bold">
              <p id="break-label">Break Length</p>
            </div>
            <div className="text-3xl flex flex-row flex-nowrap space-x-2 justify-center">
              <button className="outline-none" id="break-decrement" onClick={this.decrementBreakLength}><ArrowDownward /></button>
              <p id="break-length">{this.state.breakLength}</p>
              <button className="outline-none" id="break-increment" onClick={this.incrementBreakLength}><ArrowUpward /></button>
            </div>
          </div>

          <div className="flex flex-col flex-nowrap p-4">
            <div className="text-3xl font-bold">
              <p id="session-label">Session Length</p>
            </div>
            <div className="text-3xl flex flex-row flex-nowrap space-x-5 justify-center">
              <button className="outline-none" id="session-decrement" onClick={this.decrementSessionLength}><ArrowDownward /></button>
              <p id="session-length">{this.state.sessionLength}</p>
              <button className="outline-none" id="session-increment" onClick={this.incrementSessionLength}><ArrowUpward /></button>
            </div>
          </div>

        </div>
        <div className="rounded-xl border-4 py-8 px-12 text-center">
          <div className="text-2xl">
            <p id="timer-label">{this.state.isOnBreak ? `Break` : `Session`}</p>
          </div>
          <div className="text-6xl">
            <p id="time-left">{this.state.isOnBreak ? `${Math.floor(this.state.breakTimer / 60)}:${`0${this.state.breakTimer % 60}`.slice(-2)}` : `${Math.floor(this.state.timer / 60)}:${`0${this.state.timer % 60}`.slice(-2)}`}</p>
          </div>
        </div>

        <div className="flex flex-row flex-nowrap space-x-4 text-3xl">
          <button className="outline-none" id="start_stop" onClick={this.toggleTimer}>{this.state.isRunning ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}</button>
          <button className="outline-none" id="reset" onClick={this.resetTimer}><RestartAlt fontSize="large" /></button>
        </div>

        <div className="text-center text-lg">
          <p className="text-red-600">Designed and coded by</p>
          <p className="text-blue-900">Isra Yehova Asmaranda</p>
        </div>

      </div>
    );
  }
}

export default App;
