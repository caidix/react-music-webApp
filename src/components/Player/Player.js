import React, { Component } from 'react'
import MinPlay from '../../container/MinPlay'
import './Player.scss'
import Unknowguy from '../../assets/unknowguy.jpg'
import SongList from '../../container/SongList'
export default class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            song: '',
            showLyrics: false,
            status: this.props.status || 0,
            showPlayer: false,
            currentTime: 0,
            progress: 0,
            totalTime: 0
        }
        this.handleStatus = this.handleStatus.bind(this)
        this.hidePlayerPage = this.hidePlayerPage.bind(this)
        this.playNextMusic = this.playNextMusic.bind(this)
        this.hideSongList = this.hideSongList.bind(this)
        this.changeMusicMode = this.changeMusicMode.bind(this)
    }
    audio = React.createRef()
    audioLine = React.createRef()
    handleStatus() {
        if (this.state.song) {
            if (this.state.status === 1) {
                this.audio.current.pause()
                this.setState({ ...this.state, status: 0 }, () => { this.props.setPlayStatus(0) })
            } else {
                this.audio.current.play()
                this.setState({ ...this.state, status: 1 }, () => this.props.setPlayStatus(1))
            }
        }
    }
    playNextMusic(next) {
        if (this.props.songList.length === 1) {
            this.handleStatus()
        }
        if (this.props.songList.length > 1) {
            let musicindex = 0;
            if (this.props.songMode === 'random') {
                musicindex = Math.floor(Math.random() * this.props.songList.length)
            } else {
                for (let [index, song] of this.props.songList.entries()) {
                    if (song.songid === this.props.song.songid) {
                        musicindex = index
                        break
                    }
                }
                musicindex += next;
                if (musicindex > this.props.songList.length - 1) {
                    musicindex = 0;
                } else if (musicindex < 0) {
                    musicindex = this.props.songList.length - 1;
                }
            }
            this.props.setPlayStatus(1)
            this.props.playSong(this.props.songList[musicindex])
            this.setState({ ...this.state, status: 1 })
        }

    }
    hidePlayerPage() {
        this.setState({
            showPlayer: !this.state.showPlayer
        })
    }
    hideSongList() {
        if (this.props.song.url && this.props.song.songmid) {
            this.setState({
                showLyrics: !this.state.showLyrics
            })
        }
    }
    changeMusicMode(mode) {
        let next = (mode === 'single' ? "random" : (mode === 'random' ? "normal" : 'single'))
        this.props.changeMusicMode(next)
    }
    formatSongTime(time) {
        if (time) {
            let minute = Math.floor(time / 60);
            let second = Math.floor(time % 60);
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = '0' + second;
            }
            return minute + ":" + second;
        } else {
            return '00:00'
        }
    }
    changeCurrentTime(e) {
        let width = this.audioLine.current.clientWidth;
        let left = this.audioLine.current.offsetLeft;
        let clickPostion = e.nativeEvent.pageX
        if (clickPostion < left && clickPostion > (left + width)) {
            return
        } else {
            let newTime = Math.floor(this.state.totalTime * (clickPostion - left) / width)
            newTime = newTime >= this.state.totalTime ? (this.state.totalTime - 0.1) : newTime;
            this.audio.current.currentTime = newTime;
            this.setState({
                progress: newTime / this.state.totalTime
            })
        }


    }
    render() {
        let { song, status } = this.state;
        let Mode = {};
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
            <div id="normal-player">
                <MinPlay handleStatus={this.handleStatus}
                    song={this.state.song} status={this.state.status}
                    hidePlayerPage={this.hidePlayerPage} showLyrics={this.state.showLyrics} />
                <SongList showSongList={this.state.showLyrics}
                    HideSongList={this.hideSongList}
                />
                <audio ref={this.audio}  ></audio>
                {this.state.showPlayer && 
                
                <div className={"player-box "+(this.state.showPlayer?'in':"")}>
                    <div className='background'>
                        <img src={song.albumpic ? song.albumpic : Unknowguy} ></img>
                    </div>
                    <div className="top">
                        <div className="back" onClick={this.hidePlayerPage}>
                            <i className="icon-collapse iconfont"></i>
                        </div> <h1 className="title">{song.name}</h1>
                        <h2 className="subtitle">{song.singer}</h2>
                    </div>
                    <div className='middle'>
                        <div className="show-lyrics-area">
                            <div className={'play-song song-img ' + (status === 1 ? 'running' : 'paused')}>
                                <img src={song.albumpic ? song.albumpic : Unknowguy} alt="" />
                            </div>

                        </div>
                    </div>
                    <div className="bottom">
                        <div className='progress-wrapper'>
                            <span className='time time-l'>{this.formatSongTime(this.state.currentTime)}</span>
                            <div className='progress-bar-wrapper'>
                                <div className='progress-bar'>
                                    <div className='bar-inner' ref={this.audioLine} onClick={(e) => this.changeCurrentTime(e)}>
                                        <div className='progress' style={{ width: this.state.progress }}>
                                            {/* 线 */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <span className='time time-r'>{this.formatSongTime(this.state.totalTime)}</span>
                        </div>
                        <div className='operators'>
                            <div className="icon i-left">
                                <i className={'iconfont icon-' + Mode.icon} onClick={() => this.changeMusicMode(Mode.icon)}></i>
                            </div>
                            <div className="icon i-left">
                                <i className='iconfont icon-xiangzuoyuanjiantouzuojiantouxiangzuoxianxing' onClick={() => this.playNextMusic(-1)}></i>
                            </div>
                            <div className="icon i-center">
                                <i onClick={() => this.handleStatus()} className={"iconfont " + (status ? "icon-stop" : "icon-play")}></i>
                            </div>
                            <div className="icon i-right">
                                <i className='iconfont icon-left1' onClick={() => this.playNextMusic(1)}></i>
                            </div>
                            <div className="icon i-right">
                                <i className='iconfont icon-yinleliebiao-copy' onClick={() => { this.hideSongList() }}></i>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        )
    }
    componentDidUpdate(oldProps) {
        if (this.props.song !== oldProps.song) {

            this.setState({
                ...this.state,
                song: this.props.song || {},
                status: this.props.status || 0
            }, () => {
                let audio = this.audio.current;
                audio.load()
                audio.volume = 0.6;
                audio.src = this.state.song.url;
                audio.play()
            })

        }
    }
    componentDidMount() {
        let audio = this.audio.current;
        audio.load()
        let bar_inner = document.getElementsByClassName('progress-bar')[0];
        audio.addEventListener('timeupdate', () => {
            //设置播放进度条
            let playPer = audio.currentTime / audio.duration;
            let i = playPer * 100 + "%";
            // console.log(audio.currentTime)
            this.setState({
                currentTime: audio.currentTime,
                totalTime: audio.duration,
                progress: i

            })
            if (audio.ended) {
                if (this.props.songMode === 'single') {
                    audio.play()
                } else {
                    this.playNextMusic(1)
                }


            }
        })
    }
}
