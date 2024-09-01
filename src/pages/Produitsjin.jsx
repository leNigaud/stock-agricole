import iconsearch from './image/iconsearch.png';

import Carte from './Carte';
import { useEffect, useState } from 'react';

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

    //pour gérer la fenêtre modale de l'ajout de produit
    const [ajoutProduit,setAjoutProduit] = useState(false)
    
    //variable de filtre
    const [selectedCategory,setSelectedCategory] = useState('Tous les catégories')
    const [selectedConteneurs,setSelectedConteneurs] = useState('Tous les conteneurs')
    const [selectedStock,setSelectedStock] = useState("")
    const [search,setSearch] = useState("")


    // const categories = ['Tous les catégories', 'Fruits', 'Cat1', 'Cat2', 'Cat3', 'Cat4'];

    
    const [produitsrecues, setProduitsrecues] = useState([])
    const [produits, setProduits] = useState([])
    const [conteneurs, setConteneurs] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const produitsResponse = await getAll("produits");
                setProduitsrecues(produitsResponse);
                setProduits(produitsResponse);
                const categoriesResponse = await getAll("categories");
                setCategories([{"idCat": 0, "nom": "Tous les catégories"}, ...categoriesResponse]);
                const conteneursResponse = await getAll("conteneurs");
                setConteneurs(conteneursResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const getAll = async (string) => {
        try {
            const fetcher = 'http://localhost:3010/' + string;
            const response = await fetch(fetcher);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

        function getCategorieName(productId, produits, categories) {
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

        // ALL FILTRES
    useEffect(() => {
        let products = produitsrecues.filter(pr => 
            filterCategory(selectedCategory, pr) &&
            filterSearch(search, pr) &&
            filterStocked(selectedStock, pr) &&
            filterConteneur(selectedConteneurs, pr)
        )
        setProduits(products)
        
    }, [selectedCategory, selectedConteneurs, search, selectedStock]);

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

                <div className='mb-2 d-flex flex-row align-items-middle'>
                    <div style={{marginRight:"10px"}}>Stocké</div>
                    <div style={{marginRight:"50px"}}><input type='radio' value="stocked" name="stock" onChange={handleChangeStock}/></div>
                    <div style={mymargin}>
                        <label className="d-block">Conteneur</label>
                        <select onChange={handleChangeConteneur}>
                            <option selected key="1212" value="Tous les conteneurs">Tous les conteneurs</option>
                                { conteneurs?.map((conteneur)=>(<option key={conteneur.idType} value={conteneur.nom}>{conteneur.nom}</option>))}   
                        </select>
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                    <div style={{marginRight:"10px"}}>Non stocké</div>
                    <div style={{marginRight:"50px"}}><input type='radio' value="notStocked" name="stock" onChange={handleChangeStock}/></div>
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                    <div style={{marginRight:"10px"}}>Tout</div>
                    <div style={{marginRight:"50px"}}><input type='radio' value="tout" name="stock" onChange={handleChangeStock}/></div>
                </div>

                <div className='d-flex flex-row flex-wrap' style = {scrollcarte}>
                    {produits?.map((produit,index)=> <Carte key={index} produit={produit} moncategorie={getCategorieName(produit.idPro,produits,categories)} monconteneur={getConteneurProduit(produit.idPro,produits,conteneurs)} categories={categories}/>)}
                </div>
            
        </div>
    </div>
    )
  };
  
  export default Produits;