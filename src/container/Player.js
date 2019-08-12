import Player from '../components/Player/Player'
import { connect } from 'react-redux'
import { playMusic, setPlayStatus, changeMusicMode } from '../store/action'

const mapStateToProps = (state) => ({
    song: state.song,
    status: state.MusicStatus,
    songList: state.songList,
    songMode: state.getPlayMode
})

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
    playSong: (song) => {
        dispatch(playMusic(song))
    },
    setPlayStatus: (status) => {
        dispatch(setPlayStatus(status))
    }
    ,
    changeMusicMode: (mode) => {
        dispatch(changeMusicMode(mode))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)