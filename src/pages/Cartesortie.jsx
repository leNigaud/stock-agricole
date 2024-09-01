import imagefraise from './image/imagefraise.png'
import iconstockok from './image/iconstockok.png'
import iconstocknonok from './image/iconstocknonok.png';
import { useEffect, useState, useRef } from 'react';
import iconsubmitentree from './image/iconsubmitentree.png'
import React from 'react';

function Cartesortie( {type, produit, conteneurs, contenance, setContenance, setProduitConfirm, produitConfirm, setCarteRefs, carteRefs, setProduitChanged} ) {
    const mymargin = {
        marginRight:'40px'
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

    const [nbUnite, setNbUnite] = useState(0)
    const [inactif, setInActif] = useState(0)
    const [overMax, setOverMax] = useState(false)
    const [clicked, setClicked] = useState(false)

    const carteEntreeRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        let newCarte = carteRefs
        let foundRef = newCarte.find((nc) => nc?.id == produit.idPro)
        if(
            newCarte && 
            foundRef            
        ) {
            let newRef
            if(!foundRef.ref){
                newRef = {...foundRef, ref: carteEntreeRef}
            }   

            if(!foundRef.inputR){
                newRef = {...foundRef, inputR: inputRef}
            }   
            newCarte = newCarte?.map((nc) => {
                if(nc?.id == produit.idPro) return newRef
                return nc
            })
            setCarteRefs(newCarte)

        } else {
            newCarte?.push({
                id: produit.idPro,
                ref: carteEntreeRef,
                inputR: inputRef
            })
            setCarteRefs(newCarte)
        }
    }, [carteEntreeRef, inputRef])

    function handleChangeNbUnite(e) {
        const {value} = e.target
        setNbUnite(value)
    }

    function getCapaciteR(conteneur){
        let cont = contenance.find((c) => c.nom === conteneur)
        return cont?.capacite
    }

    //
    const [stocked, setStocked] = useState(produit.qte != "0")
    
    // let stocked = produit.qte != "0"

    useEffect(()=>{
        if(produit) setStocked(produit.qte != "0")
    }, [produit])
    useEffect(()=>{
        setInActif(nbUnite == "" || nbUnite == "0" || nbUnite < 1)
    }, [nbUnite])
    
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
      const value = e.target.value;
      const max = e.target.max;
  
      // Parse the input value as a number
      const numericValue = parseFloat(value);
  
      // Check if the numeric value is greater than the max attribute
      if (!isNaN(numericValue) && numericValue > max) {
        setInputValue(max);
        if(max == "0") setInActif(true)
        setOverMax(true)
      } else {
        setInputValue(value);
        if(value == 0) setInActif(true)
        setOverMax(false)
      }
    }

    const handleClick = () => {
       setClicked(true)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setClicked(true)
        }
    }

    useEffect(() => {
        if (clicked) {

            //setContenance
            // const nomToChange = getConteneurProduit(produit.idTypeCont, conteneurs)
            // const updatedContenance = contenance.map(item => {
            //     if (item.nom === nomToChange) {
            //         let newCapacite = item.capacite - inputValue
            //         return { ...item, capacite: newCapacite };
            //     }
            //     return item;
            // });
            
            const updatedProduit = { ...produit, uniteEntree: inputValue };

            let newPr = [];
            let found = false
            if (produitConfirm.length != 0) {
                 newPr = produitConfirm.map((pr) => {
                    if (pr.libelle == updatedProduit.libelle) {
                        found = true
                        return { ...pr, uniteEntree: parseInt(parseInt(pr.uniteEntree)+parseInt(inputValue))};
                    } else {
                        return pr; 
                    }
                });
                found ? setProduitConfirm(newPr) : newPr.push(updatedProduit);setProduitConfirm(newPr) 
                
            } else {
                setProduitConfirm([updatedProduit]); 
            }
            
            //change unite of the upper produits
            let produitChanged = {...produit, qte: parseInt(parseInt(produit.qte) - parseInt(inputValue)*parseInt(produit.unite))}

            // console.log(produitChanged)
            setProduitChanged(produitChanged)
            setInputValue("")
            // setContenance(updatedContenance)
            setInActif(true)
            setClicked(false)
          }
    }, [clicked])
    
    return (
        <div ref={carteEntreeRef} className='d-flex flex-row justify-content-center align-items-center' style={divcarte}>
            <div style={{...mymargin,width:'100px',height:'100px'}} className='d-flex flex-row justify-content-center align-items-center'>
                <img src={"http://localhost:8000/api/produits/images/"+produit.photo} alt={produit.libelle} style={{ maxWidth: '100%', maxHeight: '100%'}}/>
            </div>

            <div style={mymargin}>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={{...mymargin,fontWeight:'bold'}}>{produit.libelle}</div>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={mymargin}>En stock</div>
                    <div>
                        <img src={
                            stocked ? 
                            iconstockok : iconstocknonok
                            } alt='icon de stock ok'/>
                    </div>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={mymargin}>Poids de l'unité</div>
                    <div style={{fontWeight:'bold'}}>{produit.unite} kg</div>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <div>Unités en stock</div>
                    <div style={{fontWeight:'bold'}}>
                        {
                            stocked ? 
                            parseInt(parseInt(produit.qte)/parseInt(produit.unite))
                            : 0
                        }
                        
                    </div>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <div>Poids total</div>
                    <div style={{fontWeight:'bold'}}>{produit.qte} kg</div>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={{marginRight:'10px'}}>Conteneur </div>
                    <div style={{fontWeight:'bold',textAlign:"right"}}>
                        
                        {getConteneurProduit(produit.idTypeCont, conteneurs)}

                    </div>
                </div>
            </div>

            <div className='d-flex flex-column justify-content-between'>
                <div>Nombre d'unité à {type}</div>
                <div className='d-flex flex-row justify-content-around align-items-center'>
                    <div>
                        <input 
                            type='number' 
                            style={{width:'50px'}} 
                            ref = {inputRef}
                            onInput={(e) => {
                                setInActif(false)
                                setInActif(e.target.value == "" || e.target.value == "0" || e.target.value < 1)
                                // setNbUnite(e.target.value)
                                // handleChangeNbUnite(e);
                                handleInputChange(e);
                              }}
                            min='0'    
                            max={
                                parseInt(parseInt(produit.qte)/parseInt(produit.unite))
                            }
                            value = {inputValue}
                            onKeyDown={handleKeyPress}
                        />
                        <br/>
                        {/* {
                            overMax && <p style={{
                                fontSize: "10px"
                            }}>
                               Place max disponible :<br/>
                               {getCapaciteR(getConteneurProduit(produit.idTypeCont, conteneurs))}
                            </p> 
                        } */}
                    </div>
                    <div>
                        <button 
                            disabled={inactif} 
                            type='button' 
                            className="btn btn-md" 
                            style={{backgroundColor:'#863718'}} 
                            onClick={handleClick}
                        >
                            <img src={iconsubmitentree} alt="icon pour editer l'user"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
)
}

export default Cartesortie