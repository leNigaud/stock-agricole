import imagefraise from './image/imagefraise.png'
import iconedituser from './image/iconedituser.png'
import icondeleteuser from './image/icondeleteuser.png'
import ModalCarteModifS from './ModalCarteModifS'
import { useState } from 'react'

import Modalconfirm from './Modalconfirm'


function Cartesortieconfirm({produit, setProduitConfirm, produitConfirm, contenance, setContenance, conteneurs, setProduitScroll, carteRefs, setProduitChanged, produits, produitsrecues}) {
    const mymargin = {
        marginRight:'25px'
    }

    const divcarte = {
        paddingRight:'10px',
        paddingLeft:'10px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        margin:'10px'
    }

    const getConteneurProduit = (produitIdTypeCont, conteneurs) => {    
        const conteneur = conteneurs.find(conteneur => conteneur.idType === produitIdTypeCont);
        
        if (!conteneur) {
            return null;
        }
        
        return conteneur.nom;
    };

    //Pour gérer la fenêtre modale d'edition
    const [edit,setEdit] = useState(false)
    const [confirm,setConfirm] = useState(false)

    const hideEditModal = () => {
        setEdit(false)
    }

    const handleDelete = () => {
        let pLibelle = produit.libelle
        let updatedProduit = produitConfirm.filter((pr) => 
            pr.libelle !== pLibelle
        )

        let produitReste = produitsrecues?.find((pr) => pr.idPro == produit.idPro)
        setProduitConfirm(updatedProduit)
        let produitReset = {
            ...produit,
            qte: 
            parseInt(parseInt(produitReste?.qte) + parseInt(produit.uniteEntree) * parseInt(produitReste?.unite))
        } 
    

        setProduitChanged(produitReset)
    }

    const hideConfirm = () => {
        setConfirm(false)
    }

    return (
        <div className='d-flex flex-row justify-content-center align-items-center' style={divcarte}>
            {
                edit && 
                <ModalCarteModifS 
                    hideEditModal={hideEditModal} 
                    // produit = {{...produit, qte: parseInt(produit.qte) + parseInt(produit.uniteEntree) * parseInt(produit.unite)}}    
                    produit = {produit}    
                    conteneurs = {conteneurs}
                    contenance = {contenance}
                    setContenance = {setContenance}
                    produitConfirm={produitConfirm}
                    setProduitConfirm={setProduitConfirm}
                    setProduitChanged = {setProduitChanged}
                />

            }
            { confirm && <Modalconfirm handleDelete={handleDelete} hideConfirm={hideConfirm}/> }

            <div style={{...mymargin,width:'100px',height:'100px'}} className='d-flex flex-row justify-content-center align-items-center'>
                <img src={"http://localhost:8000/api/produits/images/"+produit.photo} alt={produit.libelle} style={{ maxWidth: '100%', maxHeight: '100%'}}/>
            </div>

            <div style={mymargin}>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={{...mymargin,fontWeight:'bold'}}>{produit.libelle}</div>
                </div>

                <div className='d-flex flex-row justify-content-between'>
                    <div style={mymargin}>Unités</div>
                    <div style={{fontWeight:'bold'}}> {produit.uniteEntree} </div>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={{marginRight:'20px'}}>Poids</div>
                    <div style={{fontWeight:'bold'}}>
                        {
                            parseInt(parseInt(produit.uniteEntree)*parseInt(produit.unite))
                        } Kg
                    </div>    
                </div>
            </div>

            <div className='d-flex flex-column justify-content-between'>
                <div className='mb-2'>
                    <button 
                        type='button' 
                        className="btn btn-sm" 
                        style={{backgroundColor:'#863718'}}
                        onClick={(e) => {
                            setEdit(true)
                            // setTimeout(() => {
                            //     handleDelete(e);
                            // }, 400);
                        }}
                    >
                        <img src={iconedituser} alt="icon pour editer"/>
                    </button>
                </div>
                <div>
                    <button 
                        type='button' 
                        className="btn btn-sm" 
                        style={{backgroundColor:'#ED474A'}}
                        onClick={()=>setConfirm(true)}    
                    >
                        <img src={icondeleteuser} alt="icon pour supprimer"/>
                    </button>
                </div>  
            
            </div>
        </div>
    )
}

export default Cartesortieconfirm