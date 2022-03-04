function initState() {
    let startX = Math.floor(Math.random() * 500);
    let startY = Math.floor(Math.random() * 500);

    const state = {
        player: '',
        gameOver: false,
        gameWin: false,
        score: 1,
        scoreRate: 0.02,
        startScoreRate: 0.02,
        killScore: 100,
        previousLevel: 1, 
        level: 1,
        toNextLevel: 1,
        neededScore: 1,
        wizard: {
            
            width: 57,
            height: 110,
            posX: startX,
            posY: startY,
            speed: 10,
            maxHealth: 100,
            health: 100,
        },
        bugStats: {
            width: 90,
            height: 80,
            nextSpawnTimestamp: 400,
            maxSpawnInterval: 4000,
            startInterval: 4000,
            speed: 2,
        },
        heartStats: {
            width: 54,
            height: 47,
            nextSpawnTimestamp: 20000,
            maxSpawnInterval: 35000,
            startInterval: 35000,
            speed: 2,
            addHealth: 0,
        },
        diamondStats: {
            width: 54,
            height: 43,
            nextSpawnTimestamp: 15000,
            maxSpawnInterval: 15000,
            startInterval: 15000,
            speed: 2,
        },
        spiderStats: {
            width: 90,
            height: 600,
            nextSpawnTimestamp: 10000,
            maxSpawnInterval: 20000,
            startInterval: 20000,
            speed: 2,
            isDown: true,
            isDed: false,
        },
        captanStats: {
            width: 130,
            height: 107,
            speed: 2,
            down: false,
            up: false,
            left: false,
            right: false,
            health: 10,
            maxHealth: 10,
            posX: 2000,
            posY: 2000,
        },
        ironBigStats: {
            width: 125,
            height: 150,
            speed: 2,
            down: false,
            up: false,
            left: false,
            right: false,
            health: 15,
            maxHealth: 15,
            posX: 2000,
            posY: 2000,
        },
        fireball: {
            width: 20,
            height: 20,
            speed: 12,
            nextSpawnTimestamp: 0,
            fireRate: 300,
        },
        ironFireball: {
            width: 45,
            height: 45,
            speed: 5,
            nextSpawnTimestamp: 0,
            fireRate:1800,
        },
        captanFireball: {
            width: 60,
            height: 30,
            speed: 2,
            nextSpawnTimestamp: 0,
            fireRate:2500,
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
            width: 116,
            height: 150,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 4000,
            speed: 1, 
        },
        progressBar: {
            width: 228,
            height: 15,
            posX: 84,
            posY: 145,
        },
        progressEmpty: {
            width: 230,
            height: 15,
            posX: 84,
            posY: 144,
        },
        healthBar: {
            width: 230,
            height: 15,
            posX: 67,
            posY: 145,
        },
        healthEmpty: {
            width: 230,
            height: 15,
            posX: 67,
            posY: 144,
        },
        capHealthBar: {
            width: 75,
            height: 4,
        },
        capHealthEmpty: {
            width: 75,
            height: 4,
        },
        irHealthBar: {
            width: 75,
            height: 4,
        },
        irHealthEmpty: {
            width: 75,
            height: 4,
        },
    }
    return state;
}