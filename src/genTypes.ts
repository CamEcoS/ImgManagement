export type categoryCount = {
    mandatoryTitles: string[]
    optionalAmount?: number | null
    acceptedFormat: string
    defaultFile: string
    currentState: imageToIndicator[] | null
    width: number
    height: number
    contHeight?: Number | null
    contWidth?: Number | null
    closeModal?:any
}


export type SigMain = {
    defaultFile: string
    currentState: SigRetrivedData[] | null
    acceptedFormat: string
    contHeight?: Number | null
    contWidth?: Number | null
    closeModal?:any
}


type SigRetrivedData = {
    data: string
    cropData: string | null
}

type imageToIndicator = {
    data: string
    cropData: string | null
    indicator: number
    optionalTitle: string | null
}

export type ImgObj = {
    data: dataObject | null
    title: string
    cropData: string | null
    type: string
}

export type dataObject = {
    data: string
    width: number
    height: number
}

export type ControlObj = {
    data: string | null
    title: string
}


