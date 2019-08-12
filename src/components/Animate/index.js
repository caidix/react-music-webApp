import React, { Component } from 'react'
import 'animate.css/animate.min.css'
import './style.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// export default class Animate extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }
//     render() {
//         console.log(this.props)

//         return (
//             <TransitionGroup>
//                 <CSSTransition
//                     key={this.props.location.pathname}
//                     // classNames={
//                     //     {
//                     //         enter: "animated",
//                     //         enterActive: 'fadeInDown',
//                     //         exit: 'animated',
//                     //         exitActive: 'fadeOutDown'
//                     //     }
//                     // }
//                     // timeout={500}
//                     classNames="fade"
//                     // 动画时间设置为800ms，和css中的需要一致。
//                     timeout={400}
//                 >
//                     {this.props.children}
//                 </CSSTransition>
//             </TransitionGroup >
//         )
//     }
// }
export default function Animate(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <CSSTransition
                    in={this.props.match !== null}
                    classNames={{
                        enter: 'animated',
                        enterActive: 'fadeInDown',
                        exit: 'animated',
                        exitActive: 'fadeOutDown'
                    }}
                    timeout={1000}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <WrappedComponent/>
                </CSSTransition>
            )
        }
    }
}
