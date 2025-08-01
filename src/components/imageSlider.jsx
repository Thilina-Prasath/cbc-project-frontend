import { useState } from "react"

export default function ImageSlider(props){
    const images = props.images            // images arry tik kiyw gnn
    const [currentIndex, setCurrentIndex] = useState(0)

    return(
        <div className="w-[500px] h-[500px] ">    {/* image size ek */}
            <img src={images[currentIndex]}  className="w-full h-[500px] object-cover rounded-3xl"/>
            <div className="w-full h-[100px]  flex justify-center items-center">
                {
                    images?.map(
                        (image,index)=>{
                            return(
                                <img key={index} className={"w-[90px] h-[90px] m-2 rounded-2xl object-cover cursor-pointer hover:border-4 hover:border-accent "+(index==currentIndex&&"border-accent border-4")} src={image} onClick={
                                    ()=>{
                                        setCurrentIndex(index)    // images athr maru wenn plwn
                                    }
                                }/>
                            )                            
                        }
                    )
                }
            </div>

            
        </div>
    )
}