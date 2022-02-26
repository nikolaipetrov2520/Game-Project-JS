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
   // if(game.player.value != ''){
        game.startScreen.classList.add('hidden');
        game.inputScrean.classList.add('hidden');
        game.gameScreen.classList.remove('hidden');
        // Start game
        start(state, game);
   // }
    
});

game.player.addEventListener('keydown', (e) => {
    if(e.code == 'Enter' || e.code == 'NumpadEnter'){
        if(game.player.value != ''){
            game.startScreen.classList.add('hidden');
            game.gameScreen.classList.remove('hidden'); 
            game.inputScrean.classList.add('hidden');   
            // Start game
            start(state, game);
        }
    }
 }, { once: true });

// body.addEventListener('keydown', (e) => {
//    if(e.code == 'Enter' || e.code == 'NumpadEnter'){
//         game.startScreen.classList.add('hidden');
//         game.gameScreen.classList.remove('hidden');    
//         // Start game
//         start(state, game);
//    }
// }, { once: true });
