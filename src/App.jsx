import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entrees from "./pages/Entrees";
import Historique from "./pages/Historique";
import Modification from "./pages/Modification";
import Produits from "./pages/Produits";
import Sorties from "./pages/Sorties";
import Utilisateurs from "./pages/Utilisateurs";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modaldetails from "./pages/Modaldetails";
import Modalajout from "./pages/Modalajout";
import Modaluseradd from "./pages/Modaluseradd";
import Modalcontaineradd from "./pages/Modalcontaineradd";

import Modalconfirm from "./pages/Modalconfirm";
import Modalerror from "./pages/Modalerror";
import Modalsuccess from "./pages/Modalsuccess";
import Modaledit from "./pages/Modaledit";
import Modaleditdestination from "./pages/Modaleditdestination";
import Modaleditprovenance from "./pages/Modaleditprovenance";

import React from "react";

export default function App() {
  
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

  //Récupérer les données depuis le api

  return (
    <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<Produits />} />
            <Route path="entrees" element={<Entrees />} />
            <Route path="sorties" element={<Sorties />} />
            <Route path="historique" element={<Historique />} />
            {user?.privilege==="Administrateur" &&  (
              <>
                <Route path="modification" element={<Modification />} />
                <Route path="utilisateurs" element={<Utilisateurs />} />
              </>
            )}
          </Route>
          
          <Route path="/details" element={<Modaldetails/>}></Route>
          <Route path="/ajout" element={<Modalajout/>}></Route>
          <Route path="/adduser" element={<Modaluseradd/>}></Route>
          <Route path="/addcontainer" element={<Modalcontaineradd/>}></Route>
          <Route path="/confirm" element={<Modalconfirm/>}></Route>
          <Route path="/error" element={<Modalerror/>}></Route>
          <Route path="/success" element={<Modalsuccess/>}></Route>
          <Route path="/edit" element={<Modaledit/>}></Route>
          <Route path="/destination" element={<Modaleditdestination/>}></Route>
          <Route path="/provenance" element={<Modaleditprovenance/>}></Route>
          {/* <Route path="/login" element={<Login/>}></Route> */}
        </Routes>
   
    </BrowserRouter>
  );
}

