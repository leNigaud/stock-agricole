
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import React from "react";

import Modalerror from "./Modalerror";
import Modalsuccess from "./Modalsuccess";
import Modalconfirm from "./Modalconfirm";

const Profil = ({triggerUpdate}) => {
    const [modalerror,setModalerror] = useState(false)
    const [success,setSuccess] = useState(false)
    const [confirm,setConfirm] = useState(false)

    const navigate = useNavigate()

    // Récupérer l'élément du localStorage
    // let user = localStorage.getItem("userData");

    // if (user) {
    //     // Si l'élément existe dans le localStorage
    //     user = JSON.parse(user); // Convertir la chaîne JSON en objet JavaScript
    // } else {
    //     // Si l'élément n'existe pas dans le localStorage
    //     console.log('Aucun élément trouvé dans le localStorage avec la clé spécifiée.');
    // }
    let user = {
        "name" : "Invité",
        "jeton" : "jet",
        "privilege" : "Administrateur",
        "photo" : "image/TWQjVOALZ53SScp0Qxfit5QX7XHIetSgNJ8F8m5I.jpg"
    }

    const mystyle = {
        display:'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        marginRight:'45px'
    }

    const handleOnClick = (e) => {
        e.preventDefault()
        setConfirm(true)
    }

    const hideModalSuccessAjout = ()=> {
        setSuccess(false)
        setConfirm(false)
        navigate('/login')
    }

    const hideModalErrorAjout = ()=> {
        setModalerror(false)
    }

    const hideConfirm = ()=> {
        setConfirm(false)
    }

    const handleOnClickOkConfirm=()=> {
        axios.post(`http://localhost:8000/api/logout`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            setSuccess(true)
            localStorage.clear();
            console.log("Succes lors de la déconnexion:")
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de la déconnexion:", err)
        });
    }
return (
    <div style={mystyle}>
        {success && <Modalsuccess hideModalSuccessAjout={hideModalSuccessAjout} message="La déconnexion a réussi"/>}
        {modalerror && <Modalerror hideModalErrorAjout={hideModalErrorAjout} message="La déconnexion a échoué"/>}
        {confirm && <Modalconfirm hideConfirm={hideConfirm} handleOnClickOkConfirm={handleOnClickOkConfirm} message="Voulez-vous vous déconnecter?"/>}
        <div style={{marginRight:'20px'}}>{user ? user.name : "Username"}</div>

        <div style={{ borderRadius: '50%', overflow: 'hidden' }}>
            <img 
                src={"http://localhost:8000/api/" + user?.photo}  
                style={{ height: '35px', width: '35px', borderRadius: '50%' }} 
                alt="profil"
            />
        </div>
         
   
        {/* <div className="dropdown">
            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
            <ul className="dropdown-menu">
            <li><Link className="dropdown-item" onClick={handleOnClick}>Se déconnecter</Link></li>
            </ul>
        </div> */}
       
    </div>
)

}

export default Profil; 