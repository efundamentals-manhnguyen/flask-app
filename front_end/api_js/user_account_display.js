let xUserName = localStorage.getItem("x-user-name");

window.onload = function() {
    if(xUserName){
        document.querySelector(".header-links a span").innerHTML = xUserName;
        document.querySelector(".header-links a").setAttribute("href", "#")
    }
}