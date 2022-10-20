<script>
    import { useNavigate } from 'svelte-navigator'
    import { Hero , Button } from '@stand-io/bienes-components';

    const navigate = useNavigate();
    const handleClick = () => navigate('/home');
</script>

<Hero src="https://placeimg.com/1000/800/arch" >
    <h2 slot="title" class="text-3xl">No encontrado</h2>
    <p slot="content">Lo sentimos, la ruta que desea encontrar no existe o se encuentra en construcción.</p>
    <div slot="actions">
        <Button primary={true} onClick={handleClick} >Regresar</Button>
    </div>
</Hero>