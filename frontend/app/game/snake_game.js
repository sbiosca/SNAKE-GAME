/**
 AUTHOR: SERGI BIOSCA BENEYTO, 2DAW
 */
const CONTROL_GAME = { //KEYBOARD CONTROL GAME
    'W': [-1 , 0],
    'S': [1, 0],
    'A': [0, -1],
    'D': [0, 1],
    'w': [-1 , 0],
    's': [1, 0],
    'a': [0, -1],
    'd': [0, 1],
    '8': [-1 , 0],
    '4': [0, -1],
    '6': [0, 1],
    '2': [1, 0]
}
const run_game = 1; //GAME
const size = 10; //SIZE SNAKE
const board1 = 40; //WIDTH TABLERO
const board2 = 40; //HEIGHT TABLERO
const length_snake = 2; //LENGTH SNAKE
const music_score = new Audio('../../assets/sound/mordisco.mp3'); //DECLARE music when the user get a new score, play this audio
const music_colision = new Audio('../../assets/sound/sfx-horror10.mp3'); //DECLARE music colision, when the user colision with snake, play this audio to game over
const music_dir = new Audio("../../assets/sound/game.mp3"); //DECLARE music direction, when the user change the direction with snake, play this audio 
let scored = -1; //PUNTUATION BEGIN -1
let snake_state = { //snake_state, define the values of snake, ball, direction, velocity...
    ball: [{x: 0, y: 0}],
    direction: {x: 1, y: 0},
    chan: {x: 0, y: 0}, //direction ball aliment
    chan1: {x1: 0, y1: 0}, //direction ball colision
    state: 0,
    runSnake: run_game,
    velocity: 120,
    level: "",
    url_map: "",
    random_direction: ""
}

//FUNCTION RANDOM NUMBER, choose a random number in the board
random_number = (key) => {
    switch (key) {
        case 1:
            //return parseInt(Math.random() * board1) + "_" +parseInt(Math.random() * board2);
            return {
                x: parseInt(Math.random() * board1),
                y: parseInt(Math.random() * board2)
            };
            
        case 2:
            return {
                x1: parseInt(Math.random() * board1),
                y1: parseInt(Math.random() * board2)
            };
            
        default:
            break;
    }
}


