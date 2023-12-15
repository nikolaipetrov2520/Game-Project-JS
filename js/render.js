function renderBugExplosions(){
    let bugExplosionElement = document.querySelectorAll('.bugExplosion');

    bugExplosionElement.forEach(bugExplosion => {
        let explosionWidth = parseInt(bugExplosion.style.width);
        let explosionHeight = parseInt(bugExplosion.style.width);
        let explosionTop = parseInt(bugExplosion.style.top);
        let explosionLeft = parseInt(bugExplosion.style.left);
        let opacity = parseFloat(bugExplosion.style.opacity) - 0.1;
        if(opacity <= 0.01){
            bugExplosion.remove();          
        }
        else if(opacity <= 0.05){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.01;

        }
        else if(opacity <= 0.2){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.03;
        }

        bugExplosion.style.width = explosionWidth + 15 + 'px';
        bugExplosion.style.height = explosionHeight + 15 + 'px';
        bugExplosion.style.top = explosionTop - 7 + 'px';
        bugExplosion.style.left = explosionLeft - 7 + 'px';
        bugExplosion.style.opacity = opacity.toString();
    });
}

function renderBugPoints(){
    let bugExplosionElement = document.querySelectorAll('.bugPoints');

    bugExplosionElement.forEach(bugExplosion => {
        let explosionTop = parseInt(bugExplosion.style.top);
        let explosionLeft = parseInt(bugExplosion.style.left);
        let opacity = parseFloat(bugExplosion.style.opacity) - 0.02;

        if(opacity <= 0.01){
            bugExplosion.remove();          
        }
        else if(opacity <= 0.05){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.008;
        }
        else if(opacity <= 0.2){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.03;
        }
        bugExplosion.style.top = explosionTop - 4 + 'px';
        bugExplosion.style.left = explosionLeft - 1 + 'px';
        bugExplosion.style.opacity = opacity.toString();
    });
}

function renderHeartPoints(){
    let bugExplosionElement = document.querySelectorAll('.heartPoints');

    bugExplosionElement.forEach(bugExplosion => {
        let explosionTop = parseInt(bugExplosion.style.top);
        let explosionLeft = parseInt(bugExplosion.style.left);
        let opacity = parseFloat(bugExplosion.style.opacity) - 0.02;

        if(opacity <= 0.01){
            bugExplosion.remove();          
        }
        else if(opacity <= 0.05){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.008;
        }
        else if(opacity <= 0.2){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.03;
        }
        bugExplosion.style.top = explosionTop - 4 + 'px';
        bugExplosion.style.left = explosionLeft - 1 + 'px';
        bugExplosion.style.opacity = opacity.toString();
    });
}

function renderWizardExplosion(){
    let bugExplosionElement = document.querySelectorAll('.wizardExplosion');

    bugExplosionElement.forEach(bugExplosion => {
        let explosionWidth = parseInt(bugExplosion.style.width);
        let explosionHeight = parseInt(bugExplosion.style.width);
        let explosionTop = parseInt(bugExplosion.style.top);
        let explosionLeft = parseInt(bugExplosion.style.left);
        let opacity = parseFloat(bugExplosion.style.opacity) - 0.2;
        if(opacity <= 0.01){
            bugExplosion.remove();          
        }
        else if(opacity <= 0.05){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.005;
        }
        else if(opacity <= 0.2){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.01;
        }
        else if(opacity <= 0.3){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.02;
        }

        bugExplosion.style.width = explosionWidth + 100 + 'px';
        bugExplosion.style.height = explosionHeight + 100 + 'px';
        bugExplosion.style.top = explosionTop - 50 + 'px';
        bugExplosion.style.left = explosionLeft - 50 + 'px';
        bugExplosion.style.opacity = opacity.toString();
    });
}

function renderWizardHelthy(){
    let bugExplosionElement = document.querySelectorAll('.wizardHelthy');

    bugExplosionElement.forEach(bugExplosion => {
        let explosionWidth = parseInt(bugExplosion.style.width);
        let explosionHeight = parseInt(bugExplosion.style.width);
        let explosionTop = parseInt(bugExplosion.style.top);
        let explosionLeft = parseInt(bugExplosion.style.left);
        let opacity = parseFloat(bugExplosion.style.opacity) - 0.1;
        if(opacity <= 0.01){
            bugExplosion.remove();          
        }
        else if(opacity <= 0.05){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.01;

        }
        else if(opacity <= 0.2){
            opacity = parseFloat(bugExplosion.style.opacity) - 0.02;
        }

        bugExplosion.style.width = explosionWidth + 40 + 'px';
        bugExplosion.style.height = explosionHeight + 40 + 'px';
        bugExplosion.style.top = explosionTop - 20 + 'px';
        bugExplosion.style.left = explosionLeft - 20 + 'px';
        bugExplosion.style.opacity = opacity.toString();
    });
}

