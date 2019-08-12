import React, { Component } from 'react'
import './PlayListInfo.scss'
import AppScroll from '../../components/app-scroll'
import fetch from '../../fetch'
import Loading from '../../components/Loading'
export default class PlayListInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            albumInfo: null,
            list: []
        }
    }
    componentDidMount() {
        this.fetchListInfo()
    }
    handleSinger(singers) {
        let formatSingers = []
        for (let singer of Object.values(singers)) {
            formatSingers.push(singer.name)
        }
        return formatSingers.join(' / ')
    }
    fetchListInfo() {
        fetch.getPlayListInfo2(this.props.match.params.id).then(async res => {
            let array = res.data.cdlist[0];
            let datas = await Promise.all(array.songlist.map(async (song) => {
                let vkeyData = await fetch.getSongVkey(song.songmid)
                let url = `http://dl.stream.qqmusic.qq.com/C400${song.songmid}.m4a?vkey=${vkeyData.data.items[0].vkey}&guid=3030549298&uin=772528797&fromtag=66`
                let albumpic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000`
                return Object.assign({}, {
                    songid: song.songid,
                    songmid: song.songmid,
                    url: url,
                    albumpic: albumpic,
                    name: song.songname,
                    currentDuration: 0,
                    singer: this.handleSinger(song.singer)
                })
            }))
            this.setState({
                list: datas,
                albumInfo: array
            })
        })

    }
    setplaySong(song) {
        this.props.setPlayStatus(1)
        this.props.playSong(song);
        this.props.setMusicList(this.state.list)
    }
    playAll(song) {
        this.setplaySong(song);
        this.props.changeMusicMode('normal')
    }
    render() {
        if (this.state.albumInfo !== null) {
            var arr = this.state.albumInfo
     
            return (
                <div id='Albuminfo'>
                    <AppScroll>
                        <section className="Album-Msg">
                            <div className="player_cover">
                                <img src={arr.logo} alt="歌单图片" />
                            </div>
                            <div className="player_info">
                                <h2>{arr.dissname}</h2>
                                <p><img className="author-avatar" src={arr.headurl} alt="单主头像" />{arr.nickname}</p>

                            </div>
                            <div  className="player__btn" onClick={() => this.playAll(this.state.list[0])}><span className='iconfont icon-bofang'></span></div>
                        </section>
                        <section>
                            <div className="count_box">
                                <div className="count_box__txt">歌单<span className="count_box__num">共{this.state.list.length}首</span></div>
                            </div>
                            <ul className="mod_song_list">
                                {
                                    this.state.list.map((res, index) => (
                                        <li className="album-song-item" key={res.songmid} onClick={() => this.setplaySong(res)}>
                                            <div className="album-song-order">{index + 1}</div>
                                            <div className="album-song-info">
                                                <h3 className="album-song-name txt-nowrap">{res.name}</h3>
                                                <p className="album-song-singer txt-nowrap">{res.singer}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>

                        </section>

                        {
                            arr.desc.length > 0 ? <article className="album-desc">
                                <header className="mod_tit">
                                    <h2 className="tit__txt">歌 单 简 介</h2>
                                </header>
                                <div>
                                    <p><strong>简述:</strong>{arr.desc}</p>
                                </div>

                            </article> : ''
                        }
                    </AppScroll>

                </div >
            )
        } else {
            return <Loading></Loading>
        }

    }
}
