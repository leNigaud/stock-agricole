
import Modalconfirm from './Modalconfirm'
import Modalerror from './Modalerror'
import Modalsuccess from './Modalsuccess'

import axios from 'axios'

import { useState, useEffect } from 'react';

import TableConteneur from './TableConteneur'
import TableTypeConteneur from './TableTypeConteneur'
import TableCategorie from './TableCategorie'
import TableProvenance from './TableProvenance'
import TableDestination from './TableDestination'

import Profil from './Profil';
import Spinner from './Spinner';

const Modification = () => {
    //pour les css
    const mymargin = {
        marginRight:'40px'
    }

    //variable pour declencher un update
    const [update, setUpdate] = useState(0)
    const triggerUpdate = () => {
        setUpdate(prevUpdate => prevUpdate + 1);
    };

    //Pour les catégories
    const [selectedCategory,setSelectedCategory] = useState('Conteneur')
    const mycategories = ['Conteneur','Type de conteneurs', 'Catégorie', 'Destination', 'Provenance'];
    
    //variable ou stocker les données en un champ
    const [data,setData] = useState({
      conteneur:{nom:"",capacite:"",type:""},
      typeConteneur:"",
      categorie:"",
      destination:"",
      provenance: ""
    })
    
    //variable pour les modales
    const [confirmConteneur,setConfirmConteneur] = useState(false)
    const [confirmTypeConteneur,setConfirmTypeConteneur] = useState(false)
    const [confirmCategorie,setConfirmCategorie] = useState(false)
    const [confirmDestination,setConfirmDestination] = useState(false)
    const [confirmProvenance,setConfirmProvenance] = useState(false)

    const [modalerror,setModalerror] = useState(false)
    const [success,setSuccess] = useState(false)
    const [affiche,setAffiche] = useState(false)

    //variable ou recuperer les données
    const [mydata,setMydata] = useState([])

    //récuperer les données
    useEffect(() => {
        axios.get(`http://localhost:8000/api/all`)
            .then(res => {
                setMydata(res.data)
                setData(prevdata => ({...prevdata, conteneur: {...prevdata.conteneur, type: res.data.typeConteneurs[0].nom}}))
                setAffiche(true)
            })
            .catch(error => console.error("Erreur lors de la récupération des données dans le menu modification:", error));
    }, [update]);

    //destructuriser
    const {categories,destinations,typeConteneurs,provenances,conteneurs} = mydata

    //Partie event
    const handleOnClickCategory = (category) => {
        setSelectedCategory(category)
    }

    //gestion des modales
    const hideModalErrorAjout = () => {
      setModalerror(false)
    }

    const hideConfirmMenuModif = () => {
      setConfirmConteneur(false)
      setConfirmCategorie(false)
      setConfirmDestination(false)
      setConfirmProvenance(false)
    }

    const hideModalSuccessAjout = () => {
      setSuccess(false)
      triggerUpdate()
    }

    //data tracking
    const handleOnChange = (e) => {
      const {name,value} = e.target
      setData(prevdata => ({...prevdata,[name]:value}))
    }

    const handleOnChangeConteneur = (e) => {
      const {name,value} = e.target
      setData(prevdata => ({...prevdata, conteneur: {...prevdata.conteneur, [name]: value}}))
    }


    //event submit
    const handleOnSubmitConteneur = (e) => {
      e.preventDefault();
      setConfirmConteneur(true)
    }

    const handleOnSubmitTypeConteneur = (e) => {
      e.preventDefault();
      setConfirmTypeConteneur(true)
    }

    const handleOnSubmitCategorie = (e) => {
      e.preventDefault();
      setConfirmCategorie(true)
    }

    const handleOnSubmitDestination = (e) => {
      e.preventDefault();
      setConfirmDestination(true)
    }

    const handleOnSubmitProvenance = (e) => {
      e.preventDefault();
      setConfirmProvenance(true)
    }


    //event confirm submit
    const handleConfirmSubmitConteneur = () => {
      setConfirmConteneur(false)
      console.log(data.conteneur);
      axios.post(`http://localhost:8000/api/conteneurs`, data.conteneur , {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res => {
            setSuccess(true)
            setData(prevdata => ({...prevdata,conteneur:{nom:"",capacite:"",type:""}}))
            console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de l'ajout du conteneur :", err)
        });
    }

    const handleConfirmSubmitTypeConteneur = () => {
      setConfirmTypeConteneur(false)

      axios.post(`http://localhost:8000/api/typeConteneurs`,{nom:data.typeConteneur} , {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res => {
            setSuccess(true)
            setData(prevdata => ({...prevdata,typeConteneur:''}))
            console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de l'ajout du type conteneur :", err)
        });
    }
    
    const handleConfirmSubmitCategorie = () => {
      setConfirmCategorie(false)
      axios.post(`http://localhost:8000/api/categories`,{nom:data.categorie}  , {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res => {
          setSuccess(true)
          setData(prevdata => ({...prevdata,categorie:''}))
          console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de l'ajout de la catégorie :", err)
        });
    }

    const handleConfirmSubmitDestination = () => {
      setConfirmDestination(false)
      axios.post(`http://localhost:8000/api/destinations`, {LieuD:data.destination}  , {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res => {
          setSuccess(true)
          setData(prevdata => ({...prevdata,destination:''}))
          console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de l'ajout de la destination :", err)
        });
    }

    const handleConfirmSubmitProvenance = () => {
      setConfirmProvenance(false)
      axios.post(`http://localhost:8000/api/provenances`, {LieuP: data.provenance }, {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res => {
          setSuccess(true)
          setData(prevdata => ({...prevdata,provenance:''}))
          console.log(res.data)
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de l'ajout de la provenance :", err)
        });
    }

    //pour examiner le conteneur
    const [checkConteneurOK,setCheckConteneurOk] = useState(false)

    useEffect(()=>{
      if (data.conteneur.nom!=="" && data.conteneur.capacite!=="") {
        setCheckConteneurOk(true)
      } else {
        setCheckConteneurOk(false)
      }
    },[data.conteneur])

    //pour examiner le type de conteneur
    const [checkTypeConteneurOK,setCheckTypeConteneurOk] = useState(false)

    useEffect(()=>{
      if (data.typeConteneur!=="") {
        setCheckTypeConteneurOk(true)
      } else {
        setCheckTypeConteneurOk(false)
      }
    },[data.typeConteneur])

    //pour examiner la catégorie
    const [checkCategorieOK,setCheckCategorieOk] = useState(false)

    useEffect(()=>{
      if (data.categorie!=="") {
        setCheckCategorieOk(true)
      } else {
        setCheckCategorieOk(false)
      }
    },[data.categorie])

    //pour examiner la destination
    const [checkDestinationOK,setCheckDestinationOk] = useState(false)

    useEffect(()=>{
      if (data.destination!=="") {
        setCheckDestinationOk(true)
      } else {
        setCheckDestinationOk(false)
      }
    },[data.destination])

    //pour examiner la provenance
    const [checkProvenanceOK,setCheckProvenanceOk] = useState(false)

    useEffect(()=>{
      if (data.provenance!=="") {
        setCheckProvenanceOk(true)
      } else {
        setCheckProvenanceOk(false)
      }
    },[data.provenance])

    return (
      <>
        { affiche && (
          <div className="d-flex flex-row justify-content-around mt-3" style={{maxHeight:'625px',overflowY:'auto'}}>

              { success && <Modalsuccess hideModalSuccessAjout={hideModalSuccessAjout}/>}

              { modalerror && <Modalerror hideModalErrorAjout={hideModalErrorAjout}/>}

              <div className='' style={{width:'100%'}}>
                
                      <div className="d-flex flex-row justify-content-between align-items-center mb-3">
                          <div style={mymargin}>
                              <h3>Modification</h3>
                          </div>
                          <Profil triggerUpdate={triggerUpdate}/>
                          
                      </div>
                      
                      <div className="d-flex flex-row justify-content-start mb-3">
                          {mycategories?.map(category => (
                                  <div
                                      key={category}
                                      style={{
                                          ...mymargin,
                                          color: selectedCategory === category ? '#863718' : '#000',
                                          textDecoration: selectedCategory === category ? 'underline' : 'none',
                                          fontWeight: selectedCategory === category ? 'bold' : 'normal',
                                          cursor: 'pointer'
                                      }}
                                      onClick={()=> handleOnClickCategory(category)}
                                  >
                                      {category}
                                  </div>
                          ))}
                      </div>

                      {selectedCategory === 'Conteneur' && (
                      <form className="d-flex flex-row justify-content-start align-items-center mb-4" onSubmit={handleOnSubmitConteneur}>
                            <div className='form-group' style={mymargin}>
                                <label style={{marginRight:'12px'}} htmlFor='nomCont'>Nom du nouveau conteneur:</label>
                                <input type="text" name="nom" id="nomCont" value={data.conteneur.nom} onChange={handleOnChangeConteneur} required className='form-control-sm'/>
                            </div>
                            <div style={mymargin}>
                                <label style={{marginRight:'12px'}} htmlFor='typeCont'>Type :</label>
                                <select name='type' id="typeCont" value={data.conteneur.type} onChange={handleOnChangeConteneur}>
                                  {typeConteneurs.map(typeConteneur=><option key={typeConteneur.idType} value={typeConteneur.nom}>{typeConteneur.nom}</option>)}
                                </select>
                            </div>
                            <div style={mymargin}>
                                <label style={{marginRight:'12px'}} htmlFor='capaCont'>Capacité :</label>
                                <input id='capaCont' style={{width:'100px'}} type="number" min="0" name='capacite' size="3" value={data.conteneur.capacite}  onChange={handleOnChangeConteneur} required className='form-control-sm'/>
                            </div>
                
                            <div>
                                <button disabled={!checkConteneurOK} type="submit" className="btn btn-sm" style={{backgroundColor:'#863718',color:'white'}}>+ Ajouter</button>
                            </div>
                            { confirmConteneur && <Modalconfirm hideConfirmMenuModif={hideConfirmMenuModif} message="Voulez-vous ajouter ce conteneur?" handleConfirmSubmitConteneur={handleConfirmSubmitConteneur}/>}
                      </form>
                      )}

                      {selectedCategory === 'Type de conteneurs' && (
                      <form className="d-flex flex-row justify-content-start align-items-end mb-4" onSubmit={handleOnSubmitTypeConteneur}>
                            <div className='form-group' style={mymargin}>
                                <label className="d-block" htmlFor='typeConteneur'>Nouveau type de conteneur</label>
                                <input type="text" name="typeConteneur" id='typeConteneur' value={data.typeConteneur} onChange={handleOnChange} required className='form-control-sm'/>
                            </div>
                            <div>
                                <button disabled={!checkTypeConteneurOK} type="submit" className="btn btn-sm" style={{backgroundColor:'#863718',color:'white'}}>+ Ajouter</button>
                            </div>
                            { confirmTypeConteneur && <Modalconfirm hideConfirmMenuModif={hideConfirmMenuModif} message="Voulez-vous ajouter ce type conteneur?" handleConfirmSubmitTypeConteneur={handleConfirmSubmitTypeConteneur}/>}
                      </form>
                      )}

                      {selectedCategory === 'Catégorie' && (
                      <form className="d-flex flex-row justify-content-start align-items-end mb-4" onSubmit={handleOnSubmitCategorie}>
                            <div className='form-group' style={mymargin}>
                                <label className="d-block" htmlFor='categorie'>Nouvelle catégorie</label>
                                <input type="text" name='categorie' id='categorie' value={data.categorie} onChange={handleOnChange} required className='form-control-sm'/>
                            </div>
                            <div>
                                <button disabled={!checkCategorieOK} type="submit" className="btn btn-sm" style={{backgroundColor:'#863718',color:'white'}}>+ Ajouter</button>
                            </div>
                            { confirmCategorie && <Modalconfirm hideConfirmMenuModif={hideConfirmMenuModif} message="Voulez-vous ajouter cette catégorie?" handleConfirmSubmitCategorie={handleConfirmSubmitCategorie}/>}
                      </form>

                      )}

                      {selectedCategory === 'Destination' && (
                      <form className="d-flex flex-row justify-content-start align-items-end mb-4" onSubmit={handleOnSubmitDestination}>
                            <div className='form-group' style={mymargin}>
                                <label className="d-block" htmlFor='destination'>Nouvelle destination</label>
                                <input type="text" name='destination'id='destination' value={data.destination} onChange={handleOnChange} required className='form-control-sm'/>
                            </div>
                            <div>
                                <button disabled={!checkDestinationOK} type="submit" className="btn btn-sm" style={{backgroundColor:'#863718',color:'white'}}>+ Ajouter</button>
                            </div>
                            { confirmDestination && <Modalconfirm hideConfirmMenuModif={hideConfirmMenuModif} message="Voulez-vous ajouter cette destination?" handleConfirmSubmitDestination={handleConfirmSubmitDestination}/>}
                      </form>
                      )}

                      {selectedCategory === 'Provenance' && (
                      <form className="d-flex flex-row justify-content-start align-items-end mb-4" onSubmit={handleOnSubmitProvenance}>
                            <div className='form-group' style={mymargin}>
                                <label className="d-block" htmlFor='provenance'>Nouvelle provenance</label>
                                <input type="text" name="provenance" id='provenance' value={data.provenance} onChange={handleOnChange} required className='form-control-sm'/>
                            </div>
                            <div>
                                <button disabled={!checkProvenanceOK} type="submit" className="btn btn-sm" style={{backgroundColor:'#863718',color:'white'}}>+ Ajouter</button>
                            </div>
                            { confirmProvenance && <Modalconfirm hideConfirmMenuModif={hideConfirmMenuModif} message="Voulez-vous ajouter ce provenance?" handleConfirmSubmitProvenance={handleConfirmSubmitProvenance}/>}
                      </form>
                      )}
                      
                      <div style={{maxHeight:'420px',overflowY:'auto'}} className='p-3'>
                        { selectedCategory==='Conteneur' && <TableConteneur triggerUpdate={triggerUpdate} conteneurs={conteneurs} typeConteneurs={typeConteneurs}/>}

                        { selectedCategory==='Type de conteneurs' && <TableTypeConteneur triggerUpdate={triggerUpdate} typeConteneurs={typeConteneurs}/>}

                        { selectedCategory==='Catégorie' && <TableCategorie triggerUpdate={triggerUpdate} categories={categories}/>}

                        { selectedCategory==='Provenance' && <TableProvenance triggerUpdate={triggerUpdate} provenances={provenances}/>}
                        
                        { selectedCategory==='Destination' && <TableDestination  triggerUpdate={triggerUpdate} destinations={destinations}/>}
                      </div>
                  
              </div>
          </div>
        )}
        {!affiche && <Spinner/>}
      </>

        
    )
  };
  
  export default Modification;