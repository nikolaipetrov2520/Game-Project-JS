let state1 = initState();
let game1 = initGameObject();
let counter = 1;
let countKill = 0;

function start(state, game) {
    game.createWizard(state.wizard);
    game.createLevelProgress(state.progressBar);
    game.createEmptyProgress(state.progressEmpty);
    window.requestAnimationFrame(gameLoop.bind(null, state, game));
}

function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { progressBar } = state;
    const { progressEmpty } = state;
    const { wizardElement } = game;
    const { levelProgress } = game;
    const { emptyProgress } = game;
    game.scoreScreen.textContent = `${state.score.toFixed(0)} pts. Level: ${state.level}`;

    // if(state.level > state.previousLevel){     
    //     if(counter < 6){
    //         if(counter % 2 == 0){
    //             game1.scoreScreen.remove("score");
    //             game1.scoreScreen.classList.add('score-blink');
    //             counter++;
    //         }else{
    //             game1.scoreScreen.remove("score-blink");
    //             game1.scoreScreen.classList.add('score');
    //             counter++;
    //         }
    //     }else{
    //         state.previousLevel = state.level;
    //         counter = 1;
    //     }
    // }

    // Render Progress
    levelProgress.style.left = progressBar.posX + '%';
    levelProgress.style.top = progressBar.posY + 'px';

    emptyProgress.style.left = progressEmpty.posX + '%';
    emptyProgress.style.top = progressEmpty.posY + 'px';

    levelProgress.style.width = progressBar.width / state.toNextLevel * state.neededScore + 'px';
    if( parseInt(levelProgress.style.width) <= 50){
        levelProgress.className = '';
        levelProgress.classList.add('progress-red');
    }else if( parseInt(levelProgress.style.width) <= 180){
        levelProgress.className = '';
        levelProgress.classList.add('progress-yello');
    }else{
        levelProgress.className = '';
        levelProgress.classList.add('progress-green');
    }

    upLevel(state);

    modifyWizardPosition(state, game);

    if (state.keys.Space) {
        game.wizardElement.style.backgroundImage = 'url("images/2.png")';

        if (timestamp > state.fireball.nextSpawnTimestamp) {
            game.createFireball(wizard, state.fireball);
            state.fireball.nextSpawnTimestamp = timestamp + state.fireball.fireRate;
        }
    } else {
        game.wizardElement.style.backgroundImage = 'url("images/1.png")';
    }

    // Spawn cloud
    if (timestamp > state.cloudStats.nextSpawnTimestamp) {
        game.createCloud(state.cloudStats);
        state.cloudStats.nextSpawnTimestamp = timestamp + Math.random() * state.cloudStats.maxSpawnInterval;
    }

    // Render cloud
    let cloudElement = document.querySelectorAll('.cloud');
    cloudElement.forEach(cloud => {
        let posX = parseInt(cloud.style.left);

        if (posX > 0) {
            cloud.style.left = posX - state.cloudStats.speed + 'px';
        } else {
            cloud.remove();
        }
    });

    // Spawn tree1
    if (timestamp > state.tree1Stats.nextSpawnTimestamp) {
        game.createTree1(state.tree1Stats);
        state.tree1Stats.nextSpawnTimestamp = timestamp + Math.random() * state.tree1Stats.maxSpawnInterval;
    }

    // Render tree1
    let tree1Element = document.querySelectorAll('.tree1');
    tree1Element.forEach(tree1 => {
        let posX = parseInt(tree1.style.left);

        if (posX > 0) {
            tree1.style.left = posX - state.tree1Stats.speed + 'px';
        } else {
            tree1.remove();
        }
    });

    //Spawn tree2
    if (timestamp > state.tree2Stats.nextSpawnTimestamp) {
        game.createTree2(state.tree2Stats);
        state.tree2Stats.nextSpawnTimestamp = timestamp + Math.random() * state.tree2Stats.maxSpawnInterval;
    }

    // Render tree2
    let tree2Element = document.querySelectorAll('.tree2');
    tree2Element.forEach(tree2 => {
        let posX = parseInt(tree2.style.left);

        if (posX > 0) {
            tree2.style.left = posX - state.tree2Stats.speed + 'px';
        } else {
            tree2.remove();
        }
    });

    // Spawn bugs
    if (timestamp > state.bugStats.nextSpawnTimestamp) {
        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimestamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval;
    }

    // Render bugs
    let bugElements = document.querySelectorAll('.bug');
    bugElements.forEach(bug => {
        let posX = parseInt(bug.style.left);

        // Detect collsion with wizard
        if (detectCollision(wizardElement, bug)) {
            state.gameOver = true;
        }

        if (posX > 0) {
            bug.style.left = posX - state.bugStats.speed + 'px';
        } else {
            bug.remove();
        }
    });

    // Render fireballs
    document.querySelectorAll('.fireball').forEach(fireball => {
        let posX = parseInt(fireball.style.left);

        // Detect collision
        bugElements.forEach(bug => {
            if (detectCollision(bug, fireball)) {
                state.score += state.killScore;
                bug.remove();
                fireball.remove();
                countKill++;
            }
        });

        if (posX > game.gameScreen.offsetWidth) {
            fireball.remove();
        } else {
            fireball.style.left = posX + state.fireball.speed + 'px';
        }
    });

    // Render wizard
    wizardElement.style.left = wizard.posX + 'px';
    wizardElement.style.top = wizard.posY + 'px';


    if (state.gameOver) {
        const gameOver = document.createElement('h3');
        const startBtn = document.createElement('h3');
        startBtn.classList.add('start-btn');
        startBtn.textContent = 'Start again'
        gameOver.innerHTML = `Game Over! Your Score is: ${state.score.toFixed(0)} points.<br/> Level ${state.level}<br> You Killed ${countKill} enemies.`
        game.gameScreen.innerHTML = '';
        game.gameScreen.appendChild(gameOver);
        game.gameScreen.appendChild(startBtn);
        startBtn.addEventListener('click', () => {
            document.location.reload(true);
        });
        let body = document.getElementsByTagName('body')[0];
        body.addEventListener('keydown', (e) => {
           if(e.code == 'Enter' || e.code == 'NumpadEnter'){
            document.location.reload(true);
           }
        });
    } else {
        state.score += state.scoreRate;
        window.requestAnimationFrame(gameLoop.bind(null, state, game));
    }
}

