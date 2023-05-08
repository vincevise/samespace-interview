import React, { memo, useContext } from 'react'
import { SongContext } from '../App' 
function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
const ListItem = ({data}) => {
    
    const {handleSong, song} = useContext(SongContext)
     
    if(!data){
        return null
    }
  return (
    <div 
        className='flex items-center justify-between p-2 sm:p-4 cursor-pointer hover:bg-white/20 rounded-md' 
        key={data?._id}
        onClick={()=>handleSong(data)}
    >
        <div className='flex gap-4 mr-10'>
            <div className='w-12 sm:w-10 h-12 sm:h-10 rounded-full overflow-hidden'>
                <img src={data?.photo} className='CSSImage' alt="" />
            </div>
            <div className=''>
                <h1 className={`text-xs sm:text-base lg:text-lg gap-2 flex items-center font-400 ${song && song._id===data?._id && 'text-green-600' }`}> 
                        {data?.title}  
                    
                </h1>
                <p className='text-xs sm:text-sm opacity-60'>{data?.artist}</p> 
            </div>
        </div>
        <span className={`text-md opacity-60 ${song && song._id===data?._id && 'text-green-600'}`}>
            {fmtMSS(Number(data.duration))}
        </span>
    </div>
  )
}

export default memo(ListItem)