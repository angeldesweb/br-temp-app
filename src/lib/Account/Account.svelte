<script>
    import { getUserData } from '../../utils/http/users';
    import { user } from '../../store';
    import Avatar from "./Avatar.svelte";
    import Bio from "./Bio.svelte";
    import Header from './Header.svelte';
    import { onMount } from 'svelte';
    import { sendEmailVerification } from 'firebase/auth';
    import { auth } from '../../firebase';
    import { centerBox } from '../../utils/notifications';

    $: loading = false;

    const refresh = async () => {
        try {
            loading = true;
            const cUser = await auth.currentUser;
            const { bio } = await getUserData($user.uid);
            if(bio) user.add({bio,isVerified:cUser?.emailVerified});
            loading = false;
        } catch (error) {
            console.log(error);
        }
    }

    const sendEmail = async () => {
        try {
            const user = auth.currentUser;
            await sendEmailVerification(user);
            return centerBox.success(`Email de verificación enviado a ${user.email}`)
        } catch (error) {
            console.log(error);
        }
    }
 
    onMount(() => refresh());
</script>

{#if loading}
<progress class="progress"></progress>
{:else}
<div class="card bg-base-100 m-auto mt-2 shadow-xl">
    <div class="card-body">
        <Header/>
        <div class="divider"></div>
        <Bio/>
        <div class="tags mt-2">
            {#if !$user.isVerified}
                <p class="badge badge-outline badge-primary">Sin verificar</p>
                <a on:click|preventDefault={sendEmail} href={null} class="link link-primary  link-hover">Enviar correo de verificación</a>
                {:else}
                <span class="badge badge-success text-white">verificado</span>
            {/if}
            <br>
            <br>
            {#if !$user.premium}
                <a href={null} class="link link-primary  link-hover">Hacer premium</a>
            {:else}
                <span class="badge badge-success text-white">premium</span>
            {/if}
        </div>
    </div>
</div>
{/if}

<style>
    .card {
        width:min(40rem,100%)
    }
</style>