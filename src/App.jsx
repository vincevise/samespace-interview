import { gql, useQuery } from '@apollo/client';
import './App.css';  
import { createContext, useEffect, useRef, useState } from 'react';
import logo from './Vector.svg'
import Sidebar from './components/Sidebar';
import Player from './components/Player'; 
import BackgroundColor from './components/BackgroundColor'; 
import {GrClose} from 'react-icons/gr' 

const QUERY_GET_PLAYLISTS = gql`
query GetPlaylists { 
  getPlaylists{
    id
    title
  }
}`

export const SongContext = createContext()

function App() {
  const [playlist, setPlaylist] = useState(null)
  const [song, setSong] = useState(null)
  const [songLists, setSongLists] = useState(null)
 
  const backgroundRef = useRef(null) 
  const sideBarRef = useRef(null)
  const playerRef = useRef(null)
  const songBarRef = useRef(null)
  const overflowRef = useRef(null)
  const closeBtnRef = useRef(null)


  const {
    data, 
    loading,  
    error
  } = useQuery(QUERY_GET_PLAYLISTS)
  
  useEffect(()=>{
    if(data){
      setPlaylist(data.getPlaylists[0])
    }
  },[data])

  if(loading){
      return <div>Loading...</div>
  }

  if(error){
    return <div>Something went wrong</div>
  }

  const togglePlayer = () => {
    console.log(playerRef.current.style.transform === '' )
    if(window.innerWidth < 976){
      if(playerRef.current.style.transform === '') playerRef.current.style.transform = 'translateY(-100%)'
      else if(playerRef.current.style.transform === 'translateY(0%)' ) playerRef.current.style.transform = 'translateY(-100%)'
      else if(playerRef.current.style.transform ==='translateY(-100%)') playerRef.current.style.transform = 'translateY(0%)'
      
    }
  }

  const toggleSidebar = () => {
    console.log(sideBarRef.current.style.transform )
    

      if(sideBarRef.current.style.transform === ''){
         sideBarRef.current.style.transform = 'translateX(-100%)'
         overflowRef.current.style.transform = 'translateX(-100%)'
         closeBtnRef.current.style.display = 'none'
      }
      else if(sideBarRef.current.style.transform === 'translateX(0%)' ) {
        sideBarRef.current.style.transform = 'translateX(-100%)'
        overflowRef.current.style.transform = 'translateX(-100%)'
        closeBtnRef.current.style.display = 'none'
      }
      else if(sideBarRef.current.style.transform ==='translateX(-100%)'){ 
        overflowRef.current.style.transform = 'translateX(0%)'
        sideBarRef.current.style.transform = 'translateX(0%)'
        closeBtnRef.current.style.display = 'block'
      }
  }
  
  const handleSong = (x) => {
    setSong(x)
  }

  const handleSongList = (x) => {
    setSongLists(x)
  } 
 
  return ( 
      <SongContext.Provider value={{playlist, handleSong, handleSongList, song, songLists, backgroundRef, sideBarRef, toggleSidebar, playerRef, togglePlayer, songBarRef}} >
      <div 
        className='w-screen h-screen absolute inset-0 bg-black/50 z-20 md:hidden' 
        ref={overflowRef} 
        onClick={toggleSidebar}>  
      </div>
      <div className='w-screen h-screen text-white flex  relative   ' ref={backgroundRef}>
        <button className='absolute p-2 rounded-full bg-white block  md:hidden top-10 right-10 text-black z-30 transition-all' onClick={toggleSidebar} ref={closeBtnRef}><GrClose color='white' /></button>
          <div className='bg-black md:bg-inherit flex flex-col gap-10 p-8  absolute sm:relative z-30 transition-all'  ref={sideBarRef}>
            
            <img src={logo} alt="" className='w-[131px] ' />
            <div className='flex flex-col justify-start w-[160px] h-screen text-white 	'>
              {data && playlist && 
                  data.getPlaylists.map((x,i)=><button 
                  className={`text-left rounded-md   p-2 ${playlist.title === x.title ? 'text-white' : 'text-white/50	'}`} 
                  key={i} 
                  onClick={()=>setPlaylist(x)}>
                                                {x.title}
                                            </button>)
                } 
            </div> 
          </div>  
        <Sidebar/> 
        <Player/>   
        <BackgroundColor/>
      </div> 
    </SongContext.Provider>
  );
}

export default App;
