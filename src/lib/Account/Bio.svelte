<script>
    import { updateUser } from '../../utils/http/users';
    import { centerBox } from '../../utils/notifications';
    import { user } from '../../store';

    let bio = '';
    $: added = false;

    const addBio = async () => {
        try {
            let {success,message} = await updateUser($user.uid,{bio});
            if(!success) return centerBox.error('No se pudo actualizar intente nuevamente más tarde');
            added = true;
            user.add({bio})
            return centerBox.success(message);  
        } catch (error) {
            return centerBox.error('Algo salió mal')
        }
    }
</script>

{#if !$user.bio && !added}
    <div class="form-control">
        <label class="label" for="">
            <span class="label-text">Agrega una descripción para tu perfil</span>
        </label> 
        <textarea bind:value={bio} class="textarea textarea-bordered h-24" placeholder="Descripción"></textarea>
    </div>
    {#if bio}
        <div>
            <button on:click={addBio} class="btn btn-primary btn-sm">Guardar</button>
        </div>
    {/if}
{:else}
    <p>{$user.bio}</p>
{/if}