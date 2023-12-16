function renderWizard(state, game, wizardElement){
    wizardElement.style.left = state.wizard.posX + 'px';
    wizardElement.style.top = state.wizard.posY + 'px';

    if (state.isShoted) {
        animateWizardExplosion(wizardElement, game, state);
        state.isShoted = false;
    }

    if (state.gameOver) {
        gameOver();
    }
    else if (state.gameWin) {
        gameWin();
    } else {
        state.score += state.scoreRate;
        window.requestAnimationFrame(gameLoop.bind(null, state, game));
    }

    if (state.level > state.previousLevel) {
        state.isBlink = true;
        levelCounter--;
        scoreScreenBlink(state, "#1ae41ae0", game.scoreScreen, levelCounter);
        if (levelCounter <= 0) {
            state.previousLevel = state.level;
            game.createLevel(state);
            state.isBlink = false;
        }
    } else {
        if (!state.isBlink) {
            levelCounter = 100;
        }
    }
    state.healthInterval--;
    if (state.healthInterval >= 100) {
        state.isBlink = true;
        healthCounter--;
        scoreScreenBlink(state, "#e61a1ac9", game.healthScreen, healthCounter);
        wizardBlink(state, wizardElement);
        if (healthCounter <= 0) {
            state.isBlink = false;
        }
    } else {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
        if (!state.isBlink) {
            healthCounter = 100;
        }
    }
    if (state.isGetHearth) {
        state.isBlink = true;
        heartHealthcCounter--;
        scoreScreenBlink(state, '#1ae41ae0', game.healthScreen, heartHealthcCounter);
        if (healthCounter <= 0) {
            state.isBlink = false;
        }
    } else {
        if (!state.isBlink) {
            heartHealthcCounter = 100;
        }
    }
}

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

function renderCaptain(state, wizardElement, capEmptiProgress, capProgress){
    let captanElement = document.querySelectorAll('.captan');
    captanElement.forEach(cap => {
        state.captanStats.posX = parseInt(cap.style.left);
        state.captanStats.posY = parseInt(cap.style.top);

        // Detect collsion with wizard
        if (detectCollision(wizardElement, cap) && state.healthInterval <= 0) {
            state.isShoted = true;
            state.wizard.health -= 10;
            state.healthInterval = 200;
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }

        if (caChangeDirTime < 0) {
            if (state.captanStats.posX < game.gameScreen.offsetWidth * 3 / 4) {
                state.captanStats.left = true;
            }
            else if (state.captanStats.posX >= game.gameScreen.offsetWidth - state.captanStats.width) {
                state.captanStats.right = true;
            }
            else if (state.captanStats.posY <= 0) {
                state.captanStats.up = true;
            }
            else if (state.captanStats.posY >= game.gameScreen.offsetHeight - state.captanStats.height) {
                state.captanStats.down = true;
            }
            else {
                cap.style.left = state.captanStats.posX - state.captanStats.speed * 3 + 'px';
            }
        }
        else {
            cap.style.left = state.captanStats.posX - state.captanStats.speed * 3 + 'px';
            caChangeDirTime--;
        }

        if (state.captanStats.right || state.captanStats.left || state.captanStats.up || state.captanStats.down) {
            state.capDirection = elementDirection(state, 'captan');
            state.captanStats.right = false;
            state.captanStats.left = false;
            state.captanStats.up = false;
            state.captanStats.down = false;

        }

        switch (state.capDirection) {
            case 'left': cap.style.left = state.captanStats.posX - state.captanStats.speed * 3 + 'px';
                break;
            case 'right': cap.style.left = state.captanStats.posX + state.captanStats.speed * 3 + 'px';
                break;
            case 'up': cap.style.top = state.captanStats.posY - state.captanStats.speed * 3 + 'px';
                break;
            case 'down': cap.style.top = state.captanStats.posY + state.captanStats.speed * 3 + 'px';
                break;
            case 'leftUp':
                cap.style.left = state.captanStats.posX - state.captanStats.speed + 'px';
                cap.style.top = state.captanStats.posY - state.captanStats.speed + 'px';
                break;
            case 'leftDown':
                cap.style.left = state.captanStats.posX - state.captanStats.speed + 'px';
                cap.style.top = state.captanStats.posY + state.captanStats.speed + 'px';
                break;
            case 'rightUp':
                cap.style.left = state.captanStats.posX + state.captanStats.speed + 'px';
                cap.style.top = state.captanStats.posY - state.captanStats.speed + 'px';
                break;
            case 'rightDown':
                cap.style.left = state.captanStats.posX + state.captanStats.speed + 'px';
                cap.style.top = state.captanStats.posY + state.captanStats.speed + 'px';
                break;
        }
        capEmptiProgress.style.left = parseInt(cap.style.left) + 'px';
        capEmptiProgress.style.top = parseInt(cap.style.top) - 18 + 'px';
        capProgress.style.left = parseInt(cap.style.left) + 'px';
        capProgress.style.top = parseInt(cap.style.top) - 17 + 'px';
        capProgress.style.width = state.capHealthEmpty.width / state.captanStats.maxHealth * state.captanStats.health + 'px';
        if (parseInt(capProgress.style.width) >= 50) {
            capProgress.className = '';
            capProgress.classList.add('progress-green');
        }
        else if (parseInt(capProgress.style.width) >= 20) {
            capProgress.className = '';
            capProgress.classList.add('progress-yello');
        }
        else {
            capProgress.className = '';
            capProgress.classList.add('progress-red');
        }
    });
}

