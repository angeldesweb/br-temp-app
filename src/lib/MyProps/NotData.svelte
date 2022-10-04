<script>
    import { useNavigate } from "svelte-navigator";
    const navigate = useNavigate();
    const toPublish = () => {
        navigate('/new')
    }
</script>

<div class="hero bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">Sin anuncios</h1>
            <div class="divider"></div>
            <p class="py-6">Aún no has publicado anuncios.<br> Publica la propiedad que te interese vender o alquilar.</p>
            <div class="card-actions">
                <button on:click={toPublish} class="btn btn-outline btn-primary btn-sm">Ir ahora</button>
            </div>
        </div>
    </div>
</div>

<style>
    .hero {
        height:30rem;
    }
</style>