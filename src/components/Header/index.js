import React, { Component } from 'react'
import "./header.scss"
export default class Header extends Component {
    render() {
        return (
            <div id="header">
                <h1><span className='iconfont icon-yingtao'></span>散发乘夏凉,荫下卧闲敞<span className='iconfont icon-yingtao'></span></h1>
                {/* <span className='iconfont icon-home'></span> */}
            </div>
        )
    }
}
