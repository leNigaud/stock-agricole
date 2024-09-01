import { useState } from "react";
import Modalsuccess from "./Modalsuccess";
import Modalerror from "./Modalerror";
import axios from "axios";

function Modaleditprovenance( {triggerUpdate, provenance,handleHideEdit} ) {
    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
        textAlign:'left',
        backgroundColor:'rgba(128, 128, 128, 0.75)'
    }

    const stylediv = {
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        padding:'40px'
    }


    const [data,setData] = useState(provenance)
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)

    const handleChange = (e) => {
        const {name,value} = e.target
        setData(prevdata => ({...prevdata,[name]:value}))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/provenances/${provenance.idP}`, data , {
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(res => {
              setSuccess(true)
              console.log(res.data)
            })
            .catch(err => {
                setModalerror(true)
                console.error("Erreur lors de la modicication du conteneur dans le menu modification:", err)
            });
    }   

    const hideModalSuccessModif = () => {
        setSuccess(false)
        handleHideEdit(provenance.idP)
        triggerUpdate()
    }

    const hideModalErrorModif = () => {
        setModalerror(false)

    }


    return (
        <div className='d-flex justify-content-center align-items-center' style={stylecontainer}>
            { success && <Modalsuccess hideModalSuccessModif={hideModalSuccessModif}/>}
            { modalerror && <Modalerror hideModalErrorModif={hideModalErrorModif}/>}    
            <form style={stylediv} onSubmit={handleOnSubmit} className="d-flex flex-column justify-content-center bg-white">
                <div  className='form-group mb-4'>
                    <label className="d-block mb-2" htmlFor="LieuP" >Provenance</label>
                    <input name="LieuP" id="LieuP" value={data.LieuP} onChange={handleChange} className='form-control' required/>
                </div>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <div><button type="submit" className="btn btn-success btn-md" style={{marginRight:'20px'}}>Modifier</button></div>
                    <div><button type='button' className="btn btn-secondary btn-md" onClick={() => handleHideEdit(provenance.idP)}>Annuler</button></div>
                </div>
            </form>
        </div>
    )
}

export default Modaleditprovenance;