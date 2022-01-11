import { useEffect, useRef, useState } from "react";
import EdImg from './assets/edit-image.png'
import { SigMain } from './genTypes'
import { dataObject} from './genTypes'
import Image from 'next/image'
import './sig.css'
import { getBase64, getFileInfo } from './alreadyExistant'
import SignatureCanvas from "./SignatureCanvas";
import SignatureImageSlot from "./SignatureImgSlot";
import Dropzone from 'react-dropzone'

type SigOpt = {
    title: string
    image: string
}

type property = {
    attribute: SigMain
}

type sigImgProp = {
    data: dataObject | null
    cropData: string | null
}


const Signature = (props: property) => {
    const [flag, set] = useState<boolean>(false)
    const [img, setImg] = useState<sigImgProp>({
        data:null,
        cropData:null
    })
    const options: SigOpt[] = [
        {
            title: "Image",
            image: EdImg
        },
        {
            title: "Sign",
            image: EdImg
        },
    ]
    const  selectedOpt = useRef<string>("Image")

    useEffect(()=>{
        return () => {if (sessionStorage.getItem('signature')) sessionStorage.removeItem('signature')}
    },[])

    function updateImages(index:number | undefined, val: File | File[] | string | null, width?: number, height?: number, name?: string): void {
        if (val !== undefined) {
            if (val !== null) {
                typeof val === "string" ? setImg({ ...img,cropData: val } )
                    : getBase64(val, (t: any) =>  setImg({ data: { data: t, width: width!, height: height! },cropData: null } ))
            }
            else setImg({data:val, cropData:val})
        }
    }
    

    return (
        <div className="mainCont">
              {props.attribute.closeModal !== undefined && (props.attribute.contHeight! < 100 || props.attribute.contWidth! < 100) ? <h4 style={{ cursor: "pointer", left:"90%", top:"-2.5%", color:"white", position:"absolute" }} onClick={() =>props.attribute.closeModal !== undefined ? props.attribute.closeModal(false) : null}>close</h4> : null}
            <div className="secondSigCont"
                style={{
                    width: `${typeof props.attribute.contWidth === "number" ? props.attribute.contWidth : 100}%`,
                    height: `${typeof props.attribute.contHeight === "number" ? props.attribute.contHeight : 100}%`,
                    left: `${typeof props.attribute.contWidth === "number" ? 50 - props.attribute.contWidth! * 0.5 : 0}%`,
                    top: `${typeof props.attribute.contHeight === "number" ? 50 - props.attribute.contHeight! * 0.5 : 0}%`
                }}>
                    <div className="sigOptionCont">
                    { options.map(el=>{
                        return(
                            <div 
                            className="optionDiv"
                            onClick={()=>{selectedOpt.current =  el.title ;set(!flag)}}
                            style={{backgroundColor: selectedOpt.current === el.title ? "white" : "transparent" }}
                            >
                                <span className="optionSpan">
                                <Image src={el.image}
                                unoptimized
                                width={35}
                                height={35}/>
                                </span>
             
                            </div>
                        )
                    })
                    }
                    </div>
                    {selectedOpt.current === "Image" ? 
                    <Dropzone accept={props.attribute.acceptedFormat}
                    onDrop={acceptedImg => {
                        getFileInfo(acceptedImg, (res: any | null) => {
                            updateImages(undefined,acceptedImg[0], res.width, res.height, res.name);
                        })
                    }}
                >
                    {({ getRootProps }) => (
                  <div 
                  className="sigContentCont"
                  {...getRootProps()}
                  >  
                    <SignatureImageSlot 
                    imgSize={img.data !== null ? {width:img.data.width, height:img.data.height } : null}
                    current={ img!.cropData !== null ? img!.cropData : img!.data !== null ? img!.data?.data : props.attribute.defaultFile } 
                    h={props.attribute.contHeight as number}
                    w={props.attribute.contWidth as number}
                    updateImages={updateImages}
                    acceptedFormat={props.attribute.acceptedFormat}
                    /> 
                         </div>
                    )}
                         </Dropzone>
                    : 
                    <div className="sigContentCont">  
                    <SignatureCanvas/>
                    </div>
                    }
           


            </div>
        </div>
    )


}

export default Signature