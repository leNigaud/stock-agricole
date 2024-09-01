import { useState } from "react";
import Modalsuccess from "./Modalsuccess";
import Modalerror from "./Modalerror";
import axios from "axios";

function Modaleditconteneur( {triggerUpdate, conteneur,conteneurs, typeConteneurs, handleHideEdit} ) {
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

    //fonction pour récupérer le type de conteneur
    function getTypeConteneur(conteneurId) {
        const conteneur = conteneurs.find(cont => cont.idCont === conteneurId);
        if (conteneur) {
          const typeConteneur = typeConteneurs.find(type => type.idType === conteneur.type);
          return typeConteneur ? typeConteneur.nom : "Type de conteneur inconnu";
        } else {
          return "Conteneur non trouvé";
        }
    }


    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)

    const [data,setData] = useState(conteneur)

    const handleChange = (e) => {
        const {name,value} = e.target
        setData(prevdata => ({...prevdata,[name]:value}))
    }

    const handleOnSubmit = async (e) => {
        console.log(data)
        e.preventDefault()
        axios.put(`https://laravel-deploy-test-three.vercel.app/api/api/conteneurs/${conteneur.idCont}`, data , {
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
        handleHideEdit(conteneur.idCont)
        triggerUpdate()
    }

    const hideModalErrorModif = () => {
        setModalerror(false)
    }



    return (
        <div className='d-flex justify-content-center align-items-center' style={stylecontainer}>
            { success && <Modalsuccess hideModalSuccessModif={hideModalSuccessModif} />}
            { modalerror && <Modalerror hideModalErrorModif={hideModalErrorModif}/>}
            <form onSubmit={handleOnSubmit} style={stylediv}  className="d-flex flex-column justify-content-center bg-white">
                <div className="mb-2">
                    <label className="d-block mb-2" htmlFor="type">Type</label>
                    <select name="type" id="type" onChange={handleChange} className="form-select">
                        { typeConteneurs?.map(typeConteneur=> ( <option selected={getTypeConteneur(data.idCont) == typeConteneur.nom} key={typeConteneur.idType}  value={typeConteneur.idType}> {typeConteneur.nom} </option> ) ) }
                    </select>
                </div>
                <div  className='form-group mb-2'>
                    <label className="d-block mb-2" htmlFor="nom">Nom</label>
                    <input name="nom" id="nom" value={data.nom} onChange={handleChange} className='form-control' required/>
                </div>
                <div  className='form-group mb-4'>
                    <label className="d-block mb-2" htmlFor="capacite">Capacité</label>
                    <input name="capacite" id="capacite" value={data.capacite} onChange={handleChange} type="number" className='form-control' min="0" required/>
                </div>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                        <div><button type="submit" className="btn btn-success btn-md" style={{marginRight:'20px'}} >Modifier</button></div>
                        <div><button type='button' className="btn btn-secondary btn-md" 
                            onClick={()=>handleHideEdit(conteneur.idCont)}>
                        Annuler</button></div>
                </div>
            </form>
        </div>
    )
}

export default Modaleditconteneur;