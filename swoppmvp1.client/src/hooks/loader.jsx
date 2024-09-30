function loader({url, request, method}) {
    return fetch(url, {
        method: method,
        header:{
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(request)
        
    })
}