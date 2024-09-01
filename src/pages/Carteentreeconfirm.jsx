import imagefraise from './image/imagefraise.png'
import iconedituser from './image/iconedituser.png'
import icondeleteuser from './image/icondeleteuser.png'
import { useState } from 'react'
import ModalCarteModif from './ModalCarteModif'

import Modalconfirm from './Modalconfirm'

function Carteentreeconfirm({produit, setProduitConfirm, produitConfirm, contenance, setContenance, conteneurs, setProduitScroll, carteRefs}) {
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
        const conteneur = conteneurs?.find(conteneur => conteneur.idType === produitIdTypeCont);
        
        if (!conteneur) {
            return null;
        }
        
        return conteneur.nom;
    };

    const handleDelete = () => {

        let pLibelle = produit?.libelle
        let updatedProduit = produitConfirm.filter((pr) => 
            pr?.libelle !== pLibelle
        )

        setProduitConfirm(updatedProduit)

        const nomToChange = getConteneurProduit(produit.idTypeCont, conteneurs)
        const updatedContenance = contenance?.map(item => {
            if (item.nom === nomToChange) {
                    let newCapacite = item.capacite + parseInt(produit?.uniteEntree)
                    return { ...item, capacite: newCapacite };
                }
                return item;
            });
        setContenance(updatedContenance)
    }

    const handleModif = () => {
        let ref = carteRefs?.find((cr) => cr?.id == produit.idPro)
        setProduitScroll({ref, produit})
        
    } 


    //Pour gérer la fenêtre modale d'edition
    const [edit,setEdit] = useState(false)
    const [confirm,setConfirm] = useState(false)

    const hideEditModal = () => {
        setEdit(false)
    }
    
    const hideConfirm = () => {
        setConfirm(false)
    }

    return (
        <div className='d-flex flex-row justify-content-center align-items-center' style={divcarte}>
            {
                edit && 
                <ModalCarteModif 
                    hideEditModal={hideEditModal} 
                    produit = {produit}    
                    conteneurs = {conteneurs}
                    contenance = {contenance}
                    setContenance = {setContenance}
                    produitConfirm={produitConfirm}
                    setProduitConfirm={setProduitConfirm}
                />

            }

            {confirm && <Modalconfirm handleDelete={handleDelete} hideConfirm={hideConfirm} message="Voulez-vous supprimer ce produit à entrer"/>}
            <div style={{...mymargin,width:'100px',height:'100px'}} className='d-flex flex-row justify-content-center align-items-center'>
                <img src={"https://laravel-deploy-test-three.vercel.app/api//produits/images/"+produit.photo} alt={produit.libelle} style={{ maxWidth: '100%', maxHeight: '100%'}}/>
            </div>

            <div style={mymargin}>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={{...mymargin,fontWeight:'bold'}}>{produit?.libelle}</div>
                </div>

                <div className='d-flex flex-row justify-content-between'>
                    <div style={mymargin}>Unités</div>
                    <div style={{fontWeight:'bold'}}> {produit?.uniteEntree} </div>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={{marginRight:'20px'}}>Poids</div>
                    <div style={{fontWeight:'bold'}}>
                        {
                            parseInt(parseInt(produit?.uniteEntree)*parseInt(produit?.unite))
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
                            //     handleDelete(true)
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

export default Carteentreeconfirm