let json = {
    id: "",
    user: "",
    email: "",
    passw: "",
    passw2: "",
    avatar: "https://avatars.dicebear.com/api/adventurer/your-custom-se.svg",
    score: ""
}


function reqListener(){
    const value = JSON.parse(this.responseText)
    for (let i = 0; i < value.length; i++) {
        console.log(json.passw)
        if ((json.user === value[i].user) && (json.passw === value[i].passw)) {
            json.id = value[i]._id;
            json.score = value[i].score;
            //json.avatar = value[i].avatar;
            //console.log(value[i])
            logeado();
            return true;
        }else {
            console.log("USER NOT EXISTS");
            setTimeout(()=> {
                no_logeado()
            },300) 
            
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
    let value_passw = document.getElementById('passw1');
    let value_passw2 = document.getElementById('passw2');
    json.user = value_user.value;
    json.email = value_email.value;
    json.passw = value_passw.value;
    json.passw2 = value_passw2.value;
    
    let data = JSON.stringify({
                                "user": json.user , 
                                "email": json.email,
                                "passw": json.passw,
                                "passw2": json.passw2,
                                })
    
    if (json.passw != json.passw2) {
        let error = document.getElementById('error_register1');
        error.style.display = "";
    }else {
        const req = new XMLHttpRequest();
        req.addEventListener("load", reqRegister)
        req.open("POST", "http://localhost:3000/api/auth/", false);
        req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        req.send(data);
    }                            
    console.log(data);
}

update_score = (value) => {
    let data = {
        "_id": value.id,
        "score": value.score
    }
    // const req = new XMLHttpRequest();
    // req.addEventListener("load", reqRegister)
    // req.open("PUT", "http://localhost:3000/api/auth/", false);
    // req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // req.send(data);
}

logeado = () => {
    console.log("LOGEADO")
    localStorage.setItem("USER", btoa(JSON.stringify(json)));
    window.location.href = "../game/snake_game.html"
}

no_logeado = () => {
    console.log("NO LOGEADO")
    let error = document.getElementById('error_login');
    error.style.display = "";
}

api_avatar = () => {

}

api_avatar();