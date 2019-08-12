import React, { Component, lazy, Suspense } from 'react'
import Header from './components/Header'
import Topbar from './components/Top-bar/index.js'
import NotFound from './components/NotFound/index.js'
import SingerInfo from './container/SingerInfo'
import MinPlay from './container/MinPlay'
import Search from './container/Search'
import Player from './container/Player'
import RankInfo from './container/RankInfo'
import PlayListInfo from './container/PlayListInfo'
import AlbumInfo from './container/Albuminfo'
import {  Rank, Singer } from './views'
import { Route, Redirect, Switch } from 'react-router-dom'


// import CacheRoute, { CacheSwitch } from 'react-router-cache-route'  //缓存页面

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'animate.css/animate.min.css'
import Loading from './components/Loading'
import './App.css'
const Home = lazy(() => import('./views/Home'))

export default class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <div>
            <Header></Header>
            <Topbar />
            <Player />
            <Suspense fallback={<Loading></Loading>}>     {/* 路由懒加载 */}
              <TransitionGroup >
                <CSSTransition
                  key={location.pathname}
                  // classNames 就是设置给css动画的标示，记得'classNames'带's'的。
                  classNames={{
                    enter: 'animated',
                    enterActive: 'fadeInRight',
                    exit: 'animated',
                    exitActive: 'fadeOut'
                  }}
                  // classNames='fade'
                  // 动画时间设置为800ms，和css中的需要一致。
                  timeout={800}
                >
                  <Switch>

                    {/* <CacheRoute path="/Home" component={Home} />页面缓存 */}

                    <Route path="/Home" component={Home} />
                    <Route path='/albuminfo/:mid' component={AlbumInfo} />
                    <Route path='/playlistinfo/:id' component={PlayListInfo} />
                    <Route path='/rank' exact component={Rank} />
                    <Route path='/rank/:mid' component={RankInfo} />
                    <Route path='/singer' exact component={Singer} />
                    <Route path='/singer/:mid' component={SingerInfo} />
                    <Route path='/search' component={Search} />
                    <Route path='/404' component={NotFound} />
                    <Route path="/" exact render={() =>
                      <Redirect to='/Home' />
                    } />

                    <Route path="**" render={() =>
                      <Redirect to="/404" />
                    } />



                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </Suspense>
            {/* <MinPlay /> */}
          </div>
        )}
      />

    )
  }
}









class App2 extends Component {
  render() {
    // const AlbumInfoL =this.wrapAnimation(
    //   (AlbumInfo)
    // )
    console.log(this.props)
    return (
      <div>
        <Header></Header>
        <Topbar />
        <Suspense fallback={<Loading></Loading>}>     {/* 路由懒加载 */}
          <Switch>

            {/* <CacheRoute path="/Home" component={Home} />页面缓存 */}
            <Route path="/Home" component={Home} />
            <Route path='/albuminfo/:mid' component={AlbumInfo} />
            <Route path='/404' component={NotFound} />
            <Route path="/" exact render={() =>
              <Redirect to='/Home' />
            } />

            <Route path="**" render={() =>
              <Redirect to="/404" />
            } />



          </Switch>
        </Suspense>
        <MinPlay />

        {/* <audio controls autoPlay id='musicbox' src="http://dl.stream.qqmusic.qq.com/C400000AHdHp1WuDoZ.m4a?vkey=BD235CFD4C77CAEF3949BD6A73BAFD645F16B28A3C5A77C100CB8F1E58C8D8C61677A0994F0C6E775F6D7D1D190DD3176CA5F348E03C1D8B&guid=3030549298&uin=772528797&fromtag=66"></audio>
        <button onClick={this.stop.bind(this)}>暂停</button>
        <button onClick={this.go.bind(this)}>继续</button> */}
      </div >
    )
  }



  // stop() {
  //   let musicbox = document.getElementById('musicbox');
  //   console.log(musicbox.currentTime)    //播放时长/秒
  //   musicbox.pause()
  // }
  // go() {
  //   let musicbox = document.getElementById('musicbox');
  //   console.log(musicbox.duration)
  //   musicbox.play()
  // }
  componentDidMount() {
    // fetch.getAlbumInfo("00402suE0QEGsA").then(res => {
    //   console.log(res)
    // })
    // fetch.getPlayList("000P8peU0HhORi").then((res) => {
    //   console.log(res)
    //   //res.recomPlaylist.data.v_hot.slice(0,6)
    // })
    // fetch.getRankInfo(4).then(async res => {
    //   console.log(res)
    //   let vkey = await fetch.getSongVkey("000AHdHp1WuDoZ")
    //   console.log(vkey)
    // })
  }
}