function renderSpider(state, wizardElement){
    let spiderElements = document.querySelectorAll('.spider');
    spiderElements.forEach(spider => {
        let posY = parseInt(spider.style.top);

        // Detect collsion with wizard
        if (detectCollision(wizardElement, spider) && state.healthInterval <= 0 && !spider.isDed) {
            state.isShoted = true;
            state.wizard.health -= 15;
            state.healthInterval = 200;
            spider.remove();
            state.spiderTime = 0;
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }
        if (!state.isBreakRope) {
            if (posY + state.spiderStats.height < game.gameScreen.offsetHeight / 2 && state.spiderStats.isDown) {
                spider.style.top = posY + state.spiderStats.speed * 4 + 'px';
            } else {
                state.spiderStats.isDown = false;
                if (posY + state.spiderStats.height > 0) {
                    spider.style.top = posY - state.spiderStats.speed * 2 + 'px';
                } else {
                    spider.remove();
                    state.spiderTime = 0;
                }
            }
        }
        else {
            if (posY < game.gameScreen.offsetHeight) {
                spider.style.top = posY + state.spiderStats.speed * 9 + 'px';
            }
            else {
                spider.remove();
                state.spiderTime = 0;
                state.isBreakRope = false;
            }
        }
    });
}

function renderIronBig(state, wizardElement, irEmptiProgress, irProgress){
    let ironBigElement = document.querySelectorAll('.ironBig');
    ironBigElement.forEach(ir => {
        state.ironBigStats.posX = parseInt(ir.style.left);
        state.ironBigStats.posY = parseInt(ir.style.top);

        // Detect collsion with wizard
        if (detectCollision(wizardElement, ir) && state.healthInterval <= 0) {
            state.isShoted = true;
            state.wizard.health -= 10;
            state.healthInterval = 200;
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }

        if (state.irChangeDirTime < 0) {
            if (state.ironBigStats.posX < game.gameScreen.offsetWidth * 3 / 5) {
                state.ironBigStats.left = true;
            } else if (state.ironBigStats.posX >= game.gameScreen.offsetWidth - state.ironBigStats.width) {
                state.ironBigStats.right = true;
            } else if (state.ironBigStats.posY <= 0) {
                state.ironBigStats.up = true;
            } else if (state.ironBigStats.posY >= game.gameScreen.offsetHeight - state.ironBigStats.height) {
                state.ironBigStats.down = true;
            } else {
                ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed * 3 + 'px';
            }
        }
        else {
            ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed * 3 + 'px';
            state.irChangeDirTime--;
        }

        if (state.ironBigStats.right || state.ironBigStats.left || state.ironBigStats.up || state.ironBigStats.down) {
            state.irDirection = elementDirection(state, 'ironBig');
            state.ironBigStats.right = false;
            state.ironBigStats.left = false;
            state.ironBigStats.up = false;
            state.ironBigStats.down = false;
        }

        switch (state.irDirection) {
            case 'left': ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed * 3 + 'px';
                break;
            case 'right': ir.style.left = state.ironBigStats.posX + state.ironBigStats.speed * 3 + 'px';
                break;
            case 'up': ir.style.top = state.ironBigStats.posY - state.ironBigStats.speed * 3 + 'px';
                break;
            case 'down': ir.style.top = state.ironBigStats.posY + state.ironBigStats.speed * 3 + 'px';
                break;
            case 'leftUp':
                ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed + 'px';
                ir.style.top = state.ironBigStats.posY - state.ironBigStats.speed + 'px';
                break;
            case 'leftDown':
                ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed + 'px';
                ir.style.top = state.ironBigStats.posY + state.ironBigStats.speed + 'px';
                break;
            case 'rightUp':
                ir.style.left = state.ironBigStats.posX + state.ironBigStats.speed + 'px';
                ir.style.top = state.ironBigStats.posY - state.ironBigStats.speed + 'px';
                break;
            case 'rightDown':
                ir.style.left = state.ironBigStats.posX + state.ironBigStats.speed + 'px';
                ir.style.top = state.ironBigStats.posY + state.ironBigStats.speed + 'px';
                break;
        }
        irEmptiProgress.style.left = parseInt(ir.style.left) + 'px';
        irEmptiProgress.style.top = parseInt(ir.style.top) - 18 + 'px';
        irProgress.style.left = parseInt(ir.style.left) + 'px';
        irProgress.style.top = parseInt(ir.style.top) - 17 + 'px';
        irProgress.style.width = state.irHealthEmpty.width / state.ironBigStats.maxHealth * state.ironBigStats.health + 'px';
        if (parseInt(irProgress.style.width) >= 50) {
            irProgress.className = '';
            irProgress.classList.add('progress-green');
        }
        else if (parseInt(irProgress.style.width) >= 20) {
            irProgress.className = '';
            irProgress.classList.add('progress-yello');
        }
        else {
            irProgress.className = '';
            irProgress.classList.add('progress-red');
        }
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

function renderLevelText(){
    let bugExplosionElement = document.querySelectorAll('.level');
    if(bugExplosionElement.length > 0){
        bugExplosionElement.forEach(bugExplosion => {
            let size = parseInt(bugExplosion.style.fontSize)
            let explosionTop = parseInt(bugExplosion.style.top);
            let explosionLeft = parseInt(bugExplosion.style.left);
            let opacity = parseFloat(bugExplosion.style.opacity)

            if(opacity <= 0.01){
                bugExplosion.remove();          
            }
            else if(opacity <= 0.05){
                opacity = parseFloat(bugExplosion.style.opacity) - 0.01;
            }
            else if(opacity <= 0.2){
                opacity = parseFloat(bugExplosion.style.opacity) - 0.02;
            }
            else{
                opacity = parseFloat(bugExplosion.style.opacity) - 0.03;
            }
            bugExplosion.style.fontSize = size + 8 + 'px';
            bugExplosion.style.top = explosionTop - 12 + 'px';
            bugExplosion.style.left = explosionLeft - 16 + 'px';
            bugExplosion.style.opacity = opacity.toString();
        });
    }
}

function renderBattleTimeText(){
    let bugExplosionElement = document.querySelectorAll('.battleTimeText');
    if(bugExplosionElement.length > 0){
        bugExplosionElement.forEach(bugExplosion => {
            let size = parseInt(bugExplosion.style.fontSize)
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
            bugExplosion.style.fontSize = size + 1 + 'px';
            bugExplosion.style.top = explosionTop - 4 + 'px';
            bugExplosion.style.left = explosionLeft - 2 + 'px';
            bugExplosion.style.opacity = opacity.toString();
        });
    }
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
            state.isGetHearth = true;
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
