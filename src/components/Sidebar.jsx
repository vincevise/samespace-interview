import { gql, useLazyQuery } from '@apollo/client'
import React, { memo, useContext, useEffect, useState } from 'react'
import ListItem from './ListItem'
import { SongContext } from '../App'
import {BiMenuAltLeft} from 'react-icons/bi'

const QUERY_GET_SONGS = gql`
  query GetSongs($search: String, $playlistId: Int!){
    getSongs(search: $search, playlistId : $playlistId){
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`

const Sidebar = () => {
    const {playlist, handleSong, handleSongList, toggleSidebar} = useContext(SongContext)
    const [search, setSearch] = useState('')

    const [
        fetchSongs,
        {
          data:songs, 
          error,
          loading
        }
      ] = useLazyQuery(QUERY_GET_SONGS)

    useEffect(()=>{
        fetchSongs({variables:{playlistId:playlist?.id, search}})
    },[playlist, fetchSongs, search]) 
   
    useEffect(()=>{
        if(songs){
            handleSongList(songs.getSongs)
        }
    },[songs, handleSongList])

    
    
    console.log(window.innerWidth)
  return (
    <div className='w-full lg:w-fit h-full overflow-hidden flex flex-col gap-8 px-6 lg:px-2 lg:shrink-0'>
        <div className='text-xl sm:text-3xl	font-bold flex items-center gap-2 mt-8'>
          <button className='block md:hidden' onClick={toggleSidebar}><BiMenuAltLeft  /></button>
          <h1>
            {playlist && playlist.title}
          </h1>
        
        </div>
        <span className='w-full relative'>
            <input 
                type="text" 
                className='w-full px-4 py-2 rounded-lg text-lg bg-white/80 outline-none text-black' 
                placeholder='Search Song, Artist' 
                onChange={(e)=>setSearch(e.target.value)}
            />
        </span>

        <div className='w-full lg:w-[432px] h-full overflow-y-scroll no-scrollbar pb-36'>
            {loading && <>Loading...</>}
            {error && <>Something went wrong</>}
            {songs && songs?.getSongs.map((x)=>(
                 <ListItem data={x} handleSong={handleSong} key={x._id}/>
            ))}
        </div>

    </div>
  )
}

export default memo(Sidebar)