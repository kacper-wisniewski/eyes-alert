import React from 'react';
import { render } from 'react-dom';

class AppDescription extends React.Component {
  render() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p> 
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    status: 'off',
    time: 1200,
    timer: null,
  }

  changeStatus(newStatus) {
    this.setState({status: newStatus});
  }

  formatTime(time) {
    let seconds, minutes;
    if ((time % 60) > 9) {
      seconds = time % 60;
    } else if (time % 60 > 0) {
      seconds = `0${time % 60}`;
    } else {
      seconds = '00';
    }
    if (time / 60 >= 10) {
      minutes = Math.floor(time / 60);
    } else if (time / 60 >= 1) {
      minutes = `0${Math.floor(time / 60)}`;
    } else {
      minutes = '00';
    }

    return `${minutes}:${seconds}`
  }

  startTimer() {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
    });
  }

  step = () => {
    this.setState({time: this.state.time - 1})

    if (!this.state.time) {
      this.playBell();
    }

    if (!this.state.time && this.state.status === 'work') {
      this.setState({
        status: 'rest',
        time: 20,
      });
    } else if (!this.state.time && this.state.status === 'rest') {
      this.setState({
        status: 'work',
        time: 1200,
      });
    }
  }

  stopTimer() {
    clearInterval(this.state.timer);
  }

  closeApp() {
    window.close();
  }

  playBell() {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }
  
  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        { (status !== 'off') &&
          <div className="timer">
          {this.formatTime(time)}
        </div>
        }
        {(status === 'off') && <button className="btn" onClick={() => {this.changeStatus('work'); this.startTimer()}}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={() => {this.changeStatus('off'); this.stopTimer()}}>Stop</button>}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
