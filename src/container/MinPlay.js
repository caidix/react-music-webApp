import MinPlay from '../views/MinPlay/MinPlay.js'
import { connect } from 'react-redux'
import { playMusic, setPlayStatus } from '../store/action'

const mapStateToProps = (state) => ({
    song: state.song,
    status: state.MusicStatus,
    songList: state.songList
})

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
    playSong: (song) => {
        dispatch(playMusic(song))
    },
    setPlayStatus: (status) => {
        dispatch(setPlayStatus(status))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MinPlay)