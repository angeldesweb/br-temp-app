<script>
    import { createForm } from 'felte';
    import { FormControl , Input , Button } from '@stand-io/bienes-components';
    import { user , advert } from '../../store';

    export let nextSlide;
    export let backward;
    let data = {
        title:'',
        city:$advert.address.city || '',
        rooms:null,
        baths:null,
        parks:null,
        category:'',
        price:null,
        createdBy:$user.uid,
        createdAt:Date.now(),
        operation:''
    }

    const { form , reset , warnings , touched , isSubmitting } = createForm({
        onSubmit:(values) => {
            data = {...data,...values}
            advert.add({...data})
            nextSlide();
        },
        onError:(error) => alert(JSON.stringify(error)),
        onSuccess:() => {
            reset();
        }
    });
</script>

<form use:form>
    <FormControl>
        <Input 
            slot="field"
            type="text"
            placeholder="Título de anuncio"
            name="title"
        />
    </FormControl>
    <FormControl>
        <textarea name="description" class="textarea textarea-bordered" placeholder="Descripción del anuncio" slot="field"></textarea>
    </FormControl>
    {#if !$advert.address.city}
    <FormControl>
        <Input 
            slot="field"
            type="text"
            placeholder="Ciudad"
            name="city"
        />
    </FormControl> 
    {/if}
    <FormControl>
        <Input 
            slot="field"
            type="number"
            placeholder="N° de habitaciones"
            name="rooms"
        />
    </FormControl>
    <FormControl>
        <Input 
            slot="field"
            type="number"
            placeholder="N° de baños"
            name="baths"
        />
    </FormControl>
    <FormControl>
        <Input 
            slot="field"
            type="number"
            placeholder="Puestos de estacionamiento"
            name="parks"
        />
    </FormControl>
    <FormControl>
        <Input 
            slot="field"
            type="number"
            placeholder="Precio de venta"
            name="price"
        />
    </FormControl>
    <FormControl>
        <select name="category" class="select select-bordered w-full max-w-xs" slot="field" >
            <option disabled selected value={null}>Categoría</option>
            <option>Casa</option>
            <option>Apartamento</option>
            <option>Habitación</option>
            <option>Local</option>
            <option>Terreno</option>
        </select>
    </FormControl>
    <FormControl>
        <select name="operation" class="select select-bordered w-full max-w-xs" slot="field">
            <option disabled selected value={null}>Operación</option>
            <option>Alquiler</option>
            <option>Venta</option>
        </select>
    </FormControl>
    {#if !$isSubmitting}
        <Button 
            primary={true} 
            small={true}
            disabled={!!$warnings.email || !!$warnings.password}
        >
            Enviar
        </Button>
    {/if}
</form>
<div>
    <button class="btn btn-error text-white btn-sm mt-4" on:click={backward}>Regresar</button>
</div>