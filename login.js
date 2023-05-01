const xhr = new XMLHttpRequest();
const url = "users.json";
const submit = document.getElementById("submit");
const loginErr = document.querySelector(".login-error");
const userAuthenticated = false;
// const greeting = document.getElementById('message');
const disabledLinks = Array.from(document.getElementsByClassName("disabled"));



if (userAuthenticated === "true") {
    document.querySelector("form").style.display = "none";
    // document.querySelector(".welcome-message").style.display = "flex";
}

xhr.open("GET", url, true);

xhr.responseType = "json";

xhr.onload = function() {
    if (xhr.status == 200) {
        var data = xhr.response;
        console.log(data);
    }
    
};


submit.addEventListener("click", ()=>{
    event.preventDefault();

    fetch('users.json')
    .then(response => response.json())
    .then(data => {
        const users = data.users;



        function authenticateUser(username, password) {
            return users.some(user => user.username === username && user.password === password);
            
        }
        let username = document.getElementById("usernameInput").value;
        let password = document.getElementById("passwordInput").value;
        if (authenticateUser(username, password)) {
            let thisUser = users.filter(user => user.username === username);
            // greeting.innerHTML = `Hello, ${thisUser[0].fname}!`;
            userAuthenticated == true;
            loginErr.style.visibility = "hidden";
            document.querySelector("form").style.display = "none";
            // document.querySelector(".welcome-message").style.display = "flex";
            for (let i = 0; i < disabledLinks.length; i++) {
                disabledLinks[i].classList.remove("disabled");
            }

        } else {
            loginErr.innerHTML = `Incorrect username or password!`;
            loginErr.style.visibility = "visible";
            userAuthenticated == false;
            console.log('User not authenticated');
        }

    })
    .catch(error => console.log(error))


})

signOut.addEventListener("click", ()=>{
    localStorage.clear();
    console.clear();
    window.location.href = "index.html";
    userAuthenticated == false;

})