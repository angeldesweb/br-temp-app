<script>
    import { getProps } from '../../utils/http/properties';
    import { filters } from '../../store';
    import { FilterSelect , Range , FilterNumber } from '../components';
    export let primary = false;

    $: category = $filters.category;
    $: city = $filters.city;
    $: operation = $filters.operation;
    $: rooms = $filters.rooms || null;
    $: baths = $filters.baths || null;
    $: parks = $filters.parks || null;

    $: rmin = 0;
    $: rmax = 0;
    $: step = 0;

    let categoryOptions = [
        {value:'casa',tag:'Casa'},
        {value:'apto',tag:'Apartamento'},
        {value:'land',tag:'Terreno'},
        {value:'local',tag:'Local'}
    ]
    $: citiesOptions = []
    let operOptions = [
        {value:'Alquiler',tag:'Alquiler'},
        {value:'Venta',tag:'Venta'}
    ]
    let fetchCities = async () => {
        try {
            let { docs } = await getProps();
            let names = new Set();
            let prices = new Set()
            docs.map((item,i) => {
                names.add(item.city);
                prices.add(item.price);
            });
            let ranges = [...prices].sort();
            let steps = ranges.map((pr,i,arr) => arr[i+1] - pr);
            steps.pop();
            step = steps.sort((a, b) => a - b )[0];
            rmin = ranges[0];
            rmax = ranges[ranges.length -1]
            let response = [...names].map(name => ({value:name,tag:name}));
            citiesOptions = response;

        } catch (error) {
            alert(JSON.stringify(error));
        }
    }
    fetchCities();
    const handleFilter = (e) => {
        filters.add({[e.target.name]:e.target.value})
    }

    const reset = (key) => {
        filters.restoreVal(key);
    }

    const clean = () => {
        filters.reset();
    }

    $: ghost = primary ? true : false;
</script>

<ul class=" p-1 flex  flex-col justify-start" >
    <FilterSelect
        label='Categoría'
        name='category'
        options={categoryOptions}
        onChange={handleFilter} 
        {reset}
        bind:value={category}
    />
    <FilterSelect
        label='Ciudad'
        name='city'
        options={citiesOptions}
        onChange={handleFilter} 
        {reset}
        bind:value={city}
    />
    <FilterSelect
        label='Tipo de operación'
        name='operation'
        options={operOptions}
        onChange={handleFilter} 
        {reset}
        bind:value={operation}
    />
    <div class="mt-3">
        <Range name="min" min={rmin} max={rmax} onChange={handleFilter} {step} label="Rango de precio" />
    </div>
    <div class="mt-3">
        <FilterNumber 
            label="Cant. Habitaciones"
            placeholder="Habitaciones"
            name="rooms"
            value={rooms}
            reset={reset}
            onChange={handleFilter} 
        />
    </div>
    <div class="mt-3">
        <FilterNumber 
            label="Cant. Baños"
            placeholder="Baños"

            name="baths"
            value={baths}
            reset={reset}
            onChange={handleFilter} 
        />
    </div>
    <div class="mt-3">
        <FilterNumber 
            label="Ptos. Estacionamiento"
            placeholder="Estacionamiento"
            name="parks"
            value={parks}
            reset={reset}
            onChange={handleFilter} 
        />
    </div>
    <button class="btn btn-xs btn-ghost text-primary mt-3" class:text-white={primary} on:click={clean}>limpiar</button>
</ul>
