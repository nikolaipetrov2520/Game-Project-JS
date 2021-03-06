let state1 = initState();
let game1 = initGameObject();
let levelCounter = 100;
let heartHealthcCounter = 100;
let healthCounter = 100;
let countKill = 0;
let healthInterval = 0;
let isBlink = false;
let isBreakRope = false;
let isSpareColision = false;
let spiderTime = 0;
let spearTime = 0;
let cloudTime = 0;
let tree1Time = 0;
let tree2Time = 0;
let pointTimer = 0;
let isPoint = false;
let isGetHearth = false;
let spiderCount = 0;
let diamondCount = 0;
let heartCount = 0;
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
    game.diamondCountElement.textContent = diamondCount;
    game.heartCountElement.classList.add('heartCount');
    game.heartCountElement.textContent = heartCount;
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
    } else if (parseInt(levelProgress.style.width) <= 180) {
        levelProgress.className = '';
        levelProgress.classList.add('progress-yello');
    } else {
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
    } else if (parseInt(healthProgress.style.width) <= 180) {
        healthProgress.className = '';
        healthProgress.classList.add('progress-yello');
    } else {
        healthProgress.className = '';
        healthProgress.classList.add('progress-green');
    }

    // Spawn cloud
    if (timestamp > state.cloudStats.nextSpawnTimestamp && cloudTime > 30) {
        game.createCloud(state.cloudStats);
        state.cloudStats.nextSpawnTimestamp = timestamp + Math.random() * state.cloudStats.maxSpawnInterval;
        cloudTime = 0;
    } else {
        cloudTime++;
    }

    // Render cloud
    let cloudElement = document.querySelectorAll('.cloud');
    cloudElement.forEach(cloud => {
        let posX = parseInt(cloud.style.left);

        if (posX + state.cloudStats.width > 0) {
            cloud.style.left = posX - state.cloudStats.speed + 'px';
        } else {
            cloud.remove();
        }
    });

    // Spawn tree1
    if (timestamp > state.tree1Stats.nextSpawnTimestamp && tree1Time > 10) {
        game.createTree1(state.tree1Stats);
        state.tree1Stats.nextSpawnTimestamp = timestamp + Math.random() * state.tree1Stats.maxSpawnInterval;
        tree1Time = 0;
    } else {
        tree1Time++;
    }

    // Render tree1
    let tree1Element = document.querySelectorAll('.tree1');
    tree1Element.forEach(tree1 => {
        let posX = parseInt(tree1.style.left);

        if (posX + state.tree1Stats.width > 0) {
            tree1.style.left = posX - state.tree1Stats.speed + 'px';
        } else {
            tree1.remove();
        }
    });

    //Spawn tree2
    if (timestamp > state.tree2Stats.nextSpawnTimestamp && tree2Time > 10) {
        game.createTree2(state.tree2Stats);
        state.tree2Stats.nextSpawnTimestamp = timestamp + Math.random() * state.tree2Stats.maxSpawnInterval;
        tree2Time = 0;
    } else {
        tree2Time++;
    }

    // Render tree2
    let tree2Element = document.querySelectorAll('.tree2');
    tree2Element.forEach(tree2 => {
        let posX = parseInt(tree2.style.left);

        if (posX + state.tree2Stats.width > 0) {
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

        // Detect collision with wizard
        if (detectCollision(wizardElement, bug) && healthInterval <= 0) {
            state.wizard.health -= 10;
            healthInterval = 200;
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
        if (detectCollision(wizardElement, cap) && healthInterval <= 0) {
            state.wizard.health -= 10;
            healthInterval = 200;
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }
        
        if(caChangeDirTime < 0){
            if(state.captanStats.posX < gameScreen.offsetWidth * 3 / 4){
                state.captanStats.left = true;
            }else if(state.captanStats.posX >= gameScreen.offsetWidth - state.captanStats.width){
                state.captanStats.right = true;
            }else if(state.captanStats.posY <= 0){
                state.captanStats.up = true;
            }else if(state.captanStats.posY >= gameScreen.offsetHeight - state.captanStats.height){
                state.captanStats.down = true;
            }else{
                cap.style.left = state.captanStats.posX - state.captanStats.speed * 3 + 'px'; 
            }
        }else{
            cap.style.left = state.captanStats.posX - state.captanStats.speed * 3 + 'px';
            caChangeDirTime--;
        }
        if(state.captanStats.right || state.captanStats.left || state.captanStats.up || state.captanStats.down){
            capDirection = elementDirection('captan');
            state.captanStats.right = false; 
            state.captanStats.left = false;
            state.captanStats.up = false;
            state.captanStats.down = false;

        }

        switch(capDirection){
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
        if(parseInt(capProgress.style.width) >= 50){
            capProgress.className = '';
            capProgress.classList.add('progress-green');
        }else if(parseInt(capProgress.style.width) >= 20){
            capProgress.className = '';
            capProgress.classList.add('progress-yello');
        }else{
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
        if (detectCollision(wizardElement, ir) && healthInterval <= 0) {
            state.wizard.health -= 10;
            healthInterval = 200;
            if (state.wizard.health <= 0) {
                state.gameOver = true;
            }
        }
        
        if(irChangeDirTime < 0){
            if(state.ironBigStats.posX < gameScreen.offsetWidth * 3 / 5){
                state.ironBigStats.left = true;
            }else if(state.ironBigStats.posX >= gameScreen.offsetWidth - state.ironBigStats.width){
                state.ironBigStats.right = true;
            }else if(state.ironBigStats.posY <= 0){
                state.ironBigStats.up = true;
            }else if(state.ironBigStats.posY >= gameScreen.offsetHeight - state.ironBigStats.height){
                state.ironBigStats.down = true;
            }else{
                ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed * 3 + 'px'; 
            }
        }else{
            ir.style.left = state.ironBigStats.posX - state.ironBigStats.speed * 3 + 'px';
            irChangeDirTime--;
        }
        if(state.ironBigStats.right || state.ironBigStats.left || state.ironBigStats.up || state.ironBigStats.down){
          
            irDirection = elementDirection('ironBig');
            state.ironBigStats.right = false; 
            state.ironBigStats.left = false;
            state.ironBigStats.up = false;
            state.ironBigStats.down = false;

        }

        switch(irDirection){
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
        if(parseInt(irProgress.style.width) >= 50){
            irProgress.className = '';
            irProgress.classList.add('progress-green');
        }else if(parseInt(irProgress.style.width) >= 20){
            irProgress.className = '';
            irProgress.classList.add('progress-yello');
        }else{
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
        if (detectCollision(wizardElement, spider) && healthInterval <= 0 && !spider.isDed) {
            state.wizard.health -= 15;
            healthInterval = 200;
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
        } else {
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
    // Render Spear
    let spearElements = document.querySelectorAll('.spear');
    spearElements.forEach(spear => {
        let posY = parseInt(spear.style.top);

        // Detect collsion with wizard
        if (detectCollision(wizardElement, spear) && healthInterval <= 0) {
            state.wizard.health -= 7;
            isSpareColision = true;
            healthInterval = 200;
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
                state.captanStats.health --;
                                
                if(state.captanStats.health <= 0){
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
                state.ironBigStats.health --;
                                
                if(state.ironBigStats.health <= 0){
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

    if(haveIronBig){

        if (timestamp > state.ironFireball.nextSpawnTimestamp) {
            let ironFireElement = game.createIronFireball(ironBigStats, state.ironFireball);
            state.ironFireball.nextSpawnTimestamp = timestamp + state.ironFireball.fireRate;
            let direction = Math.round(Math.random() * 2);
            let obj = {
                ironFireElement: ironFireElement,
                direction:direction,
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

        if (detectCollision(wizardElement, irFire) && healthInterval <= 100) {
            state.wizard.health -= 2;
            healthInterval = 200;
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
            if(direction == 0){
                irFire.style.left = irFIrePosX - state.ironFireball.speed * 3 + 'px';
                irFire.style.top = irFIrePosY + state.ironFireball.speed + 'px';
            }else if(direction == 1){
                irFire.style.left = irFIrePosX - state.ironFireball.speed * 3 + 'px';
            }else if(direction == 2){
                irFire.style.left = irFIrePosX - state.ironFireball.speed * 3 + 'px';
                irFire.style.top = irFIrePosY - state.ironFireball.speed + 'px';
            }
            
        }
    
    });

        //spawn captanFire

        if(haveCaptan){

            if (timestamp > state.captanFireball.nextSpawnTimestamp) {
                let captanFireElement = game.createCaptanFireball(captanStats, state.captanFireball);
                state.captanFireball.nextSpawnTimestamp = timestamp + state.captanFireball.fireRate;
                let direction = Math.round(Math.random() * 1);
                let obj = {
                    captanFireElement: captanFireElement,
                    direction:direction,
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

            if(capFIrePosY <= 0){
                el.direction = 1
            }else if(capFIrePosY >= gameScreen.offsetHeight - state.captanFireball.height){
                el.direction = 0
            }
    
            if (detectCollision(wizardElement, capFire) && healthInterval <= 100) {
                state.wizard.health -= 5;
                healthInterval = 200;
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
                if(direction == 1){
                    capFire.style.left = capFIrePosX - state.captanFireball.speed * 3 + 'px';
                    capFire.style.top = capFIrePosY + state.captanFireball.speed * 2 + 'px';
                }else if(direction == 0){
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
    // Render Heart
    let heartElements = document.querySelectorAll('.heart');
    heartElements.forEach(heart => {
        let posY = parseInt(heart.style.top);
        // if(isPoint){
        //     pointAdd(heart, state.heartStats.addHealth);
        // }
        // Detect collsion with heart
        if (detectCollision(wizardElement, heart)) {
            state.wizard.health += state.heartStats.addHealth;
            isPoint = true;
            heart.remove();
            heartCount++;
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

    // Spown Diamond
    if (timestamp > state.diamondStats.nextSpawnTimestamp) {
        game.createDiamond(state.diamondStats);
        state.diamondStats.nextSpawnTimestamp = timestamp + Math.random() * state.diamondStats.maxSpawnInterval;
    }
    // Render Diamond
    let diamondElements = document.querySelectorAll('.diamond');
    diamondElements.forEach(diamond => {
        let posY = parseInt(diamond.style.top);

        // Detect collsion with heart
        if (detectCollision(wizardElement, diamond)) {
            // state.wizard.health+=state.heartStats.addHealth;
            diamond.remove();
            diamondCount++;
        }
        if (posY < game.gameScreen.offsetHeight) {
            diamond.style.top = posY + state.diamondStats.speed + 'px';
        } else {
            diamond.remove();
        }
    });

    // Render wizard
    wizardElement.style.left = wizard.posX + 'px';
    wizardElement.style.top = wizard.posY + 'px';


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
    healthInterval--;
    if (healthInterval >= 100) {
        isBlink = true;
        healthCounter--;
        scoreScreenBlink("#e61a1ac9", game.healthScreen, healthCounter);
        wizardBlink(wizardElement);
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

}


function elementDirection(elementState){
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
        dir = elementDirection(elementState);
    }
    if(states.down && (dir == 'down' || dir == 'leftDown' || dir == 'rightDown')){
        dir = elementDirection(elementState);
    }
    if(states.left && (dir == 'left' || dir == 'leftUp' || dir == 'leftDown')){
        dir = elementDirection(elementState);
    }
    if(states.right && (dir == 'right' || dir == 'rightUp' || dir == 'rightDown')){
        dir = elementDirection(elementState);
    }
    return dir;
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

function wizardBlink(wizardElement) {
    if (healthInterval > 190) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (healthInterval > 180 && healthInterval <= 190) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
    if (healthInterval > 170 && healthInterval <= 180) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (healthInterval > 160 && healthInterval <= 170) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
    if (healthInterval > 150 && healthInterval <= 160) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (healthInterval > 140 && healthInterval <= 150) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
    if (healthInterval > 130 && healthInterval <= 140) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (healthInterval > 120 && healthInterval <= 130) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
    if (healthInterval > 110 && healthInterval <= 120) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (healthInterval > 100 && healthInterval <= 110) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
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

function gameOver() {
    const gameOver = document.createElement('h3');
    const startBtn = document.createElement('h3');
    startBtn.classList.add('start-btn');
    startBtn.textContent = 'Start again'
    gameOver.innerHTML = `<span>Game Over!</span><br/> Score: ${state.score.toFixed(0)}<br/> Level ${state.level}<br> Killed enemies: ${countKill}`;
    game.gameScreen.innerHTML = '';
    game.gameScreen.appendChild(gameOver);
    game.gameScreen.appendChild(startBtn);
    startBtn.addEventListener('click', () => {
        document.location.reload(true);
    });
    let body = document.getElementsByTagName('body')[0];
    body.addEventListener('keydown', (e) => {
        if (e.code == 'Enter' || e.code == 'NumpadEnter') {
            document.location.reload(true);
        }
    });
}
function gameWin() {
    const gameOver = document.createElement('h3');
    const startBtn = document.createElement('h3');
    startBtn.classList.add('start-btn');
    startBtn.textContent = 'Start again'
    gameOver.innerHTML = `<span1>You Win!</span1><br/> Score: ${state.score.toFixed(0)}<br/> Level ${state.level}<br> Killed enemies: ${countKill}`;
    game.gameScreen.innerHTML = '';
    game.gameScreen.appendChild(gameOver);
    game.gameScreen.appendChild(startBtn);
    startBtn.addEventListener('click', () => {
        document.location.reload(true);
    });
    let body = document.getElementsByTagName('body')[0];
    body.addEventListener('keydown', (e) => {
        if (e.code == 'Enter' || e.code == 'NumpadEnter') {
            document.location.reload(true);
        }
    });
}

function upLevel(state) {
    state.toNextLevel = 3000;
    state.neededScore = state.score;
    if (state.score > 3000) {
        state.level = 2;
        state.toNextLevel = 6000 - 3000;
        state.neededScore = state.score - 3000;
        state.bugStats.maxSpawnInterval = 3700;
        state.diamondStats.maxSpawnInterval = 13000;
        state.bugStats.width = 88;
        state.bugStats.height = 78;
    }
    if (state.score > 6000) {
        state.level = 3;
        state.toNextLevel = 9000 - 6000;
        state.neededScore = state.score - 6000;
        state.bugStats.maxSpawnInterval = 3400;
        state.bugStats.width = 86;
        state.bugStats.height = 75;
    }
    if (state.score > 9000) {
        state.level = 4;
        state.toNextLevel = 12000 - 9000;
        state.neededScore = state.score - 9000;
        state.bugStats.maxSpawnInterval = 3100;
        state.heartStats.maxSpawnInterval = 30000;
        state.diamondStats.maxSpawnInterval = 11000;
        state.bugStats.width = 84;
        state.bugStats.height = 73;
    }
    if (state.score > 12000) {
        state.level = 5;
        state.toNextLevel = 15000 - 12000;
        state.neededScore = state.score - 12000;
        state.bugStats.maxSpawnInterval = 2800;
        state.bugStats.width = 82;
        state.bugStats.height = 70;
        state.heartStats.speed = 4;
    }
    if (state.score > 15000) {
        state.level = 6;
        state.toNextLevel = 21000 - 15000;
        state.neededScore = state.score - 15000;
        state.bugStats.maxSpawnInterval = 2500;
        state.diamondStats.maxSpawnInterval = 10000;
        state.bugStats.width = 80;
        state.bugStats.height = 68;
    }
    if (state.score > 21000) {
        state.level = 7;
        state.toNextLevel = 27000 - 21000;
        state.neededScore = state.score - 21000;
        state.bugStats.maxSpawnInterval = 2200;
        state.bugStats.width = 78;
        state.bugStats.height = 65;
    }
    if (state.score > 27000) {
        state.level = 8;
        state.toNextLevel = 33000 - 27000;
        state.neededScore = state.score - 27000;
        state.bugStats.maxSpawnInterval = 1900;
        state.heartStats.maxSpawnInterval = 25000;
        state.diamondStats.maxSpawnInterval = 9000;
        state.bugStats.width = 76;
        state.bugStats.height = 63;
    }
    if (state.score > 33000) {
        state.level = 9;
        state.toNextLevel = 39000 - 33000;
        state.neededScore = state.score - 33000;
        state.bugStats.maxSpawnInterval = 1600;
        state.bugStats.width = 74;
        state.bugStats.height = 60;
    }
    if (state.score > 39000) {
        state.level = 10;
        state.toNextLevel = 45000 - 39000;
        state.neededScore = state.score - 39000;
        state.bugStats.maxSpawnInterval = 1300;
        state.diamondStats.maxSpawnInterval = 8000;
        state.bugStats.width = 72;
        state.bugStats.height = 58;
        state.heartStats.speed = 6;
    }
    if (state.score > 45000) {
        state.level = 11;
        state.toNextLevel = 55000 - 45000;
        state.neededScore = state.score - 45000;
    }
    if (state.score > 55000) {
        state.level = 12;
        state.toNextLevel = 65000 - 55000;
        state.neededScore = state.score - 55000;
        state.heartStats.maxSpawnInterval = 20000;
        state.diamondStats.maxSpawnInterval = 7000;
    }
    if (state.score > 65000) {
        state.level = 13;
        state.toNextLevel = 75000 - 65000;
        state.neededScore = state.score - 65000;
    }
    if (state.score > 75000) {
        state.level = 14;
        state.toNextLevel = 85000 - 75000;
        state.neededScore = state.score - 75000;
        state.diamondStats.maxSpawnInterval = 6000;
    }
    if (state.score > 85000) {
        state.level = 15;
        state.toNextLevel = 100000 - 85000;
        state.neededScore = state.score - 85000;
        state.heartStats.speed = 8;
    }
    if (state.score > 100000) {
        state.level = 16;
        state.toNextLevel = 120000 - 100000;
        state.neededScore = state.score - 100000;
        state.heartStats.maxSpawnInterval = 15000;
        state.diamondStats.maxSpawnInterval = 5000;
    }
    if (state.score > 120000) {
        state.level = 17;
        state.toNextLevel = 140000 - 120000;
        state.neededScore = state.score - 120000;
    }
    if (state.score > 140000) {
        state.level = 18;
        state.toNextLevel = 160000 - 140000;
        state.neededScore = state.score - 140000;
    }
    if (state.score > 160000) {
        state.level = 19;
        state.toNextLevel = 180000 - 160000;
        state.neededScore = state.score - 160000;
    }
    if (state.score > 180000) {
        state.level = 20;
        state.toNextLevel = 200000 - 180000;
        state.neededScore = state.score - 180000;
        state.heartStats.maxSpawnInterval = 10000;
    }
    if (state.score > 200000) {
        state.gameWin = true;
    }
    if (state.level < 16) {
        state.bugStats.speed = state.level * 1.3;
        state.scoreRate = state.startScoreRate * (state.level / 2);
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