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