import { useState, useEffect } from "react";
import Modaleditdestination from "./Modaleditdestination";
import iconedituser from './image/iconedituser.png'
import icondeleteuser from './image/icondeleteuser.png'
import Modalconfirm from './Modalconfirm'
import Modalsuccess from "./Modalsuccess";
import Modalerror from "./Modalerror";
import axios from "axios";


function TableDestination({destinations,triggerUpdate}) {

    const [edits,setEdits] = useState({})
    const [confirms,setConfirms] = useState({})
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)

    //edit pour destination
    useEffect(() => {
        const initialEdits = {};
        const initialConfirms = {};
        destinations?.forEach(destination => {
            initialEdits[destination.idCat] = false;
            initialConfirms[destination.idCat] = false;
        });
        setEdits(initialEdits);
        setConfirms(initialConfirms)
    }, [destinations]);

    const handleEditClickDestinations = (destinationId) => {
        setEdits(prevEdits => ({
            ...prevEdits,
            [destinationId]: true // Mettre à jour l'état de la catégorie spécifique à true
        }));
      };

    const handleConfirmClickDestinations = (destinationId) => {
        setConfirms(prevConfirms => ({
            ...prevConfirms,
            [destinationId]: true // Mettre à jour l'état de la catégorie spécifique à true
        }));
      };
  
    const handleHideEdit = (id) => {
      setEdits(prevEdits => ({
        ...prevEdits,
        [id]: false // Mettre à jour l'état de la catégorie spécifique à true
    }));
    };

    const handleHideConfirmDestination = (id) => {
      setConfirms(prevConfirms => ({
        ...prevConfirms,
        [id]: false // Mettre à jour l'état de la catégorie spécifique à true
    }));
    };

    const handleConfirmDeleteDestination = (idD) => {
      handleHideConfirmDestination(idD)
      axios.delete(`https://laravel-deploy-test-three.vercel.app/api/api/destinations/${idD}`)
        .then(res => {
          setSuccess(true)
          console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de la suppression de la destination :", err)
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
                <th>Destination</th>
                <th colSpan='2' style={{textAlign:'center'}}>Actions</th>
              </tr>
            </thead>

            <tbody>
              { destinations?.map(destination=>(
                <tr key={destination.idD}>
                  <td>{destination.LieuD}</td>
                  <td>
                    {edits[destination.idD] && <Modaleditdestination triggerUpdate={triggerUpdate} destination={destination} handleHideEdit={handleHideEdit}/>}
                    <button onClick={()=> handleEditClickDestinations(destination.idD)} type='button' className="btn btn-success btn-md">
                      <img src={iconedituser} alt="icon pour editer la destination"/>
                    </button>
                  </td>
                  <td>
                    {confirms[destination.idD] && <Modalconfirm triggerUpdate={triggerUpdate} handleConfirmDeleteDestination={handleConfirmDeleteDestination}  handleHideConfirmDestination={handleHideConfirmDestination} idDestinationDeleted= {destination.idD} message="Voulez-vous vraiment supprimer cette destination?"/>}
                    <button onClick={()=> handleConfirmClickDestinations(destination.idD) } type='button' className="btn btn-danger btn-md">
                      <img src={icondeleteuser} alt="icon pour editer la destination"/>
                    </button>
                  </td>
                </tr>
              )) }
            
            </tbody>
        </table>
    )
}

export default TableDestination