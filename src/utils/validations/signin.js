import { validator } from '@felte/validator-yup';
import { SignIn } from '../http/users/index';
import { firebaseErrors } from '../notifications'
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
});

export const extend = validator({ schema , level : 'warning' })

export const onSubmit = async (values) => {
    try {
        const result = await SignIn(values);
        return result;
    } catch (error) {
        if(error.code) firebaseErrors(error.code);
        console.log(error)
    }
}

export const onError = (error) => alert(JSON.stringify(error));
