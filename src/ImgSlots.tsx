import React, { useState, useEffect, useRef, ReactElement, useLayoutEffect } from "react";
import { categoryCount, ImgObj } from './genTypes'
import Image from 'next/image'
import './img.css'
import SlotsModal from './ImgControlSection'
import { getBase64, getFileInfo } from './alreadyExistant'
import Dropzone, { DropzoneProps } from 'react-dropzone'
import Cropping from "./Cropping";
import add from './assets/add.png'

type property = {
    attribute: categoryCount
}

const ImageSlots = (props: property) => {

    const addButtonSize = props.attribute.width < 100 ? props.attribute.width / 2.2 : 50
    const [imgObj, setImgObj] = useState<ImgObj[]>()
    const [flag, setFlag] = useState<boolean>(false)
    const clickedImgIdx = useRef<number | null>(null)
    const [showCrop, setShowCrop] = useState<boolean>(false)
    const editTitle = useRef<boolean>(false)
    const disableCrop = useRef<boolean>(false)




    useEffect(() => {
        if (editTitle.current === false) {
            //    if (clickedImgIdx.current !== null && imgObj![clickedImgIdx.current].data !== null) {
            //        //here
            //     if (imgObj![clickedImgIdx.current].data?.width! / imgObj![clickedImgIdx.current].data?.height! !== props.attribute.width / props.attribute.height) showCropCall(!showCrop)
            //     else { if (showCrop) showCropCall(!showCrop) }
            // }
        } else { editTitle.current = false }
    }, [imgObj])

    useEffect(() => {
        let arr: ImgObj[] = []
        let i = 0

        while (i < props.attribute.mandatoryTitles.length) {
            arr.push({
                data: null, //here currentState
                title: props.attribute.mandatoryTitles[i],
                cropData: null, //here currentState
                type: "Mandatory"
            })
            i++
        }

        i = 0

        while (i < props.attribute.optionalAmount!) {
            arr.push({
                data: null, //here currentState
                title: `Image ${i + 1}`,
                cropData: null, //here currentState
                type: "Optional"
            })
            i++
        }
        setImgObj([...arr])
    }, [])




    function updateImages(index: number, val: File | File[] | string | null, width?: number, height?: number, name?: string): void {
        const condition = (index + 1) - props.attribute.mandatoryTitles.length
        if (val !== undefined) {
            if (val !== null) {
                typeof val === "string" ? setImgObj(imgObj!.map((el, i) => i === index ? { ...el, cropData: val } : el))
                    : getBase64(val, (t: any) => setImgObj(imgObj!.map((el, i) => i === index ? { ...el, data: { data: t, width: width!, height: height! }, title: el.type === "Mandatory" ? el.title : name!, cropData: null } : el)))
            }
            else setImgObj(imgObj!.map((el, i) => i === index ? { data: val, title: condition > 0 ? `Image ${condition}` : el.title, cropData: val, type: el.type } : el))
        }
    }

    function showCropCall(crop: boolean) {
        crop ? disableCrop.current = false : disableCrop.current = true
        setShowCrop(!showCrop)
    }

    function mappedBody(el: ImgObj, i: number, styleCondition: boolean): ReactElement {
        return (<Dropzone key={i} accept={props.attribute.acceptedFormat}
            onDrop={acceptedImg => {
                clickedImgIdx.current = i
                getFileInfo(acceptedImg, (res: any | null) => {
                    updateImages(i, acceptedImg[0], res.width, res.height, res.name);
                })
            }}
        >
            {({ getRootProps }) => (

                <div key={i}
                    id={`${i}`}
                    {...getRootProps()}
                    className="imgCont"
                    style={{ display: "inline-block", marginBottom: 30 + (clickedImgIdx.current === i ? 30 : 0) }}
                >
                    {i === 0 || styleCondition ? <h3 style={{ cursor: "default" }}>{imgObj![i].type}</h3> : null}

                    <label
                        onClick={() => { clickedImgIdx.current = i; setFlag(!flag) }} style={{ width: props.attribute.width, height: props.attribute.height, cursor: "pointer" }} className="imgStyle"
                    >
                        <Image key={i}
                            unoptimized
                            priority={clickedImgIdx.current === i ? true : false}
                            data-testid={`Img ${i}`}
                            onLoad={(e) => { }}
                            src={el.data === null ? props.attribute.defaultFile : el.cropData !== null && el.data !== null ? el.cropData : el.data?.data}
                            width={props.attribute.width}
                            height={props.attribute.height}
                        />
                        {el.data === null ? <input
                            id="retrieveFile"
                            className="imgSelect"
                            type="file"
                            name="upload"
                            onChange={e => {
                                getFileInfo(e.target.files!, (res: any | null) => {
                                    updateImages(clickedImgIdx.current!, e.target.files![0], res.width, res.height);
                                    e.target.value = ''
                                })
                            }}
                        /> : null}
                    </label>


                    <form onSubmit={(e) => { e.preventDefault(); (document.activeElement! as HTMLElement).blur() }}>
                        <input
                            style={{
                                cursor: el.type === "Mandatory" ? "default" : "text",
                                fontSize: "1em",
                                textAlign: "center",
                                fontWeight: "bolder", border: "none",
                                width: props.attribute.width
                            }}
                            value={el.title}
                            readOnly={el.type === "Mandatory" ? true : false}
                            onChange={(e) => { editTitle.current = true; setImgObj(imgObj!.map((element, idx) => idx === i ? { ...el, title: e.target.value } : element)) }}
                        />
                    </form>

                    {clickedImgIdx.current === i && el.data !== null ?
                        <SlotsModal key={i}
                            state={imgObj!}
                            data={el.data?.data!}
                            index={i}
                            width={props.attribute.width}
                            height={props.attribute.height}
                            acceptedFormat={props.attribute.acceptedFormat}
                            imgUpdate={updateImages}
                            showCrop={showCropCall} />
                        :
                        null
                    }

                </div>
            )}
        </Dropzone>
        )
    }

    return (
        <div className="mainCont">
            <div className="secondCont"
                style={{
                    width: `${typeof props.attribute.contWidth === "number" ? props.attribute.contWidth : 100}%`,
                    height: `${typeof props.attribute.contHeight === "number" ? props.attribute.contHeight : 100}%`,
                    left: `${typeof props.attribute.contWidth === "number" ? 50 - props.attribute.contWidth!*0.5 : 0 }%`,
                    top: `${typeof props.attribute.contHeight === "number" ? 50 - props.attribute.contHeight!*0.5 : 0 }%`
                }}>
                {showCrop ? <Cropping
                    data={clickedImgIdx.current !== null ? imgObj![clickedImgIdx.current] : null}
                    clickedIndex={clickedImgIdx.current}
                    imgUpdate={updateImages}
                    showCrop={showCropCall}
                    disable={disableCrop.current}
                    width={props.attribute.width}
                    height={props.attribute.height}
                /> : null}
                {imgObj?.map((el, i) => {
                    const styleCondition = i !== 0 && imgObj![i - 1].type !== imgObj![i].type
                    return (
                        styleCondition ? <> <br />  {mappedBody(el, i, styleCondition)} </> : mappedBody(el, i, styleCondition)
                    )
                })
                }
                <div
                    id="addButton"
                    onClick={(e) => {
                        setImgObj([...imgObj!, {
                            data: null,
                            title: `Image ${imgObj?.length! - props.attribute.mandatoryTitles.length + 1}`,
                            cropData: null,
                            type: "Optional",
                        }])
                    }}

                    className="addButton"
                    style={{ width: props.attribute.width, height: props.attribute.height, position: "relative" }}
                >
                    <Image
                        key={imgObj?.length! - props.attribute.mandatoryTitles.length + 1}
                        unoptimized
                        data-testid={`Img Add`}
                        onLoad={(e) => { }}
                        src={add}
                        width={addButtonSize}
                        height={addButtonSize}
                    />

                </div>

            </div>
        </div>
    )
}

export default ImageSlots