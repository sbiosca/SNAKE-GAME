levels_classic = (scored) => { //IN THIS function apply a switch case to push differents level. IF score is 2, 4, 5... the velocity augment
    //and the game is more difficult
    console.log(scored);

    switch (scored) {
        case 2:
            snake_state.velocity = 110;
            break;
        case 4:
            snake_state.velocity = 100;
            break;
        case 5:
            snake_state.velocity = 85;
            break;
        case 7:
            snake_state.velocity = 80;
            break;
        case 8:
            snake_state.velocity = 75;
            break;
        case 9:
            snake_state.velocity = 50;
            break;
        case 10:
            snake_state.velocity = 40;
            break;
        case 18:
            snake_state.velocity = 20;
            break;
        default:
            break;
    }
}
