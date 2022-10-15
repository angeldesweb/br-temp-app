import { signInWithEmailAndPassword , createUserWithEmailAndPassword , sendEmailVerification , signOut } from 'firebase/auth';
import { collection , setDoc , doc , getDoc , updateDoc } from 'firebase/firestore';
import { getFromApi, postToApi } from '..';
import { db , auth } from '../../../firebase';
import { user as session } from '../../../store'

const apiUrl = import.meta.env.VITE_API_URL

export const getUserData = async (uid) => {
    try {
        const userRef = doc(db,'users',uid);
        const docSnap = await getDoc(userRef);
        const data = docSnap.data();
        return data;
    } catch (error) {
        throw error;
    }
}

const addLevel = async (claims,uid) => {
    try {
        const response = await postToApi(`${apiUrl}/user/claims`,JSON.stringify({claims,uid}))
        return response;
    } catch (error) {
        throw error;
    }
}

export const SignIn = async (args) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth,args.email,args.password);
        const { user } = userCredential;
        const { username , bio , profile , premium } = await getUserData(user.uid);
        // const { data } = await getFromApi(`${apiUrl}/user/${user.uid}`);
        // const { profile , premium } = data; 
        localStorage.setItem('session',JSON.stringify({uid:user.uid,profile,premium,username,isAuth:true}))
        session.login({uid:user.uid,isVerified:user.emailVerified,profile,username,bio,isAuth:true});
        return {success:true,message:'Bienvenido de nuevo'};
    } catch (error) {
        throw error;        
    }
}

export const SignUp = async (args) => {
    try {
        const { username , email , password , claims } = args;
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const { user:{uid} } = userCredential;
        const docRef = collection(db,'users');
        await setDoc(doc(docRef,uid),{username});
        await addLevel(claims,uid);
        await sendEmailVerification(userCredential.user);
        let user = {uid,claims}
        localStorage.setItem('session',JSON.stringify({uid:user.uid,profile:claims.profile,username,isAuth:true,premium:claims.premium}))
        session.login({uid:user.uid,profile:claims.profile,username,isAuth:true,isVerified:false})
        return {success:true,message:'Registro exitoso'}
    } catch (error) {
        throw error;
    }
};

export const logOut = async () => {
    try {
        localStorage.clear();
        await signOut(auth);
        return {success:true,message:'Sesión finalizada con éxito'}
    } catch (error) {
        throw error;
        
    }
};

export const updateUser = async (uid,args) => {
    try {
        let docRef = doc(db,'users',uid);
        await updateDoc(docRef,args);
        return {success:true,message:'Actualizado exitosamente'}
    } catch (error) {
        console.log(error);
    }
}