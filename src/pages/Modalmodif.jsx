import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modalsuccess from "./Modalsuccess"
import Modalerror from "./Modalerror"

function Modalmodif( { triggerUpdate, hideModif, categories, produit, monconteneur, moncategorie, conteneurs} ) {
    //les données à envoyer 
    const [data,setData] = useState({
        categorie:moncategorie,
        libelle:produit.libelle,
        conteneur:monconteneur,
        unite:produit.unite,
        vie:produit.vie,
        photo:null
    })

    const inputRef = useRef()

    const [selectedFile,setSelectedFile] = useState(null)

    useEffect(()=> {
        axios.get("http://localhost:8000/api/produits/images/"+produit.photo, { responseType: 'blob' })
        .then(response => {
            const file = new File([response.data], produit.photo);
            setSelectedFile(file);
            setData(prevdata => ({...prevdata, photo: file}));
    
        })
        .catch(error => console.error("Erreur lors du chargement de l'image par défaut :", error));

    },[produit])

    //l'event quand un fichier est selectionné
    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setData(prevdata => ({...prevdata, photo: file}));
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
        width:'600px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)'
    }

    //pour le modale success
    const [success,setSuccess] = useState(false)
    
    const hideModalSuccessModif = () => {
        setSuccess(false)
        hideModif()
        triggerUpdate()
    }

    //pour le modale error
    const [modalerror,setModalerror] = useState(false)

    const hideModalErrorModif = () => {
        setModalerror(false)
    }

    const handleChange = (e) => {
        const {name,value} = e.target
        setData(prevdata => ({...prevdata,[name]:value}))
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('categorie', data.categorie);
        formData.append('libelle', data.libelle);
        formData.append('conteneur', data.conteneur);
        formData.append('unite', data.unite);
        formData.append('vie', data.vie);
    
        axios.post(`http://localhost:8000/api/produits/${produit.idPro}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            setSuccess(true);
        })
        .catch(err => {
            setModalerror(true);
            console.error("Erreur lors de l'envoi des données modifiées:", err);
        });
    }

    const [checkFieldsOk,setCheckFieldsOk] = useState(false)
    useEffect(()=>{
        if (data.photo && data.libelle!=="" && data.unite!=="" && data.vie!=="") {
            setCheckFieldsOk(true)
        } else {
            setCheckFieldsOk(false)
        }
    },[data])
    
    return (
       <div className='d-flex flex-column justify-content-center align-items-center' style={stylecontainer}>
            <form style={stylediv} className='bg-white' encType="multipart/form-data" onSubmit={handleOnSubmit}>
                <div className='d-flex flex-row justify-content-center mt-3 mb-3'>
                    <div style={{fontWeight:'bold'}}><h3>Modifier le produit</h3></div>
                </div>
                <div className='d-flex flex-row justify-content-center align-items-start mb-4' style={{padding:"15px"}}>
                    <div className='d-flex flex-row justify-content-center align-items-end' >
                        <div className='d-flex flex-column justify-content-around' style={{marginRight:'30px'}}>

                            <div className='d-flex flex-column justify-content-start mb-3'>
                                <label className="d-block mb-2" htmlFor="categorie">Catégorie</label>
                                <select name="categorie" id="categorie" value={data.categorie} onChange={handleChange} className="form-select">
                                    { categories?.map(categorie => <option key={categorie.idCat} value={categorie.nom}>{categorie.nom}</option> ) }
                                </select>
                            </div>

                            <div className='mb-3'>
                                <label className="d-block mb-2" htmlFor="libelle">Libellé</label>
                                <input name="libelle" id="libelle" value={data.libelle} onChange={handleChange} type="text" className='form-control' required/>
                            </div>

                            <div >
                                <label className="d-block mb-2" htmlFor="conteneur">Type de conteneur</label>
                                <select name="conteneur" id="conteneur" value={data.conteneur} onChange={handleChange} className="form-select">
                                    { conteneurs?.map(conteneur=> ( <option key={conteneur.idType}  value={conteneur.nom}>{conteneur.nom}</option> ) ) }
                                </select>
                            </div>

                        </div>
                        <div style={{marginRight:'30px'}} className="">
                            <div  className='form-group mb-3'>
                                <label className="d-block mb-2" htmlFor="unite">Valeur d'une unité en kg</label>
                                <input disabled name="unite" id="unite" value={data.unite} onChange={handleChange} type="number" className='form-control' min="0" required/>
                            </div>
                            <div  className='form-group'>
                                <label className="d-block mb-2" htmlFor="vie">Durée de vie à l'arrivée</label>
                                <input name="vie" id="vie" value={data.vie} onChange={handleChange}  type="number" className='form-control' min="0" required/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-start'>
                        <div className='mb-4 mt-1' style={{width:'146px',height:'100px',textAlign:'center',backgroundColor: selectedFile ? 'transparent' : '#D4CBE5'}}>
                        <img src={selectedFile? URL.createObjectURL(selectedFile) : "image/"+produit.photo} alt='profil' style={{ maxWidth: '100%', maxHeight: '100%'}}/>
                        </div>
                        
                        <div style={{color:'#863718',fontWeight:'bold',maxWidth:'150px',textAlign:'center'}}>
                            <input type="file" name="photo" accept="image/*" ref={inputRef} style={{display:'none'}} onChange={handleOnChange}/>
                            <span onClick={onChooseFile} style={{cursor:'pointer', maxWidth: '200px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                            {/* { selectedFile ? (selectedFile.name.length > 13 ? selectedFile.name.slice(0, 13) + '...' : selectedFile.name) : 'Choisir une image...'} */}
                            Choisir une image...
                            </span>
                        </div>
                    </div>
                </div>

                
                <div className='d-flex flex-row justify-content-start mb-4' >
                    <div style={{marginRight:'20px',marginLeft:'18px'}}><button type="submit" className="btn btn-success btn-md" disabled={!checkFieldsOk}>Confirmer</button></div>
                    <div><button type="button" className="btn btn-secondary btn-md" onClick={hideModif}>Annuler</button></div>
                    <div><button type="button" className="btn btn-danger btn-md"
                    style={{marginLeft:'250px'}}
                >Supprimer</button></div>
                </div>
            </form>
            { success && <Modalsuccess hideModalSuccessModif={hideModalSuccessModif}/>}
            { modalerror && <Modalerror hideModalErrorModif={hideModalErrorModif}/>}
       </div>
    )

}

export default Modalmodif;