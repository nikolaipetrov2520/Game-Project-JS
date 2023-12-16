function elementDirection(state, elementState){
    let direction = Math.round(Math.random() * 7);
    let dir = '';
    let states = '';
    if(elementState == 'captan'){
        states = state.captanStats;
    }else if(elementState == 'ironBig'){
     
        states = state.ironBigStats;
    }
    switch(direction){
    case 0: dir = 'left';
        break;
    case 1:dir = 'right';
        break;
    case 2:dir = 'up';
        break;
    case 3:dir = 'down';
        break;
    case 4:dir = 'leftUp';
        break;
    case 5:dir = 'leftDown';
        break;
    case 6:dir = 'rightUp';
        break;
    case 7:dir = 'rightDown';
        break;
    }
    if(states.up && (dir == 'up' || dir == 'leftUp' || dir == 'rightUp')){
        dir = elementDirection(state, elementState);
    }
    if(states.down && (dir == 'down' || dir == 'leftDown' || dir == 'rightDown')){
        dir = elementDirection(state, elementState);
    }
    if(states.left && (dir == 'left' || dir == 'leftUp' || dir == 'leftDown')){
        dir = elementDirection(state, elementState);
    }
    if(states.right && (dir == 'right' || dir == 'rightUp' || dir == 'rightDown')){
        dir = elementDirection(state, elementState);
    }
    return dir;
}

function modifyWizardPosition(state, game) {
    const { wizard } = state;

    if (state.keys.KeyA || state.keys.ArrowLeft) {
        wizard.posX = Math.max(wizard.posX - wizard.speed, 0);
    }

    if (state.keys.KeyS || state.keys.ArrowDown) {
        wizard.posY = Math.min(wizard.posY + wizard.speed, game.gameScreen.offsetHeight - wizard.height);
    }

    if (state.keys.KeyD || state.keys.ArrowRight) {
        wizard.posX = Math.min(wizard.posX + wizard.speed, game.gameScreen.offsetWidth - wizard.width);
    }

    if (state.keys.KeyW || state.keys.ArrowUp) {
        wizard.posY = Math.max(wizard.posY - wizard.speed, 0);
    }
}