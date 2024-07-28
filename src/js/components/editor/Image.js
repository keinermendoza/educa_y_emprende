import Image from "@editorjs/image"
import {axiosInstance} from "../../services/axios"

export default class CustomImage extends Image {
      removed() {
        const { file } = this._data
        console.log(file)
        axiosInstance.delete(`cursos/${id}/image/delete/`)
        .then(resp => console.log(resp))
        
        }
   }