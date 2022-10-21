let json = {
    user: "",
    email: "",
    passw: "",
    passw2: ""
}

function reqListener(){
    const value = JSON.parse(this.responseText)
    for (let i = 0; i < value.length; i++) {
        console.log(value[i])
        if ((json.user === value[i].user) && (json.passw === value[i].passw)) {
            console.log("USER EXIST");
            logeado();
            return true;
        }else {
            console.log("USER NOT EXISTS");
            no_logeado();
            //return false;
        }
    }
}
function reqRegister() {
    console.log(this.responseText);
}

submit_login = () => {
    let value_email = document.getElementById('user');
    let value_passw = document.getElementById('passw');
    json.user = value_email.value;
    json.passw = value_passw.value;
    
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener)
    req.open("GET", "http://localhost:3000/api/auth/");
    req.send()
}


submit_register = () => {
    let value_user = document.getElementById('username');
    let value_email = document.getElementById('email');
    let value_passw = document.getElementById('passw');
    let value_passw2 = document.getElementById('passw2');
    json.user = value_user.value;
    json.email = value_email.value;
    json.passw = value_passw.value;
    json.passw2 = value_passw2.value;
    
    let data = JSON.stringify({
                                "user": json.user , 
                                "email": json.email,
                                "passw": json.passw,
                                }
                                )
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqRegister)
    req.open("POST", "http://localhost:3000/api/auth/", false);
    req.send(data)
}

logeado = () => {
    console.log("LOGEADO")
    localStorage.setItem("USER", btoa(json.user));
    window.location.href = "../game/snake_game.html"
}

no_logeado = () => {
    console.log("NO LOGEADO")
}