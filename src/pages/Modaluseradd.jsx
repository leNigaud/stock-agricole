import { useEffect, useRef, useState } from "react";
import Modalerror from "./Modalerror";
import Modalsuccess from "./Modalsuccess";
import axios from "axios";
import iconeyeshide from './image/iconeyeshide.png'
import iconeyeshow from './image/iconeyeshow.png'

function Modaluseradd({hideAddUser,triggerUpdate}) {
    // Style CSS pour cacher l'input file
    const hiddenFileInputStyle = {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: '0'
    };


    const inputRef = useRef()

    const [selectedFile,setSelectedFile] = useState(null)

    const [data,setData] = useState({
        name:"",
        password:"",
        privilege:"Utilisateur",
        photo:null
    })

    //pour examniner le mot de passe
    const [errorPwdAppear, setErrorPwdAppear] = useState(false)

    useEffect(() => {
        if (data.password!=="") {
            if(data.password.length < 8) setErrorPwdAppear(true)
            else setErrorPwdAppear(false)
        }
    }, [data.password])

    //Pour examiner les champs
    const [checkFieldsOk,setCheckFieldsOk] = useState(false) 
    const [confirmpass,setConfirmpass] = useState("")

    useEffect(()=> {
        if (data.name !== "" && data.privilege !== "" && data.photo && data.password !== "" && !errorPwdAppear && confirmpass !== "") {
            setCheckFieldsOk(true)
        } else {
            setCheckFieldsOk(false)
        }
    },[data,confirmpass,errorPwdAppear])



    const handleChange = (e) => {
        const {name,value} = e.target
        setData(prevdata => ({...prevdata,[name]:value}))
    }

    //l'event quand un fichier est selectionné
    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setData(prevdata=> ({...prevdata,photo:event.target.files[0]}))
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
        backgroundColor:'rgba(128, 128, 128, 0.75)'
    }

    const stylediv = {
        width:'500px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)'
    }
    
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)
    const [modalerrorpass,setModalerrorpass] = useState(false)

    const hideModalSuccessAjout = () => {
        setSuccess(false)
        triggerUpdate()
        hideAddUser()
    }

    const hideModalErrorAjout = () => {
        setModalerror(false)
        setModalerrorpass(false)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (data.password===confirmpass) {
            const formData = new FormData();
            formData.append('photo', selectedFile); // Utilisation de selectedFile au lieu de data.photo
            formData.append('name', data.name);
            formData.append('privilege', data.privilege);
            formData.append('password', data.password);
        
            axios.post(`http://localhost:8000/api/utilisateurs`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                setSuccess(true)
            })
            .catch(err => {
                setModalerror(true)
                console.error("Erreur lors de l'ajout des données dans le modal ajout du menu utilisateur:", err)
            });
        }
        else {
            setModalerrorpass(true)
        }
    }

    //pour le mot de passe
    const [showpass, setShowpass] = useState(false);
    const [showconf, setShowconf] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmFocused, setIsConfirmFocused] = useState(false);
    const [isPrivFocused, setIsPrivFocused] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    
    const handlePassClick = () => {
        setShowpass(prevvalue=>!prevvalue)
    }

    const handleConfClick = () => {
        setShowconf(prevvalue=>!prevvalue)
    }

    const handlePrivFocus = () => {
        setIsPrivFocused(true);
    };

    const handlePrivBlur = () => {
        setIsPrivFocused(false);
    };

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

    const handleConfirmFocus = () => {
        setIsConfirmFocused(true);
    };

    const handleConfirmBlur = () => {
        setIsConfirmFocused(false);
    };


    return (
       <div className='d-flex flex-column justify-content-center align-items-center' style={stylecontainer}>
            {success && <Modalsuccess hideModalSuccessAjout={hideModalSuccessAjout}/>}
            {modalerror && <Modalerror hideModalErrorAjout={hideModalErrorAjout}/>}
            {modalerrorpass && <Modalerror hideModalErrorAjout={hideModalErrorAjout} message="Le mot de passe ne correspond pas"/>}

            <form style={stylediv}  onSubmit={handleOnSubmit} encType="multipart/form-data" className='d-flex flex-column justify-content-center bg-white'>
                <div className='d-flex flex-row justify-content-center mt-3 mb-3'>
                    <div style={{fontWeight:'bold'}}><h3>Ajouter un nouveau utilisateur</h3></div>
                </div>

                <div className='d-flex flex-row justify-content-center align-items-start mb-4'>
                    <div className='d-flex flex-row justify-content-center align-items-end' >
                        <div className='d-flex flex-column justify-content-center' style={{marginRight:'30px'}}>
                            <div  className='mb-3'>
                                <label className="d-block" htmlFor="name">Nom d'utilisateur</label>
                                <div className="d-flex flex-row form-control" style={isNameFocused? {border: '4px solid #87CEEB'} :{}}>
                                    <input style={{border:'none',outline:'none'}} onBlur={handleNameBlur} onFocus={handleNameFocus} type="text" name="name" id="name" value={data.name} onChange={handleChange} required/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="d-block" htmlFor="privilege">Droit</label>
                                <select  onBlur={handlePrivBlur} onFocus={handlePrivFocus} style={isPrivFocused? {border: '4px solid #87CEEB',boxShadow:'none'} :{}} className="form-select" name="privilege" id="privilege" value={data.privilege} onChange={handleChange}>
                                    <option value="Administrateur">Administrateur</option>
                                    <option value="Utilisateur">Utilisateur</option>
                                </select>
                            </div>

                            <div >
                                <label class="d-block" htmlFor="password">Mot de passe</label>
                                <div className="d-flex flex-row form-control" style={isPasswordFocused? {border: '4px solid #87CEEB'} :{}}>
                                    <input style={{border:'none',outline:'none'}} onBlur={handlePasswordBlur} onFocus={handlePasswordFocus}  name="password" id="password" type={showpass?'text':'password'} value={data.password} onChange={handleChange} required/>
                                    <img style={{cursor:'pointer'}} src={showpass? iconeyeshow: iconeyeshide} onClick={handlePassClick}/>
                                </div>
                            </div>
                            {
                                errorPwdAppear ? <p style={ {
                                    color: "red", 
                                    padding : 0,
                                    margin: 0,
                                    fontSize: "12px"
                                }}>
                                    Au moins 8 caractères
                                </p> : ""
                            }

                            <div  className='mt-3'>
                                <label className="d-block" htmlFor="confpassword" >Confirmation du mot de passe</label>
                                <div className="d-flex flex-row form-control" style={isConfirmFocused? {border: '4px solid #87CEEB'} :{}}>
                                    <input style={{border:'none',outline:'none'}} onBlur={handleConfirmBlur} onFocus={handleConfirmFocus} name="confpassword" id="confpassword" type={showconf?'text':'password'}  value={confirmpass} onChange={(e)=>setConfirmpass(e.target.value)} required/>
                                    <img style={{cursor:'pointer'}} src={showconf? iconeyeshow: iconeyeshide} onClick={handleConfClick}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                        <div className='mb-4 mt-1' style={{width:'146px',height:'100px',textAlign:'center',backgroundColor: selectedFile ? 'transparent' : '#D4CBE5'}}>
                        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt='profil' style={{ maxWidth: '100%', maxHeight: '100%'}}/>}
                        </div>
                        
                        <div style={{color:'#863718',fontWeight:'bold',maxWidth:'150px',textAlign:'center'}}>
                            <input type="file" accept="image/*" ref={inputRef} style={hiddenFileInputStyle} onChange={handleOnChange} required/>
                            <span onClick={onChooseFile} style={{cursor:'pointer', maxWidth: '200px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                            { selectedFile ? (selectedFile.name.length > 18 ? selectedFile.name.slice(0, 18) + '...' : selectedFile.name) : 'Choisir une image...'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-row justify-content-start mb-4' >
                    <div style={{marginRight:'20px',marginLeft:'45px'}}><button type="submit" className="btn btn-success btn-md" disabled={!checkFieldsOk}>Confirmer</button></div>
                    <div><button type="button" className="btn btn-secondary btn-md" onClick={hideAddUser}>Annuler</button></div>
                </div>
            </form>
       </div>
    )

}

export default Modaluseradd;