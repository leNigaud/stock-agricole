
import iconsearch from './image/iconsearch.png';

import Carte from './Carte';
import { useState } from 'react';

import Modalajout from './Modalajout';

const Produits = () => {
    //partie css
    const scrollcarte = {
        maxHeight:'290px',
        overflowY:'auto'
    }
    
    const mymargin = {
        marginRight:'40px'
    }
    
    const hideAjoutProduit = () => {
        setAjoutProduit(false)
    }
    
    
    //les données recues du backend
    const data = {
        "produits": [
            {
                "idPro": 1,
                "libelle": "Fraise",
                "photo": "imagefraise.png",
                "unite": 150,
                "vie": 10,
                "qte": 50,
                "idCat": 3,
                "idTypeCont": 1,
                "created_at": "2024-04-01T10:02:01.000000Z"
            },
            {
                "idPro": 2,
                "libelle": "Carotte",
                "photo": "imagefraise.png",
                "unite": 450,
                "vie": 90,
                "qte": 150,
                "idCat": 3,
                "idTypeCont": 1,
                "created_at": "2024-04-01T10:02:01.000000Z"
            },
            {
                "idPro": 3,
                "libelle": "Vanille",
                "photo": "imagefraise.png",
                "unite": 1500,
                "vie": 650,
                "qte": 0,
                "idCat": 1,
                "idTypeCont": 4,
                "created_at": "2024-04-01T10:02:01.000000Z"
            },
            {
                "idPro": 4,
                "libelle": "Poivre",
                "photo": "imagefraise.png",
                "unite": 450,
                "vie": 150,
                "qte": 450,
                "idCat": 1,
                "idTypeCont": 4,
                "created_at": "2024-04-01T10:02:01.000000Z"
            },
            {
                "idPro": 5,
                "libelle": "Café",
                "photo": "imagefraise.png",
                "unite": 250,
                "vie": 325,
                "qte": 250,
                "idCat": 1,
                "idTypeCont": 4,
                "created_at": "2024-04-01T10:02:01.000000Z"
            },
            {
                "idPro": 6,
                "libelle": "Cacao",
                "photo": "imagefraise.png",
                "unite": 350,
                "vie": 365,
                "qte": 50,
                "idCat": 1,
                "idTypeCont": 4,
                "created_at": "2024-04-01T10:02:01.000000Z"
            },
            {
                "idPro": 7,
                "libelle": "Banane",
                "photo": "imagefraise.png",
                "unite": 80,
                "vie": 10,
                "qte": 45,
                "idCat": 3,
                "idTypeCont": 1,
                "created_at": "2024-04-01T10:02:01.000000Z"
            }
    
        ],
    
        "categorie" : [
            {
                "idCat":1,
                "nom":"Epices",
                "created_at":"2024-04-01 09:09:53"
            },
            {
                "idCat":2,
                "nom":"Fruits",
                "created_at":"2024-04-01 09:09:53"
            },
            {
                "idCat":3,
                "nom":"Huiles",
                "created_at":"2024-04-01 09:09:53"
            }
        ],
    
        "conteneur" : [
            {
                "idType":1,
                "nom":"Réfrigérateur",
            },
            {
                "idType":2,
                "nom":"Frigidaire",
            },
            {
                "idType":3,
                "nom":"Chambre froide",
            }
        ],
    
        "provenance": [
            {"id": 5,
        "nom": "Toamasina"}
        ]
      
    }

    //pour gérer la fenêtre modale de l'ajout de produit
    const [ajoutProduit,setAjoutProduit] = useState(false)

    //les variables utilisées
        //Pour les noms de catégories
        
        const [selectedCategory,setSelectedCategory] = useState('Tous les catégories')
        const categories = ['Tous les catégories',...data.categorie.nom];
        

        //Pour les produits
        const produitsrecus = data.produits
    
        //Pour les conteneurs
        const conteneurs = data.conteneur
        
        // const [produits,setProduits] = useState(null)
        



    // const produitsrecus = [
    //     {
    //         idPro:"1",
    //         libelle:"Fraise",
    //         photo:"imagefraise.png",
    //         unite:"1",
    //         vie:"1",
    //         idCat:"1",
    //         idTypeCont:"1", 
    //         qte:"0",
    //     },
    //     {
    //         idPro:"2",
    //         libelle:"Riz",
    //         photo:"imagefraise.png",
    //         unite:"1",
    //         vie:"1",
    //         idCat:"1",
    //         idTypeCont:"1", 
    //         qte:"5"
    //     },
    //     {
    //         idPro:"3",
    //         libelle:"Manioc",
    //         photo:"imagefraise.png",
    //         unite:"2",
    //         vie:"1",
    //         idCat:"1",
    //         idTypeCont:"1", 
    //         qte:"4"
    //     },
    // ]



    //fonction spéciale
    function getCategorieName(productId, produits, categories) {
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
      
      const [produits,setproduits] = useState(produitsrecus)

    
    //Les évênements
    const handleOnClickCategory = (category) => {
          setSelectedCategory(category)
      }
    
    const handleChangeSearch = (e) => {
        const {value} = e.target
        // value = value.toLowerCase()
        // setproduits(produits.filter(produit => produit.libelle === value))
        setproduits(produitsrecus.filter(produitrecu => produitrecu.libelle.toLowerCase().includes(value.toLowerCase())))
    }

    const handleChangeStock = (e) => {
        const {checked} = e.target
        // value = value.toLowerCase()
        // setproduits(produits.filter(produit => produit.libelle === value))
        if(checked) setproduits(produitsrecus.filter(produitrecu => produitrecu.qte !== 0 ))

    }

    const handleChangeNonStock = (e) => {
        const {checked} = e.target
        // value = value.toLowerCase()
        // setproduits(produits.filter(produit => produit.libelle === value))
        if(checked) setproduits(produitsrecus.filter(produitrecu => produitrecu.qte === 0 ))
 
    }

    const handleChangeStockAll = (e) => {
        const {checked} = e.target
        // value = value.toLowerCase()
        // setproduits(produits.filter(produit => produit.libelle === value))
        if(checked) setproduits(produitsrecus)
    }


    return (
    <div className="d-flex flex-row justify-content-around mt-3">
        <div className='' style={{width:'100%'}}>
           
                <div className="d-flex flex-row justify-content-start align-items-center mb-3">
                    <div style={mymargin}>
                        <h3>Produits</h3>
                    </div>
                    
                    <div className='form-group' style={mymargin}>
                        <div className="input-group input-group-sm" >
                            <span className="input-group-text"><img src={iconsearch} alt=''/></span>
                            <input id="email" className="form-control" placeholder="Rechercher un produit" onChange={handleChangeSearch}/>
                        </div>
                    </div>

                    <div>
                        <button type="button" className="btn btn-sm" style={{backgroundColor:'#1C822C',color:'white'}} onClick={()=>setAjoutProduit(true)}>+ Produit</button>
                        { ajoutProduit && <Modalajout hideAjoutProduit={hideAjoutProduit}/>}
                    </div>
                </div>
                

                <div className="d-flex flex-row justify-content-start mb-3">
                    {categories.map(category => (
                            <div
                                key={category}
                                style={{
                                    ...mymargin,
                                    color: selectedCategory === category ? '#863718' : 'normal',
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

                <div className='mb-2 d-flex flex-row align-items-middle'>
                    <div style={{marginRight:"10px"}}>Tout</div>
                    <div style={{marginRight:"50px"}}><input type='radio' name="stock" onChange={handleChangeStockAll}/></div>

                    <div style={{marginRight:"10px"}}>Stocké</div>
                    <div style={{marginRight:"50px"}}><input type='radio' name="stock" onChange={handleChangeStock}/></div>

                    <div style={{marginRight:"10px"}}>Non stocké</div>
                    <div style={{marginRight:"50px"}}><input type='radio' name="stock" onChange={handleChangeNonStock}/></div>
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                    <div style={mymargin}>
                        <label className="d-block">Conteneur</label>
                        <select>
                            <option value=""></option>
                                { conteneurs.map((conteneur)=>(<option key={conteneur.idType} value={conteneur.idType}>{conteneur.nom}</option>))}   
                        </select>
                    </div>
                </div>

                <div className='d-flex flex-row flex-wrap' style = {scrollcarte}>
                    {selectedCategory==="Tous les catégories" && produits.map((produit,index)=> <Carte key={index} produit={produit}/>)}
                    {selectedCategory==="Fruits" && produits.map((produit,index)=> <Carte key={index} produit={produit} conteneurs={conteneurs}/>)}
                    {selectedCategory==="Cat1" && produits.map((produit,index)=> <Carte key={index} produit={produit}  conteneurs={conteneurs}/>)}
                    {selectedCategory==="Cat2" && produits.map((produit,index)=> <Carte key={index} produit={produit}  conteneurs={conteneurs}/>)}
                    {selectedCategory==="Cat3" && produits.map((produit,index)=> <Carte key={index} produit={produit}  conteneurs={conteneurs}/>)}
                    {selectedCategory==="Cat4" && produits.map((produit,index)=> <Carte key={index} produit={produit}  conteneurs={conteneurs}/>)}
                </div>
            
        </div>
    </div>

        
    )
  };
  
  export default Produits;