//FUNCTION GAME_SNAKE, this function have
game_snake = async () => {
    const headds = snake_state.ball[0]; //DECLARED THE VARIABLE headds, to define ball direction.
    const dirx = snake_state.direction.x; //DECLARED THE VARIABLE dirx, to define direction X in the board canvas.
    const diry = snake_state.direction.y; //DECLARED THE VARIABLE diry, to define direction Y in the board canvas.
    let sum = {}; //DECLARED THE VARIABLE sum
    let interval = snake_state.velocity; //DECLARED THE VARIABLE interval, to define snake velocity

    let score = (
        headds.x === snake_state.chan.x && headds.y === snake_state.chan.y  //THIS DECLARED score, WHEN THE SNAKE DIRECTION IS THE SAME THAN THE DIRECTION OF THE BALL. (SNAKE EAT A BALL) 
    );

    if (snake_state.runSnake === run_game) {  //IF THE GAME IS ON:
        for (let i = snake_state.ball.length - 1; i > -1; i--) { //DECLARE A BUCLE FOR TO 
            const sst = snake_state.ball[i];
            if (i !== 0) {
                sst.x = snake_state.ball[i - 1].x;
                sst.y = snake_state.ball[i - 1].y;
            }else {
                sst.x += dirx;
                sst.y += diry;
            }
        }
    }

    if (colision() || blocks()) { //IF THE SNAKES TOUCHES THE WALL, COLISION()
        //IF HAVE LOCALSTORAGE(the user muted the music on the icon), THE AUDIO IS MUTED.
        if (localStorage.getItem("MUTED")) {
            music_colision.pause();
        }else { //IF NOT HAVE LOCALSTORAGE(the user want audio in game), THE AUDIO ISN'T MUTED.
            music_colision.play();
        }
        
        let record = document.getElementById('puntuation_later'); //NEW_SCORE TO PRINT 
        let puntuation = document.getElementById('puntuation2'); //ACTUAL PUNTUATION
        let new_score = puntuation.textContent; //SELECT THE ACTUAL PUNTUATION
        let old_score = localStorage.getItem('SCORED'); //GET IN LOCALSTORAGE OLD_SCORE
        //window.alert(old_score)
        snake_state.state = 0; //STATE SNAKE NOW IS 0
        snake_state.runSnake = 0; //SNAKE NOW IS 0, BECAUSE THE SNAKE DIE
        snake_state.chan = 0; //CHANGE SNAKE 0


        if (new_score > old_score) { //IF OLD_SCORE IS SMALLER THAN NEW_SCORE ENTER IN THIS FUNCTION TO AUGMENT THE PUNTUATION IN THE SCOREBOARD
            localStorage.removeItem('SCORED'); //REMOVE THE OLD_SCORE IN LOCALSTORAGE
            record.innerHTML = "RECORD:"+new_score; //PRINT THE NEW_SCORE TOP, IN THE SCOREBOARD
            localStorage.setItem('SCORED', new_score); //PUT THE NEW_SCORE IN LOCALSTORAGE
        }
        let canvas = document.getElementById('miCanvas'); //SELECT THE CANVAS ELEMENT
        canvas.style.backgroundImage = 'url(../../assets/images/game_over.jpg)'; //PUT THE BACKGROUND OF BOARD THE GAME OVER TO END GAME
        
        setTimeout (() => { //PUT TIMEOUT of 5 seconds TO STOP GAME
            stop_game();
        },2000)

        console.log("OLD SCORE: " + old_score + ", NEW SCORE: " + new_score );
    }



    if (score) { //IF THE VARIABLE SCORE IS TRUE(the snake eat 1 ball more) INTO THE FUNCTION
        //IF HAVE LOCALSTORAGE(the user muted the music on the icon), THE AUDIO IS MUTED.
        if (localStorage.getItem("MUTED")) {
            music_score.pause(); 
        }else { //IF NOT HAVE LOCALSTORAGE(the user want audio in game), THE AUDIO ISN'T MUTED.
            music_score.play(); 
        }
       
        snake_state.state = length_snake; //NOW THE LENGTH SNAKE IS THE SAME THAN state (to augment length)
        snake_state.chan = random_number(1);//VARIABLE CHAN TO RANDOM NUMBER, TO BALL APPEAR IN ANOTHER PLACE OF THE BOARD
        snake_state.chan1 = random_number(2);

        //CHECK THE BALL ISN´T THE SAME POSITION WITH BLOCKS
        //const direction_obj = JSON.stringify(snake_state.chan);
        const direction_parse = JSON.parse(JSON.stringify(snake_state.chan));
        snake_state.random_direction = direction_parse.x + "_" + direction_parse.y;

        console.log(snake_state.chan1);
        let puntuation = document.getElementById('puntuation2'); //GET THE PUNTUATION ACTUAL TO AUGMENT THE NEW SCORE +1
        scored++; //AUGMENT SCORED +1
        puntuation.innerHTML = scored; //PRINT THE NEW SCORE IN THE BOARD
        //console.log(snake_state.level);
        if (snake_state.level === "CLASSIC") {
            levels_classic(scored); 
        }else if(snake_state.level === "ADVANCED") {
            levels_adv(scored); 
        }else if (snake_state.level === "PRO") {
            levels_pro(scored, snake_state.url_map);
            blocks();    
        }

         //CALL THE FUNCTION LEVEL IN THE NEW PUNTUATION TO PASS THE LEVEL AND THE GAME IS MORE
    }

    if (snake_state.state > 0) { //THIS FUNCTION USE FOR TO AUGMENT THE LENGTH WHEN SNAKE EAT NEW BALL
        snake_state.ball.push(sum); //PUSH A NEW TAIL TO SNAKE
        snake_state.state -= 1; //SUM ONLY 1 BALL TAIL IN SNAKE
    }  
    window.requestAnimationFrame(square_draw); //FUNCTION requestAnimationFrame, to move the game
    setTimeout(game_snake, interval);
    
}

colision = () => { //FUNCTION COLISION, when the SNAKE touch the wall
    const head = snake_state.ball[0]; //NOW const HEAD is the direcction ball
    let i = 1;
    let number_snake = head.y +"_"+ head.x;
    let number_block = snake_state.chan1.y1 + "_" + snake_state.chan1.x1;
    if (head.y >= board2 || head.y < 0 || head.x < 0 || head.x >= board1) { //IF directions x and y are less or same than 0
        return true;
    }
    
    if (number_snake === number_block) {
        return true;
    }

    while (i < snake_state.ball.length) { //Bucle while length ball, depend direction return true or false
        const ssn = snake_state.ball[i];

        if (ssn.x === head.x && ssn.y === head.y) {
            return true;
        }
        i++;
    }
    return false;
}

snake_draw = (color, x, y) => { //Append the color with canvas to snake and the ball. And apply the size with snake in the directions
    snake_state.context.fillStyle = color;
    snake_state.context.fillRect(
        y * size,
        x * size,
        size,
        size
    );
}

square_draw = () => { //draw square.
    let i = 0;
    snake_state.context.clearRect(0, 0, 500, 500); //Apply the context(canvas draw) different dimensions
        
    while (i< snake_state.ball.length) { //WHILE the snake.length is greater than 0, print the snake in the direction corresponding and with color blue.
        const {x, y} = snake_state.ball[i];
        i++;
        snake_draw("blue", x, y);
        console.log(x,y)
    }
    const {x, y} = snake_state.chan;
    snake_draw("red", x, y);
    
    const {x1, y1} = snake_state.chan1;
    snake_draw("black", x1, y1);//Print ball red
    
}

stop_game = () => { //stop game, reload the page and the game is stop
    location.reload();
    localStorage.removeItem("MUTED");
}

