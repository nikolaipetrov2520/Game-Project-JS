let state = initState();
let game = initGameObject();
let body = document.getElementsByTagName('body')[0];

const availableKeys = [
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyW',
    'Space',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight'
];

document.addEventListener('keydown', (e) => {
    if (availableKeys.includes(e.code)) {
        state.keys[e.code] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (availableKeys.includes(e.code)) {
        state.keys[e.code] = false;
    }
});

game.startScreen.addEventListener('click', (e) => {
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');
    // Start game
    start(state, game);
});

body.addEventListener('keydown', (e) => {
   if(e.code == 'Enter' || e.code == 'NumpadEnter'){
     game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');
    
    // Start game
    start(state, game);
   }
});
