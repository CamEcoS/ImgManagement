import React, { useState } from "react";
import Image from 'next/image'
import './sig.css'

type imgSlot = {
    current: string
}

const SignatureImgSlot = (props:imgSlot) =>{

    return(
        <div className="sigImgCont">
            <Image
            priority
            unoptimized
            src={props.current}
            width={1000}
            height={1000}
            />
        </div>
    )
}

export default SignatureImgSlot