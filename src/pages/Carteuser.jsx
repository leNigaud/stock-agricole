import imagefraise from './image/imagefraise.png'
import iconedituser from './image/iconedituser.png'
import icondeleteuser from './image/icondeleteuser.png'
import Modalconfirm from './Modalconfirm'
import Modalerror from './Modalerror'
import Modalsuccess from './Modalsuccess'
import { useState } from 'react'
import axios from 'axios'
import Modaluseredit from './Modaluseredit'

function Carteuser({triggerUpdate,user}) {
    //css
    const mymargin = {
        marginRight:'25px'
    }

    const imgStyle = {
        maxWidth: '100%', 
        maxHeight: '100%' 
      };

    const divcarte = {
        width:'200px',
        paddingRight:'10px',
        paddingLeft:'10px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        margin:'10px'

    }

    // Récupérer l'élément du localStorage
    let myuser = localStorage.getItem("userData");
    if (myuser) {
        // Si l'élément existe dans le localStorage
        myuser = JSON.parse(myuser); // Convertir la chaîne JSON en objet JavaScript

    } else {
        // Si l'élément n'existe pas dans le localStorage
        console.log('Aucun élément trouvé dans le localStorage avec la clé spécifiée.');
    }


    const [confirm,setConfirm] = useState(false)
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)
    const [edituser,setEdituser] = useState(false)

    const hideConfirm = () => {
        setConfirm(false)
    }

    const handleConfirmDeleteUser = (id) => {
        hideConfirm()
        console.log("id de l'user: "+id)
        const arrId = [{"id":id}]
        axios.post(`http://localhost:8000/api/utilisateurDelete`, arrId, {
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
            console.error("Erreur lors de la suppression de l'utilisateur :", err)
          });
    }

    const hideModalSuccessModif=() => {
        setSuccess(false)
        triggerUpdate()
    }

    const hideModalErrorModif=() => {
        setModalerror(false)
    }

    const hideModifUser = ()=> {
        // alert("fermeture du modaledituser")
        setEdituser(false)
    }

    return (
        <>
            {edituser && <Modaluseredit  hideModifUser={hideModifUser} user={user} triggerUpdate={triggerUpdate}/>}
            <div className='d-flex flex-column justify-content-center' style={divcarte}>
                {success && <Modalsuccess hideModalSuccessModif={hideModalSuccessModif}/>}
                {modalerror && <Modalerror hideModalErrorModif={hideModalErrorModif}/>}
                <div style={{textAlign:'center',width:'180px',height:'132px'}}><img src={"http://localhost:8000/api/" + user.photo} alt={user.name} style={imgStyle}/></div>
                <div style={{textAlign:'center',fontWeight:'bold'}} className='mb-3'>{user.name}</div>
                
                <div className='d-flex flex-row justify-content-between mb-4'>
                    <div style={mymargin}>Droit</div>
                    <div style={{fontWeight:'bold'}}>{user.privilege}</div>
                </div>

                <div className='d-flex flex-row justify-content-center mb-3'>
                    <div style={{marginRight:'15px'}}>
                        <button type='button' onClick={()=>setEdituser(true)} className="btn btn-success btn-md">
                            <img src={iconedituser} alt="icon pour editer l'user"/>
                        </button>
                    </div>
                    <div>
                        <button disabled={user.id===myuser.id} type='button' className="btn btn-danger btn-md" onClick={()=>setConfirm(true)}>
                            <img src={icondeleteuser} alt="icon pour supprimer l'user"/>
                        </button>
                        {confirm && <Modalconfirm hideConfirm={hideConfirm} handleConfirmDeleteUser={handleConfirmDeleteUser} id={user.id} message="Voulez-vous vraiment supprimer cet utilisateur"/>}
                    </div>
                </div>

                
            </div>
        </>
    )
}

export default Carteuser