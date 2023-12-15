let state1 = initState();
let game1 = initGameObject();
let levelCounter = 100;
let heartHealthcCounter = 100;
let healthCounter = 100;
let countKill = 0;
let isBlink = false;
let isBreakRope = false;
let spiderTime = 0;
let spearTime = 0;
let cloudTime = 0;
let tree1Time = 0;
let tree2Time = 0;
let pointTimer = 0;
let isPoint = false;
let isGetHearth = false;
let spiderCount = 0;
let capDirection = '';
let irDirection = '';
let haveCaptan = false;
let haveCaptan2 = true;
let haveIronBig = false;
let haveIronBig2 = true;
let irChangeDirTime = 0;
let caChangeDirTime = 0;
let irFireArr = [];
let capFireArr = [];
let capEmptiProgress;
let capProgress;
let irEmptiProgress;
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
    if (spiderCount % 6 == 0 && !haveCaptan2 && !haveCaptan) {
        caChangeDirTime = 80;
        state.captanStats.health = state.captanStats.maxHealth;
        game.createCaptan(state.captanStats);
        capEmptiProgress = game.createCapEmptyHealthProgress(captanStats, state.capHealthEmpty);
        capProgress = game.createCapHealthProgress(captanStats, state.capHealthBar);
        haveCaptan = true;
        haveCaptan2 = true;
    }
    // Render captan
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
            if (state.captanStats.posX < gameScreen.offsetWidth * 3 / 4) {
                state.captanStats.left = true;
            }
            else if (state.captanStats.posX >= gameScreen.offsetWidth - state.captanStats.width) {
                state.captanStats.right = true;
            }
            else if (state.captanStats.posY <= 0) {
                state.captanStats.up = true;
            }
            else if (state.captanStats.posY >= gameScreen.offsetHeight - state.captanStats.height) {
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
            capDirection = elementDirection(state, 'captan');
            state.captanStats.right = false;
            state.captanStats.left = false;
            state.captanStats.up = false;
            state.captanStats.down = false;

        }

        switch (capDirection) {
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

    // Spawn ironBig
    if (spiderCount % 10 == 0 && !haveIronBig2 && !haveIronBig) {
        irChangeDirTime = 80;
        state.ironBigStats.health = state.ironBigStats.maxHealth;
        game.createIronBig(state.ironBigStats);
        irEmptiProgress = game.createIrEmptyHealthProgress(ironBigStats, state.irHealthEmpty);
        irProgress = game.createIrHealthProgress(ironBigStats, state.irHealthBar);
        haveIronBig = true;
        haveIronBig2 = true;
    }

    // Render ironBig
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

        if (irChangeDirTime < 0) {
            if (state.ironBigStats.posX < gameScreen.offsetWidth * 3 / 5) {
                state.ironBigStats.left = true;
            } else if (state.ironBigStats.posX >= gameScreen.offsetWidth - state.ironBigStats.width) {
                state.ironBigStats.right = true;
            } else if (state.ironBigStats.posY <= 0) {
                state.ironBigStats.up = true;
            } else if (state.ironBigStats.posY >= gameScreen.offsetHeight - state.ironBigStats.height) {
                state.ironBigStats.down = true;
            } else {
                ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed * 3 + 'px';
            }
        }
        else {
            ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed * 3 + 'px';
            irChangeDirTime--;
        }

        if (state.ironBigStats.right || state.ironBigStats.left || state.ironBigStats.up || state.ironBigStats.down) {
            irDirection = elementDirection(state, 'ironBig');
            state.ironBigStats.right = false;
            state.ironBigStats.left = false;
            state.ironBigStats.up = false;
            state.ironBigStats.down = false;
        }

        switch (irDirection) {
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

    // Spawn Spider
    if (timestamp > state.spiderStats.nextSpawnTimestamp && spiderTime > 250) {
        game.createSpider(state.spiderStats);
        state.spiderStats.nextSpawnTimestamp = timestamp + Math.random() * state.spiderStats.maxSpawnInterval;
        spiderTime = 0;
    } else {
        spiderTime++;
    }

    // Render Spider
    let spiderElements = document.querySelectorAll('.spider');
    spiderElements.forEach(spider => {
        let posY = parseInt(spider.style.top);

        // Detect collsion with wizard
        if (detectCollision(wizardElement, spider) && state.healthInterval <= 0 && !spider.isDed) {
            state.isShoted = true;
            state.wizard.health -= 15;
            state.healthInterval = 200;
            spider.remove();
            spiderTime = 0;
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }
        if (!isBreakRope) {
            if (posY + state.spiderStats.height < game.gameScreen.offsetHeight / 2 && state.spiderStats.isDown) {
                spider.style.top = posY + state.spiderStats.speed * 4 + 'px';
            } else {
                state.spiderStats.isDown = false;
                if (posY + state.spiderStats.height > 0) {
                    spider.style.top = posY - state.spiderStats.speed * 2 + 'px';
                } else {
                    spider.remove();
                    spiderTime = 0;
                }
            }
        }
        else {
            if (posY < game.gameScreen.offsetHeight) {
                spider.style.top = posY + state.spiderStats.speed * 9 + 'px';
            }
            else {
                spider.remove();
                spiderTime = 0;
                isBreakRope = false;
            }
        }
    });

    // Spawn Spear
    if (timestamp > state.spearStats.nextSpawnTimestamp && spearTime > 100) {
        game.createSpear(state.spearStats);
        state.spearStats.nextSpawnTimestamp = timestamp + Math.random() * state.spearStats.maxSpawnInterval;
        state.spearStats.isUp = false;
        spearTime = 0;
    } else {
        spearTime++;
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
                state.score += state.killScore;
                animateExplosion(bug, game, state);

                fireball.remove();
                countKill++;
            }
        });
        spiderElements.forEach(spider => {
            if (detectCollision(spider, fireball) && !spider.isDed) {
                state.score += state.killScore * 0.5;
                spider.style.backgroundImage = "url('../images/spider1.png')";
                spider.style.width = '90px';
                spider.style.height = '90px';
                let top = parseInt(spider.style.top);
                top += 510;
                spider.style.top = top + 'px';
                isBreakRope = true;
                spider.isDed = true;
                haveCaptan2 = false;
                haveIronBig2 = false
                fireball.remove();
                countKill++;
                spiderCount++;
            }
        });

        captanElement.forEach(cap => {
            if (detectCollision(cap, fireball)) {
                fireball.remove();
                state.captanStats.health--;

                if (state.captanStats.health <= 0) {
                    state.score += state.killScore * 5;
                    countKill++;
                    haveCaptan = false;
                    state.captanStats.maxHealth += 2;
                    cap.remove();
                    capProgress.remove();
                    capEmptiProgress.remove();
                }
            }
        });

        ironBigElement.forEach(ir => {
            if (detectCollision(ir, fireball)) {
                fireball.remove();
                state.ironBigStats.health--;

                if (state.ironBigStats.health <= 0) {
                    state.score += state.killScore * 10;
                    countKill++;
                    haveIronBig = false;
                    state.ironBigStats.maxHealth += 15;
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

    // Render wizard
    wizardElement.style.left = wizard.posX + 'px';
    wizardElement.style.top = wizard.posY + 'px';

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
        isBlink = true;
        levelCounter--;
        scoreScreenBlink("#1ae41ae0", game.scoreScreen, levelCounter);
        if (levelCounter == 0) {
            state.previousLevel = state.level;
        }
    } else {
        if (!isBlink) {
            levelCounter = 100;
        }
    }
    state.healthInterval--;
    if (state.healthInterval >= 100) {
        isBlink = true;
        healthCounter--;
        scoreScreenBlink("#e61a1ac9", game.healthScreen, healthCounter);
        wizardBlink(state, wizardElement);
    } else {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
        if (!isBlink) {
            healthCounter = 100;
        }
    }
    if (isGetHearth) {
        isBlink = true;
        heartHealthcCounter--;
        scoreScreenBlink('#1ae41ae0', game.healthScreen, heartHealthcCounter);
    } else {
        if (!isBlink) {
            heartHealthcCounter = 100;
        }
    }

    renderClouds();
    renderTree1();
    renderTree2();
    renderSpear(state, wizardElement);
    renderIronMen(state, wizardElement);
    renderBugExplosions();
    renderBugPoints();
    renderWizardExplosion();
    renderWizardHelthy();
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

function scoreScreenBlink(color, screen, counter) {
    if (counter >= 0) {
        if (counter < 100 && counter >= 95) {
            screen.style.backgroundColor = color;
        } else if (counter < 95 && counter >= 90) {
            screen.style.backgroundColor = "#0942093b";
        } else if (counter < 90 && counter >= 85) {
            screen.style.backgroundColor = color;
        } else if (counter < 85 && counter >= 80) {
            screen.style.backgroundColor = "#0942093b";
        } else if (counter < 80 && counter >= 75) {
            screen.style.backgroundColor = color;
        } else if (counter < 75 && counter >= 70) {
            screen.style.backgroundColor = "#0942093b";
        } else if (counter < 70 && counter >= 65) {
            screen.style.backgroundColor = color;
        } else if (counter < 65 && counter >= 60) {
            screen.style.backgroundColor = "#0942093b";
        } else if (counter < 60 && counter >= 55) {
            screen.style.backgroundColor = color;
        } else if (counter < 55 && counter >= 50) {
            screen.style.backgroundColor = "#0942093b";
        }
    } else {
        isBlink = false;
        isGetHearth = false;
    }
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