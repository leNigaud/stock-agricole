import iconok from './image/iconok.png'


function Modalsuccess({hideModalSuccessAjout, hideModalSuccessModif,message}) {

    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
        backgroundColor:'rgba(128, 128, 128, 0.75)',
        zIndex:'2'
    }

    const stylediv = {
        width:'500px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        padding:'40px',
        zIndex:'1'
    }

    const handleOnClickOk= () => {
        if (hideModalSuccessAjout)
            hideModalSuccessAjout()
        if (hideModalSuccessModif)
            hideModalSuccessModif()
    }

    return (
       <div className='d-flex justify-content-center align-items-center' style={stylecontainer}>
            <div style={stylediv} className="d-flex flex-row justify-content-around align-items-start bg-white">
                <div>
                    <img src={iconok} alt="icon de success"/>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex flex-row justify-content-center align-items-center mb-4' style={{fontSize:message?'25px':'normal'}}>{message?message:"Opération terminée avec succès !"}</div>
                    <div className='d-flex flex-row justify-content-center align-items-center'>
                        <div><button type='button' className="btn btn-success btn-md" onClick={handleOnClickOk}>OK</button></div>
                    </div>
                </div>
            </div>
       </div>
    )

}

export default Modalsuccess;