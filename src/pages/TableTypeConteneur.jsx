import { useState, useEffect } from "react";
import Modalerror from "./Modalerror";
import Modalsuccess from "./Modalsuccess";
import iconedituser from './image/iconedituser.png'
import icondeleteuser from './image/icondeleteuser.png'
import axios from "axios";
import Modalconfirm from "./Modalconfirm";
import Modaledittypeconteneur from "./Modaledittypeconteneur";


const TableTypeConteneur = ({typeConteneurs,triggerUpdate}) => {
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)
    const [edits,setEdits] = useState({})
    const [confirms,setConfirms] = useState({})

    //edit pour le type conteneurs
    useEffect(() => {
        const initialEdits = {};
        const initialConfirms = {};
        typeConteneurs?.forEach(typeConteneur => {
            initialEdits[typeConteneur.idType] = false;
            initialConfirms[typeConteneur.idType] = false;
        });
        setEdits(initialEdits);
        setConfirms(initialConfirms)
    }, [typeConteneurs]);

    const handleEditClickTypeConteneurs = (typeConteneurId) => {
        setEdits(prevEdits => ({
            ...prevEdits,
            [typeConteneurId]: true
        }));
    };

    const handleConfirmClickTypeConteneurs = (typeConteneurId) => {
        setConfirms(prevConfirms => ({
            ...prevConfirms,
            [typeConteneurId]: true
        }));
    };

    const handleHideEdit = (id) => {
        setEdits(prevEdits => ({
          ...prevEdits,
          [id]: false // 
      }));
      };

    const handleHideConfirmTypeConteneur = (id) => {
      setConfirms(prevConfirms => ({
        ...prevConfirms,
        [id]: false 
        }));
    };

    const handleConfirmDeleteTypeConteneur = (idType) => {
        handleHideConfirmTypeConteneur(idType)
        axios.delete(`http://localhost:8000/api/typeConteneurs/${idType}`)
          .then(res => {
            setSuccess(true)
            console.log(res.data)
          })
          .catch(err => {
              setModalerror(true)
              console.error("Erreur lors de la suppression du type de conteneur :", err)
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
                <th colSpan='2' style={{textAlign:'center'}}>Actions</th>
            </tr>
            </thead>

            <tbody>
            { typeConteneurs?.map(typeConteneur => (
            <tr key={typeConteneur.idType}>
                <td>{typeConteneur.nom}</td>
                <td>
                    {edits[typeConteneur.idType] && <Modaledittypeconteneur triggerUpdate={triggerUpdate} handleHideEdit={handleHideEdit} typeConteneur={typeConteneur} />}
                    <button onClick={() => handleEditClickTypeConteneurs(typeConteneur.idType)} type='button' className="btn btn-success btn-md">
                    <img src={iconedituser} alt="icon pour editer le type de conteneur"/>
                    </button>
                </td>
                <td>
                    {confirms[typeConteneur.idType] && <Modalconfirm triggerUpdate={triggerUpdate} handleConfirmDeleteTypeConteneur={handleConfirmDeleteTypeConteneur}  handleHideConfirmTypeConteneur={handleHideConfirmTypeConteneur} idTypeConteneurDeleted={typeConteneur.idType} message="Voulez-vous vraiment supprimer ce type conteneur?"/> }
                    <button onClick={()=> handleConfirmClickTypeConteneurs(typeConteneur.idType)} type='button' className="btn btn-danger btn-md">
                    <img src={icondeleteuser} alt="icon pour editer le type de conteneur"/>
                    </button>
                </td>
            </tr>
            )) }
            </tbody>
        </table>
    )
}

export default TableTypeConteneur;