function renderClouds(){
    let cloudElement = document.querySelectorAll('.cloud');
    cloudElement.forEach(cloud => {
        let posX = parseInt(cloud.style.left);

        if (posX + state.cloudStats.width > 0) {
            cloud.style.left = posX - state.cloudStats.speed + 'px';
        } else {
            cloud.remove();
        }
    });
}

function renderTree1(){
    let tree1Element = document.querySelectorAll('.tree1');
    tree1Element.forEach(tree1 => {
        let posX = parseInt(tree1.style.left);

        if (posX + state.tree1Stats.width > 0) {
            tree1.style.left = posX - state.tree1Stats.speed + 'px';
        } else {
            tree1.remove();
        }
    });
}

function renderTree2(){
    let tree2Element = document.querySelectorAll('.tree2');
    tree2Element.forEach(tree2 => {
        let posX = parseInt(tree2.style.left);

        if (posX + state.tree2Stats.width > 0) {
            tree2.style.left = posX - state.tree2Stats.speed + 'px';
        } else {
            tree2.remove();
        }
    });
}

function renderIronMen(state, wizardElement){

    let bugElements = document.querySelectorAll('.bug');
    bugElements.forEach(bug => {
        let posX = parseInt(bug.style.left);

        // Detect collision with wizard
        if (detectCollision(wizardElement, bug) && state.healthInterval <= 0) {
            state.isShoted = true;
            state.wizard.health -= 10;
            state.healthInterval = 200;
            bug.remove();
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }
        if (posX > 0) {
            bug.style.left = posX - state.bugStats.speed + 'px';
        } else {
            bug.remove();
        }
    });
}

function renderSpear(state, wizardElement){
    let spearElements = document.querySelectorAll('.spear');
    let isSpareColision = false;
    spearElements.forEach(spear => {
        let posY = parseInt(spear.style.top);

        // Detect collsion with wizard
        if (detectCollision(wizardElement, spear) && state.healthInterval <= 0) {
            state.isShoted = true;
            state.wizard.health -= 7;
            isSpareColision = true;
            state.healthInterval = 200;
            spear.remove();
            spearTime = 0;
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }     
        }
        if (!isSpareColision) {
            if (posY > game.gameScreen.offsetHeight / 7 * 5 && !state.spearStats.isUp) {
                spear.style.top = posY - state.spearStats.speed * 2 + 'px';
            } else {
                state.spearStats.isUp = true;
                if (posY < game.gameScreen.offsetHeight) {
                    spear.style.top = posY + state.spearStats.speed * 2 + 'px';
                } else {
                    spear.remove();
                    spearTime = 0;
                }
            }
        } else {
            if (posY < game.gameScreen.offsetHeight) {
                spear.style.top = posY + state.spearStats.speed * 2 + 'px';
            }else {
                spear.remove();
                spearTime = 0;
                isSpareColision = false;
            }
        }
    });
}   
function renderHeart(state, wizardElement){
    let heartElements = document.querySelectorAll('.heart');
    heartElements.forEach(heart => {
        let posY = parseInt(heart.style.top);
        // if(isPoint){
        //     pointAdd(heart, state.heartStats.addHealth);
        // }
        // Detect collsion with heart
        if (detectCollision(wizardElement, heart)) {
            animateWizardHealthy(heart, game, state);
            state.wizard.health += state.heartStats.addHealth;
            isPoint = true;
            heart.remove();
            state.heartCount++;
            isGetHearth = true;
            if (state.wizard.health > 100) {
                state.wizard.health = 100;
            }
        }
        if (posY > 0) {
            heart.style.top = posY - state.heartStats.speed + 'px';
        } else {
            heart.remove();
        }
    });
}

function renderDiamond(state, wizardElement){
    let diamondElements = document.querySelectorAll('.diamond');
    diamondElements.forEach(diamond => {
        let posY = parseInt(diamond.style.top);

        // Detect collsion with heart
        if (detectCollision(wizardElement, diamond)) {
            // state.wizard.health+=state.heartStats.addHealth;
            animateWizardDiamond(diamond, game, state);
            diamond.remove();
            state.diamondCount++;
        }
        if (posY < game.gameScreen.offsetHeight) {
            diamond.style.top = posY + state.diamondStats.speed + 'px';
        } else {
            diamond.remove();
        }
    });
}
