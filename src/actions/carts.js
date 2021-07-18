export function cartsFetchDataSuccess(carts){
    return {
        type: "CARTS_FETCH_DATA_SUCCESS",
        carts
    }
}

export function cartsFetchData(url){
    return (dispatch)=>{
        fetch(url)
            .then(response =>{
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(carts =>dispatch(cartsFetchDataSuccess(carts)))
    }
}

export function cartsFetchDataDelete(url){
    return (dispatch)=>{
        fetch(url, {
            method: 'DELETE'
        })
            .then(response =>{
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(carts =>dispatch(cartsFetchDataSuccess(carts)))
    }
}

export function cartsFetchDataPutQuantity(url){
    return (dispatch)=>{
        fetch(url, {
            method: 'PUT'
        })
            .then(response =>{
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(carts =>dispatch(cartsFetchDataSuccess(carts)))
    }
}

export function cartsFetchDataPostProduct(url){
    return (dispatch)=>{
        fetch(url, {
            method: 'POST'
        })
            .then(response =>{
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(carts =>dispatch(cartsFetchDataSuccess(carts)))
    }
}
