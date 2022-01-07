import React, { useState, useEffect } from "react";
import './img.css'
import { ControlObj, ImgObj } from './genTypes'
import imgDef from './assets/imgTemp.jpg'
import Del from './assets/delete.png'
import EdImg from './assets/edit-image.png'
import FScreen from './assets/fullscreen.png'
import CropImg from './assets/crop.png'
import { getFileInfo, textSize } from './alreadyExistant'


type ImgReactions = {
  index: number
  data: string | null
  state: ImgObj[]
  acceptedFormat: string
  width: number
  height: number
  imgUpdate: (index: number, val: File | null, width?: number, height?: number) => void
  showCrop: (crop: boolean) => void
  signature?:boolean

}

const ImgControlSection = (props: ImgReactions) => {

  const optionSize:number = props.width >= 150 ? 30 : props.width/5
  const optionPos:number = optionSize*0.155
  const fontS:number = props.width < 150 ? 15 - (150 - optionSize)/(100/3) : props.width <= 50 ? 12 : 15
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null)
  const options: ControlObj[] = [
    {
      data: EdImg,
      title: "Edit image"
    },

    {
      data: FScreen,
      title: "Full screen"
    },

    {
      data: CropImg,
      title: "Crop"
    },

    {
      data: Del,
      title: "Delete"
    }

  ]



  return (
    <>
      <div className="controlLayer" style={{ width: props.width, height: optionSize, borderRadius: props.width * 0.5 }}>
        {
          options.map((el, i) => {
            return (
              <span
                key={i}
                className="options"
                onMouseEnter={_ => { setHoveredTitle(el.title) }}
                onMouseLeave={_ => { setHoveredTitle(null) }}
                onClick={() => {
                  if (el.title !== "Edit image") {
                    el.title === "Delete" ? props.imgUpdate(props.index, null) :
                      props.showCrop(el.title === "Crop" ? true : false)
                  }
                }}
                style={{ marginRight: i === options.length - 1 ? 0 : (props.width-optionSize*4)/3 }}
              >
                <label
                  className="optionButton"
                  style={{ width: optionSize, height: optionSize, borderRadius: props.width * 0.5, backgroundColor: "white" }}
                >
                  <img className="optionsImg" style={{top: optionPos, left:optionPos, width: optionSize*0.69, height: optionSize*0.69 }} src={el.data!} />
                  {
                    el.title === "Edit image" ?
                      <input
                        id="retrieveFile"
                        className="imgSelect"
                        type="file"
                        name="upload"
                        accept={props.acceptedFormat}
                        onChange={e => {
                          getFileInfo(e.target.files!, (res: any | null) => {
                            props.imgUpdate(props.index, e.target.files![0], res.width, res.height);
                            e.target.value = ''
                          })
                        }} />
                      : null
                  }
                </label>
              </span>
            )
          })
        }
      </div>
      <div className="titleDisplay" style={{ fontSize:fontS, marginLeft: props.width * 0.5 - textSize(fontS, hoveredTitle, true) * 0.5 }}>
        {hoveredTitle}
      </div>
    </>
  )
}

export default ImgControlSection