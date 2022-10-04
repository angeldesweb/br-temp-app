<script>
    import { useNavigate } from 'svelte-navigator';
    import { user } from '../store';
    import { Hero , Button , Brand } from '@stand-io/bienes-components';
    import src from '../assets/home.jpg';

    const navigate = useNavigate();
    const handleClick = () => navigate('home');
    $: if($user.isAuth) navigate('/home');
</script>

<Hero {src} >
    <Brand slot="title" />
    <p slot="content">Compra, Alquiler o venta de inmuebles en línea.</p>
    <div slot="actions">
        <Button primary={true} onClick={handleClick} >Ingresar</Button>
    </div>
</Hero>