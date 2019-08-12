import RankInfo from '../views/RankInfo/RankInfo'
import { connect } from 'react-redux'
import { playMusic, setPlayStatus, changeMusicMode, setMusicList } from '../store/action'

const mapStateToProps = (state) => ({
    getSongList: state.songList
});

const mapDispatchToProps = (dispatch) => ({
    playSong: (song) => {
        dispatch(playMusic(song))
    },
    setPlayStatus: (status) => {
        dispatch(setPlayStatus(status))
    },
    changeMusicMode: (mode) => {
        dispatch(changeMusicMode(mode))
    },
    setMusicList: (list) => {
        dispatch(setMusicList(list))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RankInfo)