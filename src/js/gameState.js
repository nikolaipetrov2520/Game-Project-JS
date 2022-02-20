function initState() {
    let startX = Math.floor(Math.random() * 1000);
    let startY = Math.floor(Math.random() * 500);

    const state = {
        player: 'Pesho',
        gameOver: false,
        score: 1,
        scoreRate: 0.02,
        killScore: 100,
        level: 1,
        toNextLevel: 1,
        wizard: {
            width: 57,
            height: 110,
            posX: startX,
            posY: startY,
            speed: 10,
        },
        bugStats: {
            width: 90,
            height: 80,
            startWidth: 90,
            startHight: 80,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 3000,
            startInterval: 3000,
            speed: 2,
        },
        fireball: {
            width: 20,
            height: 20,
            speed: 12,
            nextSpawnTimestamp: 0,
            fireRate: 300,
        },
        keys: {
            KeyA: false,
            KeyS: false,
            KeyD: false,
            KeyW: false,
            Space: false,
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
        },
        cloudStats: {
            width: 200,
            height: 200,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 8000,
            speed: 2, 
        },
        tree1Stats: {
            width: 90,
            height: 130,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 6000,
            speed: 1, 
        },
        tree2Stats: {
            width: 100,
            height: 150,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 4000,
            speed: 1, 
        },
    }

    return state;
}