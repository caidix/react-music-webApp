import React, { PureComponent } from 'react'
import Loading from '../../components/Loading'
import { Button, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router-dom'
import './SingerInfo.scss'
import fetch from '../../fetch'
import unknowguy from '../../assets/singer_default.png'
export default class SingerInfo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            singermsg: {},
            pageNum: 0,
            list: [],
            albumlist: [],
            total: 0,
            isLoading: false
        }
        this.loadMore = this.loadMore.bind(this)
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => this.fetchSinger())

    }
    fetchSinger() {
        let id = this.props.match.params.mid;
        fetch.getSingerInfo(id, this.state.pageNum).then(async res => {
            if (this.state.total === 0 || this.state.list.length < this.state.total) {
                let state = Object.assign({}, this.state)
                if (this.state.list.length < 1) {
                    if (this.state.pageNum === 0) {
                        state.total = res.data.total;
                        state.albumlist = [...res.data.albumlist];
                        state.singermsg = {
                            SingerDesc: res.data.SingerDesc,
                            singer_id: res.data.singer_id,
                            singer_mid: res.data.singer_mid,
                            singer_name: res.data.singer_name,
                            fans: res.data.fans,
                            isLoading: false
                        }
                    }
                }
                let datas = await Promise.all(
                    res.data.list.map(async (song) => {
                        let vkeyData = await fetch.getSongVkey(song.musicData.songmid)
                        let url = `http://dl.stream.qqmusic.qq.com/C400${song.musicData.songmid}.m4a?vkey=${vkeyData.data.items[0].vkey}&guid=3030549298&uin=772528797&fromtag=66`
                        let albumpic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.musicData.albummid}.jpg?max_age=2592000`
                        return Object.assign({}, song, {
                            url,
                            albumpic
                        })
                    })
                )
                state.list.push(...datas);
                state.pageNum = state.list.length;
                this.setState({
                    ...state
                })

            }

        })
    }
    loadMore() {
        this.fetchSinger()
    }
    setplaySong(song) {
        this.props.playSong(Object.assign({}, {
            songid: song.musicData.songid,
            songmid: song.musicData.songmid,
            url: song.url,
            albumpic: song.albumpic,
            name: song.musicData.songname,
            currentDuration: 0,
            singer: this.handleSinger(song.musicData.singer)
        }))
        this.props.setPlayStatus(1)
        let songList = [];
        for (let [index, song] of Object.entries(this.state.list)) {
            songList.push(Object.assign({}, {
                songid: song.musicData.songid,
                songmid: song.musicData.songmid,
                url: song.url,
                albumpic: song.albumpic,
                name: song.musicData.songname,
                currentDuration: 0,
                singer: this.handleSinger(song.musicData.singer)
            }))
        }
        this.props.setMusicList(songList)
    }
    handleSinger(singers) {
        let formatSingers = []
        for (let singer of Object.values(singers)) {
            formatSingers.push(singer.name)
        }
        return formatSingers.join(' / ')
    }
    playAll(song) {
        this.setplaySong(song);
        this.props.changeMusicMode('normal')
    }
    render() {
        if (this.state.list.length > 0) {
            let msg = this.state
            return (
                <div id="singerInfo">
                    <section className="singer-Msg">
                        <div className="player_cover">
                            <img src={`https://y.gtimg.cn/music/photo_new/T001R150x150M000${msg.singermsg.singer_mid}.jpg?max_age=2592000`} onError={(e) => { e.target.src = unknowguy }} alt="人物图片" />
                        </div>
                        <div className="player_info">
                            <h2>{msg.singermsg.singer_name}</h2>
                            <p>粉丝数 {msg.singermsg.fans > 10000 ? ((msg.singermsg.fans / 10000).toFixed(2)) + " 万" : msg.singermsg.fans + " 人"}</p>
                            <p>发行时间:</p>
                        </div>
                        <div  className="player__btn" onClick={() => this.playAll(this.state.list[0])}><span className='iconfont icon-bofang'></span></div>
                    </section>
                    <section>
                        <div className="count_box">
                            <div className="count_box__txt">歌曲<span className="count_box__num">共{msg.total}首</span></div>
                        </div>
                        <ul className="mod_song_list">
                            {
                                msg.list.map((res, index) => (
                                    <li className="singer-song-item" key={res.musicData.songid} onClick={() => { this.setplaySong(res) }}>
                                        <div className="singer-song-order">{index + 1}</div>
                                        <div className="singer-song-info">
                                            <h3 className="singer-song-name txt-nowrap">{res.musicData.songname}</h3>
                                            <p className="singer-song-singer txt-nowrap">{this.handleSinger(res.musicData.singer)}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        <Button ghost='true'
                            disabled={msg.list.length === msg.total}
                            className='loadmore-btn'
                            onClick={this.loadMore}
                        >{
                                msg.list.length < msg.total ? '点击加载更多' : "已经到达最多了"
                            }
                        </Button><WhiteSpace />
                    </section>
                    <article className='other_album'>
                        <header><h2 className="tit__txt">最新专辑</h2></header>
                        <section className="other_album__bd">
                            <div className="mod_album_nowrap">
                                <ul className='mod_album_list'>
                                    {
                                        msg.albumlist.length > 0 && msg.albumlist.map((res, index) => {
                                            return (
                                                <li className='album_list__item' key={res.albummid}>
                                                    <Link to={`/albuminfo/${res.albummid}`}>
                                                        <div className="album_list__cover">
                                                            <img src={res.pic}></img>
                                                        </div>
                                                        <h3 className="album_list__tit">{res.name}</h3>
                                                        <p className="album_list__txt">{res.publish_date}</p>
                                                    </Link>

                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </section>
                    </article>
                </div>
            )
        } else {
            return <Loading></Loading>
        }

    }
}
