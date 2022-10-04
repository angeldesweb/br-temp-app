<script>
    import { FormControl , Input , Button , CheckBox } from '@stand-io/bienes-components';
    import { createForm } from 'felte';
    import { useNavigate } from 'svelte-navigator';
    import { extend , onSubmit , onError } from '../../utils/validations/signup';
    
    const navigate = useNavigate();
    const { form , reset , warnings , touched , isSubmitting } = createForm({
        extend,
        onSubmit,
        onError,
        onSuccess:() => {
            reset();
            navigate(-1);
        }
    });
</script>

<form class="w-full" use:form>
    <FormControl>
        <Input slot="field" 
            warning={$warnings.username && $touched.username} 
            type="text" 
            placeholder="Usuario" 
            name="username"
        />
        <p class="text-warning" slot="feedback-right">
            {$warnings.username && $touched.username ? $warnings.username : ''}
        </p>  
    </FormControl>
    <FormControl>
        <Input slot="field" 
            warning={$warnings.email && $touched.email} 
            type="email" 
            placeholder="Correo electrónico" 
            name="email"
        />
        <p class="text-warning" slot="feedback-right">
            {$warnings.email && $touched.email ? $warnings.email : ''}
        </p>  
    </FormControl>
    <FormControl>
        <Input 
            slot="field" 
            warning={$warnings.password && $touched.password} 
            type="password" 
            placeholder="Contraseña" 
            name="password"
        />
        <p class="text-warning" slot="feedback-right">
            {$warnings.password && $touched.password ? $warnings.password : ''}
        </p>
    </FormControl>
    <FormControl>
        <CheckBox label="Quiero vender" name="level" slot="field" primary={true} />
    </FormControl>
    {#if !$isSubmitting}
        <Button 
            primary={true} 
            disabled={!!$warnings.email || !!$warnings.password}
        >
            Enviar
        </Button>
    {/if}
</form>