<script>
    import { NavMenu , NavItem } from '@stand-io/bienes-components'
    import { useNavigate } from 'svelte-navigator';
    export let mobile;
    const navigate = useNavigate();
</script>

<NavMenu {mobile}>
    <NavItem label="Iniciar sesión" onClick={e => navigate('/signin')} />
    <NavItem label="Registrarse" onClick={e => navigate('/signup')} />
</NavMenu>