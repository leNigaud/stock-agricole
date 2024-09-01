import Carteentree from './Carteentree'
import iconstockok from './image/iconstockok.png'
import iconstocknonok from './image/iconstocknonok.png';
import iconsubmitentree from './image/iconsubmitentree.png'
import { useEffect, useState, useRef } from 'react';

const ModalCarteModifS = ({hideEditModal, produit, conteneurs, contenance, setProduitConfirm, produitConfirm, setContenance, setProduitChanged})=> {
    //css
    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
        backgroundColor:'rgba(128, 128, 128, 0.75)'
    }

    const stylediv = {
        width:'600px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)'
    }

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

    const annuler = {
        textDecoration:'underline',
        color:'#863718',
        marginTop: '15px',
        marginLeft: '100px', 
        fontWeight: 600,
        cursor: 'pointer'
    }

    const handleOnClickAnnuler = () => {
        hideEditModal()
    }

    const handleOnSubmit= () => {

    }

    const [inactif, setInActif] = useState(0)
    const [nbUnite, setNbUnite] = useState(0)
    const [inputValue, setInputValue] = useState(produit.uniteEntree);
    const [clicked, setClicked] = useState(false)


    let stocked = produit.qte != "0"

    const getConteneurProduit = (produitIdTypeCont, conteneurs) => {    
        const conteneur = conteneurs.find(conteneur => conteneur.idType === produitIdTypeCont);
        
        if (!conteneur) {
            return null;
        }
        
        return conteneur.nom;
    };


    const handleInputChange = (e) => {
      const value = e.target.value;
      const max = e.target.max;
  
      // Parse the input value as a number
      const numericValue = parseFloat(value);
  
      // Check if the numeric value is greater than the max attribute
      if (!isNaN(numericValue) && numericValue > max) {
        setInputValue(max);
      } else {
        setInputValue(value);
      }
    }

    const handleClick = () => {
       setClicked(true)
    }

    function getCapaciteR(conteneur){
        let cont = contenance.find((c) => c.nom === conteneur)
        return cont?.capacite
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setClicked(true)
        }
    }
    let before = produit.uniteEntree
    useEffect(() => {
        if (clicked) {        
            const updatedProduit = { ...produit, uniteEntree: inputValue };

            let newPr = [];
            let found = false
            if (produitConfirm.length != 0) {
                let newUniteEntree = inputValue
                newPr = produitConfirm.map((pr) => {
                    if (pr.libelle == updatedProduit.libelle) {
                        found = true
                        // return { ...pr, uniteEntree: parseInt(parseInt(pr.uniteEntree)+parseInt(inputValue))};

                        // if(inputValue > before) newUniteEntree = parseInt(inputValue)
                        // else if(inputValue < before) newUniteEntree = parseInt(pr.newUniteEntree) + parseInt(before) - parseInt(inputValue) 
    
                        return { ...pr, uniteEntree: newUniteEntree};


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
            setInActif(true)
            setClicked(false)
            hideEditModal()
          }
    }, [clicked])

    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={stylecontainer}>
            <div style={stylediv} className="bg-white">
                <div className='d-flex flex-row justify-content-center align-items-center'>
                <div style={{...mymargin,width:'100px',height:'100px'}} className='d-flex flex-row justify-content-center align-items-center'>
                    <img src={"image/"+produit.photo} alt={produit.photo} style={{ maxWidth: '100%', maxHeight: '100%'}}/>
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
                        <div style={{fontWeight:'bold'}}> {produit.unite} </div>
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
                        <div>Conteneur </div>
                        <div style={{fontWeight:'bold'}}>
                        {getConteneurProduit(produit.idTypeCont, conteneurs)}

                        </div>
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-between'>
                    <div>Nombre d'unité à sortir</div>
                    <div className='d-flex flex-row justify-content-around align-items-center'>
                        <div>
                            <input 
                                type='number' 
                                style={{width:'50px'}} 
                                min='0'    
                                onInput={(e) => {
                                    setInActif(false)
                                    setInActif(e.target.value == "" || e.target.value == "0" || e.target.value < 1)
                                    setNbUnite(e.target.value)
                                    // handleChangeNbUnite(e);
                                    handleInputChange(e);
                                  }}
                                  max={
                                      parseInt(parseInt(produit.qte)/parseInt(produit.unite))
                                    
                                }
                                value = {inputValue}
                                onKeyDown={handleKeyPress}
                            />
                            <br/>

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
                <p onClick={handleOnClickAnnuler} style={annuler}>Annuler</p>
                </div>
           
            </div>
            </div>
            
        </div>
    )
}

export default ModalCarteModifS;