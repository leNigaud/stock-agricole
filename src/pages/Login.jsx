import logo from './image/logo_agroman.png';
import axios from 'axios';
import Modalerror from './Modalerror';
import Modalsuccess from './Modalsuccess';
import iconuser from './image/iconuser.png';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import React from "react";


import iconeyeshide from './image/iconeyeshide.png'
import iconeyeshow from './image/iconeyeshow.png'

const Login = () => {
    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0'
    }

    const stylediv = {
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        padding:'40px',
        textAlign:'center'
    }


    const [data,setData] = useState({
            name:'',
            password:''
        }
    )

    const [modalerror,setModalerror] = useState(false)
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {value,name} = e.target
        setData(prevdata=>({...prevdata,[name]:value}))
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
    
        axios.post(`http://localhost:8000/api/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            setSuccess(true);
            localStorage.setItem('userData', JSON.stringify(res.data.user)); // Stocker les données dans localStorage
            console.log(res.data.user);
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de la connexion de l'utilisateur:", err)
        });
    }

    const hideModalErrorAjout = () => {
        setModalerror(false)
    }

    const hideModalSuccessAjout = () => {
        setSuccess(false)
        navigate('/')
    }

    //pour la div de chaque champ
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [showpass, setShowpass] = useState(false);

    const handleNameFocus = () => {
        setIsNameFocused(true);
    };

    const handleNameBlur = () => {
        setIsNameFocused(false);
    };

    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
    };

    //pour le mot de passe
   
    const handlePassClick = () => {
        setShowpass(prevvalue=>!prevvalue)
    }

    return (
          
        <div  className='d-flex justify-content-center align-items-center bg-dark' style={stylecontainer} >
                {success && <Modalsuccess hideModalSuccessAjout={hideModalSuccessAjout} message="La connexion a réussi !"/>}
                {modalerror && <Modalerror hideModalErrorAjout={hideModalErrorAjout}/>}
                <form  onSubmit={handleOnSubmit} className="d-flex flex-column justify-content-center bg-white" style={stylediv}>
                    <div className='mb-4'>
                        <img src={logo} alt="logo d'argoman"/>
                    </div>

                    {/* <div className='mb-4'><h3>Connexion</h3></div> */}

                 
                    <div className="d-flex flex-row form-control" style={isNameFocused? {border: '2px solid #87CEEB'} :{}}>
                        <input style={{border:'none',outline:'none'}} type="text" name="name" value={data.name} onChange={handleOnChange} onFocus={handleNameFocus} onBlur={handleNameBlur} placeholder="Nom d'utilisateur" required/>
                        <img src={iconuser} alt='iconuser'/>
                    </div>
                    

                    <div className='mb-4'>
                        <div className="d-flex flex-row form-control" style={isPasswordFocused? {border: '2px solid #87CEEB'} :{}}>
                            <input style={{border:'none',outline:'none'}} type={showpass?'text':'password'} name="password" value={data.password} onChange={handleOnChange} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} placeholder='Mot de passe' required/>
                            <img style={{cursor:'pointer'}} src={showpass?iconeyeshow:iconeyeshide} alt='iconpass' onClick={handlePassClick}/>
                        </div>
                    </div>

                    <div style={{width:'100%'}} ><button type="submit" className='btn btn-success'  style={{width:'100%'}}>Connexion</button></div>
                </form>
        </div>
    
    )
}

export default Login;