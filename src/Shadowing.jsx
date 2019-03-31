import React from 'react';
import { Link } from 'react-router-dom';
import RestAPI from './RestAPI';
import Utils from './utils';

class Shadowing extends React.Component {
  state = {
    subtitles: [],
    current: 0,
    countdownStyle: {},
    showSettings: false,
    language: 'en'
  };
  interval = -1;
  countdownTimer = null;
  playSpeed = 1;
  playerRef = React.createRef();

  componentDidMount() {
    // fetch data
    const id = this.props.match.params.id;
    RestAPI.getMergedSubtitle(id).then(subtitles => {
      this.setState({ subtitles });
    });

    // handle timeupdate
    this.playerRef.current.addEventListener('ended', this.onEnded);
  }
  componentWillUnmount() {
    this.stopCountdown();
    this.playerRef.current.removeEventListener('ended', this.onEnded);
  }

  onEnded = () => {
    if (this.interval === 0) {
      this.onPlaySentenceClick(this.state.current + 1);
    }
  };

  startCountdown(duration) {
    this.setState({
      countdownStyle: {
        width: '0%',
        visibility: 'visible',
        transitionDuration: `${duration / 1000}s`
      }
    });
  }
  stopCountdown() {
    this.setState({ countdownStyle: {} });
    clearTimeout(this.countdownTimer);
    this.countdownTimer = null;
  }
  play = () => {
    this.stopCountdown();
    this.playerRef.current.play();
  };

  onPlaySentenceClick = i => {

    const id = this.props.match.params.id;
    this.playerRef.current.src = `${Utils.resourceUrl()}/${id}/audio-${i}.mp3`;
    this.playerRef.current.playbackRate = this.playSpeed;
    this.setState({ current: i }, () => {
      this.play();
    });
  };
  onPlayNextClick = () => {
    const current = this.state.current + 1;
    if (current >= this.state.subtitles.length) return;

    this.onPlaySentenceClick(current);
  };
  onPlayPrevClick = () => {
    const current = this.state.current - 1;
    if (current < 0) return;

    this.onPlaySentenceClick(current);
  };
  onPauseClick = () => {
    this.stopCountdown();
    this.playerRef.current.pause();
  };
  onPlaySpeedChange = e => {
    const value = e.currentTarget.value;
    this.playSpeed = value;
    this.playerRef.current.playbackRate = value;
  };
  onIntervalChange = e => {
    this.interval = parseInt(e.currentTarget.value);
  };
  onLanguageChange = (e) => {
    this.setState({ language: e.currentTarget.value });
    console.log(e.currentTarget.value)
  }
  onToggleSettings = () => {
    const show = this.state.showSettings;
    this.setState({
      showSettings: !show
    });
  };
  render() {
    const id = this.props.match.params.id;
    const subtitles = this.state.subtitles;
    const current = this.state.current;
    const language = this.state.language;

    return (
      <div className="views-shadowing">
        <h2>
          <Link className="topbar-btn" to="/">
            Back
          </Link>
          <div className="topbar-btn" onClick={this.onToggleSettings}>
            Settings
          </div>
        </h2>
        {this.state.showSettings && (
          <div className="settings">
            <div className="settings-field">
              <span>speed:</span>
              <select defaultValue={1} onChange={this.onPlaySpeedChange}>
                <option value={0.6}>0.6x</option>
                <option value={0.8}>0.8x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>
            <div className="settings-field">
              <span>interval:</span>
              <select defaultValue={-1} onChange={this.onIntervalChange}>
                <option value={-1}>stop</option>
                <option value={0}>dont stop</option>
                {/* <option value={2}>2x</option> */}
                {/* <option value={3}>3x</option> */}
                {/* <option value={5}>5x</option> */}
              </select>
            </div>
            <div className="settings-field">
              <span>language:</span>
              <select defaultValue="en" onChange={this.onLanguageChange}>
                <option value="en">en</option>
                <option value="zh">zh</option>
              </select>
            </div>
          </div>
        )}
        <div className="player">
          <audio
            controls
            ref={this.playerRef}
            src={`${Utils.resourceUrl()}/${id}/audio-0.mp3`}
          />
        </div>
        <div className="countdown-bar" style={this.state.countdownStyle} />

        <div className="btns">
          <div className="btn" onClick={this.play}>
            Play
          </div>
          <div className="btn" onClick={this.onPauseClick}>
            Pause
          </div>
          <div className="btn" onClick={this.onPlayPrevClick}>
            Prev
          </div>
          <div className="btn" onClick={this.onPlayNextClick}>
            Next
          </div>
        </div>
        <div className="subtitles">
          {subtitles.map((sentence, i) => (
            <div
              key={i}
              className={`subtitle ${i === current ? 'current' : ''}`}
              onClick={() => this.onPlaySentenceClick(i)}
            >
              {sentence[language].map((content, j) => (
                <div key={j}>{content}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Shadowing;
