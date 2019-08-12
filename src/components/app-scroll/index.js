import React, { Component } from 'react'
import BScroll from 'better-scroll'
import './style.scss'

export default class AppScroll extends Component {

    wrapper = React.createRef();

    render() {
        return (
            <div className="scroll-wrapper" ref={this.wrapper}>
                <div className="scroll-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
    componentDidMount() {
        let scroll = this.scrollView = new BScroll(this.wrapper.current, {
            scrollY: true,
            click: true,
            scrollX: true,
            bounce: {
                top: true,
                bottom: true,
                left: true,
                right: true
            }
        });
        // 在用户需要滚动前及时更新滚动视图
        scroll.on('beforeScrollStart', () => {
            scroll.refresh();
        })
        scroll.scrollTo(0, 0, 500)
    }
}
