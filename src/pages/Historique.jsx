
import iconsearch from './image/iconsearch.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Profil from './Profil';
import Spinner from './Spinner';


const Historique = () => {
    const [selectedType,setSelectedType] = useState('Tout')

    const lescategories = ['Tout', 'Entrée', 'Sortie'];

    const scrollcarte = {
        maxHeight:'290px',
        overflowY:'auto'
    }

    const mymargin = {
        marginRight:'40px'
    }

    //variable pour declencher un update
    const [update, setUpdate] = useState(0);
    const triggerUpdate = () => {
        setUpdate(prevUpdate => prevUpdate + 1);
    };


    //capturer les donnees
    const [data,setData] = useState(null)
    const [historiques,setHistoriques] = useState(null)
    const [categories,setCategories] = useState(null)
    const [conteneurs,setConteneurs] = useState(null)
    const [provenances,setProvenances] = useState(null)
    const [destinations,setDestinations] = useState(null)
    const [typeConteneurs,setTypeConteneurs] = useState(null)
    const [lieux, setLieux] = useState([]);
    const [mescont,setMescont] = useState(["1","2"])


    //récuperer les données
    useEffect(() => {
        axios.get(`https://laravel-deploy-test-three.vercel.app/api/api/historiques`)
            .then(res => {
                console.log(res.data)
                setData(res.data)
                setCategories([{idcat:0,nom:"Tous les catégories"},...res.data.categories])
                setProvenances([{idP:0,LieuP:"Toutes les provenances"},...res.data.provenances])
                setConteneurs(res.data.conteneurs)
                setDestinations([{idD:0,LieuD:"Toutes les destinations"},...res.data.destinations])
                setTypeConteneurs(res.data.typeConteneurs)
                setHistoriques(res.data.historiques)

                // Fusionner les lieux de provenance et de destination
                const allLocations = ["Tous les lieux",...res.data.provenances.map(prov => prov.LieuP), ...res.data.destinations.map(dest => dest.LieuD)]
                // Supprimer les doublons des lieux
                const uniqueLocations = Array.from(new Set(allLocations));

                // Mettre à jour l'état avec les lieux uniques
                setLieux(uniqueLocations);

                // les conteneurs
                const allcont = [...res.data.historiques.map(histo => histo.conteneur)]
                // Supprimer les doublons des conteneurs
                const uniqueConts = Array.from(new Set(allcont));

                // Mettre à jour l'état avec les conteneurs uniques
                setMescont(uniqueConts.sort());
                

            })
            .catch(error => console.error("Erreur lors de la récupération des données dans le menu historique :", error));
    }, [update]);

     //fonction pour récupérer le type de conteneur

     function getTypeConteneur(historique) {
    
        if (!historique) {
            console.error("Historique non trouvé.");
            return null;
        }
    
        // Trouver le conteneur correspondant à l'historique
        const conteneur = conteneurs.find(cont => cont.idCont === parseInt(historique.conteneur));
    
        if (!conteneur) {
            console.error("Conteneur non trouvé.");
            return "Introuvable";
        }
    
        // Trouver le type de conteneur correspondant
        const typeConteneur = conteneurs.find(type => type.idType === conteneur.type);
    
        if (!typeConteneur) {
            console.error("Type de conteneur non trouvé.");
            return "Introuvable";
        }
    
        return typeConteneur.nom;
    }

    // Initialisation d'un ensemble pour stocker les noms d'utilisateurs uniques
    const usersSet = new Set();

    // Ajouter "Tous les utilisateurs" à l'ensemble
    usersSet.add("Tous les utilisateurs");

    // Parcourir chaque élément de l'array historiques
    data?.historiques?.forEach(historique => {
        // Ajouter le nom d'utilisateur à l'ensemble
        usersSet.add(historique.user);
    });

    // Convertir l'ensemble en un tableau pour obtenir une liste unique de noms d'utilisateurs
    const utilisateurs = Array.from(usersSet);



    //events
    const handleOnClickCategory = (type) => {
        setSelectedType(type)
    }

    //variable de filtre
    const [selectedCategorie,setSelectedCategorie] = useState('Tous les catégories')
    const [selectedDate,setSelectedDate] = useState("")
    const [selectedConteneur,setSelectedConteneur] = useState('Tous les conteneurs')
    const  [selectedDestination,setSelectedDestination] = useState("Toutes les destinations")
    const [selectedProvenance,setSelectedProvenance] = useState("Toutes les provenances")
    const [selectedUser,setSelectedUser] = useState("Tous les utilisateurs")
    const [selectedLieu,setSelectedLieu] = useState("Tous les lieux")
    const [search,setSearch] = useState("")

    useEffect(() => {
        if (data) {
            // Fonction de filtrage
            const filterHistoriques = () => {
                let filteredHistoriques = data.historiques;
        
                // Filtrer par catégorie
                if (selectedCategorie !== 'Tous les catégories') {
                    filteredHistoriques = filteredHistoriques?.filter(historique => historique.Categorie === selectedCategorie);
                }
        
                // Filtrer par conteneur
                if (selectedConteneur !== 'Tous les conteneurs') {
                    filteredHistoriques = filteredHistoriques?.filter(historique => historique.conteneur === selectedConteneur);
                }
         

        
                if (selectedDate !== "") {
                    // Créer un objet Date à partir de la date sélectionnée
                    const selectedDateTime = new Date(selectedDate);
                
                    // Extraire l'année, le mois et le jour de la date sélectionnée
                    const year = selectedDateTime.getFullYear();
                    const month = String(selectedDateTime.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0, donc on ajoute 1
                    const day = String(selectedDateTime.getDate()).padStart(2, '0');
                
                    // Formatter la date au format "yyyy-mm-dd"
                    const formattedDate = `${year}-${month}-${day}`;
                    
                    // Filtrer les historiques
                    filteredHistoriques = filteredHistoriques.filter(historique => historique.created_at.includes(formattedDate));
                }
        
                // Filtrer par lieu
                if (selectedLieu !== "Tous les lieux") {
                    filteredHistoriques = filteredHistoriques?.filter(historique => historique.Lieu === selectedLieu);
                }
        
                // Filtrer par type
                if (selectedType !== 'Tout') {
                    filteredHistoriques = filteredHistoriques?.filter(historique => historique.type === selectedType);
                }
        
                // Filtrer par utilisateur
                if (selectedUser !== 'Tous les utilisateurs') {
                    filteredHistoriques = filteredHistoriques?.filter(historique => historique.user === selectedUser);
                }
        
                // Filtrer par recherche
                if (search !== "") {
                    filteredHistoriques = filteredHistoriques?.filter(historique => historique.Produit.includes(search));
                }
        
                // Mettre à jour l'état avec les historiques filtrés
                setHistoriques(filteredHistoriques);
            };
        
            // Appeler la fonction de filtrage
            filterHistoriques();
        }
    }, [selectedCategorie, selectedConteneur, selectedDate, selectedLieu, selectedType, selectedUser, search]);
    


    return (
    data?<div className="d-flex flex-row justify-content-around mt-3">
        <div className='' style={{width:'100%'}}>
                <div className='d-flex flex-row justify-content-between  mb-3'>
                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <div style={mymargin}>
                            <h3>Historique</h3>
                        </div>
                        
                        <div className='form-group' style={mymargin}>
                            <div className="input-group input-group-sm" >
                                <span className="input-group-text"><img src={iconsearch} alt=''/></span>
                                <input id="search" value={search}  onChange={(e)=>setSearch(e.target.value)} className="form-control" placeholder="Rechercher un produit" />
                            </div>
                        </div>

                    </div>
                    <Profil triggerUpdate={triggerUpdate}/>
                </div>
                

                <div className="d-flex flex-row justify-content-start mb-3">
                    {lescategories.map(category => (
                            <div
                                key={category}
                                style={{
                                    ...mymargin,
                                    color: selectedType === category ? '#863718' : '#000',
                                    textDecoration: selectedType === category ? 'underline' : 'none',
                                    fontWeight: selectedType === category ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                }}
                                onClick={()=> handleOnClickCategory(category)}
                            >
                                {category}
                            </div>
                    ))}
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                    <div style={mymargin}>
                        <label className="d-block">Catégorie</label>
                        <select value={selectedCategorie} onChange={(e)=>setSelectedCategorie(e.target.value)}>
                            {categories?.map(categorie=> (<option value={categorie.nom}>{categorie.nom}</option>))}
                        </select>
                    </div>
                    <div className='form-group' style={mymargin}>
                        <label className="d-block">Date</label>
                        <input type="date" onChange={(e)=>setSelectedDate(e.target.value)} className='form-control-sm'></input>                
                    </div>
                    <div style={mymargin}>
                        <label className="d-block">Conteneur</label>
                        <select value={selectedConteneur} onChange={(e)=>setSelectedConteneur(e.target.value)}>
                            <option value="Tous les conteneurs">Tous les conteneurs</option>
                            {/* {typeConteneurs?.map(typeconteneur=> (<option value={typeconteneur.nom}>{typeconteneur.nom}</option>))}  */}
                            {mescont?.map((moncont,index)=>(<option key={index} value={moncont}>{moncont}</option>))}
                        </select>
                    </div>

                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  {/* <div className='form-group' style={mymargin}>
                        <label class="d-block">Destination</label>
                        <select>
                            {destinations?.map(destination=> (<option key={destination.idD} value={destination.LieuD}>{destination.LieuD}</option>))}
                        </select>
                  </div>
                  <div className='form-group' style={mymargin}>
                        <label class="d-block">Provenance</label>
                        <select>
                            {provenances?.map(provenance=> (<option key={provenance.idP} value={provenance.LieuP}>{provenance.LieuP}</option>))}
                        </select>
                  </div> */}
                  <div className='form-group' style={mymargin}>
                        <label class="d-block">Lieu</label>
                        <select value={selectedLieu} onChange={(e)=>setSelectedLieu(e.target.value)}>
                            {lieux?.map((lieu,index) => (<option key={index} value={lieu}>{lieu}</option>))}
                        </select>
                  </div>
                  <div style={mymargin}>
                    <label className="d-block">Utilisateur</label>
                    <select value={selectedUser} onChange={(e)=>setSelectedUser(e.target.value)}>
                        {utilisateurs.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </div>
                </div>
                
                <div className='d-flex flex-row flex-wrap' style = {scrollcarte}>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Produit</th>
                                <th>Catégorie</th>
                                <th>Unité</th>
                                <th>Poids(Kg)</th>
                                <th>Conteneur</th>
                                <th>Lieu</th>
                                <th>Utilisateur</th>
                            </tr>
                        </thead>
                        <tbody>
                            { historiques?.map(historique=>(
                                <tr key={historique.idH}>
                                    <td>{historique.type}</td>
                                    <td>{historique.created_at}</td>
                                    <td>{historique.Produit}</td>
                                    <td>{historique.Categorie}</td>
                                    <td>{historique.unite}</td>
                                    <td>{historique.quantite}</td>
                                    <td>{historique.conteneur}</td>
                                    <td>{historique.Lieu}</td>
                                    <td>{historique.user}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            
        </div>
    </div>
    :<Spinner/>

        
    )
  };
  
  export default Historique;