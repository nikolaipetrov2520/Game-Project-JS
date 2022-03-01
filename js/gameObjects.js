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
        createBug(stats) {
            const bugElement = document.createElement('div');
            bugElement.classList.add('bug');
            bugElement.style.width = stats.width + 'px';
            bugElement.style.height = stats.height + 'px';
            bugElement.style.left = gameScreen.offsetWidth + 'px';
            bugElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + 'px';

            gameScreen.appendChild(bugElement);
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
            stats.addHealth = Math.ceil(Math.random() * (level + 3));
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
