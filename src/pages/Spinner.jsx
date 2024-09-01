
const Spinner = () => {

    const stylecontainer = {
        position:'absolute',
        top:'0',
        bottom:'0',
        right:'0',
        left:'0',
    }

    const stylediv = {
        width:'100px',
        height:'100px',
        color:'#1C822C'
    }


    return (
       <div className='d-flex justify-content-center align-items-center' style={stylecontainer}>
                <div className="spinner-border" style={stylediv} ></div>
       </div>
    )

}

export default Spinner;