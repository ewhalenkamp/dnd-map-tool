'use client'

import React, { useState, useRef, useEffect } from "react";
import MyWindowPortal from "../components/popout"
import GridLayout from "react-grid-layout";
import Character from "../classes/character";
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function Home() {
  const [characters, setCharcters] = useState([new Character({ name: "Bakked", img: "https://pics.craiyon.com/2023-11-17/G1ObhmmyRGqzeG1UWTZqBQ.webp", maxHp: 100 })]);
  const [bgImg, setBgImg] = useState("https://preview.redd.it/y982pfvjoq561.jpg?auto=webp&s=b03283b50a63f09df707e029d7067e795a2f53a6");
  const [canvasWidth, setCanvasWidth] = useState(1000);
  const [canvasZIndex, setCanvasZIndex] = useState(-10);
  const aspectRatio = useRef();
  const imgRef = useRef();

  const sideBoxes = [];
  const mapIcons = [];

  const mapIconWidth = 50;

  characters.forEach((c, i) => {
    sideBoxes.push(c.sideBox(i));
    mapIcons.push(c.mapIcon(mapIconWidth));
  });

  const resetFog = () => imgRef.current.loadPaths({
    "drawMode": true,
    "strokeColor": "black",
    "strokeWidth": 100000,
    "paths": [
      {
        "x": 0,
        "y": 0
      }
    ]
  })

  useEffect(() => {
    if (imgRef.current.eraseMode) {
      resetFog();
      imgRef.current.eraseMode(true);
      setCanvasZIndex(10);
    }
  }, [imgRef.current]);

  useEffect(() => {
    const { naturalWidth, naturalHeight } = imgRef.current;
    setCanvasWidth(naturalWidth);
    // when aspectRatio is set, imgRef.current will update to the drawable canvas
    aspectRatio.current = naturalWidth / naturalHeight;
  }, []);

  return (
    <main>
      <map>
        <div style={{ width: `${canvasWidth}px`, position: "relative", border: "5px solid white", zIndex: canvasZIndex }}>
          {mapIcons}
          {/* initially render the background image on its own to determine its aspect ratio for automatic resizing later */}
          {aspectRatio.current ?
            <ReactSketchCanvas
              ref={imgRef}
              width={canvasWidth}
              height={canvasWidth / aspectRatio.current}
              eraserWidth={mapIconWidth}
              backgroundImage={bgImg}
              preserveBackgroundImageAspectRatio="none"
            /> :
            <img ref={imgRef} src={bgImg} />
          }
        </div>
      </map>
      {/* <div className={`char_list`}>
        <div className="inner">
          <GridLayout rowHeight={50} width={400} cols={1} margin={[20, 50]}>
            {sideBoxes}
          </GridLayout>
        </div>
      </div> */}
    </main >
  );
}
