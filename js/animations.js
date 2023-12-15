function wizardBlink(state, wizardElement) {
    if (state.healthInterval > 190) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (state.healthInterval > 180 && state.healthInterval <= 190) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
    if (state.healthInterval > 170 && state.healthInterval <= 180) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (state.healthInterval > 160 && state.healthInterval <= 170) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
    if (state.healthInterval > 150 && state.healthInterval <= 160) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (state.healthInterval > 140 && state.healthInterval <= 150) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
    if (state.healthInterval > 130 && state.healthInterval <= 140) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (state.healthInterval > 120 && state.healthInterval <= 130) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
    if (state.healthInterval > 110 && state.healthInterval <= 120) {
        wizardElement.style.backgroundImage = "url('../images/1Red.png')";
    }
    if (state.healthInterval > 100 && state.healthInterval <= 110) {
        wizardElement.style.backgroundImage = "url('../images/1.png')";
    }
}

function animateExplosion(bug, game, state){
    let height = bug.getBoundingClientRect().top + bug.getBoundingClientRect().height / 2;
    let width = bug.getBoundingClientRect().left + bug.getBoundingClientRect().width / 2;
    bug.remove();
    game.createBugExploxion(state.bugExplosionStats, width, height);
    game.createBugPoints(state.bugPointsStats, width, height);
}

function animateWizardExplosion(wizard, game, state){
    let height = wizard.getBoundingClientRect().top + wizard.getBoundingClientRect().height / 2;
    let width = wizard.getBoundingClientRect().left + wizard.getBoundingClientRect().width / 2;
    game.createWizardExplosion(state.bugExplosionStats, width, height);
}

function animateWizardHealthy(element, game, state){
    let height = element.getBoundingClientRect().top + element.getBoundingClientRect().height / 2;
    let width = element.getBoundingClientRect().left + element.getBoundingClientRect().width / 2;
    game.createWizardHealthy(state.bugExplosionStats, width, height);
}