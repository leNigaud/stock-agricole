import iconinterro from './image/iconinterro.png'

function Modalconfirm( { handleVider,
                         handleOnClickOkConfirm,
                         handleDelete,
                         id,hideConfirm,handleConfirmDeleteUser,
                         handleConfirmDeleteDestination,
                         handleConfirmDeleteProvenance,
                         handleConfirmDeleteConteneur,
                         handleConfirmDeleteCategorie,
                         handleHideConfirmProvenance,idProvenanceDeleted,
                         idDestinationDeleted, handleHideConfirmDestination,
                         handleHideConfirmCategorie, idCategorieDeleted, idConteneurDeleted, handleHideConfirmConteneur,
                         hideConfirmMenuModif,hideConfirmDelete,message,
                         handleConfirmSubmitTypeConteneur,idTypeConteneurDeleted,handleHideConfirmTypeConteneur,handleConfirmDeleteTypeConteneur,
                         handleConfirmSubmitCategorie,handleConfirmSubmitConteneur,
                         handleConfirmSubmitDestination,handleConfirmSubmitProvenance} ) {

    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
        zIndex:'1',
        backgroundColor:'rgba(128, 128, 128, 0.75)'
    }

    const stylediv = {
        width:'500px',
        borderRadius: '10px',
        boxShadow: '0px 3px 3px 1px rgba(128, 128, 128, 0.75)',
        padding:'40px'
    }

    const handleOnClickNon = () => {
        if (hideConfirmMenuModif)
            hideConfirmMenuModif()
        if (hideConfirmDelete)
            hideConfirmDelete()
        if (handleHideConfirmConteneur)
            handleHideConfirmConteneur(idConteneurDeleted)
        if (handleHideConfirmTypeConteneur)
            handleHideConfirmTypeConteneur(idTypeConteneurDeleted)
        if (handleHideConfirmCategorie)
            handleHideConfirmCategorie(idCategorieDeleted)
        if (handleHideConfirmDestination)
            handleHideConfirmDestination(idDestinationDeleted)
        if (handleHideConfirmProvenance)
            handleHideConfirmProvenance(idProvenanceDeleted)
        if (hideConfirm)
            hideConfirm()

    }

    const handleOnClickOui = () => {
        if (handleConfirmSubmitCategorie)
            handleConfirmSubmitCategorie()
        if (handleConfirmSubmitConteneur)
            handleConfirmSubmitConteneur()
        if (handleConfirmSubmitTypeConteneur)
            handleConfirmSubmitTypeConteneur()
        if (handleConfirmSubmitDestination)
            handleConfirmSubmitDestination()
        if (handleConfirmSubmitProvenance)
            handleConfirmSubmitProvenance()
        if (handleConfirmDeleteCategorie)
            handleConfirmDeleteCategorie(idCategorieDeleted)
        if (handleConfirmDeleteConteneur)
            handleConfirmDeleteConteneur(idConteneurDeleted)
        if (handleConfirmDeleteTypeConteneur)
            handleConfirmDeleteTypeConteneur(idTypeConteneurDeleted)
        if (handleConfirmDeleteProvenance)
            handleConfirmDeleteProvenance(idProvenanceDeleted)
        if (handleConfirmDeleteDestination)
            handleConfirmDeleteDestination(idDestinationDeleted)
        if (handleConfirmDeleteUser)
            handleConfirmDeleteUser(id)
        if (handleDelete)
            handleDelete()
        if (handleOnClickOkConfirm)
            handleOnClickOkConfirm()
        if (handleVider)
            handleVider()
    }

    return (
       <div className='d-flex justify-content-center align-items-center' style={stylecontainer}>
            <div style={stylediv} className="d-flex flex-row justify-content-around align-items-start bg-white">
                <div>
                    <img src={iconinterro} alt="icon d'intérrogation"/>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex flex-row justify-content-center align-items-center mb-4' style={{textAlign:'center'}}>{message? message:"Voulez-vous vraiment supprimer l'élément?"}</div>
                    <div className='d-flex flex-row justify-content-center align-items-center'>
                        <button type="button" className="btn btn-success btn-md" style={{marginRight:'20px'}} onClick={handleOnClickOui}>Oui</button>
                        <div><button type='button' className="btn btn-secondary btn-md"  onClick={handleOnClickNon}>Non</button></div>
                    </div>
                </div>
            </div>
       </div>
    )

}

export default Modalconfirm;