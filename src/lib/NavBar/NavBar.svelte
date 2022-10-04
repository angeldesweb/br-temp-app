<script>
    import { user as account } from '../../store';
    import { link , useLocation } from 'svelte-navigator';
    import { NavBar , NavMobileSlot , NavMenu , NavItem } from '@stand-io/bienes-components';
    import Default from './Menus/Default.svelte';
    import SellerMenu from './Menus/SellerMenu.svelte';
    import UserMenu from './Menus/UserMenu.svelte';

    const location = useLocation();
    $: isSessionPath = $location.pathname === '/signin' ? 
    true  : $location.pathname === '/signup' ? 
    true : false;

    const Bars = {
        seller:SellerMenu,
        default:Default,
        user:UserMenu
    }
</script>

{#if isSessionPath}
    <NavBar primary={true}>
        <a href="/home" use:link slot="brand" class="btn btn-ghost normal-case text-xl"><b class="fotn-bold">Bienes</b> Raices</a>
    </NavBar>
    {:else}
    <NavBar primary={true}>
        <NavMobileSlot slot="start">
            <svelte:component this={Bars[$account.profile]} mobile={true} />
        </NavMobileSlot>
        <a href="/" use:link slot="brand" class="btn btn-ghost normal-case text-xl"><b class="fotn-bold">Bienes</b> Raices</a>
        <svelte:component this={Bars[$account.profile]} mobile={false} slot="end" />
    </NavBar>
{/if}