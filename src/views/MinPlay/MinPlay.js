import React, { Component } from 'react'
import './MinPlay.scss'
import SongList from '../../container/SongList'
import Unknowguy from '../../assets/unknowguy.jpg'
export default class MinPlay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSongList: false
        }
        this.hideSongList = this.hideSongList.bind(this)
        this.showSongList = this.showSongList.bind(this)
    }
    audio = React.createRef()
    hideSongList() {
        this.setState({
            showSongList: false
        })
    }
    showSongList() {
        if (this.props.song.url && this.props.song.songmid) {
            this.setState({
                showSongList: true
            })
        }
    }
    
    render() {
        let { song, status } = this.props
        return (
          
            <div id="MinPlay" >
                <SongList showSongList={this.state.showSongList}
                    HideSongList={this.hideSongList}
                />
                <div className="music-icon" onClick={this.props.hidePlayerPage}>
                    <div className={"imgWrapper " + (status == 1 ? "running" : "paused")}><img src={song.albumpic ? song.albumpic : Unknowguy}></img></div>
                </div>
                <div className="music-text" onClick={this.props.hidePlayerPage}>
                    <h2 className="music-name">{song.name ? song.name : "暂无歌曲"}</h2>
                    <p className="music-desc">{song.singer ? song.singer : "无"}</p>
                </div>
                <div className='control'>
                    <div className="progress-circle"><i onClick={() => this.props.handleStatus()} className={"iconfont " + (status ? "icon-stop" : "icon-play")}></i></div>
                </div>
                <div className='control'>
                    <div className="progress-circle"><i onClick={() => this.showSongList()} className="iconfont icon-yinleliebiao-copy"></i></div>
                </div>
            </div>
        )
    }


}
