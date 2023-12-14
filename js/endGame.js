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