const apiPrefix = 'http://localhost:3001/api'

 function useApi(endpoint, method, data, redirect, error){

    try{

        $.ajax({
            url: `${apiPrefix}/${endpoint}`,
            type: method,
            data: data === null? (null): (data),
            success: window.location.replace(redirect)
            error: (error) => {
                throw new Error(error);
            }
        });


    }catch(error){

    }

}