export function personsFetchDataSuccess(products){
    return {
        type: "PERSONS_FETCH_DATA_SUCCESS",
        products
    }
}

export function personsFetchData(url){
    return (dispatch)=>{
        fetch(url)
            .then(response =>{
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response;
            })
            .then(response => response.json())
            .then(products =>dispatch(personsFetchDataSuccess(products)))
    }
}