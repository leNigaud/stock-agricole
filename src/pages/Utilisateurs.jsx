

import Carteuser from './Carteuser'
import { useEffect, useState } from 'react';
import Modaluseradd from './Modaluseradd';
import axios from 'axios';
import Modaluseredit from './Modaluseredit';
import Profil from './Profil';

import Spinner from './Spinner';

const Utilisateur = () => {
    //css
    const scrollcarte = {
        maxHeight:'290px',
        overflowY:'auto'
    }

    const mymargin = {
        marginRight:'40px'
    }

    //variable pour declencher un update
    const [update, setUpdate] = useState(0);
    const triggerUpdate = () => {
        setUpdate(prevUpdate => prevUpdate + 1);
    };

    //recuperer les données
    const [data,setData] = useState(null)
    const [users,setUsers] = useState(null)

    useEffect(() => {
        axios.get(`https://laravel-deploy-test-three.vercel.app/api/api/utilisateurs`)
            .then(res => {
                console.log(res.data)
                setData(res.data)
                setUsers(res.data.users)
            })
            .catch(error => console.error("Erreur lors de la récupération des données du menu utilisateur:", error));
    }, [update]);



    const [selectedCategory,setSelectedCategory] = useState('Tous les utilisateurs')
    const [adduser,setAddUser] = useState(false)

    const categories = ['Tous les utilisateurs', 'Administrateur', 'Utilisateur'];
    
    const handleOnClickCategory = (category) => {
        setSelectedCategory(category)
    }

    const hideAddUser = () => {
        setAddUser(false)
    }

    useEffect(()=>{
        setUsers(data?.users)
        if (selectedCategory !== "Tous les utilisateurs")
            setUsers(data?.users?.filter(user=>user.privilege===selectedCategory))
    },[selectedCategory])



    return (
   data? <div className="d-flex flex-row justify-content-around mt-3">
        <div className='' style={{width:'100%'}}>
                <div className='d-flex flex-row justify-content-between align-items-center mb-3'>
                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <div style={mymargin}>
                            <h3>Utilisateurs</h3>
                        </div>
                        
                        <div>
                            <button type="button" className="btn btn-success btn-sm" onClick={()=>setAddUser(true)}>+ Utilisateurs</button>
                            {adduser && <Modaluseradd hideAddUser={hideAddUser} triggerUpdate={triggerUpdate}/>}
                            {/* {adduser && <Modaluseredit hideModifUser={hideAddUser} triggerUpdate={triggerUpdate}/>} */}
                        </div>
                    </div>
                    <Profil triggerUpdate={triggerUpdate}/>
                </div>
                

                <div className="d-flex flex-row justify-content-start mb-3">
                    {categories.map(category => (
                            <div
                                key={category}
                                style={{
                                    ...mymargin,
                                    color: selectedCategory === category ? '#863718' : '#000',
                                    textDecoration: selectedCategory === category ? 'underline' : 'none',
                                    fontWeight: selectedCategory === category ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                }}
                                onClick={()=> handleOnClickCategory(category)}
                            >
                                {category}
                            </div>
                    ))}
                </div>

                <div className='d-flex flex-row flex-wrap' style = {scrollcarte}>
                    { users?.map(user=><Carteuser key={user.id} user={user} triggerUpdate={triggerUpdate}/>)}
                </div>
            
        </div>
    </div>
    :<Spinner/>

        
    )
  };
  
  export default Utilisateur;