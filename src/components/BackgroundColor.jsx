import React, { useState, useRef, useContext, useEffect, memo, useCallback } from "react";
import { SongContext } from "../App";

function ColorExtractor() {
    const {song, backgroundRef, playerRef, songBarRef} = useContext(SongContext)
    const [color, setColor] = useState(null);
    const canvasRef = useRef();

    const extractColors = (imgSrc) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgSrc;
  
      img.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
  
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
  
        const colorCounts = {};
        let colorsArray = [];
  
        for (let i = 0; i < pixels.length; i += 4) {
          const red = pixels[i];
          const green = pixels[i + 1];
          const blue = pixels[i + 2];
          const color = `rgb(${red},${green},${blue})`;
  
          if (colorCounts[color]) {
            colorCounts[color]++;
          } else {
            colorCounts[color] = 1;
          }
        }
  
        colorsArray = Object.keys(colorCounts).sort((a, b) => {
          return colorCounts[b] - colorCounts[a];
        });
  
        setColor(colorsArray.slice(-5)[1]); // set the top 5 colors
      };
    };

    const extractColorsCallback = useCallback(()=>{
      extractColors(song.photo)
    },[song])

    useEffect(()=>{
       if(song) extractColorsCallback(song.photo)
    },[song,extractColorsCallback])

    useEffect(()=>{
        if(color){
          if(window.innerWidth > 978){
            backgroundRef.current.style.backgroundImage = `linear-gradient(to right, ${color} , black)`
          }else{
            playerRef.current.style.backgroundImage = `linear-gradient( ${color} , black)`
            songBarRef.current.style.background = color
          }
        } 
    },[color,song, backgroundRef, songBarRef, playerRef])

  

  if(!song) return null

  return ( 
    <canvas ref={canvasRef} style={{ display: "none" }} className="hidden"></canvas> 
  );
}

export default memo(ColorExtractor);
