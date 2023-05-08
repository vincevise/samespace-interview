import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import {MdFastForward, MdFastRewind, MdVolumeOff, MdVolumeUp} from 'react-icons/md'
import {BsChevronDown, BsFillPauseFill, BsFillPlayFill, BsThreeDots} from 'react-icons/bs'
import { SongContext } from '../App'
import SongBar from './SongBar'

const Player = () => {

    const {song, songLists, handleSong, playerRef, togglePlayer} = useContext(SongContext)
    const audioRef = useRef(null)
  
    const [volume, setVolume] = useState(true)
    const [playing, setPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    

    useEffect(()=>{
        setDuration(0)
        setCurrentTime(0) 
        // setPlaying(true)
        if(audioRef.current) audioRef.current.currentTime = 0
    },[song])
 

    useEffect(()=>{
        if(song){
            if(playing){
                audioRef.current.play() 
            }else{
                audioRef.current.pause() 
            }  
        }
    },[playing, song])


    if(!song){
        return null
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    }

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value
    }

   

    const handleRewind = () => {
        const index = songLists.findIndex((x)=>x._id===song._id)
        if(index===0){
            handleSong(songLists[songLists.length - 1])
        }else{
            handleSong(songLists[index - 1])
        }
    }

    const handleForward = () => {
        const index = songLists.findIndex((x)=>x._id===song._id)
        if(index===(songLists.length - 1)){
            handleSong(songLists[0])
        }else{
            handleSong(songLists[index + 1])
        }
    } 

    const toggleSongPlay = () =>{
        setPlaying(!playing)
    }

    return (
        <>
        <div className={`absolute lg:relative flex w-full h-screen lg:h-auto items-center justify-center bg-black md:bg-inherit  translate-y-[0%]  z-40 bg-black z-80`} ref={playerRef}  
        >
            <button className='absolute top-10 right-10 text-white text-2xl z-60 lg:hidden' onClick={togglePlayer}>
                <BsChevronDown color={'white'}/>  
            </button>
            <div className='w-8/12 md:w-5/12 lg:w-7/12 h-fit flex flex-col gap-4'>
                <div className=''>
                    <h1 className='text-lg md:text-2xl font-bold'>{song.title}</h1>
                    <p className='text-sm md:text-base'>{song.artist}</p>
                </div>
                <div className=' flex flex-col gap-4'>
                    <img src={song?.photo} className='w-full lg:h-full' alt="" />
                    
                    <input 
                        type="range" 
                        min={0}
                        max={duration}
                        step={0.01}
                        value={currentTime}
                        onChange={handleSeek} 
                        id='range1'
                        className=' w-full'
                    />
                </div>
                <div className=' w-full flex justify-between items-center text-lg md:text-[2vw]'>
                    <div className='hidden'>
                        <audio ref={audioRef}
                        src={'https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3'}
                        onTimeUpdate={handleTimeUpdate}
                        />
                    </div>
                    <div className='p-2 text-white bg-white/20 rounded-full cursor-pointer '>
                        <BsThreeDots color='white'  />
                    </div>
                    <div className='flex items-center gap-4'>
                        <span className='cursor-pointer' onClick={handleRewind}><MdFastRewind  /></span>
                        <div className='p-2  bg-white rounded-full cursor-pointer ' onClick={toggleSongPlay}>
                            {playing ? 
                                <BsFillPauseFill   color='black'/>
                                :
                                <BsFillPlayFill   color='black' />
                            }
                        </div>
                        <span className='cursor-pointer' onClick={handleForward}><MdFastForward  /></span>
                    </div>
                    <div className='p-2 bg-white/20 rounded-full cursor-pointer ' onClick={()=>setVolume(!volume)}>
                        {volume ? <MdVolumeUp  /> : <MdVolumeOff  />}
                    </div>
                </div>
            </div>
        </div>
        <SongBar 
            handleForward={handleForward} 
            handleRewind={handleRewind} 
            toggleSongPlay={toggleSongPlay} 
            playing={playing}
            duration={duration}
            currentTime={currentTime}
            handleSeek={handleSeek}
        />
        </>
    )
}

export default memo(Player)