reset_game = () => {//Reset game, remove the items of localstorage and reload the page
    localStorage.removeItem('SCORED');
    localStorage.removeItem("MUTED");
    location.reload();
}

stop_music = () => { //stop music, depend if icon music is muted or not muted, the music is stop or play
    let image = document.getElementById("audio");
    console.log(image.src);
    if (image.src === "https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg") {
            image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mute_Icon.svg/800px-Mute_Icon.svg.png"; //MUTED ICON
            localStorage.setItem("MUTED", "muted"); //IF audio is muted, I push localstorage the audio is muted
            console.log("AUDIO PAUSED");
    }else {
            localStorage.removeItem("MUTED"); //IF audio is not muted, I remove localstorage
            image.src = "https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg" //AUDIO ICON
            
    }
}

show_infor = () => { //If the user click show infor, the display is visible
    let display_infor = document.getElementById("infor");
    display_infor.style.display = "";
}

display = () => { //Display disponible in the game
    let user = document.getElementById('username1');
    let display_board = document.getElementById("PLAY_GAME");
    display_board.style.display = "none";
    let display_infor = document.getElementById("infor");
    display_infor.style.display = "none";
    console.log(snake_state.level)
    if (snake_state.level === ""){
        document.getElementById('start').disabled = true;
        document.getElementById('validation').style.display = "";
    }else {
        document.getElementById('start').disabled = false;
        document.getElementById('validation').style.display = "none";
    }
    console.log(user.textContent)
    if (user.textContent == 0) {
        document.getElementById('start').disabled = true;
    }
    //blocks();
}

choose_map = async (type) => { //To choose the map, the user can choose the map in different photos or url files
    switch (type) {
        case 1:
            let map = document.getElementById('mapa1');
            let bcg = document.getElementById('miCanvas');
            let lev = document.getElementById('level');
            bcg.style.backgroundImage = 'url("'+map.src+'")';
            snake_state.level = "CLASSIC";
            lev.innerHTML = "LEVEL: "+ snake_state.level;
            display();
            break;
        case 2:
            let map1 = document.getElementById('mapa2');
            let bcg1 = document.getElementById('miCanvas');
            let lev1 = document.getElementById('level');
            bcg1.style.backgroundImage = 'url("'+map1.src+'")';
            snake_state.level= "ADVANCED";
            lev1.innerHTML = "LEVEL: "+ snake_state.level;
            display();
            break;
        case 3:
            let lev2 = document.getElementById('level');
            let map2 = document.getElementById('mapa3');
            snake_state.level= "PRO";
            snake_state.url_map = map2.src;
            lev2.innerHTML = "LEVEL: "+ snake_state.level;
            display();
            map_pro(map2.src);

            break;
        default:
            break;
    }   
    
}

start_game = () => { //FUNCTION START GAME, get differents elemnt to apply changes of the game (score, display, user...)
    // let username = document.getElementById("username");
    // let insert = document.getElementById("insert_user");
    let display_user = document.getElementById("USER");
    let display_login = document.getElementById("LOGIN");
    let score = localStorage.getItem('SCORED');
    let record = document.getElementById('puntuation_later');
    let display_board = document.getElementById("PLAY_GAME");
    
    display_user.style.display = "none";
    display_login.style.display = "none";
    // username.innerHTML = "PLAYER: "+ insert.value;
    
    
    
    if (score > 0) { //IN THE LOCALSTORAGE there are the old score, if this score is greater than 0, print score
        record.innerHTML = "RECORD:"+score;
    }
    snake_state.canvas = document.querySelector('canvas'); //SELECT canvas tu variable snake.state canvas
    snake_state.context = snake_state.canvas.getContext('2d');
    display_board.style.display = "";

    window.onkeydown = (e) => { //keyboard control game
        const direction = CONTROL_GAME[e.key];
        console.log(direction);
        //IF HAVE LOCALSTORAGE(the user muted the music on the icon), THE AUDIO IS MUTED.
        if (localStorage.getItem("MUTED")) {
            music_dir.pause();
        }else { //IF NOT HAVE LOCALSTORAGE(the user want audio in game), THE AUDIO ISN'T MUTED.
            music_dir.play();
        }
        if (direction) { //IF direction is true, apply the changes depend whit control and the snake moves to left,right,down or top
            const [x, y] = direction;
            if (-x !== snake_state.direction.x && -y !== snake_state.direction.y) {
                snake_state.direction.x = x;
                snake_state.direction.y = y;
            }
        }
    }
    game_snake();
}

login = () => {
    let user = document.getElementById('username1');
    let username = localStorage.getItem("USER")
    let form = document.getElementById('form')
    let logout = document.getElementById('form_logout')
    if (username) {
        form.style.display = "none";
        logout.style.display = ""
        let name = atob(username);
        user.innerHTML = name;
    }
}

logout = () => {
    localStorage.removeItem("USER")
}

//CALL TWO FUNCTIONS
choose_map();
display();
login();