import UserData from "./userData";

export default function Header(){   //api hdnn blporoththuwen tag eke nama thmi Header.kmthi nmk denn plwn.mek aniwaryenm dnn on
    console.log ("header component loading..")
    return (    
        <div className="bg-red-500">   {/*apit ekm clz eke clz godk hdnn plwn space thiy thiy*/}
            <h1 className="text-blue-950">hiiii</h1>         {/*tailwind css eke nthi mkk hri api denw nm manualy [] athule dnn plwn*/}
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, cupiditate.</p>
            <UserData></UserData>
        </div>
    )
}
