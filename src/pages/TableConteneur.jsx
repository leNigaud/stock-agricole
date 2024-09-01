import { useState, useEffect } from "react";
import Modaleditconteneur from "./Modaleditconteneur";
import iconedituser from './image/iconedituser.png'
import icondeleteuser from './image/icondeleteuser.png'

import Modalconfirm from "./Modalconfirm";
import Modalsuccess from "./Modalsuccess";
import Modalerror from "./Modalerror";
import axios from "axios";

function TableConteneur({conteneurs, typeConteneurs, triggerUpdate}) {
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

    const [edits,setEdits] = useState({})
    const [confirms,setConfirms] = useState({})
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)

    //edit pour conteneurs
    useEffect(() => {
        const initialEdits = {};
        const initialConfirms = {};
        conteneurs?.forEach(conteneur => {
            initialEdits[conteneur.idCont] = false;
            initialConfirms[conteneur.idCont] = false;
        });
        setEdits(initialEdits);
        setConfirms(initialConfirms)
    }, [conteneurs]);

    const handleEditClickConteneurs = (conteneurId) => {
        setEdits(prevEdits => ({
            ...prevEdits,
            [conteneurId]: true
        }));
    };

    const handleConfirmClickConteneurs = (conteneurId) => {
        setConfirms(prevConfirms => ({
            ...prevConfirms,
            [conteneurId]: true
        }));
    };

    const handleHideEdit = (id) => {
      setEdits(prevEdits => ({
        ...prevEdits,
        [id]: false // 
    }));
    };

    const handleHideConfirmConteneur = (id) => {
      setConfirms(prevConfirms => ({
        ...prevConfirms,
        [id]: false 
    }));
    };
 

    const handleConfirmDeleteConteneur = (idCont) => {
      handleHideConfirmConteneur(idCont)
      axios.delete(`http://localhost:8000/api/conteneurs/${idCont}`)
        .then(res => {
          setSuccess(true)
          console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de la suppression du conteneur :", err)
        });
    }
     
    const hideModalSuccessModif = () => {
      setSuccess(false)
      triggerUpdate()
    }

    const hideModalErrorModif = () => {
      setModalerror(false)
    }

          
    return (
        <table className='table table-bordered' style={{textAlign:'center'}}>
            { success && <Modalsuccess hideModalSuccessModif={hideModalSuccessModif}/> }
            { modalerror && <Modalerror hideModalErrorModif={hideModalErrorModif}/> }
            <thead>
              <tr>
                <th>Type</th>
                <th>Nom</th>
                <th>Capacité(en unités)</th>
                <th colSpan='2' style={{textAlign:'center'}}>Actions</th>
              </tr>
            </thead>

            <tbody>
              { conteneurs?.map(conteneur => (
              <tr key={conteneur.idCont}>
                  <td>{getTypeConteneur(conteneur.idCont)}</td>
                  <td>{conteneur.nom}</td>
                  <td>{conteneur.capacite}</td>
                  <td>
                    {edits[conteneur.idCont] && <Modaleditconteneur triggerUpdate={triggerUpdate} handleHideEdit={handleHideEdit} conteneur={conteneur} conteneurs={conteneurs} typeConteneurs={typeConteneurs}/>}
                    <button onClick={() => handleEditClickConteneurs(conteneur.idCont)} type='button' className="btn btn-success btn-md" >
                      <img src={iconedituser} alt="icon pour editer le conteneur"/>
                    </button>
                  </td>
                  <td>
                    {confirms[conteneur.idCont] && <Modalconfirm triggerUpdate={triggerUpdate} handleConfirmDeleteConteneur={handleConfirmDeleteConteneur}  handleHideConfirmConteneur={handleHideConfirmConteneur} idConteneurDeleted={conteneur.idCont} message="Voulez-vous vraiment supprimer ce conteneur?"/> }
                    <button onClick={()=> handleConfirmClickConteneurs(conteneur.idCont)} type='button' className="btn btn-danger btn-md">
                    <img src={icondeleteuser} alt="icon pour supprimer le conteneur"/>
                    </button>
                  </td>
              </tr>
              )) }
            </tbody>
        </table>
    )
}

export default TableConteneur