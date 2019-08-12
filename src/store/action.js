import { SET_MUSIC_PLAY, CHANGE_MUSIC_STATUS, SET_MUSIC_LIST, CHANGE_MUSIC_PLAY_MODE } from './actionType'


export function playMusic(song) {
    return {
        type: SET_MUSIC_PLAY, song
    }
}

export function setPlayStatus(status) {
    return { type: CHANGE_MUSIC_STATUS, status }
}

export function setMusicList(list) {
    return { type: SET_MUSIC_LIST, list }
} 
export function changeMusicMode(mode) {
    return { type: CHANGE_MUSIC_PLAY_MODE, mode }
}