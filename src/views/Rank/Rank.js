import React, { Component } from 'react'
import fetch from '../../fetch'
import './Rank.scss'
import { Link } from 'react-router-dom'
import AppSroll from '../../components/app-scroll'
export default class Rank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RankList: null
        }
    }
    componentDidMount() {
        fetch.getRankList().then(res => this.setState({
            RankList: res.data.topList
        }))
        
    }
    render() {
        var link = this.state.RankList
        if (link !== null) {
            return (
                <div id="rankList">
                    <AppSroll>
                        <ul className="rank-list">
                            {
                                link.map(res => (
                                    <Link to={`/rank/${res.id}`} key={res.id}>
                                        <li className="rank-list-item">
                                            <div className="rl-img"><img src={res.picUrl}></img></div>

                                            <ul className="song-list">
                                                <div><h3>{res.topTitle}</h3></div>
                                                {
                                                    res.songList.map((item, index) => (
                                                        <li className="song" key={item.songname}>
                                                            <span>{index + 1} </span>
                                                            <span>{item.songname}-{item.singername}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    </Link>))
                            }


                        </ul>
                    </AppSroll>
                </div >
            )
        } else {
            return <div id="rank-List"></div>
        }

    }
}
