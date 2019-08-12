import React, { Component } from 'react'
import './SongList.scss'

export default class SongList extends Component {
  constructor(props) {
    super(props)
    this.hideSongList = this.hideSongList.bind(this)
    this.playSong = this.playSong.bind(this)
    this.changeMusicMode = this.changeMusicMode.bind(this)
  }
  hideSongList() {
    this.props.HideSongList()
  }
  playSong(index) {
    this.props.playSong(this.props.songList[index])
    this.props.setPlayStatus(1)
  }
  changeMusicMode(mode) {
    let next = (mode === 'single' ? "random" : (mode === 'random' ? "normal" : 'single'))
    this.props.changeMusicMode(next)
  }
  render() {
    let Mode = {};

    let songList = this.props.songList || []
    switch (this.props.songMode) {
      case 'normal': Mode = {
        icon: 'normal', text: "顺序播放"
      }
        break;
      case "single": Mode = {
        icon: 'single', text: "单曲循环"
      }
        break;
      case 'random': Mode = {
        icon: 'random', text: '随机播放'
      }
    }
    return (
      <div>
        <div className={'mask ' + (this.props.showSongList ? 'show' : '')}
          onClick={this.hideSongList} ></div>
        <div className={'songlist-component ' + (this.props.showSongList ? 'show' : '')}>
          <div className="songlist-header" onClick={() => this.changeMusicMode(Mode.icon)}>
            <i className={'iconfont icon-' + Mode.icon} />
            <span className="songlist-mode">{Mode.text}</span>
            <span className="songlist-length">({songList.length}首)</span>

          </div>
          <ul className="songlist-list">
            {songList.map((val, index) => (
              <li className={'songlist-item ' + (this.props.song.songid === val.songid ? 'play' : '')}
                key={index} onClick={() => this.playSong(index)} >
                <span className="songlist-item-song">{val.name}</span>
                <span className="songlist-item-singer">&nbsp;-&nbsp;{val.singer}</span>
                <i className="iconfont icon-delete" />
              </li>
            ))}
          </ul>
          <div className="songlist-footer" onClick={this.hideSongList}>关闭</div>
        </div>
      </div>
    )
  }
}
