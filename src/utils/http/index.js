export const postToApi = async (url,body) => {
    try {
        const result = await fetch(url,{
            mode:'cors',
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body
        })
        const resp = await result.json();
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getFromApi = async (url) => {
    try {
        const request = await fetch(url);
        const response = await request.json();
        return response;
    } catch (error) {
        throw error;
    }
}