import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button, Icon } from 'rsuite';
import { ProductContext } from '../../App';

import { fireBaseInitialize, userGoogleSignIn } from './UserManagement'

fireBaseInitialize();

const Login = () => {

    let history = useHistory()
    let location  = useLocation()

    const [user, setUser] = useContext(ProductContext)

    const handelGoogleSignIn = ()=>{
        
        userGoogleSignIn()
        .then(result=>{
            setUser({
                name:result.user.displayName,
                email:result.user.email,
                loggedIn:true
            })
            let { from } = location.state || { from:{pathname:"/"} }
            history.replace(from)
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className="row">
            <div className="col-md-12">
                { !user.name? 
                <>
                <h5 className="mb-4">Log In </h5>
                <Button color="blue" onClick={()=>handelGoogleSignIn()}> <Icon icon="google"/> Continue with Google</Button>
                </>
                : <h4>{user.name}</h4>
                }
            </div>
        </div>
    );
};

export default Login;