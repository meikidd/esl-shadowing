import React from 'react';
import { Link } from 'react-router-dom';
import RestAPI from './RestAPI';

class Shadowing extends React.Component {
  state = {
    subtitles: [],
    current: 0,
    countdownStyle: {}
  };
  interval = -1;
  countdownTimer = null;
  playerRef = React.createRef();

  componentDidMount() {
    // fetch data
    const id = this.props.match.params.id;
    RestAPI.getMergedSubtitle(id).then(subtitles => {
      this.setState({ subtitles });
    });

    // handle timeupdate
    this.playerRef.current.addEventListener('timeupdate', this.onTimeUpdate);
  }
  componentWillUnmount() {
    this.stopCountdown();
    this.playerRef.current.removeEventListener('timeupdate', this.onTimeUpdate);
  }

  onTimeUpdate = () => {
    const player = this.playerRef.current;
    const currentTime = player.currentTime;
    const interval = this.interval;
    const subtitles = this.state.subtitles;
    const subtitle = subtitles[this.state.current];

    if (interval && currentTime >= subtitle.endTime && !this.countdownTimer) {
      // player.currentTime -= 0.3;
      player.pause();

      // start count down
      if (interval > 0) {
        const countdownDuration =
          interval * (subtitle.endTime - subtitle.startTime) * 1000;
        this.countdownTimer = setTimeout(() => {
          this.play();
          this.stopCountdown();
        }, countdownDuration);
        this.startCountdown(countdownDuration);
      }
    }

    // update current
    let current;
    subtitles.forEach((subtitle, i) => {
      if (currentTime > subtitle.startTime && currentTime < subtitle.endTime) {
        current = i;
      }
    });
    if (current) {
      this.setState({ current });
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
    const subtitle = this.state.subtitles[i];
    this.playerRef.current.currentTime = subtitle.startTime;
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
    this.playerRef.current.playbackRate = value;
  };
  onIntervalChange = e => {
    this.interval = parseInt(e.currentTarget.value);
  };
  render() {
    const id = this.props.match.params.id;
    const subtitles = this.state.subtitles;
    const current = this.state.current;

    return (
      <div className="views-shadowing">
        <h2>
          ESL Shadowing <Link to="/shadowing">back</Link>
        </h2>
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
              <option value={2}>2x</option>
              <option value={3}>3x</option>
              <option value={5}>5x</option>
            </select>
          </div>
        </div>
        <div className="player">
          <audio
            controls
            ref={this.playerRef}
            src={`/shadowing/resources/${id}/audio.mp3`}
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
          <div className="btn" onClick={this.onPlayNextClick}>
            Next
          </div>
          <div className="btn" onClick={this.onPlayPrevClick}>
            Prev
          </div>
        </div>
        <div className="subtitles">
          {subtitles.map((sentence, i) => (
            <div
              key={i}
              className={`subtitle ${i === current ? 'current' : ''}`}
              onClick={() => this.onPlaySentenceClick(i)}
            >
              {sentence.content.map((content, j) => (
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
