let accounts = localStorage.getItem("accounts");
let results = "";

if(!accounts) {
    accountList = "No saved accounts";
}

else {
    accountList = JSON.parse(accounts);

    for (let key in accountList) {
    result += accountList[key];
    }

}
