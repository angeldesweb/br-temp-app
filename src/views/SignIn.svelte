<script>
    import { link , useNavigate } from 'svelte-navigator';
    import { user } from '../store'
    import NavBar from "../lib/NavBar/NavBar.svelte";
    import SignInForm from "../lib/Forms/SignInForm.svelte";
    
    const navigate = useNavigate();

    if($user.isAuth) navigate(-1);
</script>

{#if !$user.isAuth}

<div class="card w-96 bg-base-100 shadow-xl m-auto mt-4 mb-4">
    <div class="card-body">
        <h2 class="card-title text-primary">Inicio de sesión</h2>
        <div class="card-actions w-full">
            <SignInForm/>
            <br>
            <div class="divider"></div>
            <a href="signup" use:link class="link link-hover text-primary m-auto">Quiero registrarme</a>
        </div>
    </div>
</div>
{/if}