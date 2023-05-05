var url = "https://jsonplaceholder.typicode.com/albums/2/photos"

async function fetchWithString() {
    try {
        var response = await fetch(url);
        var data = await response.json
        //var htmlString = data.products.reduce(function)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}
fetchWithString();