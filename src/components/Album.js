import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
         return album.slug === this.props.match.params.slug
       });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: .5,
      isPlaying: false,
      onHover: null,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = this.state.volume;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
    },
    durationchange: e => {
      this.setState({ duration: this.audioElement.duration });
    },
    volumeChange: e => {
      this.setState({ volume: this.audioElement.volume });
    }
  };
  this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  this.audioElement.addEventListener('volumeChange', this.eventListeners.volumechange);
}

componentWillUnmount() {
  this.audioElement.src = null;
  this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  this.audioElement.addEventListener('volumeChange', this.eventListeners.volumechange);
}

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  onMouseEnter(song) { console.log("we hovered");
    this.setState({onHover: song});
  }

  onMouseLeave() { console.log("we moved off");
    this.setState({onHover: null});
  }

  userPlayPause(song, index) { console.log("Play Pause");
    const isSameSong = this.state.currentSong === song;
    console.log("same song?", isSameSong);
    console.log("this.state.onHover", this.state.onHover);
    console.log("index", index);
    if (this.state.onHover === song) {
      if (this.state.isPlaying && isSameSong){
        return <span className="icon ion-md-pause"></span>;
      } else {
        return <span className="icon ion-md-play"></span>;
      }
    } else {
      if (this.state.isPlaying && isSameSong){
        return <span className="icon ion-md-pause"></span>;
      } else {
        return <span className="song-number">{index+1}</span>;
      }
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime(seconds) {
    if (isNaN(seconds)) {
      return "-:--"
    }
    const wholeSeconds = Math.floor(seconds);
    const minutes = Math.floor(wholeSeconds / 60);
    const remainingSeconds = wholeSeconds % 60;
    let output = minutes + ':';
    if (remainingSeconds <10) {
      output += 0;
    }
    output += remainingSeconds;
    return output;
  }

  handleVolumeChange(e) { console.log("volume change");
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }


  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
          <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
          <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={ (e) => this.handleTimeChange(e)}
          formatTime = { (e) => this.formatTime(e)}
          volume={this.state.volume}
          handleVolumeChange={ (e) => this.handleVolumeChange(e)}
          />

        </section>

        <div className="song-list">
        <table className="song-player">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map((song, index) => (
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.onMouseEnter(song)} onMouseLeave={() => this.onMouseLeave()} >
                <td>{this.userPlayPause(song, index)}</td>
                <td>{song.title}</td>
                <td>{this.formatTime(song.duration)}</td>
              </tr>
          )
        )
      }
           </tbody>
         </table>
       </div>
  </section>
    );
  }
}

export default Album;
