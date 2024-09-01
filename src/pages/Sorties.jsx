
import iconsearch from './image/iconsearch.png'
import Cartesortie from './Cartesortie'
import Cartesortieconfirm from './Cartesortieconfirm';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Modalconfirm from './Modalconfirm';
import Modalerror from './Modalerror';
import Modalsuccess from './Modalsuccess';
import Profil from './Profil'

import Spinner from './Spinner';

const Sorties = () => {

    const scrollcarte = {
        maxHeight:'450px',
        overflowY:'auto'
    }

    const scrollcarteentree = {
        maxHeight:'450px',
        overflowY:'auto'
    }

    const mymargin = {
        marginRight:'40px'
    }

    const handleOnClickCategory = (category) => {
        setSelectedCategory(category)
    }
    //variable pour declencher un update
    const [update, setUpdate] = useState(0);

    const triggerUpdate = () => {
        setUpdate(prevUpdate => prevUpdate + 1);
    };
    
    //variables où stocker les données fetched
    const [data,setData] = useState(null)

    //variable où stocker après destructuration
    const [produits,setProduits] = useState([])
    const [produitsrecues, setProduitsrecues] = useState([])
    const [categoriesEnv, setCategoriesenv] = useState([])
    const [conteneurs,setConteneurs] = useState([])
    const [categories,setCategories] = useState([])
    const [provenances,setProvenances] = useState([])
    const [stockages,setStockages] = useState([])
    const [contenance,setContenance] = useState([])
    const [produitScroll,setProduitScroll] = useState(null)
    const [carteRefs, setCarteRefs] = useState([])
    const [selectedProvenance,setSelectedProvenance] = useState(null)

    const [produitConfirm, setProduitConfirm] = useState([])
    const [produitChanged, setProduitChanged] = useState(null)

    useEffect(() => {
        if(produitChanged){
            let produitsrecuesChanged = produitsrecues?.map((produit) => {
                if(produit.idPro === produitChanged.idPro) return produitChanged
                else return produit
            })
            
            let produitsChanged = produits?.map((produit) => {
                if(produit.idPro === produitChanged.idPro) return produitChanged
                else return produit
            })
            // console.log(produitChanged)
            setProduits(produitsChanged)
            setProduitsrecues(produitsrecuesChanged)
        }
    }, [produitChanged])

    useEffect(() => {
        if(produitScroll){
            setProduits((produitsrecues))
            console.log(produitScroll.ref.inputR)
            console.log(produitScroll.produit.qte)
            
            setTimeout(() => {
                produitScroll.ref.inputR.current.value = produitScroll.produit.qte
                produitScroll.ref.inputR.current.dispatchEvent(new Event('input', { bubbles: true }));
                
            }, 400);

            // produitScroll.ref.inputR.current.value = produitScroll.produit.qte
            // produitScroll.ref.inputR.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }, [produitScroll])

    //récuperer les données
    useEffect(() => {
        axios.get(`http://localhost:8000/api/sortie`)
            .then(res => {
                setData(res.data)
                setProduits(res.data.produits)
                setProduitsrecues(res.data.produits)
                setCategoriesenv(res.data.categories)
                setCategories([{idcat:0,nom:"Tous les catégories"},...res.data.categories])
                setConteneurs(res.data.typeconteneur)
                setStockages(res.data.stockages)
                setContenance(res.data.contenance)
                setProvenances(res.data.destinations)
                setSelectedProvenance(res.data.destinations[0]["LieuD"])
            })
            .catch(error => console.error("Erreur lors de la récupération des données :", error));
    }, [update]);

    //variable de filtre
    const [selectedCategory,setSelectedCategory] = useState('Tous les catégories')
    const [selectedStock,setSelectedStock] = useState("")
    const [search,setSearch] = useState("")
    const [selectedConteneurs,setSelectedConteneurs] = useState('Tous les conteneurs')

    //Fonctions getters
    const getCategorieName=(productId, produits, categories) => {
        const produit = produits.find(prod => prod.idPro === productId);
        if (!produit) {
            return 'Catégorie inconnue';
        }
        
        const categorie = categories.find(cat => cat.idCat === produit.idCat);

        if (!categorie) {
        return 'Catégorie inconnue';
        }

        return categorie.nom;
    }

    const getConteneurProduit = (produitId, produits, conteneurs) => {
        const produit = produits.find(produit => produit.idPro === produitId);
        
        if (!produit) {
            return null;
        }
        
        const conteneur = conteneurs.find(conteneur => conteneur.idType === produit.idTypeCont);
        
        if (!conteneur) {
            return null;
        }
        
        return conteneur.nom;
    };

    //Fonctions filtres
    function filterCategory(cat, produit){
        if(cat == "Tous les catégories") return true
        else return cat == getCategorieName(produit.idPro, produitsrecues, categories) 
    }
    function filterSearch(string, produit){
    if(string == "") return true
        else return produit.libelle.toLowerCase().includes(string.toLowerCase()) 
    }

    function filterStocked(selectStock, produit){
        if(selectStock == "tout" || selectStock == "") return true
        else if(selectStock == "stocked") return produit.qte != "0" 
        else if(selectStock == "notStocked") return produit.qte == "0" 
    }
    
    function filterConteneur(selectCont, produit){
        if(selectCont == "Tous les conteneurs") return true
        else return selectCont == getConteneurProduit(produit.idPro, produitsrecues, conteneurs)
    }
    useEffect(() => {
        let products = produitsrecues?.filter(pr => 
            filterCategory(selectedCategory, pr) &&
            filterSearch(search, pr) &&
            filterStocked(selectedStock, pr) &&
            filterConteneur(selectedConteneurs, pr)
        )
        setProduits(products)
        
    }, [selectedCategory, selectedConteneurs,
        search, selectedStock]);

    const handleChangeConteneur = (e) => {
        const {value} = e.target
        setSelectedConteneurs(value)
    }    

    const handleChangeStock = (e) => {
        const {value} = e.target
        const checked = e.target.checked
        if(checked) {
            setSelectedStock(value);
        } 
    }

    const handleChangeSearch = (e) => {
        const {value} = e.target
        setSearch(value)
    }
    
   
    // Event handler to scroll to the specific Carteentree component and send data
    const scrollToCarteentree = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log("error, ref null")
        }
    };

    // const handleClick = () => {
    //     scrollToCarteentree(9)
    //     console.log("cliked")
    // }
    

    //gestion des fenetres modales
    const [confirm,setConfirm] = useState(false)
    const [confirmvider,setConfirmvider] = useState(false)
    const [success,setSuccess] = useState(false)
    const [modalerror,setModalerror] = useState(false)
    
    const hideConfirm = () => {
        setConfirm(false)
        setConfirmvider(false)
    }

    const hideModalSuccessModif = () => {
        setSuccess(false)
        triggerUpdate()
    }

    const hideModalErrorModif = () => {
        setModalerror(false)
    }

    const handleOnClickOkConfirm = () => {
        // setProduitConfirm(prevdata=>({...prevdata,provenance:selectedProvenance}))
        let pc = produitConfirm
        pc.push({destination: selectedProvenance})
        // let user = localStorage.getItem("userData");
        // user = JSON.parse(user); 
        let user = {
            "name" : "Invité",
            "jeton" : "jet",
            "privilege" : "Administrateur",
            "photo" : "image/TWQjVOALZ53SScp0Qxfit5QX7XHIetSgNJ8F8m5I.jpg"
        }
        pc.push({"user": user.name})
        // setProduitConfirm(pc)
        axios.post(`http://localhost:8000/api/sortie`,pc , {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            setSuccess(true)
            setConfirm(false)
            setProduitConfirm([])
        })
        .catch(err => {
            setModalerror(true)
            console.error("Erreur lors de l'ajout des données  du menu entree:", err)
        });
    }

    const handleVider = () => {
        setProduitConfirm([])
    }
    
    return (
    data? <div className="d-flex flex-row justify-content-around mt-3">
        { confirm && <Modalconfirm hideConfirm={hideConfirm} handleOnClickOkConfirm={handleOnClickOkConfirm} message="Vouleez-vous sortir ces produits?"/>}
        { confirmvider && <Modalconfirm hideConfirm={hideConfirm} handleVider={handleVider} message="Voulez-vous vider ces produits à sortir?"/>}
        { success && <Modalsuccess hideModalSuccessModif={hideModalSuccessModif}/>}
        { modalerror && <Modalerror hideModalErrorModif={hideModalErrorModif}/>}
        <div className='' style={{width:'100%'}}>
                <div className='d-flex flex-row justify-content-between align-items-center mb-3'>                   
                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <div style={mymargin}>
                            <h3>Sorties</h3>
                        </div>


                        <div className='form-group' style={mymargin}>
                            <div className="input-group input-group-sm" >
                                <span className="input-group-text"><img src={iconsearch} alt=''/></span>
                                <input id="email" className="form-control" placeholder="Rechercher un produit" type="text" onChange={handleChangeSearch} />
                            </div>
                        </div>

                    </div>
                    <Profil triggerUpdate={triggerUpdate}/>
                </div>
 

                <div className="d-flex flex-row flex-wrap justify-content-start mb-3">
                    {categories.map(category => (
                            <div
                                key={category.id}
                                style={{
                                    ...mymargin,
                                    color: selectedCategory === category.nom ? '#863718' : 'black',
                                    textDecoration: selectedCategory === category.nom ? 'underline' : 'none',
                                    fontWeight: selectedCategory === category.nom ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                }}
                                onClick={()=> handleOnClickCategory(category.nom)}
                            >
                                {category.nom}
                            </div>
                    ))}
                </div>

                <div className='mb-2 d-flex flex-row align-items-middle mb-3'>
                        <div style={{marginRight:"10px"}}>
                            <label htmlFor="stocked">Stocké</label>
                        </div>
                        <div style={{marginRight:"50px"}}><input type='radio' value="stocked" id="stocked" name="stock" onChange={handleChangeStock}/></div>
                        <div style={{marginRight:"10px"}}>
                        <label htmlFor="notStocked">Non stocké</label>
                        </div>
                        <div style={{marginRight:"50px"}}><input type='radio' value="notStocked" id="notStocked" name="stock" onChange={handleChangeStock}/></div>
                        <div style={{marginRight:"10px"}}>
                            <label htmlFor="tout">Tout</label>
                        </div>
                        <div style={{marginRight:"50px"}}><input type='radio' value="tout" id="tout" name="stock" onChange={handleChangeStock}/></div>
                        </div>

                        <div className="d-flex flex-row justify-content-start mb-4">
                                <div style={mymargin} className='d-flex flex-row justify-content-start align-items-center'>
                                    <label style={mymargin} htmlFor='conteneur'>Conteneur</label>
                                    <select defaultValue="Tous les conteneurs" onChange={handleChangeConteneur} id="conteneur">
                                        <option key="1212" value="Tous les conteneurs">Tous les conteneurs</option>
                                            { conteneurs?.map((conteneur)=>(<option key={conteneur.idType} value={conteneur.nom}>{conteneur.nom}</option>))}   
                                    </select>
                                </div>
                        </div>
                {/* <button
                    onClick = {handleClick}
                >
                    Click here
                </button> */}
                <div className='d-flex flex-row justify-content-start'>
                    <div className='d-flex flex-column p-3' style = {{...scrollcarte,border:'1px solid black',marginRight:'35px',width:'650px'}}>
                        {produits?.map((produit, i) => 
                            <Cartesortie 
                                key={produit.idPro} 
                                // id={produit.idPro} 
                                type="sortir" 
                                // ref={ref => refs.current[produit.idPro] = ref} // Assign the ref to the array
                                produit={produit} 
                                produitsrecues={produitsrecues} 
                                conteneurs={conteneurs}
                                produitConfirm = {produitConfirm}
                                setProduitConfirm = {setProduitConfirm} 
                                setProduitChanged = {setProduitChanged}
                                contenance = {contenance}
                                setContenance = {setContenance}
                                setCarteRefs = {setCarteRefs}
                                carteRefs = {carteRefs}
                            />
                        )}
                        
                    </div>


                    <div className='d-flex flex-column p-4' style={{...scrollcarteentree,border:'1px solid black'}}>
                        <div style={{fontWeight:'bold',textAlign:'center'}} className='mb-3'>Les produits à sortir</div>
                        <div className='d-flex flex-row justify-content-between'>
                            <div style={{marginRight:'100px'}}>Destination</div>
                            <div>
                            <select value={selectedProvenance} onChange={(e)=>setSelectedProvenance(e.target.value)}>
                                    {provenances?.map((provenance)=>(<option selected={provenance.LieuD === selectedProvenance} key={provenance.idP} value={provenance.LieuD}>{provenance.LieuD}</option>))}   
                            </select>
                            </div>
                            </div>
                        <div className='d-flex flex-row justify-content-between'>
                            <div>Poids total</div>
                            <div style={{fontWeight:'bold'}}>
                                {
                                    produitConfirm?.reduce((total, obj) => total + obj["uniteEntree"]*obj["unite"], 0)

                                } Kg
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
                        {/* <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Conteneur</th>
                                    <th>Espaces restants</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contenance?.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.nom}</td>
                                        <td>{c.capacite}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}

                        </div>

                        <div className='d-flex flex-column justify-content-around mb-3' >
                            {
                                produitConfirm.map((produit) => 
                                    <Cartesortieconfirm 
                                        key={produit.idPro} 
                                        produit = {produit} 
                                        setProduitConfirm = {setProduitConfirm} 
                                        produitConfirm = {produitConfirm} 
                                        contenance = {contenance}
                                        setContenance = {setContenance}
                                        conteneurs = {conteneurs}
                                        setProduitScroll = {setProduitScroll}
                                        carteRefs = {carteRefs}
                                        setProduitChanged = {setProduitChanged}
                                        produits = {produits}
                                        produitsrecues = {produitsrecues}

                                    />
                                )
                            }
                            {/* <Carteentreeconfirm produit={
                                {
                                    "idPro": 1,
                                    "libelle": "Fraise",
                                    "photo": "Adams",
                                    "unite": 12,
                                    "vie": 12,
                                    "idCat": 3,
                                    "qte": 12,
                                    "idTypeCont": 3,
                                    "created_at": "2024-04-10 12:10:35"
                                }
                            }/> */}
                        </div>
                        <div className='d-flex flex-row justify-content-end'>
                            <div><button type="button" className="btn btn-success btn-md" style={{marginRight:'20px'}} onClick={()=>setConfirm(true)} disabled={produitConfirm.length == 0}>Confirmer</button></div>
                            <div><button type='button' className="btn btn-secondary btn-md"  onClick={()=>setConfirmvider(true)} disabled={produitConfirm.length == 0}>Annuler</button></div>
                        </div>
                    </div>
                </div>
            
        </div>
    </div>
    :<Spinner/>

        
    )
  };
  
  export default Sorties;