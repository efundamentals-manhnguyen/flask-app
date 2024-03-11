function logOut(){
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-user-name');
    alert("Log out successfully!")
    window.location = './index.html'
}

window.onload = function() {
    let xUserName = localStorage.getItem("x-user-name");
    if(!xUserName){
        document.querySelector("a.logout").style.display = "none";
    }
}