<script>
    import { user } from '../../store'
    import Avatar from './Avatar.svelte';

    let labels = {
        seller:'vendedor',
        user:'usuario',
        adm:'administrador',
        dev:'desarrollador'
    }
</script>

<div class="flex justify-around align-center">
    <div class="flex align-center">
        <h2 class="card-title text-3xl">{$user.username} <div class="badge badge-primary mb-0">{labels[$user.profile]}</div></h2>
    </div>
    <Avatar/>
</div>