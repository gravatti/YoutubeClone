var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
var numProducts = 0;
var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require("../conf/database");

module.exports = {
    makeCards: async function fetchWithString() {
    try {
        var [rows, _ ] = await db.execute(
            `SELECT * FROM posts;`
        );
        var response = await fetch(url);
        var data = await response.json();
        var htmlString = data.reduce(function(prev, post) {
            numProducts++;
            return (
            prev +
            `<div class="product-card">
                <img class="product-img" src="${post.thumbnail}" alt="${photo.title}">
                <div class="product-info">
                <p class="product-title">${post.title}</p>
                <p class="product-cost">${post.description}</p>
                </div>
            </div>`
        );
        }, "");
        document.getElementById("product-list").innerHTML = htmlString;
        let cards = document.getElementsByClassName('product-card');
        [...cards].forEach(function(ele){
            ele.addEventListener('click', function(ev){
                numProducts--;
                console.log(ev);
                let productCount = numProducts;
                productCount.innerText = parseInt(productCount.innerText) - 1;
                this.style.opacity = 0;
                setTimeout(() => {
                    this.remove();
                    document.getElementById("product-count").innerText = `Showing ${numProducts} photos`;
                }, 1000);
            });
        });
        var productCount = document.getElementById("product-count");
        productCount.innerText = `Showing ${numProducts} photos`;
    } catch (error) {
        console.log(error);
    }
    },

}