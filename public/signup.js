let userAcc = localStorage.getItem("accounts");
let accountsList;

let incorrectMessage = document.getElementById("outputCorrect");

let activeAcc = {};

if (!userAcc) {
    accountsList = [];
} else {
    accountsList = JSON.parse(userAcc);
}

signUpForm = document.getElementById("signUpForm");
logInForm = document.getElementById("logInForm");

document.getElementById("signUpForm").addEventListener("submit", signUpSubmit);
document.getElementById("logInForm").addEventListener("submit", logInSubmit);


function signUpSubmit(e) {
    e.preventDefault();

    if(confirm("Would you like to create an account for Conway's Playground?")) {
       let username = document.getElementById("username").value;
       let email = document.getElementById("emailAdd").value;
       let password = document.getElementById("password").value;

       let userInfo = {
        username: username,
        email: email,
        password: password
       };

       console.log(userInfo);

       accountsList.push(userInfo);

       localStorage.setItem("accounts", JSON.stringify(accountsList))

       console.log("Information stored into local storage");

       activeAcc = {
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password
       }

       localStorage.setItem("activeAccount", JSON.stringify(activeAcc));

       window.location.assign("../home.html");
    }
}

function logInSubmit(e) {
    e.preventDefault();

    let usernameLog = document.getElementById("user").value;
    let passwordLog = document.getElementById("logInPassword").value;

    let availability = false;

    let loginInfo = {
        username: usernameLog,
        password: passwordLog
    }

    console.log(loginInfo);
    console.log(accountsList);

    for(let i in accountsList) {
       if(accountsList[i].username == loginInfo.username && accountsList[i].password == loginInfo.password) {
            availability = true;

            if(availability) {
                activeAcc = {
                    username: loginInfo.username,
                    email: accountsList[i].email,
                    password: loginInfo.password
                }

                localStorage.setItem("activeAccount", JSON.stringify(activeAcc));

            }
       }
    }

    if(availability) {
        window.location.assign("../home.html");
    } 
    
    else {
        console.log("Incorrect details")
        incorrectMessage.innerHTML = "Incorrect username or password. Please try again";
    }
}
