<script>
    import { getProps } from "../../utils/http/properties";
    import { onMount } from "svelte";
    import FilterBar from "../FilterBar/FilterBar.svelte";
    import NotResults from "./NotResults.svelte";
    import HomeCard from "./HomeCard.svelte";
    import { filters , isCleaned , initial } from "../../store";

    $: data = [];
    $: filtered = [];
    $: loaded = false;

    const fetchProperties = async () => {
        try {
            let { docs } = await getProps();
            data = [...docs];
        } catch (error) {
            console.log(error);
        }
    }

    const filterByInput = (key,value) => {
        if(key === 'min' || key === 'max') return;
        if(value === initial[key]) return;
        filtered = data.filter(obj =>   { 
            if(key === 'city') return obj[key].toLowerCase().includes(value.toLowerCase());
            if(key === 'operation') return obj[key].toLowerCase().includes(value.toLowerCase());
            if(key === 'category') return obj[key].toLowerCase().includes(value.toLowerCase());
            if(value === '') return filters.add({[key]:null})
            return obj[key] === parseInt(value)
        });
    };
    const filterPrice = (min,max) => {
        if(!!min && !!max) filtered = data.filter(doc => doc.price > min && doc.price < max);
        if(!!min && !max) filtered = filtered = data.filter(doc => doc.price > min);
        if(!min && !!max) filtered = filtered = data.filter(doc => doc.price < max);
    }
    $: if(!$isCleaned) {
        if($filters.min || $filters.max) filterPrice($filters.min,$filters.max);
        Object.entries($filters).map(entrie => filterByInput(entrie[0],entrie[1]));
    }

    onMount(async ()=> {
        await fetchProperties()
        loaded = true;
    })

</script>

<section class="main grid grid-cols-1 lg:grid-cols-10">
    <div class="lg:flex bg-base-100 col-start-1 col-end-3 hidden">
        <FilterBar/>
    </div>
    <div class="content lg:col-start-3 lg:col-end-11">
    {#if loaded}
        {#if $isCleaned && data.length > 0}
            <div class="cards">
                {#each data as property}
                <HomeCard 
                    src={property.images[0]} 
                    title={property.title} 
                    description={property.description}
                    rooms={property.rooms}
                    baths={property.baths}
                    price={property.price}
                    parks={property.parks}
                    city={property.city}
                    category={property.category}
                    operation={property.operation}
                    id={property.id}
                />
                {/each}
            </div>
            {:else if $isCleaned && data.length === 0}
            <NotResults/>
        {/if}
        {#if !$isCleaned && filtered.length > 0}
            <div class="cards">
                {#each filtered as property}
                <HomeCard 
                    src={property.images[0]} 
                    title={property.title} 
                    description={property.description}
                    rooms={property.rooms}
                    baths={property.baths}
                    price={property.price}
                    parks={property.parks}
                    city={property.city}
                    category={property.category}
                    operation={property.operation}
                    id={property.id}
                />
                {/each}
            </div>
            {:else if !$isCleaned && filtered.length < 1}
            <NotResults/>
        {/if}
        {:else}
        <div class="box">
            <progress class="progress"></progress>
        </div>
    {/if}
    </div>
</section>

<style>
    .main {
        background-color: #f2f2f2;
    }
    .box {
        display:flex;
        height:25rem;
        justify-content: center;
        align-items: center;
        padding:8rem;
    }
    .cards {
        display:grid;
        width:100%;
        padding:1em;
        grid-auto-rows: 30rem;
        grid-template-columns: repeat(auto-fill,minmax(18rem,1fr));
        gap:1em;
    }
</style>