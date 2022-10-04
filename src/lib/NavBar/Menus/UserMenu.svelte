<script>
    import { NavMenu , NavItem } from '@stand-io/bienes-components';
    import { user } from '../../../store';
    import { logOut } from '../../../utils/http/users';
    import { useNavigate } from 'svelte-navigator';
    export let mobile;
    const navigate = useNavigate();

    const endSession = async () => {
        try {
            await logOut();
            user.close();
            navigate('/');
        } catch (error) {
            alert(JSON.stringify(error));
        }
    }
</script>

<NavMenu {mobile}>
    <NavItem label="Mis conversaciones" onClick={e => navigate('/none')} />
    <NavItem label="Cuenta" onClick={e => navigate('/account')} />
    <NavItem label="Cerrar sesión" onClick={endSession} />  
</NavMenu>