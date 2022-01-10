import React, { useState } from "react";
import EdImg from './assets/edit-image.png'
import { SigMain } from './genTypes'
import Image from 'next/image'
import './sig.css'
import SignatureCanvas from "./SignatureCanvas";
import SignatureImageSlot from "./SignatureImgSlot";

type SigOpt = {
    title: string
    image: string
}

type property = {
    attribute: SigMain
}

const Signature = (props: property) => {
    const [img, setImg] = useState<string | null >(null)
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
    const  [selectedOpt, setSelOpt] = useState<string>("Image")

    function updateImg (val:string) {
        setImg(val)
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
                            onClick={()=>{setSelOpt(el.title)}}
                            style={{backgroundColor: selectedOpt === el.title ? "white" : "transparent" }}
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
                <div className="sigContentCont">
                    {selectedOpt === "Image" ? <SignatureImageSlot current={img === null ? props.attribute.defaultFile : img}/> :<SignatureCanvas/>}
                </div>


            </div>
        </div>
    )


}

export default Signature