import iconstockok from './image/iconstockok.png';
import iconstocknonok from './image/iconstocknonok.png';
import { useState } from 'react';
import Modaldetails from './Modaldetails';

function Carte({produit, moncategorie, monconteneur, categories, conteneurs, maprovenance, provenances, monstockage, triggerUpdate, showDetail, setShowDetail, setDProps }) {
    // console.log(monstockage)
    const [details,setDetails] = useState(false)

    const showDetails = () => {
        // setDetails(true)
        setShowDetail(true)
        let props = {
            'triggerUpdate': triggerUpdate,
            'hideDetails': hideDetails,
            'monstockage': monstockage,
            'maprovenance': maprovenance,
            'produit': produit,
            'moncategorie': moncategorie,
            'monconteneur': monconteneur,
        }
        setDProps(props)
    }
    const hideDetails = () => {
        setShowDetail(false)
    }


    const mymargin = {
        marginRight:'25px'
    }


    
    const imgStyle = {
        maxWidth: '100%', 
        maxHeight: '100%' 
      };

    const divcarte = {
        width:'200px',
        paddingRight:'10px',
        paddingLeft:'10px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        margin:'10px'

    }

    const stock=produit.qte === 0 ? false:true

    return (
        <div className='d-flex flex-column justify-content-center' style={divcarte}>
            <div style={{textAlign:'center',width:'180px',height:'132px'}}><img src={"https://laravel-deploy-test-three.vercel.app/api//produits/images/"+produit.photo} alt={produit.libelle} style={imgStyle}/></div>
            <div style={{textAlign:'center',fontWeight:'bold'}}>{produit.libelle}</div>
            
            <div className='d-flex flex-row justify-content-between'>
                <div style={mymargin}>En stock</div>
                <div>
                    <img src={stock? iconstockok:iconstocknonok} alt='icon de stock ok'/>
                </div>
            </div>
            <div className='d-flex flex-row justify-content-between'>
                <div style={mymargin}>Poids Unitaire</div>
                <div>{stock?produit.unite+" Kg":"-"}</div>
            </div>
            <div className='d-flex flex-row justify-content-between mb-3'>
                <div>Total</div>
                <div>{stock?produit.qte+" Kg":"-"}</div>
            </div>

            <div className='d-flex flex-row justify-content-end'>
                <div style={{textAlign:'right', color:'#863718', fontWeight:'bold', cursor: 'pointer'}} onClick={showDetails}>Détails &gt;</div>
            </div>
            {/* { 
            details && 
                <Modaldetails 
                    triggerUpdate={triggerUpdate} 
                    hideDetails={hideDetails} 
                    monstockage={monstockage} 
                   - provenances={provenances} 
                    maprovenance={maprovenance} 
                    produit={produit} 
                    moncategorie={moncategorie} 
                    monconteneur={monconteneur} 
                    -categories={categories} 
                    -conteneurs={conteneurs}
                    />
            } */}
        </div>
    )
}

export default Carte