let json = {
    id: "",
    user: "",
    email: "",
    passw: "",
    passw2: "",
    avatar: "",
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
            localStorage.setItem("USERS", btoa(JSON.stringify(value)))
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
    let error = document.getElementById('user_exists');
    
    if (this.responseText === "false") {      
        console.log(this.responseText);  
        error.style.display = ""
    }else {
        error.style.display = "none"
        //api_avatar()
        //logeado()
        location.reload();
        alert("YA PUEDES INICIAR SESION")
    }
}

function reqPut() {
    console.log(this.responseText);
}

function reqApi() {
    //console.log(this.responseText);
    let data = JSON.parse(this.responseText)
    //console.log(data.results[0].picture.large)
    let value = data.results[0].picture.large;
    json.avatar = value;
    
}

function reqData() {
    const value = JSON.parse(this.responseText)
    for (let i = 0; i < value.length; i++) {
        localStorage.removeItem("USERS")
        localStorage.setItem("USERS", btoa(JSON.stringify(value)))
    }
}
submit_login = () => {
    let value_email = document.getElementById('user');
    let value_passw = document.getElementById('passw');
    json.user = value_email.value;
    json.passw = value_passw.value;
    
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener)
    req.open("GET", "http://localhost:3000/api/auth/");
    //req.open("GET", "http://192.168.1.26:3000/api/auth/");
    req.send()
}


submit_register = () => {
    let value_email = document.getElementById('email');
    if (ValidateEmail(value_email)) {
        let error = document.getElementById('error_email1');
        let value_user = document.getElementById('username');
        let value_email = document.getElementById('email');
        let value_passw = document.getElementById('passw1');
        let value_passw2 = document.getElementById('passw2');
        error.style.display = "none"
        json.user = value_user.value;
        json.email = value_email.value;
        json.passw = value_passw.value;
        json.passw2 = value_passw2.value;
        json.score = 0;
    
        let data = JSON.stringify({
                                    "user": json.user , 
                                    "email": json.email,
                                    "passw": json.passw,
                                    "passw2": json.passw2,
                                    "score": json.score
                                    })
        
        if (json.passw != json.passw2) {
            let error = document.getElementById('error_register1');
            error.style.display = "";
        }else {
            const req = new XMLHttpRequest();
            req.addEventListener("load", reqRegister)
            req.open("POST", "http://localhost:3000/api/auth/", false);
            //req.open("POST", "http://192.168.1.26:3000/api/auth/", false);
            req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            req.send(data);
        }                            
        console.log(data);
    }else {
        let error = document.getElementById('error_email1');
        error.style.display = ""
    }
    
}

update_score = (value) => {
    let data = JSON.stringify({
        "id": value.id,
        "score": value.score
    })
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqPut)
    req.open("PUT", "http://localhost:3000/api/auth/", false);
    //req.open("PUT", "http://192.168.1.26:3000/api/auth/", false);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send(data);
}

update_data = () => {
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqData)
    req.open("GET", "http://localhost:3000/api/auth/");
    //req.open("GET", "http://192.168.1.26:3000/api/auth/");
    req.send()
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
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqApi)
    req.open("GET", "https://randomuser.me/api/");
    req.send()
}

function ValidateEmail(mail) {
 if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail.value)){
    return (true)
  }else {
    return (false)
  }
    
}

update_data();
api_avatar();