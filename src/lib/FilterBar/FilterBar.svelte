<script>
    import { filters } from '../../store';

    $: category = $filters.category;
    $: city = $filters.city;
    $: operation = $filters.operation;
    $: min = $filters.min;
    $: max = $filters.max;
    $: rooms = $filters.rooms || null;
    $: baths = $filters.baths || null;
    $: parks = $filters.parks || null;

    const handleFilter = (e) => {
        filters.add({[e.target.name]:e.target.value})
    }
</script>

<ul class="bg-base-100 lg:col-start-1 lg:col-end-3 p-1 flex justify-around lg:flex-col lg:justify-start">
    <li class="form-group p-1 w-full">
        <select bind:value={category} on:change={handleFilter} name="category" class="select select-bordered select-xs w-full max-w-xs">
            <option disabled selected value="">Tipo de propiedad</option>
            <option value="casa">Casa</option>
            <option>Apartamento</option>
            <option>Local</option>
            <option>Terreno</option>
        </select>
    </li>
    
    <li class="form-group p-1 w-full">
        <input on:input={handleFilter} bind:value={city} type="text" placeholder="Ciudad" name="city" class="input input-bordered input-xs w-full max-w-xs" />
    </li>
    
    <li class="form-group p-1 w-full">
        <select bind:value={operation} on:change={handleFilter} name="operation" class="select select-bordered select-xs w-full max-w-xs">
            <option disabled selected value="">Operación</option>
            <option>Alquiler</option>
            <option>Venta</option>
        </select>
    </li>
    
    <li class="form-group p-1 w-full">
        <input on:input={handleFilter} bind:value={min} type="number" min=0 name="min" placeholder="Precio min" class="input input-bordered input-xs w-full max-w-xs" />
    </li>
    <li class="form-group p-1 w-full">
        <input on:input={handleFilter} bind:value={max} type="number" min=0 name="max" placeholder="Precio max" class="input input-bordered input-xs w-full max-w-xs" />
    </li>
    <li class="form-group p-1 w-full">
        <input on:input={handleFilter} bind:value={rooms} type="number" min=0 name="rooms" placeholder="Habitaciones" class="input input-bordered input-xs w-full max-w-xs" />
    </li>
    <li class="form-group p-1 w-full">
        <input on:input={handleFilter} bind:value={baths} type="number" min=0 name="baths" placeholder="Baños" class="input input-bordered input-xs w-full max-w-xs" />
    </li>
    <li class="form-group p-1 w-full">
        <input on:input={handleFilter} bind:value={parks} type="number" min=0 name="parks" placeholder="Puestos de est." class="input input-bordered input-xs w-full max-w-xs" />
    </li>
    <li class="form-group p-1 w-full">
        <button class="btn btn-ghost btn-sm" on:click={e => filters.reset()}>limpiar</button>
    </li>
</ul>
