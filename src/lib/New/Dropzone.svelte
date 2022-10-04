<script>
    import { Dropzone , ImagesPreview } from '@stand-io/bienes-components';
    import { advert } from '../../store';
    export let nextSlide;

    $: images = [];
    let files = {accepted:[],rejected:[]}
    
    const readImages =  (file) => {
        const reader = new FileReader();
        reader.addEventListener("load",() => {
            images = cleanArr([...images,reader.result])
            advert.add({images});
        });
        reader.readAsDataURL(file);
    };
    
    const cleanArr = (arr) => {
        let clean = new Set(arr.map(item => JSON.stringify(item)));
        let cleaned = [...clean].map(item => JSON.parse(item));
        return cleaned;
    }

    const handleFilesSelect = (e) => {
        const { acceptedFiles, fileRejections } = e.detail;
        acceptedFiles.map(img => readImages(img));
        let toInsert = cleanArr([...acceptedFiles,...files.accepted]);
        files.accepted = [...toInsert];
        files.rejected = [...files.rejected, ...fileRejections]; 
    }

    const handleRemoveFile = (e, index) => {
        files.accepted.splice(index, 1);
        images.splice(index,1);
        files.accepted = [...files.accepted];
        images = [...images];
    }

    const handleRemoveAll = () => {
        files.accepted = [];
        images=[];
    }
</script>

<Dropzone {handleFilesSelect} />
<ImagesPreview {handleRemoveAll} {handleRemoveFile} files={files.accepted} {images} />
{#if files.accepted.length > 0}
    <div>
        <button class="btn btn-success text-white btn-sm mt-1" on:click={nextSlide}>Siguiente</button>
    </div>
{/if}