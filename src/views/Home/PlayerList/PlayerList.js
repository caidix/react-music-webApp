import React, { Component } from 'react'
import fetch from '../../../fetch'
import { Link } from 'react-router-dom'
import './PlayerList.scss'
export default class PlayerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playerList: []
        }
    }
    componentDidMount() {

        fetch.getPlayList().then(res => {
            this.setState({
                playerList: res.recomPlaylist.data.v_hot
            })
        })
        
    }
    render() {

        let arr = this.state.playerList.slice(0, 8)
        return (
            <div className="newPlayerStar">

                {
                    this.state.playerList.length > 0 && <div className='player-title'> <h2>热门歌单</h2><h2 >更多<span className='iconfont icon-right'></span></h2></div>
                }
                <div className="player-component">
                    <ul>
                        {
                            arr.map(res => {
                                return (
                                    <li key={res.listen_num}>
                                        <Link to={`/playlistinfo/${res.content_id}`}>
                                            <div>
                                                <img src={res.cover}></img>
                                                <div className='player-info'>
                                                    <h3>{res.title}</h3>
                                                </div>
                                            </div></Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>


            </div>
        )
    }
}

