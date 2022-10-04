<script>
    import { centerBox } from '../../utils/notifications';
    import { onMount } from 'svelte';
    import dayjs from 'dayjs';
    import { user } from '../../store';    
    import { getPropsByUser } from '../../utils/http/properties'
    import NotData from './NotData.svelte';
    import PropsTable from './PropsTable.svelte';
    import { Timestamp } from 'firebase/firestore';

    $: loading = true;
    $: data = []
    const fetchProps = async () => {
        loading = true;
        try {
            let { docs } = await getPropsByUser($user.uid);
            docs.map(doc => {
                let {seconds,nanoseconds} = doc.createdAt
                const time = new Timestamp(seconds,nanoseconds).toDate();
                let date = dayjs(time).format('DD/MM/YYYY');
                doc.createdAt = date;
            });
            data = docs;
            loading = false;
            return true;
        } catch (error) {
            centerBox.error('Error al cargar su información');
            loading = false;
            return false;
        }
    }
    fetchProps()
</script>

{#if loading}
<progress class="progress"></progress>
{:else}
    {#if data.length === 0}
    <NotData/>
    {:else}
        <PropsTable {data} />
    {/if}
{/if}

