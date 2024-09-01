import imagefraise from './image/imagefraise.png'
import iconstockok from './image/iconstockok.png'
import iconstocknonok from './image/iconstocknonok.png'
import { useEffect, useState } from 'react';
import Modalmodif from './Modalmodif';

function Modaldetails( { categories, conteneurs, provenances, dProps, setShowDetail , user } ) {
    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
        zIndex: '100000',
        backgroundColor:'rgba(128, 128, 128, 0.75)'
    
    }
    
    const stylediv = {
        width:'1200px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        zIndex: '1001'
    }
    
    
    const imgStyle = {
        width: '100%', 
        height: 'auto' 
      };
    
    const mymargin = {
        marginRight:'15px'
    }


    let triggerUpdate = dProps.triggerUpdate
    let hideDetails = dProps.hideDetails
    let produit = dProps.produit
    let moncategorie = dProps.moncategorie
    let monconteneur = dProps.monconteneur
    let maprovenance = dProps.maprovenance



//css style

    const [stocks,setStocks] = useState(dProps.monstockage)
    console.log("voici les stocks:",stocks)

    //events

    const [modif,setModif] = useState(false) 

    const hideModif = () => {
        setModif(false)
    }

    const stock=produit.qte === 0 ? false:true
    
    
    //filtre
    const [selectedProvenance,setSelectedProvenance] = useState("Toutes les provenances")
    const [selectedDate,setSelectedDate] = useState(null)
    
    useEffect(() => {
        // Fonction de filtrage
        const filterStocks = () => {
            let filteredStocks = dProps.monstockage;
    
            // Filtrer par provenance
            if (selectedProvenance !== 'Toutes les provenances') {
                filteredStocks = filteredStocks.filter(filteredStock => filteredStock.stocks.provenance === selectedProvenance);
            }
    
            // Filtrer par date si une date est sélectionnée
            if (selectedDate) {
                const formattedDate = new Date(selectedDate).toISOString().substr(0, 10);
                filteredStocks = filteredStocks.filter(filteredStock => filteredStock.stocks.date_arrivee.includes(formattedDate));
            }
    
            // Mettre à jour l'état avec les stocks filtrés
            setStocks(filteredStocks);
        };
    
        // Appeler la fonction de filtrage
        filterStocks();
    }, [selectedDate, selectedProvenance]);
    

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={stylecontainer}>
            <div style={stylediv} className='bg-white'>
                { user.privilege==="Administrateur" && (
                        <div style={{color:'#863718',fontWeight:'bold',cursor: 'pointer',marginRight:'20px', display: 'inline-block', width: '100px', marginLeft: '20px', marginTop: '30px'}} onClick={()=>setModif(true)} className='mt-1 ml-3'>Modifier...</div>
                )}
                <span style={{
                    fontSize: '20px',
                    color: '#863718',
                    marginLeft: user.privilege==="Administrateur"?'1020px':'1165px',
                    cursor: 'pointer',
                    fontWeight: '900',
                    marginTop: '30px',
                    padding: '5px'
                }} 
                    onClick={hideDetails}
                >X</span>
                    


                <div className="d-flex flex-row justify-content-between mt-4 mb-3">
                    <div style={{marginLeft:'565px',fontWeight:'bold'}}>{moncategorie} &gt; {produit.libelle}</div>
                    { modif && <Modalmodif  triggerUpdate={triggerUpdate} hideModif={hideModif}  produit={produit} categories={categories} monconteneur={monconteneur} moncategorie={moncategorie} conteneurs={conteneurs}/>}                
                </div>

                <div className="d-flex flex-row justify-content-around mb-4 align-items-center">
                    <div>
                        <img src={"https://laravel-deploy-test-three.vercel.app/api/produits/images/"+produit.photo} alt={produit.libelle} style={{height:'210px',width:'210px'}}/>
                    </div>
                    
                    <div className="d-flex flex-column justify-content-around">
                        <div className="d-flex flex-row justify-content-between mb-5">
                            <div className='form-group' style={{...mymargin,color:'#1C822C',fontWeight: 'bold',fontSize:"20px"}}>
                                Filtré par
                            </div>
                            <div  className='form-group' style={mymargin}>
                                <label class="d-block">Date d'arrivée</label>
                                <input type="date" onChange={(e)=>setSelectedDate(e.target.value)} className='form-control-sm'></input>  
                            </div>
                            <div className='form-group'>
                                    <label class="d-block">Provenance</label>
                                    <select name="provenance" value={selectedProvenance} onChange={(e)=>setSelectedProvenance(e.target.value)}>
                                        <option value="Toutes les provenances">Toutes les provenances</option>
                                        {provenances?.map(provenance=>( <option key={provenance.id} value={provenance.nom}>{provenance.nom}</option>  ))}
                                    </select>
                            </div>
                        </div>

                        <div className='d-flex flex-row justify-content-between'>
                            <div className='d-flex flex-column justify-content-between ' style={{marginRight:'75px'}}>
                                <div className='d-flex flex-row justify-content-between'>
                                    <div>En stock</div>
                                    <div><img src={stock?iconstockok:iconstocknonok} alt='icon de stock ok'/></div>
                                </div>
                                
                                <div className='d-flex flex-row justify-content-between'>
                                    <div>Poids de l'unité</div>
                                    <div>{stock?produit.unite:'-'}</div>
                                </div>

                                <div className='d-flex flex-row justify-content-between'>
                                    <div style={{marginRight:'75px'}}>Nombre d'unité en stock</div>
                                    <div>{parseInt(produit.qte)/parseInt(produit.unite)}</div>
                                </div>
                            </div>

                            <div>
                                <div className='d-flex flex-row justify-content-between'>
                                    <div>Poids total</div>
                                    <div>{stock?produit.qte + " kg" : "-"}</div>
                                </div>

                                <div className='d-flex flex-row justify-content-between'>
                                    <div>Durée de vie à l'arrivée</div>
                                    <div>{produit.vie} j</div>
                                </div>

                                <div className='d-flex flex-row justify-content-between'>
                                    <div style={{marginRight:'145px'}}>Conteneur</div>
                                    <div>{monconteneur}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div style={{maxHeight:'445px',overflowY:'auto',overflowX:'hidden'}}>
                    <table className='table' style={{marginLeft:'23px'}}>
                            <tr>
                                <th>Date de péremption</th>
                                <th>Date d'arrivée</th>
                                <th>Jours restants</th>
                                <th>Nombre d'Unité en stock</th>
                                <th>Poids(Kg)</th>
                                <th>Conteneur</th>
                                <th>Provenance</th>
                            </tr>
                        {/* { stocks?.map((stock,index)=> (
                            <tr>
                                <td>{stock.date_per}</td>
                                <td>{stock.date_arrivee}</td>
                                <td>{stock.avarie_dans}</td>
                                <td>{stock.unite}</td>
                                <td>{stock.qte}</td>
                                <td>{stock.conteneur}</td>
                                <td>{stock.provenance}</td>
                            </tr>
                        ))
                        } */}
                        { stocks?.map((stock,index)=> (
                            <tr key={index}>
                                <td>{stock.stocks.date_per}</td>
                                <td>{stock.stocks.date_arrivee}</td>
                                <td>{stock.stocks.avarie_dans}</td>
                                <td>{stock.stocks.unite}</td>
                                <td>{stock.stocks.qte}</td>
                                <td>{stock.stocks.conteneur}</td>
                                <td>{stock.stocks.provenance}</td>
                            </tr>
                        ))
                        }
                    </table>
                </div>
                
                {/* <div className="d-flex flex-row justify-content-end mb-3" style={{color:'#863718',fontWeight:'bold',marginRight:'20px',cursor:'pointer', hidden: true}} onClick={hideDetails}>
                    &lt; Moins détails
                </div> */}

            </div>
        </div>
    )

}

export default Modaldetails;