<script>
    import { useNavigate } from "svelte-navigator";
    import { user } from "../../store";
    import { centerBox } from "../../utils/notifications";

    export let id;
    export let src;
    export let title;
    export let description;
    export let rooms;
    export let baths;
    export let price;
    export let parks;
    export let city;
    export let category;
    export let operation;

    const navigate = useNavigate()
    const handleClick = (e) => {
        if(!$user.isAuth) return centerBox.open({background:'blue',message:'Registrate o inicia sesión para continuar'})
        navigate(`/property/${e.target.id}`)
    }
</script>
<div class="card bg-base-100 shadow-xl">
    <figure class="w-full"><img class="w-full" style="height:12rem" src="{src}" alt="pic"/></figure>
    <div class="card-body">
        <span class="card-title text-primary">{title}</span>
        <div class="card-actions justify-start">
            <div class="badge badge-primary text-white">{category}</div>
            <div class="badge badge-primary text-white">{operation}</div>
        </div>
         
        <p class="desc">
            {description}
        </p>        
        <p>{city}</p>
        <div class="card-actions justify-end">
            <div class="badge badge-outline">Habs: {rooms}</div> 
            <div class="badge badge-outline">Baños: {baths}</div>
            <div class="badge badge-outline">Puestos: {parks}</div>
            <div class="badge badge-primary text-white badge-outline">Precio: {price}$</div>
        </div>
        <div class="card-actions justify-end">
        <button id="{id}" on:click={handleClick} class="btn btn-sm text-white btn-primary">Detalle</button>
      </div>
    </div>
</div>

<style>
    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .card {
        width:20rem;
    }

    .desc {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>