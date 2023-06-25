import React, {useState, useEffect, useRef } from 'react'
import './write.scss'
import FileAdd from '../../images/file_add.svg'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import swal from 'sweetalert'
import AsyncSelect from 'react-select/async'

export default function Write() {
    const {user} = useContext(Context)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [cats, setCats] = useState([])
    const [catPost, setCatPost] = useState([])
    const [file, setFile] = useState(null)
    const axiosInstance = axios.create({baseURL:"https://api.baluartear.com/api/"})

    const [toggle, setToggle] = useState(false)
    const [links, setLinks] = useState([])
    const inputRef = useRef();
    const selectRef = useRef();

    const [images, setImages] = useState([])
    const [img, setImg] = useState(null)
    const [toggleImages, setToggleImages] = useState(false)
    const imgRef = useRef();
    const PF = 'https://api.baluartear.com/images/'


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
            username: user.username,
            desc,
            categories: catPost,
            links,
            images,
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

    const addBtnClick = (e) => {
        e.preventDefault();
        setToggle(true);
      };

      const handleAddField = (e) => {
        e.preventDefault();
        const linksAdd = [...links];
        linksAdd.push({
          name: inputRef.current.value,
          link: selectRef.current.value,
        });
        setLinks(linksAdd);
        setToggle(false);
      };

      const addBtnClickImg = (e) => {
        e.preventDefault();
        setToggleImages(true);
      };

      const handleImgField = async (e) => {
        e.preventDefault();
        console.log(imgRef.current.value)
        const imagesAdd = [...images];
        let imageURL = null;
        if(img) {
            const data = new FormData()
            const filename = Date.now() + img.name
            data.append("name",filename)
            data.append("file",img)
            imageURL = filename
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
        imagesAdd.push({
            photo: imageURL,
            desc: imgRef.current.value,
        });
        console.log(imageURL)
        setImages(imagesAdd);
        setToggleImages(false);
        setImg(null);
        };



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

            <div className="write__form-links">
                <h2 className="write__form-links-title">Enlaces de la pagina</h2>
                {links && links.size !== 0 && (
                    links.map(link => (
                        <div className="write__form-links-show">
                            <p className="write__form-links-show-name">{link.name}</p>
                            <p className="write__form-links-show-name">{link.link}</p>
                        </div>
                    ))
                )}

                {!toggle ? (
                    <button className="write__form-links-btn" onClick={addBtnClick}>Agregar mas links</button>
                )
                : (
                    <div className="write__form-links-container">
                        <input type="text" placeholder='Nombre..' ref={inputRef} className="write__form-links-name" />
                        <input type="text" placeholder='Link..' ref={selectRef} className="write__form-links-link" />
                        <button className="write__form-links-btn" onClick={handleAddField}>Agregar</button>
                    </div>
                )}
            </div>
            <div className="write__form-images">
                <h2 className="write__form-images-title">Imagenes Adicionales</h2>
                {images.length !== 0 && (
                    images.map(image => (
                        <div className="write__form-images-show">
                            <img src={PF + image.photo} alt="Imagen" className="write__form-images-img" />
                            <p className="write__form-images-describtion">
                                {image.desc}
                            </p>
                        </div>
                    ))
                )}

                {img && (
                    <img src={URL.createObjectURL(img)} alt="Imagen" className="write__form-images-img" />
                )}

                {!toggleImages ? (
                    <button style={{width:"200px"}} className="write__form-links-btn" onClick={addBtnClickImg}>Agregar mas imagenes</button>
                ) : (
                    <div className="write__form-images-add">
                        <label htmlFor="imgInput" className="write__form-label">
                            <img style={{marginBottom: "10px"}} src={FileAdd} alt="Agregar Imagen" className="write__form-icon" />
                        </label>
                        <input type="file" id="imgInput" style={{display: "none"}} className="write__form-file" onChange={e => setImg(e.target.files[0])}  />
                        <input type="text" placeholder='Descripcion..' ref={imgRef} className="write__form-links-link" style={{marginLeft: "10px"}} />
                        <button className="write__form-links-btn" style={{marginLeft: "20px"}} onClick={handleImgField}>Agregar</button>
                    </div>
                )}
            </div>
            <button className="write__form-button" type="submit">Publicar</button>
        </form>
    </div>
    <Footer/>
    </>
  )
}
