import { Outlet, Link, useLocation } from "react-router-dom";
import logo from './image/logo_agroman.png';

import iconentrees from './image/iconentrees.png';
import iconsorties from './image/iconsorties.png';
import iconmodification from './image/iconmodification.png';
import iconutilisateurs from './image/iconutilisateurs.png';
import iconhistorique from './image/iconhistorique.png';
import iconproduits from "./image/iconproduits.png";

import aiconprod from "./image/aiconprod.png"
import aiconent from "./image/aiconent.png"
import aiconsort from "./image/aiconsort.png"
import aiconhist from "./image/aiconhist.png"
import aiconutil from "./image/aiconutil.png"
import aiconmodif from "./image/aiconmodif.png"

const Menu = () => {
    const mylink = {
        textDecoration: 'none', 
        color: 'inherit'
      };

    const myactivelink = {
        textDecoration: 'none', 
        color: '#1C822C',
        fontWeight: 'bold'
    }

    const location = useLocation()

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
    
  return (
    <div className="d-flex flex-row justify-content-start">
        <div className="col-lg-2 d-flex flex-row justify-content-center">
            <div>
                <div className="mb-3">
                    <img src={logo} alt="logo d'argoman"/>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <div>
                        <div className="mb-3" >
                            <img src={location.pathname === '/' ? aiconprod : iconproduits} alt="icon produits"/>
                            <Link to="/" style={location.pathname === '/' ? myactivelink : mylink}>  Produits</Link>
                        </div>
                        <div className="mb-3">
                            <img src={location.pathname === '/entrees' ? aiconent : iconentrees} alt="icon entree"/>
                            <Link to="/entrees" style={location.pathname === '/entrees' ? myactivelink : mylink}>   Entrées</Link>
                        </div>
                        <div className="mb-3">
                            <img src={location.pathname === '/sorties' ? aiconsort : iconsorties} alt="icon sorties"/>
                            <Link to="/sorties" style={location.pathname === '/sorties' ? myactivelink : mylink}>   Sorties</Link>
                        </div>
                        <div className="mb-3">
                            <img src={location.pathname === '/historique' ? aiconhist : iconhistorique} alt="icon historique"/>
                            <Link to="/historique" style={location.pathname === '/historique' ? myactivelink : mylink}>   Historique</Link>
                        </div>

                        { user.privilege === "Administrateur" && ( 
                            <>
                                <div className="mb-3">
                                    <img src={location.pathname === '/modification' ? aiconmodif : iconmodification} alt="icon modification"/>
                                    <Link to="/modification" style={location.pathname === '/modification' ? myactivelink : mylink}>   Modification</Link>
                                </div>
                                {/* <div className="mb-3">
                                    <img src={location.pathname === '/utilisateurs' ? aiconutil : iconutilisateurs} alt="icon utilisateur"/>
                                    <Link to="/utilisateurs" style={location.pathname === '/utilisateurs' ? myactivelink : mylink}>   Utilisateurs</Link>
                                </div> */}
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>

        <div className="col-lg-10">
             <Outlet />
        </div>
   

    </div>
  )
};

export default Menu;