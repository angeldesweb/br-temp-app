import { validator } from '@felte/validator-yup';
import { SignUp } from '../http/users';
import * as yup from 'yup';

export const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
});

export const extend = validator({ schema , level : 'warning' });

export const onSubmit = async (values) => {
    try {
        let level = values.level 
        ? {profile:'seller',premium:false} 
        : {profile:'user',premium:false};
        values.claims = {...level};
        const result = await SignUp(values);
        return result;
    } catch (error) {
        alert(JSON.stringify(error));
    }
}

export const onError = (error) => alert(JSON.stringify(error));