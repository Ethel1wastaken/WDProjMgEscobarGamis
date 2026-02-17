// Account Sign Up Form
let userAcc = localStorage.getItem("accounts");
let accountsList;

let incorrectMessage = document.getElementById("outputCorrect");

if (!userAcc) {
    accountsList = [] ;
}

else {
    accountsList = JSON.parse(userAcc);
}

signUpForm = document.getElementById("signUpForm");
logInForm = document.getElementById("logInForm");

document.getElementById("signUpForm").addEventListener("submit", signUpSubmit);
document.getElementById("logInForm").addEventListener("submit", logInSubmit);


function signUpSubmit(e) {
    e.preventDefault();

    if(confirm("Would you like to create an account for Conway's Playground?")) {
       //declare variables for each info
       let username = document.getElementById("username").value;
       let email = document.getElementById("emailAdd").value;
       let password = document.getElementById("password").value;

       //assign object to store for each info
       let userInfo = {
        username: username,
        email: email,
        password: password
       };

       //console.log info
       console.log(userInfo);

       //push to local storage array
       accountsList.push(userInfo);

       //push array to local storage
       localStorage.setItem("accounts", JSON.stringify(accountsList))

       //console.log that ur done
       console.log("Information stored into local storage");

       window.location.href = "home.html";
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

    //check logInInfo
    for(let i in accountsList) {
       if(accountsList[i].username == loginInfo.username && accountsList[i].password == loginInfo.password)
            availability = true;
    }

    if(availability) {
        window.location.href = "home.html";
    }

    else {
        console.log("Incorrect details")
        incorrectMessage.innerHTML += "Incorrect username or password. Please try again";
    }
}