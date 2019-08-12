import React, { Component } from 'react'
import fetch from '../../../fetch'
import { Link } from 'react-router-dom'
import BScroll from 'better-scroll'
import './Album.scss'
class Album extends Component {
    constructor(props) {
        super(props)
        this.state = {
            LatestAlbum: []
        }
    }
    componentDidMount() {
        this.getAlbum()
        let scroll = new BScroll(this.scroll.current, {
            scrollX: true,
            eventPassthrough: 'vertical',
        })
        scroll.on('beforeScrollStart', () => {
            scroll.refresh();
        })
    }
    getAlbum() {
        fetch.getLatestAlbum().then(res => {
            this.setState({
                LatestAlbum: res.albumlib.data.list
            })
        })
    }
    scroll = React.createRef();
    render() {
        let arr = this.state.LatestAlbum.slice(0, 18)
        return (
            <div className="newAlbumStar">

                {
                    this.state.LatestAlbum.length > 0 && <div className='newAlbum-title'> <h2>最新专辑</h2><h2 >更多<span className='iconfont icon-right'></span></h2></div>
                }
                <div className="album-component">
                    <div className="better-scroll" ref={this.scroll} >
                        <ul>
                            {
                                arr.map(res => {
                                    return (
                                        <li key={res.album_id}><Link to={`/albuminfo/${res.album_mid}`}>
                                            <img src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${res.album_mid}.jpg?max_age=2592000`}></img>
                                            <div className='player-info'>
                                                <h3>{res.album_name}</h3>
                                                <p>{
                                                    res.singers.map(res => res.singer_name + ' ')
                                                }</p>
                                            </div>
                                        </Link></li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>


            </div>
        )
    }
}

export default Album