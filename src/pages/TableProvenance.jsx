import { useState, useEffect } from "react";
import Modaleditprovenance from "./Modaleditprovenance";
import iconedituser from './image/iconedituser.png'
import icondeleteuser from './image/icondeleteuser.png'
import Modalconfirm from "./Modalconfirm";
import Modalsuccess from "./Modalsuccess";
import Modalerror from "./Modalerror";
import axios from "axios";


function TableProvenance({provenances, triggerUpdate}) {

    const [edits,setEdits] = useState({})
    const [confirms,setConfirms] = useState({})
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)

    //edit pour provenance
    useEffect(() => {
        const initialEdits = {};
        const initialConfirms = {};
        provenances?.forEach(provenance => {
            initialEdits[provenance.idP] = false;
            initialConfirms[provenance.idP] = false;
        });
        setEdits(initialEdits);
        setConfirms(initialConfirms);
    }, [provenances]);

    const handleEditClickProvenances = (provenanceId) => {
        setEdits(prevEdits => ({
            ...prevEdits,
            [provenanceId]: true // Mettre à jour l'état de la catégorie spécifique à true
        }));
      };

    const handleConfirmClickProvenances = (provenanceId) => {
        setConfirms(prevConfirms => ({
            ...prevConfirms,
            [provenanceId]: true // Mettre à jour l'état de la catégorie spécifique à true
        }));
      };

    const handleHideEdit = (id) => {
      setEdits(prevEdits => ({
        ...prevEdits,
        [id]: false // Mettre à jour l'état de la catégorie spécifique à true
      }));
    };

    const handleHideConfirmProvenance = (id) => {
      setConfirms(prevConfirms => ({
        ...prevConfirms,
        [id]: false // Mettre à jour l'état de la catégorie spécifique à true
      }));
    };

    const handleConfirmDeleteProvenance = (idP) => {
      handleHideConfirmProvenance(idP)
      axios.delete(`https://laravel-deploy-test-three.vercel.app/api/api/provenances/${idP}`)
        .then(res => {
          setSuccess(true)
          console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de la suppression de la provenance :", err)
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
                <th>Provenance</th>
                <th colSpan='2' style={{textAlign:'center'}}>Actions</th>
              </tr>
            </thead>

            <tbody>
              { provenances?.map(provenance=>(
                <tr key={provenance.idP}>
                  <td>{provenance.LieuP}</td>
                  <td>
                    {edits[provenance.idP] && <Modaleditprovenance triggerUpdate={triggerUpdate} provenance={provenance} handleHideEdit={handleHideEdit}/>}
                    <button onClick={()=> handleEditClickProvenances(provenance.idP)} type='button' className="btn btn-success btn-md">
                      <img src={iconedituser} alt="icon pour editer la provenance"/>
                    </button>
                  </td>
                  <td>
                    {confirms[provenance.idP] && <Modalconfirm triggerUpdate={triggerUpdate} handleConfirmDeleteProvenance={handleConfirmDeleteProvenance} handleHideConfirmProvenance={handleHideConfirmProvenance} idProvenanceDeleted={provenance.idP} message="Voulez-vous vraiment supprimer cette provenance?"/>}
                    <button onClick={()=> handleConfirmClickProvenances(provenance.idP)} type='button' className="btn btn-danger btn-md">
                      <img src={icondeleteuser} alt="icon pour editer la provenance"/>
                    </button>
                  </td>
                </tr>
              )) }
            
            </tbody>
        </table>
    )
}

export default TableProvenance