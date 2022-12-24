import React, { useState } from "react"
import { calculateAspectRatioFit } from "../../utils/utils";
import { Icon } from "../Icon";

export const UploadFileButton = (props: {className?:string, onUpload?:(e:any)=>void }) => {
    const [file, setFile] = useState(null);
    const handleFileChange = (e:any)=>{
        console.log("handleFileChange",e);
        var reader = new FileReader();
        reader.onload = function(event:any){
            var img = new Image();
            img.onload = function(){
                if(!props.onUpload){ return }
                const size = calculateAspectRatioFit(img.width, img.height, 200, 200);
                console.log(img,"IMG", size );
                props.onUpload({src: event.target.result, width: size.width, height: size.height})
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);   
    }
    return (
        <div key="asdasd" className=" w-10 h-10">
            <label htmlFor="upload" className="box-border overflow-hidden w-10 h-10 p-0 bg-blue-500 text-white hover:bg-blue-400 first:rounded-t-lg last:rounded-b-lg flex items-center justify-center mx-0 outline-none focus:shadow-outline">
                <Icon className=" fill-slate-800 dark:fill-white w-6 h-6 " icon='upload' />
                <input onChange={handleFileChange} className="absolute invisible t-0 l-0" name="upload" id="upload" type="file" />
            </label>
            
        </div>
    )
}


/*

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />


*/