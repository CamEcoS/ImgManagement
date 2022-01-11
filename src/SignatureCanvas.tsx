import {useEffect,useRef, useState} from "react";
import SignaturePad from "react-signature-canvas";
import './sig.css'

const SignatureCanvas = () => {
      // go back to image when signature is saved
    const sigCanvas = useRef(null);

    useEffect(()=>{
    //@ts-ignore
    if (sessionStorage.getItem('signature'))(sigCanvas.current! as SignaturePad).fromData(JSON.parse(sessionStorage.getItem('signature')))
    function updateCropSize() {
    //@ts-ignore
        if (sessionStorage.getItem('signature'))(sigCanvas.current! as SignaturePad).fromData(JSON.parse(sessionStorage.getItem('signature')))
      }
      window.addEventListener('resize', updateCropSize);
      return () => window.removeEventListener('resize', updateCropSize);
    },[])

    
    function clear () {
        if (sessionStorage.getItem('signature')) sessionStorage.removeItem('signature');
        (sigCanvas.current! as SignaturePad).clear();
    }

    function localSave () {
        // const sigTrace = (sigCanvas.current! as SignaturePad).fromData(points!)
        //@ts-ignore
        sessionStorage.setItem('signature', JSON.stringify(sigCanvas.current!.toData()))
        //@ts-ignore
        console.log("543",JSON.parse(sessionStorage.getItem('signature')))
    }

    function updateImg () {
        const sigTrace =(sigCanvas.current! as SignaturePad).getTrimmedCanvas().toDataURL("image/png")
    }

    return (
        <>
            <SignaturePad 
            ref={sigCanvas}
            onEnd={()=>{localSave()}}
            clearOnResize={true}
            canvasProps={{
                className: "signatureCanvas"
              }}/>
              
            <button onClick={clear}>Clear</button>
  
        </>
    )


}

export default SignatureCanvas