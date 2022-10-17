<script>
    import { user as account } from '../../store';
    import { link , useLocation } from 'svelte-navigator';
    import { NavMobileSlot } from '@stand-io/bienes-components';
    import { NavBar , NavMenu } from '../components';
    import Default from './Menus/Default.svelte';
    import SellerMenu from './Menus/SellerMenu.svelte';
    import UserMenu from './Menus/UserMenu.svelte';
    import FilterBar from '../FilterBar/FilterBar.svelte';

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
        <div slot="end">
            <div class="hidden lg:flex">
                <svelte:component this={Bars[$account.profile]} mobile={false} />
            </div>
            {#if $location.pathname === '/home'}
            <div class="lg:hidden">
                <NavMobileSlot>
                    <div class="dropdown dropdown-end mt-3">
                        <NavMenu mobile={true}>
                            <FilterBar primary={true} />
                        </NavMenu>
                    </div>
                </NavMobileSlot>
            </div>
            {/if}
        </div>
    </NavBar>
{/if}