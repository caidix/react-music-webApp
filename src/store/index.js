import { SET_MUSIC_PLAY, CHANGE_MUSIC_STATUS, SET_MUSIC_LIST, CHANGE_MUSIC_PLAY_MODE } from './actionType'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    setMusicBoxShow: 0,
    setMusicPlay: 0,
    currentSong: {},
    playMode: 'normal',   //normal 持续播放 random 随机播放  single单曲循环
    musicStatus: 0,  //0为不播放，1为播放
    setMusicList: []
}

function song(state = initialState.currentSong
    , action) {
    switch (action.type) {
        case SET_MUSIC_PLAY:
         
            return action.song
        default:
            return state;
    }
}
function getPlayMode(state = initialState.playMode, action) {
    switch (action.type) {
        case CHANGE_MUSIC_PLAY_MODE:
            return action.mode
        default: return state
    }
}
function MusicStatus(state = initialState.musicStatus, action) {
    switch (action.type) {
        case CHANGE_MUSIC_STATUS:
            return action.status
        default: return state
    }
}
function songList(state = initialState.setMusicList, action) {
    switch (action.type) {
        case SET_MUSIC_LIST:
           
            return action.list
        default: return state
    }
}
const reducer = combineReducers({
    song, MusicStatus, songList, getPlayMode
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export default store;