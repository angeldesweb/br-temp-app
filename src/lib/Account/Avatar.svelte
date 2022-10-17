<script>
    import { fileUpload } from '../../utils/http/properties/images';
    import placeholder from '../../assets/avatar-placeholder.jpg';
    import { auth } from '../../firebase';
    import { updateProfile } from 'firebase/auth';

    let infil;

    $: avatar = auth.currentUser?.photoURL || '';
    const handleClick = e => {
        infil.click()
    }

    const fetchFile = async (avatar) => {
        let file = await fileUpload(avatar)
        const user = auth.currentUser;
        alert('enviando imagen');
        await updateProfile(user,{photoURL:file})
        alert('realizado')
    };
    
    const handleChange = e => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            // @ts-ignore
            avatar = e.target.result
            fetchFile(avatar);
        };
    }

    
</script>

<input type="file" bind:this={infil} class="hidden" on:change={handleChange}>
{#if !avatar}
<div class="avatar">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={handleClick} class="w-16 ring ring-primary  ring-offset-base-100 ring-offset-4 mt-2 ml-2 rounded-full">
        <img src={placeholder} alt="avatar"/>
    </div>
</div>
{:else}
<div class="avatar">
    <div class="w-16 ring ring-primary  ring-offset-base-100 ring-offset-4 mt-2 ml-2 rounded-full">
        <img src={avatar} alt="avatar"/>
    </div>
</div>
{/if}