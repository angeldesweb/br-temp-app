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

export const SignIn = async (args) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth,args.email,args.password);
        const { user } = userCredential;
        const { username , bio , profile , premium } = await getUserData(user.uid);
        localStorage.setItem('session',JSON.stringify({uid:user.uid,avatar:user.photoURL,profile,premium,username,isAuth:true}))
        session.login({uid:user.uid,isVerified:user.emailVerified,profile,username,bio,isAuth:true,avatar:user.photoURL});
        return {success:true,message:'Bienvenido de nuevo'};
    } catch (error) {
        throw error;        
    }
}

export const SignUp = async (args) => {
    try {
        const { username , email , password , claims:{profile,premium} } = args;
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const { user:{uid} } = userCredential;
        const docRef = collection(db,'users');
        await setDoc(doc(docRef,uid),{username,profile,premium});
        await sendEmailVerification(userCredential.user);
        let user = {uid}
        localStorage.setItem('session',JSON.stringify({uid:uid,username,profile,premium,isAuth:true,}))
        session.login({uid:user.uid,profile,premium,username,isAuth:true,isVerified:false})
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