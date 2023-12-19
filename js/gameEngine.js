let state1 = initState();
let game1 = initGameObject();
let levelCounter = 100;
let heartHealthcCounter = 100;
let healthCounter = 100;
let countKill = 0;
let spearTime = 0;
let cloudTime = 0;
let tree1Time = 0;
let tree2Time = 0;
let pointTimer = 0;
let isPoint = false;
let spiderCount = 0;
let haveCaptan = false;
let haveCaptan2 = true;
let haveIronBig = false;
let haveIronBig2 = true;
let caChangeDirTime = 0;
let irFireArr = [];
let capFireArr = [];
let capProgress;
let irEmptiProgress;
let capEmptiProgress;
let irProgress;

function start(state, game) {
    game.createWizard(state.wizard);
    game.createLevelProgress(state.progressBar);
    game.createEmptyProgress(state.progressEmpty);
    game.createHealthProgress(state.healthBar);
    game.createEmptyHealthProgress(state.healthEmpty);
    window.requestAnimationFrame(gameLoop.bind(null, state, game));
}

function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { ironBigStats } = state;
    const { captanStats } = state;
    const { progressBar } = state;
    const { progressEmpty } = state;
    const { healthBar } = state;
    const { healthEmpty } = state;
    const { wizardElement } = game;
    const { levelProgress } = game;
    const { emptyProgress } = game;
    const { healthProgress } = game;
    const { emptyHealthProgress } = game;
    const { diamondCountElement } = game;
    const { heartCountElement } = game;
    const { collectables } = game;
    const { spiderCountElement } = game;
    const { gameScreen } = game;
    const { bugExplosionElemant } = game;

    upLevel(state);

    modifyWizardPosition(state, game);

    if (state.wizard.health >= 100) {
        state.wizard.health = 100;
    }
    
    if (countKill > 550){
        state.bugStats.points = 200;
    }
    else if (countKill > 350){
        state.bugStats.points = 150;
    }
    else if (countKill > 150){
        state.bugStats.points = 100;
    }

    game.scoreScreen.innerText = `Points \r\n  ${state.score.toFixed(0)}\r\n Level: ${state.level}`;
    let playerName = game.player.value;

    if (playerName.length > 7) {
        playerName = playerName.substring(0, 7) + '...';
    }
    game.healthScreen.innerText = `${playerName} \r\n Health \r\n ${state.wizard.health} %`;

    game.diamondCountElement.classList.add('diamondCount');
    game.diamondCountElement.textContent = state.diamondCount;
    game.heartCountElement.classList.add('heartCount');
    game.heartCountElement.textContent = state.heartCount;
    game.collectables.textContent = 'Collected'
    game.spiderCountElement.classList.add('spiderCount');
    game.spiderCountElement.textContent = spiderCount;

    game.collectables.appendChild(game.diamondCountElement);
    game.collectables.appendChild(game.heartCountElement);
    game.collectables.appendChild(game.spiderCountElement);

    // Render Level Progress
    levelProgress.style.left = progressBar.posX + '%';
    levelProgress.style.top = progressBar.posY + 'px';
    emptyProgress.style.left = progressEmpty.posX + '%';
    emptyProgress.style.top = progressEmpty.posY + 'px';
    levelProgress.style.width = progressBar.width / state.toNextLevel * state.neededScore + 'px';

    if (parseInt(levelProgress.style.width) <= 50) {
        levelProgress.className = '';
        levelProgress.classList.add('progress-red');
    }
    else if (parseInt(levelProgress.style.width) <= 180) {
        levelProgress.className = '';
        levelProgress.classList.add('progress-yello');
    }
    else {
        levelProgress.className = '';
        levelProgress.classList.add('progress-green');
    }

    //render Health Progress
    healthProgress.style.left = healthBar.posX + '%';
    healthProgress.style.top = healthBar.posY + 'px';
    emptyHealthProgress.style.left = healthEmpty.posX + '%';
    emptyHealthProgress.style.top = healthEmpty.posY + 'px';
    healthProgress.style.width = healthBar.width / state.wizard.maxHealth * state.wizard.health + 'px';

    if (parseInt(healthProgress.style.width) <= 50) {
        healthProgress.className = '';
        healthProgress.classList.add('progress-red');
    }
    else if (parseInt(healthProgress.style.width) <= 180) {
        healthProgress.className = '';
        healthProgress.classList.add('progress-yello');
    }
    else {
        healthProgress.className = '';
        healthProgress.classList.add('progress-green');
    }

    // Spawn cloud
    if (timestamp > state.cloudStats.nextSpawnTimestamp && cloudTime > 30) {
        game.createCloud(state.cloudStats);
        state.cloudStats.nextSpawnTimestamp = timestamp + Math.random() * state.cloudStats.maxSpawnInterval;
        cloudTime = 0;
    }
    else {
        cloudTime++;
    }

    // Spawn tree1
    if (timestamp > state.tree1Stats.nextSpawnTimestamp && tree1Time > 10) {
        game.createTree1(state.tree1Stats);
        state.tree1Stats.nextSpawnTimestamp = timestamp + Math.random() * state.tree1Stats.maxSpawnInterval;
        tree1Time = 0;
    }
    else {
        tree1Time++;
    }

    //Spawn tree2
    if (timestamp > state.tree2Stats.nextSpawnTimestamp && tree2Time > 10) {
        game.createTree2(state.tree2Stats);
        state.tree2Stats.nextSpawnTimestamp = timestamp + Math.random() * state.tree2Stats.maxSpawnInterval;
        tree2Time = 0;
    } else {
        tree2Time++;
    }

    // Spawn bugs
    if (timestamp > state.bugStats.nextSpawnTimestamp) {
        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimestamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval;
    }

    // Spawn captan
    if (spiderCount % 7 == 0 && !haveCaptan2 && !haveCaptan) {
        caChangeDirTime = 80;
        state.captanStats.health = state.captanStats.maxHealth;
        game.createCaptan(state.captanStats);
        game.createBattleTimeText(state);
        capEmptiProgress = game.createCapEmptyHealthProgress(captanStats, state.capHealthEmpty);
        capProgress = game.createCapHealthProgress(captanStats, state.capHealthBar);
        haveCaptan = true;
        haveCaptan2 = true;
    }

    // Spawn ironBig
    if (spiderCount % 11 == 0 && !haveIronBig2 && !haveIronBig) {
        state.irChangeDirTime = 80;
        state.ironBigStats.health = state.ironBigStats.maxHealth;
        game.createIronBig(state.ironBigStats);
        game.createBattleTimeText(state);
        irEmptiProgress = game.createIrEmptyHealthProgress(ironBigStats, state.irHealthEmpty);
        irProgress = game.createIrHealthProgress(ironBigStats, state.irHealthBar);
        haveIronBig = true;
        haveIronBig2 = true;
    }

    // Spawn Spider
    if (timestamp > state.spiderStats.nextSpawnTimestamp && state.spiderTime > 250) {
        game.createSpider(state.spiderStats);
        state.spiderStats.nextSpawnTimestamp = timestamp + Math.random() * state.spiderStats.maxSpawnInterval;
        state.spiderTime = 0;
    } else {
        state.spiderTime++;
    }

    // Spawn Spear
    if (timestamp > state.spearStats.nextSpawnTimestamp && spearTime > 100) {
        game.createSpear(state.spearStats);
        state.spearStats.nextSpawnTimestamp = timestamp + Math.random() * state.spearStats.maxSpawnInterval;
        state.spearStats.isUp = false;
        spearTime = 0;
    } else {
        spearTime++;
    }

    // Spown Heart
    if (timestamp > state.heartStats.nextSpawnTimestamp) {
        game.createHeart(state.heartStats, state.level);
        state.heartStats.nextSpawnTimestamp = timestamp + Math.random() * state.heartStats.maxSpawnInterval;
    }

    // Spown Diamond
    if (timestamp > state.diamondStats.nextSpawnTimestamp) {
        game.createDiamond(state.diamondStats);
        state.diamondStats.nextSpawnTimestamp = timestamp + Math.random() * state.diamondStats.maxSpawnInterval;
    }

    //spawn fire
    if (state.keys.Space) {
        game.wizardElement.style.backgroundImage = 'url("../images/2.png")';

        if (timestamp > state.fireball.nextSpawnTimestamp) {
            game.createFireball(wizard, state.fireball);
            state.fireball.nextSpawnTimestamp = timestamp + state.fireball.fireRate;
        }
    } else {
        game.wizardElement.style.backgroundImage = 'url("../images/1.png")';
    }

    // Render fireballs
    let bugElements = document.querySelectorAll('.bug');
    document.querySelectorAll('.fireball').forEach(fireball => {
        let posX = parseInt(fireball.style.left);

        // Detect collision
        bugElements.forEach(bug => {
            if (detectCollision(bug, fireball)) {
                state.score += state.bugStats.points;
                animateExplosion(bug, game, state, state.bugStats.points);
                bug.remove();
                fireball.remove();
                countKill++;
            }
        });

        let spiderElements = document.querySelectorAll('.spider');
        spiderElements.forEach(spider => {
            if (detectCollision(spider, fireball) && !spider.isDed) {
                state.score += state.killScore * 0.5;
                spider.style.backgroundImage = "url('../images/spider1.png')";
                spider.style.width = '90px';
                spider.style.height = '90px';
                let top = parseInt(spider.style.top);
                top += 510;
                spider.style.top = top + 'px';
                state.isBreakRope = true;
                spider.isDed = true;
                haveCaptan2 = false;
                haveIronBig2 = false
                fireball.remove();
                countKill++;
                spiderCount++;
            }
        });

        let captanElement = document.querySelectorAll('.captan');
        captanElement.forEach(cap => {
            if (detectCollision(cap, fireball)) {
                fireball.remove();
                state.captanStats.health--;
                state.score += state.captanStats.points;
                animateExplosion(cap, game, state, state.captanStats.points);
                if (state.captanStats.health <= 0) {
                    state.score += state.captanStats.killScore;
                    countKill++;
                    haveCaptan = false;
                    state.captanStats.maxHealth += 5;
                    let height = cap.getBoundingClientRect().top + cap.getBoundingClientRect().height / 2;
                    let width = cap.getBoundingClientRect().left + cap.getBoundingClientRect().width / 2;
                    animateWizardExplosion(cap, game, state);
                    game.createBugPoints(state.bugPointsStats, width, height, state.captanStats.killScore, 2);
                    cap.remove();
                    capProgress.remove();
                    capEmptiProgress.remove();
                }
            }
        });

        let ironBigElement = document.querySelectorAll('.ironBig');
        ironBigElement.forEach(ir => {
            if (detectCollision(ir, fireball)) {
                fireball.remove();
                state.ironBigStats.health--;
                state.score += state.ironBigStats.points;
                animateExplosion(ir, game, state, state.ironBigStats.points);
                if (state.ironBigStats.health <= 0) {
                    state.score += state.ironBigStats.killScore;
                    countKill++;
                    haveIronBig = false;
                    state.ironBigStats.maxHealth += 10;
                    let height = ir.getBoundingClientRect().top + ir.getBoundingClientRect().height / 2;
                    let width = ir.getBoundingClientRect().left + ir.getBoundingClientRect().width / 2;
                    animateWizardExplosion(ir, game, state);
                    game.createBugPoints(state.bugPointsStats, width, height, state.ironBigStats.killScore, 2);
                    ir.remove();
                    irProgress.remove();
                    irEmptiProgress.remove();
                }
            }
        });

        if (posX > game.gameScreen.offsetWidth) {
            fireball.remove();
        } else {
            fireball.style.left = posX + state.fireball.speed + 'px';
        }
    });

    //spawn ironFire
    if (haveIronBig) {
        if (timestamp > state.ironFireball.nextSpawnTimestamp) {
            let ironFireElement = game.createIronFireball(ironBigStats, state.ironFireball);
            state.ironFireball.nextSpawnTimestamp = timestamp + state.ironFireball.fireRate;
            let direction = Math.round(Math.random() * 2);
            let obj = {
                ironFireElement: ironFireElement,
                direction: direction,
            }
            irFireArr.push(obj)
        }
    }

    irFireArr.forEach(el => {
        let index = irFireArr.indexOf(el);
        let irFire = el.ironFireElement;
        let direction = el.direction;
        let irFIrePosX = parseInt(irFire.style.left);
        let irFIrePosY = parseInt(irFire.style.top);

        if (detectCollision(wizardElement, irFire) && state.healthInterval <= 100) {
            state.isShoted = true;
            state.wizard.health -= 2;
            state.healthInterval = 200;
            irFire.remove();
            irFireArr.splice(index, 1);
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }

        if (irFIrePosX < 0) {
            irFire.remove();
            irFireArr.splice(index, 1);
        } else {
            if (direction == 0) {
                irFire.style.left = irFIrePosX - state.ironFireball.speed * 3 + 'px';
                irFire.style.top = irFIrePosY + state.ironFireball.speed + 'px';
            } else if (direction == 1) {
                irFire.style.left = irFIrePosX - state.ironFireball.speed * 3 + 'px';
            } else if (direction == 2) {
                irFire.style.left = irFIrePosX - state.ironFireball.speed * 3 + 'px';
                irFire.style.top = irFIrePosY - state.ironFireball.speed + 'px';
            }
        }
    });

    //spawn captanFire
    if (haveCaptan) {
        if (timestamp > state.captanFireball.nextSpawnTimestamp) {
            let captanFireElement = game.createCaptanFireball(captanStats, state.captanFireball);
            state.captanFireball.nextSpawnTimestamp = timestamp + state.captanFireball.fireRate;
            let direction = Math.round(Math.random() * 1);
            let obj = {
                captanFireElement: captanFireElement,
                direction: direction,
            }
            capFireArr.push(obj)
        }
    }

    capFireArr.forEach(el => {
        let index = capFireArr.indexOf(el);
        let capFire = el.captanFireElement;
        let direction = el.direction;
        let capFIrePosX = parseInt(capFire.style.left);
        let capFIrePosY = parseInt(capFire.style.top);

        if (capFIrePosY <= 0) {
            el.direction = 1
        } else if (capFIrePosY >= gameScreen.offsetHeight - state.captanFireball.height) {
            el.direction = 0
        }

        if (detectCollision(wizardElement, capFire) && state.healthInterval <= 100) {
            state.isShoted = true;
            state.wizard.health -= 5;
            state.healthInterval = 200;
            capFire.remove();
            capFireArr.splice(index, 1);
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }

        if (capFIrePosX < 0) {
            capFire.remove();
            capFireArr.splice(index, 1);
        } else {
            if (direction == 1) {
                capFire.style.left = capFIrePosX - state.captanFireball.speed * 3 + 'px';
                capFire.style.top = capFIrePosY + state.captanFireball.speed * 2 + 'px';
            } else if (direction == 0) {
                capFire.style.left = capFIrePosX - state.captanFireball.speed * 3 + 'px';
                capFire.style.top = capFIrePosY - state.captanFireball.speed * 2 + 'px';
            }
        }
    });

    renderWizard(state, game, wizardElement);
    renderClouds();
    renderTree1();
    renderTree2();
    renderSpider(state, wizardElement);
    renderSpear(state, wizardElement);
    renderIronMen(state, wizardElement);
    renderCaptain(state, wizardElement, capEmptiProgress, capProgress);
    renderIronBig(state, wizardElement, irEmptiProgress, irProgress)
    renderLevelText();
    renderBattleTimeText();
    renderBugExplosions();
    renderBugPoints();
    renderWizardExplosion();
    renderWizardHelthy();
    renderHeartPoints();
    renderDiamond(state, wizardElement);
    renderHeart(state, wizardElement);
}

function pointAdd(obj, point) {
    if (pointTimer < 5) {
        obj.classList.remove(...obj.classList);
        obj.classList.add('points');
        obj.textContent = '+' + point;
        pointTimer++;
    } else {
        obj.remove();
        pointTimer = 0;
        isPoint = false;
    }
}