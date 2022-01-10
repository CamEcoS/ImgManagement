import { useState, useLayoutEffect, useEffect} from "react";
import Image from 'next/image'
import { getFileInfo } from './alreadyExistant'
import './sig.css'

type SizeWH = {
    width: number
    height: number
}

type imgSlot = {
    imgSize:SizeWH | null
    current: string
    h: number
    w: number
    updateImages: (val: string | File | File[] | null, width?: number | undefined, height?: number | undefined, name?: string | undefined) => void 
    acceptedFormat: string
}

const SignatureImgSlot = (props:imgSlot) =>{
    
    const [size, setSize] = useState<number[]>([window.innerWidth, window.innerHeight]);
    const sizeHBench = size[1] * (props.h*0.01)*0.7 
    const sizeWBench = size[0] * (props.w*0.01)
    const defaultSize =  sizeHBench <= sizeWBench ? sizeHBench : sizeWBench
    const imgSizeW = props.imgSize === null ? defaultSize : sizeWBench < sizeHBench ? sizeWBench : sizeHBench*(props.imgSize?.width!/props.imgSize?.height!)
    const imgSizeH = props.imgSize === null ? defaultSize : sizeHBench <= sizeWBench ? sizeHBench : sizeWBench*(props.imgSize?.height!/props.imgSize?.width!)


    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);

useEffect(()=>{
    console.log("induce", imgSizeW)
},[size])
    return(
        <label className="sigImgCont"
        style={{
            left: `calc(50% - ${imgSizeW*0.5}px)`,
            top: `calc(50% - ${imgSizeH*0.5}px)`,
            cursor:"pointer"

        }}
        >
            <Image
            priority
            unoptimized
            src={props.current}
            onLoad={()=>{console.log(defaultSize)}}
            width={imgSizeW}
            height={imgSizeH}
            // width={30}
            // height={30}
            />
            <input
                id="retrieveFile"
                className="sigSelect"
                type="file"
                name="upload"
                accept={props.acceptedFormat}
                onChange={e => {
                    getFileInfo(e.target.files!, (res: any | null) => {
                        props.updateImages( e.target.files![0], res.width, res.height);
                        e.target.value = ''
                    })
                }}
            /> 
        </label>
    )
}

export default SignatureImgSlot