import { useState } from 'react';
import './App.css';
import ImgSlots from './ImgSlots';
import { categoryCount } from './genTypes'
import imgDef from './assets/imgTemp.jpg'


export default function App() {
  const [mainProps, set] = useState<categoryCount>({
    mandatoryTitles: ["Loft", "Pipes", "Floor"],
    optionalAmount: 10,
    acceptedFormat: "image/png, image/jpg, image/jpeg",
    defaultFile: imgDef,
    currentState: null, // for db data
    width: 70,
    height: 70
  })

  return (
    <div className="App">
      <ImgSlots attribute={mainProps} />
    </div>
  );
}

;
