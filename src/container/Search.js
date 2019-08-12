import Search from '../views/Search/Search'
import { connect } from 'react-redux'
import { playMusic, setPlayStatus, setMusicList } from '../store/action'

const mapStateToProps = (state) => ({
    // song: state.song
})

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
    playSong: (song) => {
        dispatch(playMusic(song))
    },
    setPlayStatus: (status) => {
        dispatch(setPlayStatus(status))
    },
    setMusicList: (list) => {
        dispatch(setMusicList(list))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
