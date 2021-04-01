import firebase from 'firebase/app';
import 'firebase/auth';

import fireBaseConfig from '../../fireBaseConfig'


const fireBaseInitialize = ()=>{
   
    if(firebase.apps.length === 0){
        firebase.initializeApp(fireBaseConfig);
    }
}

const userGoogleSignIn = ()=>{

    const googleProvider = new firebase.auth.GoogleAuthProvider();

     return firebase.auth().signInWithPopup(googleProvider)
     

}

const userLogOutInGoogle = ()=>{
     firebase.auth().signOut()
     .then(()=>{

     })
}




export { fireBaseInitialize, userGoogleSignIn , userLogOutInGoogle}