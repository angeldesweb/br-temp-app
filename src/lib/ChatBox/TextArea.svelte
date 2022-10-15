<script>
    import { centerBox } from "../../utils/notifications";


    let message = ''

    const handleClick = () => {
        centerBox.open({message:'No disponible actualmente',backgroundColor:'blue'})
    }
</script>

<h3 class="text-2xl">Escribir al vendedor</h3>
<br>
<textarea 
    class="textarea textarea-bordered w-full" 
    id="message" 
    maxlength="150"
    bind:value={message}
    placeholder="Escriba aquí su mensaje..."
></textarea>
<br>
<button on:click={handleClick} class="btn btn-primary btn-sm flex:end">Enviar</button>