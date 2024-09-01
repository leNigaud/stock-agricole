import iconerror from './image/iconerror.png'


function Modalerror({hideModalErrorAjout, hideModalErrorModif,message}) {

    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
        backgroundColor:'rgba(128, 128, 128, 0.75)'
    }

    const stylediv = {
        width:'500px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        padding:'40px',
        zIndex:'1'
    }

    const handleOnClickFermer= () => {
        if (hideModalErrorAjout)
            hideModalErrorAjout()
        if (hideModalErrorModif)
            hideModalErrorModif()
    }

    return (
       <div className='d-flex justify-content-center align-items-center' style={stylecontainer}>
            <div style={stylediv} className="d-flex flex-row justify-content-around align-items-start bg-white">
                <div>
                    <img src={iconerror} alt="icon d'erreur"/>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex flex-row justify-content-center align-items-center mb-4'>{message? message: "L'opération a échoué !"}</div>
                    <div className='d-flex flex-row justify-content-center align-items-center'>
                        <div><button type='button' className="btn btn-danger btn-md" onClick={handleOnClickFermer}>Fermer</button></div>
                    </div>
                </div>
            </div>
       </div>
    )

}

export default Modalerror;