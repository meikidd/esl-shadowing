import React from 'react';
import * as Clipboard from 'clipboard';
import RestAPI from './RestAPI';

class Subtitle extends React.Component {
  state = {
    subtitles: [],
    stopPoint: null
  };
  playerRef = React.createRef();
  exportBtnRef = React.createRef();

  componentDidMount() {
    // fetch data
    const id = this.props.match.params.id;
    RestAPI.getSubtitle(id).then(subtitles => {
      this.setState({ subtitles });
    });

    // handle timeupdate
    this.playerRef.current.addEventListener('timeupdate', this.onTimeUpdate);

    // export
    const clipboard = new Clipboard(this.exportBtnRef.current);
    clipboard.on('success', () => {
      alert('copied');
    });
  }
  componentWillUnmount() {
    this.playerRef.current.removeEventListener('timeupdate', this.onTimeUpdate);
  }

  onTimeUpdate = () => {
    const player = this.playerRef.current;
    const currentTime = player.currentTime;
    const stopPoint = this.state.stopPoint;
    if (stopPoint && currentTime >= stopPoint) {
      player.currentTime -= 0.3;
      player.pause();
    }

    const subtitles = this.state.subtitles;
    subtitles.forEach(subtitle => {
      if (currentTime > subtitle.startTime && currentTime < subtitle.endTime) {
        subtitle.current = true;
      } else {
        subtitle.current = false;
      }
    });
    this.setState({ subtitles: [...subtitles] });
  };
  onMergeUpClick = i => {
    const subtitles = this.state.subtitles;
    const prev = subtitles[i - 1];
    const current = subtitles[i];
    prev.endTime = current.endTime;
    current.content.forEach(content => {
      prev.content.push(content);
    });
    subtitles.splice(i, 1);
    this.setState({ subtitles: [...subtitles] });
  };
  onPlaySentenceClick = i => {
    const subtitle = this.state.subtitles[i];
    this.playerRef.current.currentTime = subtitle.startTime;
    this.playerRef.current.play();
    this.setState({ stopPoint: subtitle.endTime });
  };
  onPlayClick = () => {
    this.playerRef.current.play();
    this.setState({ stopPoint: null });
  };
  onExportClick = () => {
    console.log(JSON.stringify(this.state.subtitles, null, 4));
  };

  render() {
    const id = this.props.match.params.id;
    const subtitles = this.state.subtitles;

    return (
      <div className="views-subtitle">
        <h2>Subtitle: {id}</h2>
        <div className="player">
          <audio
            controls
            ref={this.playerRef}
            src={`/shadowing/resources/${id}/audio.mp3`}
          />
        </div>
        <div className="subtitles">
          {subtitles.map((sentence, i) => (
            <div
              key={i}
              className={`subtitle ${sentence.current ? 'current' : ''}`}
            >
              <div className="merge-up" onClick={() => this.onMergeUpClick(i)}>
                <span role="img" aria-label="merge up">
                  ⬆️
                </span>
              </div>
              <div className="time">
                {sentence.startTime}s - {sentence.endTime}s (
                {(sentence.endTime - sentence.startTime).toFixed(2)}s)
              </div>
              <div
                className="content"
                onClick={() => this.onPlaySentenceClick(i)}
              >
                {sentence.content.map((content, j) => (
                  <div key={j}>{content}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          <button className="btn" onClick={this.onPlayClick}>
            ▶ Play
          </button>
          <button
            className="btn"
            ref={this.exportBtnRef}
            onClick={this.onExportClick}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default Subtitle;
