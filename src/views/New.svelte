<script>
    import { StepCard } from '@stand-io/bienes-components';
    import {advert} from '../store';
    import { createProp } from '../utils/http/properties';
    import { fileUpload } from '../utils/http/properties/images';
    import { useNavigate } from 'svelte-navigator';
    import { centerBox } from '../utils/notifications';
    import MapLocation from '../lib/New/MapLocation.svelte';
    import Dropzone from '../lib/New/Dropzone.svelte';
    import AdvertForm from '../lib/Forms/AdvertForm.svelte';
    import PreviewAdvert from '../lib/New/PreviewAdvert.svelte';
  
  
    $: slide = 0;
    $: isEnding = false;
    const steps = [Dropzone,MapLocation,AdvertForm,PreviewAdvert];
    const titles = [
        'Añada algunas imágenes',
        'Seleccione la ubicación en el mapa',
        'Describa su propiedad',
        'Resumen'
    ]
    const navigate = useNavigate()
    const nextSlide = () => slide = slide + 1;
    const backward = () => slide = slide - 1;
    const endSlides = async () => {
        isEnding = true;
        let images = await Promise.all($advert.images.map(async img => await fileUpload(img)));
        advert.add({images});
        let { success } = await createProp($advert);
        advert.reset();
        slide = 0;
        isEnding = false;
        success ? 
        centerBox.success('Pocesado con éxito') :
        centerBox.error('Ha ocurrido algún error, Intente nuevamente')
    }
</script>

{#if !isEnding}
    <StepCard {slide} {steps} {nextSlide} {backward} {titles} {endSlides} />
    {:else}
    <div class="box">
        <div class="card bg-base-100 shadow-xl">
            <h2 class="text-3xl font-bold text-primary">Espere un momento</h2>
            <div class="divider"></div>
            <p>Estamos procesando su información.</p>
            <br>
            <progress class="progress"></progress>
        </div>
    </div>
{/if}

<style>
    .box {
        height:30rem;
        display:grid;
        place-content: center;
        background-color: #f2f2f2;
    }
    .card {
        padding:1rem;
        text-align: center;
    }
</style>
