<script>
    import NavBar from '../../lib/NavBar/NavBar.svelte';
    import Footer from '../../lib/Footer.svelte';
</script>

<div class="view">
    <NavBar/>
    <main>
        <slot></slot>
    </main>
    <Footer/>
</div>

<style>
    main {
        min-height:26rem;
    }
</style>