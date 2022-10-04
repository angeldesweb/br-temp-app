import { db } from '../../../firebase';
import { collection , getDocs , query , where , doc, getDoc , addDoc , GeoPoint , Timestamp } from 'firebase/firestore';

export const getProps = async () => {
    try {
        const querySnapshot = await getDocs(collection(db,'properties'));
        let qs = [];
        querySnapshot.forEach(doc => {
            let data = doc.data();
            qs = [...qs,{id:doc.id,...data}]
        });
        return {success:true,docs:qs}
    } catch (error) {
        throw error;
    }
}

export const getPropsByUser = async (uid) => {
    try {
        const q = query(collection(db, "properties"), where("createdBy", "==", uid));
        const querySnapshot = await getDocs(q);
        let qs = [];
        querySnapshot.forEach(doc => {
            let data = doc.data();
            qs = [...qs,{id:doc.id,...data}]
        });
        return {success:true,docs:qs}
    } catch (error) {
        throw error;
    }
}

export const getProp = async (id) => {
    try {
        const docRef = doc(db,'properties',id);
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()) return {success:false,message:'No existe el registro'};
        return {success:true,data:docSnap.data()};
    } catch (error) {
        throw error;
    }
}

export const createProp = async (args) => {
    try {
        const { images,address,lat,lon,title,description,city,
            rooms,baths,parks,category,price,createdBy,operation 
        } = args;
        const center = new GeoPoint(lat,lon);
        const createdAt = Timestamp.now()
        const values = {
            images,address,center,title,description,city,rooms,
            baths,parks,category,price,createdBy,createdAt,operation
        }
        const docRef = await addDoc(collection(db,'properties'),values);
        return {success:true}
    } catch (error) {
        throw error;
    }
}