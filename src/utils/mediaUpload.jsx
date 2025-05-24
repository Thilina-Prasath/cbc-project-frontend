import { createClient } from "@supabase/supabase-js"

const url = "https://vdczxztsnthbpasddfog.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY3p4enRzbnRoYnBhc2RkZm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NTU2MjcsImV4cCI6MjA2MzQzMTYyN30.nWo2Z4jEsL5ZB_hjWXYXssyX6fTNQO49I0Y7bbhcwlg"

const supebase = createClient(url, key)  //superbase saha frontend ek athl connnection ek hdgnn

export default function mediaUpload(file){  //function ekk hdl ekt export krno mediaUpload ek.mediaUpload ek run klm superbase ekt file ek upload wenn on
     const mediaUploadPromise = new Promise(     //mekn wenne mediaUpload file ek run klm image supebase eket upload krnw kiyl promisses ekk wenne
        (resolve, reject)=>{

            if(file == null){      //file ekk awill nedd blno
                reject("No file selected")
                return
            }

            const timestamp = new Date().getTime()
            const newName = timestamp+file.name

            supebase.storage.from("images").upload(newName, file, {
                upsert:false,
                cacheControl:"3600"
            }).then(()=>{
                const publicUrl = supebase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)  //promisses ek hri nm run weno
            }).catch(
                ()=>{
                    reject("Error occured in supabase connection") //promisses ek werdi nm run weno
                }
            )
        }
    )

    return mediaUploadPromise

}