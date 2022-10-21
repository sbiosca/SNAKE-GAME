let state_number = {
    num: 0,
    direction: Array()
}
levels_pro = (scored, map=undefined) => { //IN THIS function apply a switch case to push differents level. IF score is 2, 4, 5... the velocity augment
    //and the game is more difficult
    console.log(scored);

    switch (scored) {
        case 2:
            snake_state.velocity = 110;
            map_pro(map);
            break;
        case 4:
            snake_state.velocity = 100;
            map_pro(map);
            break;
        case 5:
            snake_state.velocity = 85;
            break;
        case 7:
            snake_state.velocity = 80;
            break;
        case 8:
            snake_state.velocity = 75;
            map_pro(map);
            break;
        case 9:
            snake_state.velocity = 50;
            break;
        case 10:
            snake_state.velocity = 40;
            break;
        case 15:
            snake_state.velocity = 25;
            map_pro(map);
            break;
        case 18:
            snake_state.velocity = 20;
            break;
        case 25:
            snake_state.velocity = 10;
            map_pro(map);
            break;
        default:
            break;
    }
}

map_pro = (url) => {
    //file:///C:/Users/USUARIO/Desktop/2DAW/FRONTEND/JUEGO%20SNAKE/frontend/assets/images/pro/fondo3_pro.jpg
    state_number.num = random_n();
    let prueba = url.slice(0, -4) + state_number.num +"." + url.slice(-3);
    //let prueba = url.slice(0, -4) + "1." + url.slice(-3);
    let bcg2 = document.getElementById('miCanvas');
    bcg2.style.backgroundImage = 'url("'+prueba+'")';
    console.log(state_number.num)
}

random_n = () => {
    return parseInt(Math.random() * 5);
} 

blocks = () => {
    const position_array = Array();
    console.log("level_pro")
    if (state_number.num === 0) {
        //MAPA 1
        position_array.push("13_8", "13_9", "14_9", "14_8","15_9","15_8",
                            "20_26", "20_27", "20_28", "21_26","21_27", "21_28"
                            ,"22_26", "22_27", "22_28")
    }else if(state_number.num === 1) {
        //MAPA 2
        position_array.push("10_7","11_7","12_7","10_8","11_8","12_8", "24_2", 
                            "25_2", "26_2", "24_3", "25_3", "26_3"  ,"27_34", 
                            "28_34", "29_34", "27_35", "28_35", "29_35", "4_31"
                            , "5_31", "6_31", "4_32", "5_32", "6_32")
    }else if(state_number.num === 2) {
        //MAPA 3
        position_array.push("3_6","4_6","5_6","3_7","4_7","5_7", "1_20", "2_20",
                            "3_20", "1_19", "2_19", "3_19", "2_28", "3_28", "4_28",
                            "2_29", "3_29", "4_29", "15_31", "16_31", "17_31",
                            "15_32", "16_32", "17_32", "20_31", "21_31", "22_31",
                            "20_32", "21_32", "22_32", "26_35", "27_35", "28_35",
                            "26_36", "27_36", "28_36", "32_20","33_20", "34_20",
                            "32_21","33_21", "34_21", "36_33", "37_33", "38_33",
                            "36_34", "37_34", "38_34", "36_8", "37_8", "38_8",
                            "36_9", "37_9", "38_9", "25_6", "26_6", "27_6",
                            "25_7", "26_7", "27_7", "17_4", "18_4", "19_4",
                            "17_5", "18_5", "19_5", "11_10", "12_10", "13_10",
                            "11_11", "12_11", "13_11", "17_22", "18_22", "19_22",
                            "17_23", "18_23", "19_23")
    }else if(state_number.num === 3) {
        //MAPA 4
        position_array.push("3_5","4_5","2_6","3_6","4_6","5_6", "3_7", "4_7",
                            "5_7", "4_28", "5_28", "6_28", "7_28", "5_27", "6_27",
                            "5_29", "6_29", "7_29", "16_29", "17_29", "15_30", "16_30", 
                            "17_30", "18_30", "27_34", "28_34", "29_34", "27_35", "28_35"
                            ,"29_35","27_36", "28_36", "29_36", "33_27", "34_27", "35_27",
                            "33_28", "34_28", "35_28", "33_1", "34_1", "35_1",
                            "33_2", "34_2", "35_2", "33_3", "34_3", "35_3", "33_13", "34_14", "35_15",
                            "33_13", "34_14", "35_15", "33_13", "34_14", "35_15", "16_7","17_7"
                            ,"18_7", "19_7", "16_8","17_8" ,"18_8", "19_8", "9_13", "10_13", "11_13"
                            ,"12_13", "9_14", "10_14", "11_14" ,"12_14", "11_12", "10_12", "23_19"
                            ,"24_19", "25_19", "26_19", "23_20" ,"24_20", "25_20", "26_20")
    }else if(state_number.num === 4) {
        //MAPA 5
        position_array.push("2_12", "3_12", "4_12", "2_13", "3_13", "4_13", "3_25", "4_25", "5_25",
                            "3_26", "4_26", "5_26", "3_27", "4_27", "5_27", "3_28", "4_28", "5_28",
                            "17_30", "18_30", "19_30", "17_31", "18_31", "19_31", "28_28", "29_28", "30_28",
                            "28_29", "29_29", "30_29", "28_30", "29_30", "30_30", "35_35", "36_35", "37_35"
                            ,"35_36", "36_36", "37_36", "35_37", "36_37", "37_37", "32_3", "33_3", "34_3",
                            "35_3", "32_4", "33_4", "34_4", "35_4", "32_5", "33_5", "34_5", "35_5", "28_18",
                            "29_18", "30_18", "31_18", "28_19", "29_19", "30_19", "31_19", "10_17", "11_17",
                            "12_17", "13_17", "10_18", "11_18", "12_18", "13_18", "23_5", "24_5", "25_5", 
                            "23_6", "24_6", "25_6", "23_7", "24_7", "25_7", "8_6", "9_6", "10_6", "11_6",
                            "8_7", "9_7", "10_7", "11_7")
    }
       
    let snake = snake_state.ball[0];
    let died = snake.x + "_" + snake.y;
    for (let i = 0; i < position_array.length; i++) {
        //IF THE POSITION OF SNAKE IS THE SAME THAN POSITION OF THE BLOCK, RETURN TRUE TO COLISION
        //AND ALWAYS THE LEVEL IS PRO
        if (died === position_array[i] && snake_state.level === "PRO") {
            return true;
        }

        //CHECK THE BALL ISN´T THE SAME POSITION WITH BLOCKS
        if (snake_state.random_direction === position_array[i]) {
            //window.alert("PEPE");
            snake_state.chan = random_number(1);
            snake_state.random_direction = snake_state.chan;
        }
    }
    state_number.direction = position_array; 
    
}
