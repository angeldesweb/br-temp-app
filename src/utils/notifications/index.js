import { Notyf } from '../../../node_modules/notyf';
import { codes } from './firebaseErrors';

export const centerBox = new Notyf({position:{x:'center',y:'top'},duration:3000})

export const firebaseErrors = (code) => {
    codes[code] ? centerBox.error(codes[code]) : centerBox.error(code);
}