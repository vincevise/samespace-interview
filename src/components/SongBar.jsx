import React, { memo, useContext, useRef } from 'react'
import { SongContext } from '../App'
import { BsFastForwardFill, BsFillPauseFill, BsFillPlayFill, BsRewindFill } from 'react-icons/bs'

const SongBar = ({playing, toggleSongPlay, handleRewind, handleForward, handleSeek, currentTime, duration}) => {
    const {song, togglePlayer, songBarRef} = useContext(SongContext)

    const playerBtnRef = useRef()

    const handleTogglePlayer = () => {
        togglePlayer()
    }

    if(!song) return null 

  return (
    <>
    <div className='w-11/12 h-fit absolute inset-x-0 mx-auto bottom-4 lg:hidden bg-inherit  cursor-pointer rounded-md   ' > 
        <div className='flex items-center p-2 bg-red-700' ref={songBarRef}>
            
            <div className='w-full flex items-center gap-3'  onClick={handleTogglePlayer}>
                <img src={song.photo} className='w-12 h-12 object-cover rounded-md' alt="" />
                <div>
                    <h1 className='text-sm md:text-lg'>{song.title}</h1>
                    <span className='text-sm opacity-50'>{song.artist}</span>
                </div>
            </div>
            <div className='flex gap-3 pr-2' ref={playerBtnRef}>
                <button onClick={handleRewind} className='hidden sm:block'><BsRewindFill size={25}/></button>
                <button onClick={toggleSongPlay} className='bg-white p-2 rounded-full flex items-center justify-center '>
                    {
                        playing ? 
                        <BsFillPauseFill size={25} color='black'/> :
                        <BsFillPlayFill size={25} color='black' />
                    }
                </button>
                <button onClick={handleForward} className='hidden sm:block'><BsFastForwardFill size={25}/></button>
            </div> 
        </div>
            <input 
                type="range" 
                min={0}
                max={duration}
                step={0.01}
                value={currentTime}
                onChange={handleSeek} 
                id='range1'
                className=' w-full h-[0.5px] mt-0 absolute'
            />
    </div>
   
    </>
  )
}

export default memo(SongBar)