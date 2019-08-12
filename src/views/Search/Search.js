import React, { Component } from 'react'
import { SearchBar, Button, WhiteSpace, WingBlank, PullToRefresh } from 'antd-mobile'
import './Search.scss'
import fetch from '../../fetch'
export default class Search extends Component {
    state = {
        oldvalue: '',
        getList: [],
        searchKey: '',
        page: 1,
        total: 0,
        refreshing: false,
        down: true,
        data: [],

    };
    componentDidMount() {
        this.autoFocusInst.focus();

    }
    setplaySong(song) {
        let i = Object.assign({}, {
            songid: song.songid,
            songmid: song.songmid,
            url: song.url,
            albumpic: song.albumpic,
            name: song.songname,
            currentDuration: 0,
            singer: this.handleSinger(song.singer)
        })
        this.props.playSong(i)
        this.props.setMusicList([i])
        this.props.setPlayStatus(1)
    }
    fetchSong() {
        var arr = this.state;
        if (this.state.oldvalue !== this.state.searchKey) {
            arr.getList = [];
            var page = 1;
        } else {
            var page = this.state.page;
        }
        fetch.searchByKey(this.state.searchKey, page).then(async res => {
            let val = res.data.data;
            if (page === 1) {
                arr.total = val.song.totalnum;
            }
            if (arr.getList.length !== arr.total) {
                var msg = await Promise.all(
                    val.song.list.length == 0 ? '' : val.song.list.map(async song => {
                        let vkeyData = await fetch.getSongVkey(song.songmid) || '';
                        let url = '';
                        if (vkeyData.data.items[0].vkey !== undefined) {
                            url = `http://dl.stream.qqmusic.qq.com/C400${song.songmid}.m4a?vkey=${vkeyData.data.items[0].vkey}&guid=3030549298&uin=772528797&fromtag=66`;
                        }

                        let albumpic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000`
                        return Object.assign({}, song, { url, albumpic })
                    })
                )
                arr.getList = arr.getList.concat(msg)
            }
            arr.page = arr.getList.length;
            arr.oldvalue = this.state.searchKey;
            arr.searchKey = '';
            this.setState({
                ...arr,

            })
        })

    }

    onChange = (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
        this.autoFocusInst.focus();
        this.setState({
            ...this.state,
            searchKey: this.autoFocusInst.state.value
        }, () => {
            this.fetchSong()
        })
    }
    handleSinger(singers) {
        let formatSingers = []
        for (let singer of Object.values(singers)) {
            formatSingers.push(singer.name)
        }
        return formatSingers.join(' / ')
    }

    render() {
        let { getList } = this.state
        return (<div id="Search">
            <SearchBar
                placeholder="搜索歌曲、歌手"
                ref={ref => this.autoFocusInst = ref}
                mode="light"
                onSubmit={value => this.setState({
                    ...this.state,
                    searchKey: value
                }, () => {
                    this.fetchSong()
                })}
            />
            <WhiteSpace />
            <WingBlank>
                <Button
                    onClick={this.handleClick}
                >搜索</Button>
            </WingBlank>
            <WhiteSpace />

            <ul className='search_content' >
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                        height: '100%',
                        overflow: 'auto',

                    }}
                    indicator={{ deactivate: '正在搜索' }}
                    direction='up'
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ ...this.state, refreshing: true });
                        this.handleClick()
                        setTimeout(() => {
                            this.setState({ ...this.state, refreshing: false });
                        }, 1000);
                    }}
                >
                    {
                        getList.map(res => {
                            return (
                                <li key={res.songmid} onClick={() => this.setplaySong(res)}>
                                    <i className="iconfont icon-music1"></i>
                                    <h6 className="main_tit">{res.songname}</h6>
                                    <p className="sub_tit">{this.handleSinger(res.singer)}</p>
                                </li>
                            )
                        })
                    }
                </PullToRefresh>
            </ul>

        </div>);
    }
}
