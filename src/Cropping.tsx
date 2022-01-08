import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import ReactCrop, { ReactCropProps, Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getBase64, getCroppedToBase64, textSize } from './alreadyExistant'
import { dataObject, ImgObj } from './genTypes'
import CropImg from './assets/crop.png'

type cropProps = {
  data: ImgObj | null
  clickedIndex: number | null
  imgUpdate: (index: number, val: string | null, width?: number, height?: number) => void
  showCrop: (crop: boolean) => void
  disable: boolean
  width: number
  height: number
}

export default function Cropping(props: cropProps) {

  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 0, aspect: props.width / props.height, x: 0, y: 0, height: 0 });
  const currentImg = useRef<HTMLImageElement | null>(null)
  const scaleW = 0.8

  useLayoutEffect(() => {
    function updateCropSize() {
      setCrop({ ...crop, height: 0, width: 0 });
    }
    window.addEventListener('resize', updateCropSize);
    if (!props.disable) updateCropSize();
    return () => window.removeEventListener('resize', updateCropSize);
  }, []);

  const scaleCondition = ():number => {
    return props.data?.data?.width! * (props.data?.data?.height! / props.data?.data?.width!) > window.innerHeight ?
      (window.innerWidth * (props.data?.data?.height! / props.data?.data?.width!) * (window.innerHeight / (window.innerWidth * (props.data?.data?.height! / props.data?.data?.width!)))) * (props.data?.data?.width! / props.data?.data?.height!) : props.data?.data?.width!
  }

  return (
    <div
      style={{
        position: "fixed",
        width:"100%",
        height:"100%",
        top:0,
        left:0,
        backgroundColor: "grey",
        zIndex: 999,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1
      }}
    >
      <h4 style={{ cursor: "pointer", left: "40%", color:"white" }} onClick={() => { props.showCrop(false) }}>close</h4>
      <ReactCrop
        style={{ width: scaleCondition() * scaleW, flexShrink: 0, }}
        disabled={props.disable}
        src={props.data?.data?.data!}
        crop={crop}
        onChange={(c) => { setCrop(c) }}
        onComplete={(c) => {}}
        onImageLoaded={(img) => { currentImg.current = img; }}
      />
  {  !props.disable ?  <div 
      className="cropTrigger" 
      style={{width: "15vw", borderRadius:"7.5vw"}}
      onClick={() => {
        if ((crop.height && crop.width) !== 0) {
          props.imgUpdate(props.clickedIndex!, getCroppedToBase64(currentImg.current, crop));
          props.showCrop(false) // comment out for auto crop
        }
      }}
      
      >
        <img className="cropTrigImg" src={CropImg}/>
      <h4
        // title or crop
        className="cropTitle"
        style={{ color:"white", float: "left", top: 10, marginLeft: (window.innerWidth*0.15 - textSize(20, "Crop", true))*0.5 - 15 }}
        >
        {"Crop"}
      </h4>
      </div> :   <h4
        // title or crop
        className="cropTitle"
        style={{ color:"white", float: "left", top: 10, marginLeft: (window.innerWidth*0.15 - textSize(20, "Crop", true))*0.5 - 15 }}
        >
        {props.data?.title }
      </h4> }
    </div>
  );
}
