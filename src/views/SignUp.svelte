<script>
    import { link } from 'svelte-navigator';
    import NavBar from "../lib/NavBar/NavBar.svelte";
    import SignUpForm from "../lib/Forms/SignUpForm.svelte";
</script>


<div class="card w-96 bg-base-100 shadow-xl m-auto mt-4 mb-4">
    <div class="card-body">
        <h2 class="card-title text-primary">Registro de usuario</h2>
        <div class="card-actions w-full">
            <SignUpForm/>
            <br>
            <div class="divider"></div>
            <a href="signin" use:link class="link link-hover text-primary m-auto">Ya tengo una cuenta</a>
        </div>
    </div>
</div>