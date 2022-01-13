import { useEffect, useRef, useState, useLayoutEffect } from "react";
import SignaturePad from "react-signature-canvas";
import './sig.css'
import { bench } from './genTypes'
import eraser from './assets/eraser.png'
import sigTypeIcon from './assets/sigTypeIcon.png'
import { Stage, Layer, Text, Rect } from 'react-konva';
import sidDrawIcon from './assets/sigDrawIcon.png'


type SigCanvProps = {
    updateImages: (index: number | undefined, val: string | null, width?: number, height?: number) => void
    bench: bench
    changeOption: (title: string, enabled: boolean) => void
    imgEnabled: boolean
    sizeBenchUpdate: (w: number, h: number) => void
    h:number
    w:number
}

const SignatureCanvas = (props: SigCanvProps) => {

    const [hoveredTitle, setHoveredTitle] = useState<string | null>(null)
    const [size, setSize] = useState<number[]>([window.innerWidth, window.innerHeight]);
    const [typeValue, setTypeValue] = useState<string>("")
    const [mode, setMode] = useState<string>("draw") //type
    const [flag, set] = useState(false)
    const sigCanvas = useRef(null);
    const sizeHBench = size[1] * (props.h * 0.01) * 0.7
    const sizeWBench = size[0] * (props.w * 0.01)
    const sigOptions = [
        {
            title:"draw",
            img:sidDrawIcon

        },
        {
            title:"type",
            img:sigTypeIcon
        }
    ]


    useEffect(() => {
        console.log("mounted")
        // if session is type or draw then select mode based on that
        //@ts-ignore
        // if type or draw
        // type value
        function updateSignatureSize() {
            // if type
                //@ts-ignore
            if (sessionStorage.getItem('signatureDraw') !== null && JSON.parse(sessionStorage.getItem('signatureDraw')!).length > 0 && sigCanvas.current._sigPad) (sigCanvas.current! as SignaturePad).fromData(JSON.parse(sessionStorage.getItem('signatureDraw')!))
            
        }
        window.addEventListener('resize', updateSignatureSize);
        return () => window.removeEventListener('resize', updateSignatureSize);
    }, [])

    useLayoutEffect(() => {
        function updateSize() {
            console.log("9595859",sizeHBench)
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        props.sizeBenchUpdate(sizeWBench, sizeHBench)
    }, [size])



    useEffect(() => {
        if (mode !== "draw"){
        if(typeValue === "") sessionStorage.removeItem("signatureType");
        else sessionStorage.setItem('signatureType',JSON.stringify(typeValue));
        }
    }, [typeValue])

    useEffect(() => {
        console.log("logged",mode )
        if (mode === "draw"){
            //text
            //@ts-ignore
        if (sessionStorage.getItem('signatureDraw') &&  JSON.parse(sessionStorage.getItem('signatureDraw')).length > 0) (sigCanvas.current! as SignaturePad).fromData(JSON.parse(sessionStorage.getItem('signatureDraw')))
        } else if (sessionStorage.getItem('signatureType')) setTypeValue(JSON.parse(sessionStorage.getItem('signatureType')!))
    }, [mode])

    function clear() {
        if (mode === "draw"){
        if (sessionStorage.getItem('signatureDraw')) sessionStorage.removeItem('signatureDraw');
         (sigCanvas.current! as SignaturePad).clear(); set(!flag)
    }
        else {sessionStorage.getItem('signatureType'); setTypeValue("")}
      
    }

    function localSave() {
        //@ts-ignore
        // if type
        sessionStorage.setItem('signatureDraw', JSON.stringify(sigCanvas.current!.toData()))
        set(!flag)
    }

    function updateImg() {
         //@ts-ignore
        if (mode === "draw"){
             //@ts-ignore
        if (sessionStorage.getItem('signatureDraw') &&  JSON.parse(sessionStorage.getItem('signatureDraw')).length > 0) {
            props.updateImages(undefined, (sigCanvas.current! as SignaturePad).getTrimmedCanvas().toDataURL("image/png"), props.bench.width, props.bench.height );
            // send to db use Session storage to store previous call to avoid multiple calls
            props.changeOption("Image", props.imgEnabled)
        }
    } 
       else {
           //@ts-ignore
           if(typeof JSON.parse(sessionStorage.getItem('signatureType')) === "string"){
           //@ts-ignore
           props.updateImages(undefined, (sigCanvas.current as HTMLCanvasElement).toDataURL({ mimeType: 'image/png', width: sizeWBench, height: sizeHBench*0.195, quality: 2, pixelRadio: 1, }), sizeWBench, sizeHBench*0.195);
            // send to db use Session storage to store previous call to avoid multiple calls
           props.changeOption("Image", props.imgEnabled)
           }
       }

    }


    return (
        <>
            { mode === "draw" ? <SignaturePad
                ref={sigCanvas}
                onEnd={() => { localSave() }}
                clearOnResize={true}
                backgroundColor={"white"}
                canvasProps={{
                    className: "signatureCanvas"
                }} /> :
                <div className="signatureCanvas">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            value={typeValue}
                            onChange={(e) => setTypeValue(e.target.value)}
                            className="typeInp"
                            placeholder="Text here"
                        />
                    </form>
                    <Stage 
                    id="Stage"
                    ref={sigCanvas}
                    className="typeStage"
                    x={0} 
                    width={sizeWBench} 
                    height={sizeHBench*0.195}
   
                    >
                        <Layer>
                        <Rect
                            width={sizeWBench}
                            height={sizeHBench*0.195}
                            x={0}
                            y={0}
                            fill={"white"}
                        />
                            <Text
                                fontSize={sizeHBench*0.195}
                                text={typeValue}
                                x={0}
                                fontFamily="Tangerine"
                                wrap="char"
                                align="center"
                                width={sizeWBench}
                            />
                        </Layer>
                    </Stage>
                </div>
            }

            <img src={eraser} className="clear" onClick={clear} />
            <div 
      className="titleDisplay" 
      style={{
        top:"108%",
       color: "white" , 
       fontSize:15, 
       marginLeft: "8%"
         }}>
        {hoveredTitle}
      </div>
            <div className="sigModeCont">
            {
                sigOptions.map(el=>{
                    return(
                        <div
                        className="optionDiv"
                        style={{ backgroundColor: mode === el.title ? "white" : "transparent" }}
                    >
                        <img 
                        src={el.img} 
                        onClick={()=>{setMode(el.title)}}
                        className="sigOptions"
                        onMouseEnter={_ => { setHoveredTitle(el.title) }}
                        onMouseLeave={_ => { setHoveredTitle(null) }}
                        />
                        </div>
                    )
                })
            }
            </div>

            <span className="save"
                style={{ backgroundColor: (mode === "draw" && sessionStorage.getItem('signatureDraw') &&  JSON.parse(sessionStorage.getItem('signatureDraw')!).length > 0) || (mode === "type" && sessionStorage.getItem('signatureType')) ? "rgb(42, 173, 190)" : "silver" }}
                onClick={updateImg}
            >
                Save and view
            </span>


        </>
    )


}

export default SignatureCanvas