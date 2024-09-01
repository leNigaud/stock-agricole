import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modalsuccess from "./Modalsuccess"
import Modalerror from "./Modalerror"


function Modalajout( {hideAjoutProduit, categories, conteneurs, triggerUpdate} ) {
    //les css
    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
        zIndex:'1000',
        backgroundColor:'rgba(128, 128, 128, 0.75)'
    }

    const stylediv = {
        width:'600px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)'
    }

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

    //les données à envoyer 
    const [data,setData] = useState({
        categorie:categories[0].nom,
        libelle:"",
        conteneur:conteneurs[0].nom,
        unite:"",
        vie:"",
        photo:null
    })

    //pour le modale success
    const [success,setSuccess] = useState(false)

    const hideModalSuccessAjout = () => {
        setSuccess(false)
        hideAjoutProduit()
        triggerUpdate()
    }

    //pour le modale error
    const [modalerror,setModalerror] = useState(false)

    const hideModalErrorAjout = () => {
        setModalerror(false)
    }
    
    const inputRef = useRef()

    const [selectedFile,setSelectedFile] = useState(null)

    //l'event quand un fichier est selectionné
    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setData(prevdata=> ({...prevdata,photo:file}))
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    
    const handleChange = (e) => {
        const {name,value} = e.target
        setData(prevdata => ({...prevdata,[name]:value}))
    }
    
    // const [data2,setData2] = useState({
    //     categorie:"legume",
    //     libelle:"tomate",
    //     conteneur:"frigo",
    //     unite:"1",
    //     vie:"1",
    // })
    
    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();
    //     axios.post(`https://laravel-deploy-test-three.vercel.app/api/recu`, data2, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //         .then(res => alert(res.data.conteneur))
    //         .catch(err => {
    //             alert("Une erreur s'est produite")
    //             console.error("Erreur lors de l'envoi des données :", err)
    //         });
    // }

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();
    //     axios.post(`https://laravel-deploy-test-three.vercel.app/api/recu`, data, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //         .then(res => {
    //             setSuccess(true)
    //         })
    //         .catch(err => {
    //             setModalerror(true)
    //             console.error("Erreur lors de l'ajout des données dans le modal ajout du menu produit:", err)
    //         });
    // }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', selectedFile); // Utilisation de selectedFile au lieu de data.photo
        formData.append('categorie', data.categorie);
        formData.append('libelle', data.libelle);
        formData.append('conteneur', data.conteneur);
        formData.append('unite', data.unite);
        formData.append('vie', data.vie);
    
        axios.post(`https://laravel-deploy-test-three.vercel.app/api/api/produits`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            setSuccess(true)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de l'ajout des données dans le modal ajout du menu produit:", err)
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
                    <div style={{fontWeight:'bold'}}><h3>Ajouter un produit</h3></div>
                </div>
                <div className='d-flex flex-row justify-content-center align-items-start mb-4' style={{padding:'15px'}}>
                    <div className='d-flex flex-row justify-content-center align-items-end' >
                        <div className='d-flex flex-column justify-content-around' style={{marginRight:'30px'}}>

                            <div className='d-flex flex-column justify-content-start mb-3'>
                                <label className="d-block mb-2" htmlFor="categorie">Catégorie</label>
                                <select name="categorie" id="categorie" value={data.categorie} onChange={handleChange} className="form-select">
                                    {categories?.map((categorie) => (
                                        <option key={categorie.idCat} value={categorie.nom}>
                                            {categorie.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='mb-3'>
                                <label className="d-block mb-2" htmlFor="libelle">Libellé</label>
                                <input className="form-control" name="libelle" id="libelle" value={data.libelle} onChange={handleChange} type="text" required/>
                            </div>

                            <div>
                                <label className="d-block mb-2" htmlFor="conteneur">Type de conteneur</label>
                                <select name="conteneur" id="conteneur" value={data.conteneur} onChange={handleChange} className="form-select">
                                    { conteneurs?.map(conteneur=> ( <option key={conteneur.idType}  value={conteneur.nom}>{conteneur.nom}</option> ) ) }
                                </select>
                            </div>

                        </div>
                        <div style={{marginRight:'30px'}}>
                            <div  className='form-group mb-3'>
                                <label className="mb-2" htmlFor="unite">Valeur d'une unité en kg</label>
                                <input name="unite" id="unite" value={data.unite} onChange={handleChange} type="number" className='form-control' min="0" required/>
                            </div>
                            <div  className='form-group'>
                                <label className="d-block mb-2" htmlFor="vie">Durée de vie à l'arrivée</label>
                                <input name="vie" id="vie" value={data.vie} onChange={handleChange}  type="number" className='form-control' min="0" required/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-start'>
                        <div className='mb-4 mt-1' style={{width:'146px',height:'100px',textAlign:'center',backgroundColor: selectedFile ? 'transparent' : '#D4CBE5'}}>
                        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt='profil' style={{ maxWidth: '100%', maxHeight: '100%'}}/>}
                        </div>
                        
                        <div style={{color:'#863718',fontWeight:'bold',maxWidth:'150px',textAlign:'center'}}>
                            <input type="file" name="photo" accept="image/*" ref={inputRef} style={hiddenFileInputStyle} title="Veuillez sélectionner une photo"  onChange={handleOnChange} required/>
                            <span onClick={onChooseFile} style={{cursor:'pointer', maxWidth: '200px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                            { selectedFile ? (selectedFile.name.length > 13 ? selectedFile.name.slice(0, 13) + '...' : selectedFile.name) : 'Choisir une image...'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-row justify-content-start mb-4' >
                    <div style={{marginRight:'20px',marginLeft:'18px'}}><button disabled={!checkFieldsOk} type="submit" className="btn btn-success btn-sm">Confirmer</button></div>
                    <div><button type="button" className="btn btn-secondary btn-sm" onClick={hideAjoutProduit}>Annuler</button></div>
                </div>
            </form>
            { success && <Modalsuccess hideModalSuccessAjout={hideModalSuccessAjout}/>}
            { modalerror && <Modalerror hideModalErrorAjout={hideModalErrorAjout}/>}
       </div>
    )

}

export default Modalajout;