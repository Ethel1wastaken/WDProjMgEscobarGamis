// Account Sign Up Form
let userAcc = localStorage.getItem("accounts");
let accountsList;

if (!userAcc) {
    accountsList = {} ;
}

else {
    accountsList = JSON.parse(userAcc);
}

const form = document.getElementById("signUpForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if(confirm("Would you like to create an account for Conway's Playground?")) {
        const userData = new FormData(form);

        const obj = Object.fromEntries(userData.entries()); 

        accountsList[obj.username] = {};
        for (let key in obj) { 
            if (key != "username") { 
                accountsList[obj.uname][key] = obj[key];
            }
        }

        console.log(accountsList);
        userAcc = JSON.stringify(accountsList);
        localStorage.setItem("accounts", userAcc);
    }
})
