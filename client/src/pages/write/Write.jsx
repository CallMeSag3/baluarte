import React, {useState, useEffect } from 'react'
import './write.scss'
import FileAdd from '../../images/file_add.svg'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import swal from 'sweetalert'
import AsyncSelect from 'react-select/async'

export default function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [cats, setCats] = useState([])
    const [catPost, setCatPost] = useState([])
    const [file, setFile] = useState(null)
    const axiosInstance = axios.create({baseURL:"https://api.baluartear.com/api/"})


    const handleCheck = (selectedOption) => {
        setCatPost(selectedOption.map(o => (
            o.name
        )))
        console.log(catPost)
    }

    const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
            const filteredOptions = cats.filter((c) => c.label.toLowerCase().includes(searchValue.toLowerCase()))
            console.log("loadOptions", searchValue, filteredOptions)
            callback(filteredOptions)
        }, 2000)
    }

    useEffect(() => {
        const getCats = async () => {
          const res = await axiosInstance.get('/categories')
          setCats(res.data)
        }
        getCats()
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            title,
            desc,
            categories: catPost,
        }
        if(file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name",filename)
            data.append("file",file)
            newPost.photo = filename
            try{
                await axiosInstance.post("/upload", data)
            } catch (err) {
                swal ({
                    title: "Oops!",
                    text: "Intente nuevamente!" ,
                    icon: "error",
                    button: "OK",
                    dangerMode:true,
                  })
            }
        }
        try {
           const res = await axiosInstance.post("/posts", newPost)
           window.location.replace("/post/" + res.data._id)
        } catch (err) {
            console.log(err)
            swal ({
                title: "Oops!",
                text: "Intente nuevamente!" ,
                icon: "error",
                button: "OK",
                dangerMode:true,
              })
        }
    }

  return (
    <>
    <div className='write'>
            {file && (
                <img src={URL.createObjectURL(file)} alt="Imagen Posteo" className="write__image" />

            )}
        <form action="post" className="write__form" onSubmit={handleSubmit}>
            <div className="write__form-container">
                <label htmlFor="fileInput" className="write__form-label">
                    <img src={FileAdd} alt="Agregar" className="write__form-icon" />
                </label>
                <input type="file" id="fileInput" style={{display: "none"}} className="write__form-file" onChange={e=>setFile(e.target.files[0])}  />
                <input type="text" placeholder='Titulo..' className="write__form-post-title" onChange={e=>setTitle(e.target.value)} required={true} />
                <AsyncSelect loadOptions={loadOptions} onChange={handleCheck} placeholder="Categorias" isMulti defaultOptions style={{width:"20%", borderRadius:"20px"}} />
            </div>
            <div className="write__form-container">
                <textarea className='write__form-textarea' placeholder='Escriba el texto a publicar..' type="text" onChange={e=>setDesc(e.target.value)} required={true}></textarea>
            </div>
            <button className="write__form-button" type="submit">Publicar</button>
        </form>
    </div>
    <Footer/>
    </>
  )
}
