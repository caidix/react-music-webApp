import React, { Component } from 'react'
import ErrorPic from '../../assets/404.jpg'
import './NotFound.scss'
export default class NotFound extends Component {
    render() {
        return (
            <div id="NotFound" onClick={this.returnHome.bind(this)}>
                <img src={ErrorPic}></img>
            </div>
        )
    }
    returnHome() {
        this.props.history.push('/Home')
    }
}
