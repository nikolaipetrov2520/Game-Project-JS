function initGameObject() {
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');
    const scoreScreen = document.querySelector('.score');
    const healthScreen = document.querySelector('.health');
    const player = document.getElementById('name');
    const inputScrean = document.getElementById('input');
    const collectables = document.querySelector('.collectables')
    const diamondCountElement = document.createElement('div');
    const heartCountElement = document.createElement('div');
    const spiderCountElement = document.createElement('div');

    return {
        startScreen,
        gameScreen,
        scoreScreen,
        player,
        inputScrean,
        healthScreen,
        collectables,
        diamondCountElement,
        heartCountElement,
        spiderCountElement,
        createLevelProgress(initialState){
            let levelProgress = document.createElement('div');
            levelProgress.classList.add('progress-red');

            levelProgress.style.width = initialState.width + 'px';
            levelProgress.style.height = initialState.height + 'px';

            levelProgress.style.left = initialState.posX + '%';
            levelProgress.style.top = initialState.posY + 'px';

            this.levelProgress = levelProgress;

            gameScreen.appendChild(levelProgress);

            return levelProgress
        },
        createEmptyProgress(initialState){
            let emptyProgress = document.createElement('div');
            emptyProgress.classList.add('progress-empty');

            emptyProgress.style.width = initialState.width + 'px';
            emptyProgress.style.height = initialState.height + 'px';

            emptyProgress.style.left = initialState.posX + '%';
            emptyProgress.style.top = initialState.posY + 'px';

            this.emptyProgress = emptyProgress;

            gameScreen.appendChild(emptyProgress);

            return emptyProgress
        },
        createHealthProgress(initialState){
            let healthProgress = document.createElement('div');
            healthProgress.classList.add('progress-red');
            healthProgress.style.width = initialState.width + 'px';
            healthProgress.style.height = initialState.height + 'px';

            healthProgress.style.left = initialState.posX + '%';
            healthProgress.style.top = (initialState.posY + 50) + 'px';

            this.healthProgress = healthProgress;

            gameScreen.appendChild(healthProgress);

            return healthProgress
        },
        createEmptyHealthProgress(initialState){
            let emptyHealthProgress = document.createElement('div');
            emptyHealthProgress.classList.add('progress-empty');

            emptyHealthProgress.style.width = initialState.width + 'px';
            emptyHealthProgress.style.height = initialState.height + 'px';

            emptyHealthProgress.style.left = initialState.posX + '%';
            emptyHealthProgress.style.top = (initialState.posY + 50) + 'px';

            this.emptyHealthProgress = emptyHealthProgress;

            gameScreen.appendChild(emptyHealthProgress);

            return emptyHealthProgress
        },
        createCapHealthProgress(captanStats, initialState, ){
            let healthCapProgress = document.createElement('div');
            healthCapProgress.classList.add('progress-red');
            healthCapProgress.style.width = initialState.width + 'px';
            healthCapProgress.style.height = initialState.height + 'px';

            healthCapProgress.style.left = captanStats.posX + 'px';
            healthCapProgress.style.top = captanStats.posY + 'px';

            this.healthCapProgress = healthCapProgress;

            gameScreen.appendChild(healthCapProgress);

            return healthCapProgress
        },
        createCapEmptyHealthProgress(captanStats, initialState){
            let emptyCapHealthProgress = document.createElement('div');
            emptyCapHealthProgress.classList.add('progress-empty');

            emptyCapHealthProgress.style.width = initialState.width + 'px';
            emptyCapHealthProgress.style.height = initialState.height + 'px';

            emptyCapHealthProgress.style.left = captanStats.posX + 'px';
            emptyCapHealthProgress.style.top = captanStats.posY + 'px';

            this.emptyCapHealthProgress = emptyCapHealthProgress;

            gameScreen.appendChild(emptyCapHealthProgress);

            return emptyCapHealthProgress
        },
        createIrHealthProgress(ironBigStats, initialState, ){
            let healthIrProgress = document.createElement('div');
            healthIrProgress.classList.add('progress-red');
            healthIrProgress.style.width = initialState.width + 'px';
            healthIrProgress.style.height = initialState.height + 'px';

            healthIrProgress.style.left = ironBigStats.posX + 'px';
            healthIrProgress.style.top = ironBigStats.posY + 'px';

            this.healthIrProgress = healthIrProgress;

            gameScreen.appendChild(healthIrProgress);

            return healthIrProgress
        },
        createIrEmptyHealthProgress(ironBigStats, initialState){
            let emptyIrHealthProgress = document.createElement('div');
            emptyIrHealthProgress.classList.add('progress-empty');

            emptyIrHealthProgress.style.width = initialState.width + 'px';
            emptyIrHealthProgress.style.height = initialState.height + 'px';

            emptyIrHealthProgress.style.left = ironBigStats.posX + 'px';
            emptyIrHealthProgress.style.top = ironBigStats.posY + 'px';

            this.emptyIrHealthProgress = emptyIrHealthProgress;

            gameScreen.appendChild(emptyIrHealthProgress);

            return emptyIrHealthProgress
        },
        createWizard(initialState) {
            let wizardElement = document.createElement('div');
            wizardElement.classList.add('wizard');

            wizardElement.style.width = initialState.width + 'px';
            wizardElement.style.height = initialState.height + 'px';

            wizardElement.style.left = initialState.posX + 'px';
            wizardElement.style.top = initialState.posY + 'px';

            this.wizardElement = wizardElement;

            gameScreen.appendChild(wizardElement);

            return wizardElement;
        },
        createFireball(wizard, fireball) {
            let fireballElement = document.createElement('div');
            fireballElement.classList.add('fireball');
            fireballElement.style.left = wizard.posX + wizard.width + 'px';
            fireballElement.style.top = wizard.posY + wizard.height / 3 - 10 + 'px';
            fireballElement.style.width = fireball.width + 'px';
            fireballElement.style.height = fireball.height + 'px';

            gameScreen.appendChild(fireballElement);
        },
        createIronFireball(ironBigStats, ironFireball) {
            let ironFireballElement = document.createElement('div');
            ironFireballElement.classList.add('ironFireball');
            ironFireballElement.style.left = ironBigStats.posX + 'px';
            ironFireballElement.style.top = ironBigStats.posY + ironBigStats.height / 3 - 10 + 'px';
            ironFireballElement.style.width = ironFireball.width + 'px';
            ironFireballElement.style.height = ironFireball.height + 'px';

            gameScreen.appendChild(ironFireballElement);
            return ironFireballElement;
        },
        createCaptanFireball(captanStats, captanFireball) {
            let captanFireballElement = document.createElement('div');
            captanFireballElement.classList.add('captanFireball');
            captanFireballElement.style.left = captanStats.posX + 'px';
            captanFireballElement.style.top = captanStats.posY + captanStats.height / 3 - 10 + 'px';
            captanFireballElement.style.width = captanFireball.width + 'px';
            captanFireballElement.style.height = captanFireball.height + 'px';

            gameScreen.appendChild(captanFireballElement);
            return captanFireballElement;
        },
        createBug(stats) {
            const bugElement = document.createElement('div');
            bugElement.classList.add('bug');
            bugElement.style.width = stats.width + 'px';
            bugElement.style.height = stats.height + 'px';
            bugElement.style.left = gameScreen.offsetWidth + 'px';
            bugElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + 'px';

            gameScreen.appendChild(bugElement);
        },
        createBugPoints(stats, left, top, points, size) {
            const bugPointsElement = document.createElement('div');
            bugPointsElement.classList.add('bugPoints');
            bugPointsElement.textContent = `+${points}`;
            bugPointsElement.style.fontSize = stats.fontSize * size + 'px';
            if(size > 1){
                bugPointsElement.style.fontWeight = "bold";
                bugPointsElement.style.color = "orange";
            }
            bugPointsElement.style.left = (left - stats.width / 2) + 'px';
            bugPointsElement.style.top = (top - stats.height / 2) + 'px';
            bugPointsElement.style.opacity = stats.opacity;
            gameScreen.appendChild(bugPointsElement);
        },
        createWizardHealthyPoint(stats, left, top) {
            const heartPointsElement = document.createElement('div');
            heartPointsElement.classList.add('heartPoints');
            heartPointsElement.textContent = `+${stats.heartStats.addHealth}`;
            heartPointsElement.style.fontSize = stats.heartPointsStats.fontSize+ 'px';
            heartPointsElement.style.left = (left - stats.heartPointsStats.width / 2) + 'px';
            heartPointsElement.style.top = (top - stats.heartPointsStats.height / 2) + 'px';
            heartPointsElement.style.opacity = stats.heartPointsStats.opacity;
            gameScreen.appendChild(heartPointsElement);
        },
        createLevel(stats) {
            const levelElement = document.createElement('div');
            levelElement.classList.add('level');
            levelElement.textContent = `Level ${stats.level}`;
            levelElement.style.fontSize = stats.levelStats.fontSize+ 'px';
            levelElement.style.left = stats.levelStats.posX + 'px';
            levelElement.style.top = stats.levelStats.posY + 'px';
            levelElement.style.opacity = stats.levelStats.opacity;
            gameScreen.appendChild(levelElement);
        },
        createBattleTimeText(stats) {
            const battleTimeTextElement = document.createElement('div');
            battleTimeTextElement.classList.add('battleTimeText');
            battleTimeTextElement.textContent = `Battle Time`;
            battleTimeTextElement.style.fontSize = stats.battleTimeTextStats.fontSize+ 'px';
            battleTimeTextElement.style.left = stats.battleTimeTextStats.posX + 'px';
            battleTimeTextElement.style.top = stats.battleTimeTextStats.posY + 'px';
            battleTimeTextElement.style.opacity = stats.battleTimeTextStats.opacity;
            gameScreen.appendChild(battleTimeTextElement);
        },
        createBugExploxion(stats, left, top) {
            const bugExplosionElement = document.createElement('div');
            bugExplosionElement.classList.add('bugExplosion');
            bugExplosionElement.style.width = stats.width + 'px';
            bugExplosionElement.style.height = stats.height + 'px';
            bugExplosionElement.style.left = (left - stats.width / 2) + 'px';
            bugExplosionElement.style.top = (top - stats.height / 2) + 'px';
            bugExplosionElement.style.opacity = stats.opacity;
            gameScreen.appendChild(bugExplosionElement);
        },
        createWizardExplosion(stats, left, top) {
            const wizardExplosionElement = document.createElement('div');
            wizardExplosionElement.classList.add('wizardExplosion');
            wizardExplosionElement.style.width = stats.width + 'px';
            wizardExplosionElement.style.height = stats.height + 'px';
            wizardExplosionElement.style.left = (left - stats.width / 2) + 'px';
            wizardExplosionElement.style.top = (top - stats.height / 2) + 'px';
            wizardExplosionElement.style.opacity = stats.opacity - 0.5;
            gameScreen.appendChild(wizardExplosionElement);
        },
        createWizardHealthy(stats, left, top) {
            const wizardHealthyElement = document.createElement('div');
            wizardHealthyElement.classList.add('wizardHelthy');
            wizardHealthyElement.style.width = stats.width + 'px';
            wizardHealthyElement.style.height = stats.height + 'px';
            wizardHealthyElement.style.left = (left - stats.width / 2) + 'px';
            wizardHealthyElement.style.top = (top - stats.height / 2) + 'px';
            wizardHealthyElement.style.opacity = stats.opacity;
            gameScreen.appendChild(wizardHealthyElement);
        },
        createSpider(stats) {
            stats.isDown = true;
            const spiderElement = document.createElement('div');
            spiderElement.classList.add('spider');
            spiderElement.style.width = stats.width + 'px';
            spiderElement.style.height = stats.height + 'px';
            spiderElement.style.left = Math.floor(Math.random() * (gameScreen.offsetWidth - stats.width)) + 'px';
            spiderElement.style.top = 0 - stats.height + 'px';
            
            gameScreen.appendChild(spiderElement);
        },
        createSpear(stats) {
            stats.isDown = true;
            const spearElement = document.createElement('div');
            spearElement.classList.add('spear');
            spearElement.style.width = stats.width + 'px';
            spearElement.style.height = stats.height + 'px';
            spearElement.style.left = Math.floor(Math.random() * (gameScreen.offsetWidth - stats.width)) + 'px';
            spearElement.style.top = gameScreen.offsetHeight + 'px';
            
            gameScreen.appendChild(spearElement);
        },
        createCaptan(stats) {
            const captanElement = document.createElement('div');
            captanElement.classList.add('captan');
            captanElement.style.width = stats.width + 'px';
            captanElement.style.height = stats.height + 'px';
            captanElement.style.left = gameScreen.offsetWidth + 'px';
            captanElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + 'px';
            
            gameScreen.appendChild(captanElement);
        },
        createIronBig(stats) {
            const ironBigElement = document.createElement('div');
            ironBigElement.classList.add('ironBig');
            ironBigElement.style.width = stats.width + 'px';
            ironBigElement.style.height = stats.height + 'px';
            ironBigElement.style.left = gameScreen.offsetWidth + 'px';
            ironBigElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + 'px';
            
            gameScreen.appendChild(ironBigElement);
        },
        createHeart(stats, level) {
            const heartElement = document.createElement('div');
            heartElement.classList.add('heart');
            stats.addHealth = Math.ceil(Math.random() * level);
            heartElement.textContent = `+${stats.addHealth}`;
            heartElement.style.width = stats.width + 'px';
            heartElement.style.height = stats.height + 'px';
            heartElement.style.left = Math.floor(Math.random() * (gameScreen.offsetWidth - stats.width)) + 'px';
            heartElement.style.top = gameScreen.offsetHeight+ 'px';
            heartElement.style.opacity = stats.opacity+'';

            gameScreen.appendChild(heartElement);
        },
        createDiamond(stats) {
            const diamondElement = document.createElement('div');
            diamondElement.classList.add('diamond');
            diamondElement.style.width = stats.width + 'px';
            diamondElement.style.height = stats.height + 'px';
            diamondElement.style.left = Math.floor(Math.random() * (gameScreen.offsetWidth - stats.width)) + 'px';
            diamondElement.style.top = 0 - stats.height + 'px';
            
            gameScreen.appendChild(diamondElement);
        },
        createCloud(stats) {
            const cloudElement = document.createElement('div');
            cloudElement.classList.add('cloud');
            cloudElement.style.width = stats.width + 'px';
            cloudElement.style.height = stats.height + 'px';
            cloudElement.style.left = gameScreen.offsetWidth + 'px';
            cloudElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight / 3 - stats.height)) + 'px';


            gameScreen.appendChild(cloudElement);
        },
        createTree1(stats) {
            const tree1Element = document.createElement('div');
            tree1Element.classList.add('tree1');
            tree1Element.style.width = stats.width + 'px';
            tree1Element.style.height = stats.height + 'px';
            tree1Element.style.left = gameScreen.offsetWidth + 'px';
            tree1Element.style.top = gameScreen.offsetHeight - stats.height + 'px';

            gameScreen.appendChild(tree1Element);
        },
        createTree2(stats) {
            const tree2Element = document.createElement('div');
            tree2Element.classList.add('tree2');
            tree2Element.style.width = stats.width + 'px';
            tree2Element.style.height = stats.height + 'px';
            tree2Element.style.left = gameScreen.offsetWidth + 'px';
            tree2Element.style.top = gameScreen.offsetHeight - stats.height + 'px';

            gameScreen.appendChild(tree2Element);
        },
    };
}
