<script>
    import { useNavigate } from 'svelte-navigator'
    import { Hero , Button , Brand } from '@stand-io/bienes-components';
    import src from '../assets/home.jpg';

    const navigate = useNavigate();
    const handleClick = () => navigate('/home');
</script>

<Hero {src} >
    <h2 slot="title text-3xl">No encontrado</h2>
    <p slot="content">Lo sentimos, la ruta que desea encontrar no existe o se encuentra en construcción.</p>
    <div slot="actions">
        <Button primary={true} onClick={handleClick} >Regresar</Button>
    </div>
</Hero>