function upLevel(state) { 
    state.toNextLevel = 1000;
    state.neededScore = state.score;
    if (state.score > 1000) {
        state.level = 2;
        state.toNextLevel = 2000 - 1000;
        state.neededScore =  state.score - 1000;
        state.bugStats.maxSpawnInterval = 3700;
        state.bugStats.width = 88;
        state.bugStats.height = 78;
    } 
    if (state.score > 2000) {
        state.level = 3;
        state.toNextLevel = 4000 - 2000;
        state.neededScore =  state.score - 2000;
        state.bugStats.maxSpawnInterval = 3400;
        state.bugStats.width = 86;
        state.bugStats.height = 75;
    } 
    if (state.score > 4000) {
        state.level = 4;
        state.toNextLevel = 6000 - 4000;
        state.neededScore =  state.score - 4000;
        state.bugStats.maxSpawnInterval = 3100;
        state.bugStats.width = 84;
        state.bugStats.height = 73;
    }
    if (state.score > 6000) {
        state.level = 5;
        state.toNextLevel = 8000 - 6000;
        state.neededScore =  state.score - 6000;
        state.bugStats.maxSpawnInterval = 2800;
        state.bugStats.width = 82;
        state.bugStats.height = 70;
    }
    if (state.score > 8000) {
        state.level = 6;
        state.toNextLevel = 10000 - 8000;
        state.neededScore =  state.score - 8000;
        state.bugStats.maxSpawnInterval = 2500;
        state.bugStats.width = 80;
        state.bugStats.height = 68;
    }
    if (state.score > 10000) {
        state.level = 7;
        state.toNextLevel = 15000 - 10000;
        state.neededScore =  state.score - 10000;
        state.bugStats.maxSpawnInterval = 2200;
        state.bugStats.width = 78;
        state.bugStats.height = 65;
    }
    if (state.score > 15000) {
        state.level = 8;
        state.toNextLevel = 20000 - 15000;
        state.neededScore =  state.score - 15000;
        state.bugStats.maxSpawnInterval = 1900;
        state.bugStats.width = 76;
        state.bugStats.height = 63;
    }
    if (state.score > 20000) {
        state.level = 9;
        state.toNextLevel = 25000 - 20000;
        state.neededScore =  state.score - 20000;
        state.bugStats.maxSpawnInterval = 1600;
        state.bugStats.width = 74;
        state.bugStats.height = 60;
    }
    if (state.score > 25000) {
        state.level = 10;
        state.toNextLevel = 35000 - 25000;
        state.neededScore =  state.score - 25000;
        state.bugStats.maxSpawnInterval = 1300;
        state.bugStats.width = 72;
        state.bugStats.height = 58;
    }
    if (state.score > 35000) {
        state.level = 11;
        state.toNextLevel = 45000 - 35000;
        state.neededScore =  state.score - 35000;
    }
    if (state.score > 45000) {
        state.level = 12;
        state.toNextLevel = 55000 - 45000;
        state.neededScore =  state.score - 45000;
    }
    if (state.score > 55000) {
        state.level = 13;
        state.toNextLevel = 65000 - 55000;
        state.neededScore =  state.score - 55000;
    }
    if (state.score > 65000) {
        state.level = 14;
        state.toNextLevel = 75000 - 65000;
        state.neededScore =  state.score - 65000;
    }
    if (state.score > 75000) {
        state.level = 15;
        state.toNextLevel = 100000 - 75000;
        state.neededScore =  state.score - 75000;
    }
     state.bugStats.speed = state.level * 1.3;
     state.scoreRate = state.startScoreRate * (state.level / 2);

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

function detectCollision(objectA, objectB) {
    let first = objectA.getBoundingClientRect();
    let second = objectB.getBoundingClientRect();

    let hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right)

    return hasCollision;
}
