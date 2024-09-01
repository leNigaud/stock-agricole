
import iconsearch from './image/iconsearch.png';
import Carte from './Carte';
import { useEffect, useState } from 'react';

import Modalajout from './Modalajout';
import Modaldetails from './Modaldetails';
import axios from 'axios';
import Profil from './Profil';

import Spinner from './Spinner';


import Carousel from "@itseasy21/react-elastic-carousel";

import  "./css/carousel.css"

const Produits = () => {
    //partie css
    const breakPoints = [
        { width:1,itemsToShow:1 },
        { width:550,itemsToShow:2 },
        { width:768,itemsToShow:4 },
        { width:1200,itemsToShow:5 },
    ]

    const scrollcarte = {
        maxHeight:'1000px',
        overflowX:'auto'
    }

    const mymargin = {
        marginRight:'40px'
    }

    const hideAjoutProduit = () => {
        setAjoutProduit(false)
    }

    //pour gérer la fenêtre modale de l'ajout de produit
    const [ajoutProduit,setAjoutProduit] = useState(false)

    //variable pour declencher un update
    const [update, setUpdate] = useState(0);

    const triggerUpdate = () => {
        setUpdate(prevUpdate => prevUpdate + 1);
    };
    
    //variable de filtre
    const [selectedCategory,setSelectedCategory] = useState('Tous les catégories')
    const [selectedConteneurs,setSelectedConteneurs] = useState('Tous les conteneurs')
    const [selectedStock,setSelectedStock] = useState("")
    const [search,setSearch] = useState("")

    // const categories = ['Tous les catégories', 'Fruits', 'Cat1', 'Cat2', 'Cat3', 'Cat4'];

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
    
    const [showDetail,setShowDetail] = useState(false)
    const [dProps,setDProps] = useState({})
    
    //récuperer les données
    useEffect(() => {
        axios.get(`https://laravel-deploy-test-three.vercel.app/api/api/produits`)
            .then(res => {
                setData(res.data)
                setProduits(res.data.produits)
                setProduitsrecues(res.data.produits)
                setCategoriesenv(res.data.categories)
                setCategories([{idcat:0,nom:"Tous les catégories"},...res.data.categories])
                setProvenances(res.data.provenances)
                setConteneurs(res.data.conteneurs)
                setStockages(res.data.stockages)
            })
            .catch(error => console.error("Erreur lors de la récupération des données du produit:", error));
    }, [update]);

    // const { conteneurs, categories, provenances, stockages } = data
   
    //fonction spéciale
 
    const getCategorieName=(productId, produits, categories) => {
        // Trouver le produit correspondant à l'ID donné
        const produit = produits.find(prod => prod.idPro === productId);
        
        // Vérifier si le produit existe
        if (!produit) {
            return 'Catégorie inconnue';
        }
        
        // Trouver la catégorie correspondant à l'ID de catégorie du produit
        const categorie = categories.find(cat => cat.idCat === produit.idCat);
        
        // Vérifier si la catégorie existe
        if (!categorie) {
        return 'Catégorie inconnue';
        }
        
        // Retourner le nom de la catégorie
            return categorie.nom;
    }

    const getConteneurProduit = (produitId, produits, conteneurs) => {
    // Recherche du produit spécifique par son identifiant
    const produit = produits.find(produit => produit.idPro === produitId);
    
    // Si le produit n'est pas trouvé, retourner null
    if (!produit) {
        return null;
    }
    
    // Recherche du conteneur correspondant à l'idTypeCont du produit
    const conteneur = conteneurs.find(conteneur => conteneur.idType === produit.idTypeCont);
    
    // Si le conteneur n'est pas trouvé, retourner null
    if (!conteneur) {
        return null;
    }
    
    // Retourner le conteneur trouvé
    return conteneur.nom;
    };

    const determinerStock = (produit) => {
        // Vérifier si la quantité du produit est supérieure à 0
        if (produit.qte > 0) {
            return "stock";
        } else {
            return "nonstock";
        }
    };

    const getProvenanceForProduct = (productId, products, provenances) => {
        // Trouver le produit spécifique
        const product = products.find(prod => prod.idPro === productId);
    
        // Si le produit existe
        if (product) {
            // Trouver la provenance correspondante
            const productProvenance = provenances.find(prov => prov.id === product.idProvenance);
    
            // Si la provenance est trouvée
            if (productProvenance) {
                return productProvenance.nom;
            } else {
                return "Provenance non trouvée";
            }
        } else {
            return "Produit non trouvé";
        }
    }

    function getStockageForProduct(productId, produits, stockages) {
        // Trouver le produit spécifique
        const product = produits.find(prod => prod.idPro === productId);
    
        // Si le produit existe
        if (product) {
            // Trouver le stockage correspondant au produit
            const stockage = stockages.find(stockage => stockage.libelle === product.libelle);
            return stockage ? stockage : [];
        } else {
            return "Produit non trouvé";
        }
    }

    const recupererStocks = (libelle) => {
        // Assurez-vous que la variable stocks est définie
        if (!Array.isArray(stockages)) {
            console.error("La variable 'stocks' n'est pas définie ou n'est pas un tableau.");
            return [];
        }
        
        // Trouver le stock correspondant au libellé
        const lesstocks = stockages.filter(prod => prod.libelle.toLowerCase() === libelle.toLowerCase());
        
        // Vérifier s'il y a des stocks correspondants
        if (lesstocks.length === 0) {
            // console.warn("Aucun stock trouvé pour le libellé:", libelle);
        }
        
        return lesstocks;
    }
    

    // ALL FILTRES
    //fonction utilisée pour les filtres
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

    useEffect(() => {

        function filterConteneur(selectCont, produit){
            if(selectCont == "Tous les conteneurs") return true
            else return selectCont == getConteneurProduit(produit.idPro, produitsrecues, conteneurs)
        }
        let products = produitsrecues?.filter(pr => 
            filterCategory(selectedCategory, pr) &&
            filterSearch(search, pr) &&
            filterStocked(selectedStock, pr) &&
            filterConteneur(selectedConteneurs, pr)
        )
        setProduits(products)
        if(products.length == 0 ) setProduits(null)
        
    }, [selectedCategory, selectedConteneurs, search, selectedStock]);

        
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

    const handleChangeConteneur = (e) => {
        const {value} = e.target
        setSelectedConteneurs(value)
    }

    const handleOnClickCategory = (category) => {
        setSelectedCategory(category)
    }

    return (
       data? <div className="d-flex flex-row justify-content-around align-items-center mt-3">
                    <div className='' style={{width:'100%'}}>
                            <div className='d-flex flex-row justify-content-between  mb-3'>
                                <div className="d-flex flex-row justify-content-start align-items-center">
                                    <div style={mymargin}>
                                        <h3>Produits</h3>
                                    </div>
                                    
                                    <div className='form-group' style={mymargin}>
                                        <div className="input-group input-group-sm" >
                                            <span className="input-group-text"><img src={iconsearch} alt=''/></span>
                                            <input id="email" className="form-control" placeholder="Rechercher un produit" onChange={handleChangeSearch}/>
                                        </div>
                                    </div>

                                    { user.privilege==="Administrateur" && (    
                                        <div>
                                            <button type="button" className="btn btn-success btn-sm" onClick={()=>setAjoutProduit(true)}>+ Produit</button>
                                            { ajoutProduit && <Modalajout triggerUpdate={triggerUpdate} hideAjoutProduit={hideAjoutProduit} categories={categoriesEnv} conteneurs={conteneurs}/>}
                                        </div>
                                    )}
                                </div>
                                    <Profil triggerUpdate={triggerUpdate}/>
                            </div>
                            
                            <div className="d-flex flex-row flex-wrap justify-content-start mb-3">
                                {categories?.map(category => (
                                        <div
                                            key={category.id}
                                            style={{
                                                ...mymargin,
                                                color: selectedCategory === category.nom ? '#863718' : '#000000',
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
                                <div style={mymargin} className="d-flex flex-row justify-content-start align-items-center" >
                                    <label style={mymargin} htmlFor='conteneur'>Conteneur</label>
                                    <select onChange={handleChangeConteneur} id='conteneur' >
                                        <option selected key="1212" value="Tous les conteneurs">Tous les conteneurs</option>
                                            { conteneurs?.map((conteneur)=>(<option key={conteneur.idType} value={conteneur.nom}>{conteneur.nom}</option>))}   
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex flex-row justify-content-start mb-4">
                            </div>
                            {
                            showDetail ? 
                            <Modaldetails
                                dProps = {dProps}
                                setShowDetail = {setShowDetail}        
                                provenances={provenances} 
                                categories={categories} 
                                conteneurs={conteneurs}
                                user={user}    
                            
                            /> : null
                                
                            }               
                            <div className='d-flex flex-row flex-wrap' style = {scrollcarte}>
                                
                               { 
                                produits ? 
                               <Carousel breakPoints={breakPoints}>
                                       {produits?.map((produit,index)=> <Carte 
                                            key={index} 
                                            triggerUpdate={triggerUpdate} 
                                            monstockage={recupererStocks(produit.libelle)} 
                                            provenances={provenances} 
                                            maprovenance={getProvenanceForProduct(produit.idPro,produits,provenances)} 
                                            produit={produit} 
                                            moncategorie={getCategorieName(produit.idPro,produits,categories)} 
                                            monconteneur={getConteneurProduit(produit.idPro,produits,conteneurs)} 
                                            categories={categoriesEnv} 
                                            conteneurs={conteneurs}
                                            
                                            showDetail={showDetail}
                                            setShowDetail={setShowDetail}
                                            setDProps = {setDProps}
                                            />)}
                                </Carousel> : ""
                                }
                            </div>
                    </div>
                </div>   
        : <Spinner/>
        
    
    )

  };
  
  export default Produits;