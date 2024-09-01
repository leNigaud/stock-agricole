import { useState, useEffect } from "react";
import Modaleditcategorie from "./Modaleditcategorie";
import iconedituser from './image/iconedituser.png'
import icondeleteuser from './image/icondeleteuser.png'
import Modalerror from "./Modalerror";
import Modalconfirm from "./Modalconfirm"
import axios from "axios";
import Modalsuccess from "./Modalsuccess";


function TableCategorie({categories, triggerUpdate}) {

    const [edits,setEdits] = useState({})
    const [confirms,setConfirms] = useState({})
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)

    //edit pour categories
    useEffect(() => {
        const initialEdits = {};
        const initialConfirms = {};
        categories?.forEach(category => {
            initialEdits[category.idCat] = false;
            initialConfirms[category.idCat] = false;
        });
        setEdits(initialEdits);
        setConfirms(initialConfirms)
    }, [categories]);

    const handleEditClickCategories = (categorieId) => {
        setEdits(prevEdits => ({
            ...prevEdits,
            [categorieId]: true 
        }));
    };

    const handleConfirmClickCategories = (categorieId) => {
        setConfirms(prevConfirms => ({
            ...prevConfirms,
            [categorieId]: true 
        }));
    };

    const handleHideEdit = (id) => {
      setEdits(prevEdits => ({
        ...prevEdits,
        [id]: false // 
    }));
    };

    const handleHideConfirmCategorie = (id) => {
      setConfirms(prevConfirms => ({
        ...prevConfirms,
        [id]: false // 
    }));
    };
  
    const handleConfirmDeleteCategorie = (idCat) => {
      handleHideConfirmCategorie(idCat)
      axios.delete(`http://localhost:8000/api/categories/${idCat}`)
        .then(res => {
          setSuccess(true)
          console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de la suppression de la catégorie :", err)
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
                <th>Nom</th>
                <th colSpan='2' style={{textAlign:'center'}}>Actions</th>
              </tr>
            </thead>

            <tbody>
              { categories?.map(categorie=>(
                <tr key={categorie.idCat}>
                  <td>{categorie.nom}</td>
                  <td>
                    {edits[categorie.idCat] && <Modaleditcategorie  triggerUpdate={triggerUpdate} categorie={categorie} handleHideEdit={handleHideEdit}/>}
                    <button onClick={()=> handleEditClickCategories(categorie.idCat)} type='button' className="btn btn-success btn-md" >
                      <img src={iconedituser} alt="icon pour editer l'user"/>
                    </button>
                  </td>
                  <td>
                    {confirms[categorie.idCat] && <Modalconfirm triggerUpdate={triggerUpdate} handleConfirmDeleteCategorie={handleConfirmDeleteCategorie}  handleHideConfirmCategorie={handleHideConfirmCategorie} idCategorieDeleted={categorie.idCat} message="Voulez-vous vraiment supprimer cette catégorie"/>}
                    <button onClick={()=> handleConfirmClickCategories(categorie.idCat)} type='button' className="btn btn-danger btn-md">
                      <img src={icondeleteuser} alt="icon pour editer l'user"/>
                    </button>
                  </td>
                </tr>
              )) }
            
            </tbody>
        </table>
    )
}

export default TableCategorie