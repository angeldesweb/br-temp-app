<script>
    export let min;
    export let max;
    export let step;
    export let onChange;
    export let label;
    export let name;
    export let ghost = false;
    $: value = min;
</script>

<label for="" class="text-xs" class:text-primary={!ghost}>{label}</label>
<input type="range" name={name} {min} {max} {step} on:change={onChange} bind:value class="range range-xs range-primary" />
<p class="text-xs" class:text-primary={!ghost}>Entre {value} - {max}</p>