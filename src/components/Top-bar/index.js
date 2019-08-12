import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'
import './Topbar.scss'
export default class Topbar extends Component {
    render() {
        return (
            <div id="Topbar">

                <Link to='/Home' activeClassName="active">推荐</Link>
                <Link to='/singer' activeClassName="active">歌手</Link>
                <Link to='/rank' activeClassName="active">排行榜</Link>
                <Link to='/search' activeClassName="active">搜索</Link>
            </div>
        )
    }
}
