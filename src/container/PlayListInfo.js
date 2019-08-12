import PlayListInfo from '../views/PlayListInfo/PlayListInfo'
import { connect } from 'react-redux'
import { playMusic, setPlayStatus, setMusicList, changeMusicMode } from '../store/action'

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
    },
    changeMusicMode: (mode) => {
        dispatch(changeMusicMode(mode))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(PlayListInfo)