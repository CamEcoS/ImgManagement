import { useState } from 'react';
import './App.css';
import ImgSlots from './ImgSlots';
import { categoryCount } from './genTypes'
import EdImg from './assets/edit-image.png'
import imgDef from './assets/imgTemp.jpg'
import { textSize } from './alreadyExistant'


export default function App() {
  const [modal, setModal] = useState<boolean>(false)
  const [mainProps, set] = useState<categoryCount>({
    mandatoryTitles: ["Loft", "Pipes", "Floor"],
    optionalAmount: 10,
    acceptedFormat: "image/png, image/jpg, image/jpeg",
    defaultFile: imgDef,
    currentState: null, // for db data
    width: 150,
    height: 150
  })


  return (
    <div className="App">
      <div
        className="cropTrigger"
        style={{ width: window.innerWidth * 0.15, borderRadius: window.innerWidth * 0.075, zIndex: 0, position: "absolute" }}
        onClick={() => setModal(!modal)}

      >
        <img className="cropTrigImg" src={EdImg} />
        <h4
          className="cropTitle"
          style={{ color: "white", float: "left", top: 10, marginLeft: (window.innerWidth * 0.15 - textSize(20, modal ? "Close" : "Open", true)) * 0.5 - 15 }}
        >
          {modal ? "Close" : "Open"}
        </h4>
      </div>
      {/* main conponent below */}
      {modal ? <ImgSlots attribute={mainProps} /> : null}
    </div>
  );
}

;
