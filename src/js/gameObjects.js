function initGameObject() {
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');
    const scoreScreen = document.querySelector('.score');
    const levelScreen = document.querySelector('.level');

    return {
        startScreen,
        gameScreen,
        scoreScreen,
        levelScreen,
        createLevelProgress(){
            let levelProgress = document.createElement('div');
            levelProgress.classList.add('progress');
            levelScreen.appendChild(levelProgress);
            return levelProgress
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
            bugElement.style.left = gameScreen.offsetWidth - stats.width + 'px';
            bugElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + 'px';

            gameScreen.appendChild(bugElement);
        },
        createCloud(stats) {
            const cloudElement = document.createElement('div');
            cloudElement.classList.add('cloud');
            cloudElement.style.width = stats.width + 'px';
            cloudElement.style.height = stats.height + 'px';
            cloudElement.style.left = gameScreen.offsetWidth - stats.width + 'px';
            cloudElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight / 2 - stats.height)) + 'px';

            gameScreen.appendChild(cloudElement);
        },
        createTree1(stats) {
            const tree1Element = document.createElement('div');
            tree1Element.classList.add('tree1');
            tree1Element.style.width = stats.width + 'px';
            tree1Element.style.height = stats.height + 'px';
            tree1Element.style.left = gameScreen.offsetWidth - stats.width + 'px';
            tree1Element.style.top = gameScreen.offsetHeight - stats.height + 'px';

            gameScreen.appendChild(tree1Element);
        },
        createTree2(stats) {
            const tree2Element = document.createElement('div');
            tree2Element.classList.add('tree2');
            tree2Element.style.width = stats.width + 'px';
            tree2Element.style.height = stats.height + 'px';
            tree2Element.style.left = gameScreen.offsetWidth - stats.width + 'px';
            tree2Element.style.top = gameScreen.offsetHeight - stats.height + 'px';

            gameScreen.appendChild(tree2Element);
        },
    };
}
