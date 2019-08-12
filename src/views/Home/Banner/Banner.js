import './Banner.scss'
import { Carousel } from 'antd-mobile'
import React, { Component } from 'react'
import fetch from '../../../fetch'

export default class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AlbumBan: [],
            selectedIndex: 1
        }
    }
    componentDidMount() {
        fetch.getRecommend().then(res => {
            this.setState({
                AlbumBan: res.data.slider, selectedIndex: 0
            })
        })

    }
    render() {

        return (
            <div className="almBanner">
                <Carousel
                    autoplay
                    infinite
                    className="banner-component" selectedIndex={this.state.selectedIndex}>
                    {
                        this.state.AlbumBan.map(res => {
                            return <a href={res.linkUrl} className="banner-link" key={res.id}>
                                <img src={res.picUrl} className="banner-img" />
                            </a>
                        })
                    }
                </Carousel>



            </div>
        )
    }
}
