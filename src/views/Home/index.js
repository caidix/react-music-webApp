import React, { useEffect } from 'react'
import './Home.scss'
import Banner from './Banner/Banner.js'
import Album from './Album/Album.js'
import PlayerList from './PlayerList/PlayerList.js'
import AppScroll from '../../components/app-scroll'

const Home = () => {

    useEffect(() => {
    })

    return (

        <div id='Home'>
            <AppScroll>
                <Banner />
                <Album />
                <PlayerList />
            </AppScroll>
        </div>
    )
}
export default Home
// class Home extends Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         return (

//             <div id='Home'>
//                 <AppScroll>
//                     <Banner />
//                     <Album />
//                     <PlayerList />
//                 </AppScroll>
//             </div>
//         )
//     }
// }