import React, { Component } from 'react'
import './RankInfo.scss'
import fetch from '../../fetch'
import Appscroll from '../../components/app-scroll'
import Loading from '../../components/Loading'
export default class RankInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: null,
            rankmsg: null,
            update_time: null
        }

    }
    componentDidMount() {
        this.fetchSongList()
    }
    fetchSongList() {
        this.props.match.params.mid && fetch.getRankInfo(this.props.match.params.mid).then(async res => {

            let list = res.songlist.slice(0, 100);
            let datas = await Promise.all(
                list.map(async (song) => {
                    let vkeyData = await fetch.getSongVkey(song.data.songmid)
                    let url = `http://dl.stream.qqmusic.qq.com/C400${song.data.songmid}.m4a?vkey=${vkeyData.data.items[0].vkey}&guid=3030549298&uin=772528797&fromtag=66`
                    let albumpic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.data.albummid}.jpg?max_age=2592000`
                    return Object.assign({}, song.data, {
                        url,
                        albumpic
                    })
                })
            )
            let songList = [];
            for (let [index, song] of Object.entries(datas)) {
                songList.push(Object.assign({}, {
                    songid: song.songid,
                    songmid: song.songmid,
                    url: song.url,
                    albumpic: song.albumpic,
                    name: song.songname,
                    currentDuration: 0,
                    singer: this.handleSinger(song.singer)
                }))
            }
            this.setState({
                list: songList,
                rankmsg: res.topinfo,
                update_time: res.update_time
            })
        })
    }
    playsong(song) {

        this.props.playSong(Object.assign({}, song));

        this.props.setMusicList(this.state.list)
        this.props.setPlayStatus(1)
    }
    handleSinger(singers) {
        let formatSingers = []
        for (let singer of Object.values(singers)) {
            formatSingers.push(singer.name)
        }
        return formatSingers.join(' / ')
    }
    randomPlay() {
        let random = Math.floor(Math.random() * this.state.list.length)
        this.playsong(this.state.list[random]);
        this.props.changeMusicMode('random');
    }
    render() {
        if (this.state.list !== null) {

            const imgurl = {
                backgroundImage: `url(${this.state.rankmsg.pic_album})`
            }
            return (
                <div id='RankInfo'>
                    <Appscroll>
                        <section className="bg-img" style={imgurl}>
                            <div className="filter">
                                <h2>{this.state.rankmsg.ListName}</h2>
                                {/* <h2>更新时间:{this.state.update_time}</h2> */}
                                <div className="play-wrapper">
                                    <div className="play_box">
                                        <i className="iconfont icon-play icon_play"></i>
                                        <span className="play_text" onClick={() => { this.randomPlay() }}>随机播放全部</span></div>
                                </div>
                            </div>
                        </section>
                        <section className="song_info">
                            <div className="count_box">
                                <div className="count_box__txt">排行榜<span className="count_box__num">共100首</span></div>
                            </div>
                            <div className="song_list">
                                <ul>
                                    {
                                        this.state.list.map((res, index) => {
                                            return (
                                                <li className="song_item" key={res.songmid} onClick={() => this.playsong(res)}>
                                                    <div className={index < 3 ? "rank rank_top" : 'rank'}>{index + 1}</div>
                                                    <div className="content">
                                                        <h2 className="name">{res.name}</h2>
                                                        <p className="desc">{res.singer}{res.albumname && "·" + res.albumname}</p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        </section>
                        <article className="list_msg">
                            <header>
                                <h2 className="tit__txt">榜单介绍</h2>
                            </header>
                            <section className="intro__bd">
                                <p dangerouslySetInnerHTML={{ __html: this.state.rankmsg.info }}></p>
                            </section>
                        </article>
                    </Appscroll>

                </div >
            )
        } else {
            return <Loading />
        }

    }
}
