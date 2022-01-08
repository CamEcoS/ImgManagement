import React, {useEffect,useRef, useState} from "react";
import SignaturePad from "react-signature-canvas";
import './sig.css'

const SignatureCanvas = () => {
    const [imageURL, setImageURL] = useState(null);
    const sigCanvas = useRef(null);

    const clear = () => (sigCanvas.current! as SignaturePad).clear();
    // const save = () =>
    // setImageURL((sigCanvas.current! as SignaturePad).getTrimmedCanvas().toDataURL("image/png"));

    return (
        <>
            <SignaturePad 
            ref={sigCanvas}
            canvasProps={{
                className: "signatureCanvas"
              }}/>
            <button onClick={clear}>Clear</button>
  
        </>
    )


}

export default SignatureCanvas