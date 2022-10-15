<script>
    import { MapStatic } from '@stand-io/bienes-components'
    import { onMount } from 'svelte';
    import { centerBox } from "../../utils/notifications";
    import { useParams } from 'svelte-navigator';
    import { getProp } from '../../utils/http/properties'
    import TextArea from '../ChatBox/TextArea.svelte';
    import { user } from '../../store';
    let params = useParams();

    const fetchPoperty = async () => {
        try {
            const { data } = await getProp($params.id);
            return data
        } catch (error) {
            centerBox.error(error);
        }
    }

    let promise = fetchPoperty();
    onMount(async() => {
        // @ts-ignore
        promise = await fetchPoperty()
    });
</script>

{#await promise}
<progress class="progress w-96 mt-4"></progress>
{:then data}
<div class="detail">
    <div class="header text-3xl w-full flex justify-around">
        <h1 class="text-primary font-bold text-center">{data?.title}</h1>
        <span class="text-primary">{data?.price}MXN</span>
    </div>
    <div class="divider"></div>
    <br>
    <div class="upper">
        <div class="image" style="background-image:url({data?.images[0]})"></div>
        <div class="hidden md:flex">
            <MapStatic lat={data?.center._lat}  lng={data?.center._long} />
        </div>
    </div>
    <div class="divider"></div>
    <div class="mt-6">
        <h3 class="text-2xl">Descripción</h3>
        <p>{data?.description}</p>
    </div>
    <div class="divider"></div>
    <div class="mt-6">
        <ul>
            <li class="badge badge-primary">Habitaciones {data?.rooms}</li>
            <li class="badge badge-primary">Baños {data?.baths}</li>
            <li class="badge badge-primary">Estacionamiento {data?.parks} puestos</li>
        </ul>
    </div>
    <div class="divider"></div>
    {#if $user.uid !== data.createdBy}
    <TextArea />
    {/if}
</div>
{/await}


<style>
    .detail {
        padding:1em;
    }
    .image {
        width:30rem;
        height:30rem;
        background-position:center center;
        background-size:cover;
    }
    .upper {
        display:flex;
        align-items:center;
        justify-content:space-between;
        flex-wrap:wrap;
    }
</style>