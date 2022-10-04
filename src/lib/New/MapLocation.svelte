<script>
    import { MapInput } from '@stand-io/bienes-components';
    import { fetchLocation } from '../../utils/http/geo';
    import { advert } from '../../store';
    
    let keys = {
        'city':'Ciudad',
        'locality':'Localidad',
        'municipality':'Parroquia',
        'county':'Municipio',
        'postcode':'Código postal',
        'road':'Calle'
    }
    export let nextSlide;
    export let backward;
    $: data = { address:null};
    $: loading = false;
    $: zoom = 10;
    $: lat = 10.4880104;
    $: lng = -66.8691885; 
    $: center = [lng,lat];
    const onPick  = async (e) => {
        if(e.detail.lat){
            lat = e.detail.lat;
            lng = e.detail.lng;
            loading = true;
            data = await fetchLocation({lat,lon:lng})
            loading = false;
            advert.add({lat,lon:lng,address:data.address,city:data.address.city ? data.address.city : ''})
        }
    }
</script>

<MapInput {onPick}{zoom}{lat}{lng}{center} />
{#if loading}
    <progress class="progress" />
    {:else}
    {#if data.address}
    <h2 class="text-xl mt-4">Detalle</h2>
    <div class="divider"></div>
    <div class="mt-2">
        {#each Object.entries(data.address) as obj}
            {#if keys[obj[0]]}
                <h3 class="text-lg">
                    {keys[obj[0]]}
                    <span class="badge badge-md">{obj[1]}</span>
                </h3>
            {/if}
        {/each}
        <button class="btn btn-success text-white btn-sm mt-4" on:click={nextSlide}>Siguiente</button>
    </div>
    {/if}
    <div>
        <button class="btn btn-error text-white btn-sm mt-4" on:click={backward}>Regresar</button>
    </div>
{/if}
