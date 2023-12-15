function upLevel(state) {
    state.toNextLevel = 1000;
    state.neededScore = state.score;

    if(state.score > 200000){
        state.gameWin = true;
    }
    else if(state.score > 190000){
        state.level = 40;
        state.toNextLevel = 200000 - 190000;
        state.neededScore = state.score - 190000;
    }
    else if(state.score > 180000){
        state.level = 39;
        state.toNextLevel = 190000 - 180000;
        state.neededScore = state.score - 180000;
        state.heartStats.maxSpawnInterval = 10000;
    }
    else if(state.score > 170000){
        state.level = 38;
        state.toNextLevel = 180000 - 170000;
        state.neededScore = state.score - 170000; 
    }
    else if(state.score > 160000){
        state.level = 37;
        state.toNextLevel = 170000 - 160000;
        state.neededScore = state.score - 160000;
    }
    else if(state.score > 150000){
        state.level = 36;
        state.toNextLevel = 160000 - 150000;
        state.neededScore = state.score - 150000;   
    }
    else if(state.score > 140000){
        state.level = 35;
        state.toNextLevel = 150000 - 140000;
        state.neededScore = state.score - 140000;
    }
    else if(state.score > 130000){
        state.level = 34;
        state.toNextLevel = 140000 - 130000;
        state.neededScore = state.score - 130000; 
    }
    else if(state.score > 120000){
        state.level = 33;
        state.toNextLevel = 130000 - 120000;
        state.neededScore = state.score - 120000;
    }
    else if(state.score > 110000){
        state.level = 32;
        state.toNextLevel = 120000 - 110000;
        state.neededScore = state.score - 110000;
    }
    else if(state.score > 100000){
        state.level = 31;
        state.toNextLevel = 110000 - 100000;
        state.neededScore = state.score - 100000;
        state.heartStats.maxSpawnInterval = 15000;
        state.diamondStats.maxSpawnInterval = 5000;
    }
    else if(state.score > 90000){
        state.level = 30;
        state.toNextLevel = 100000 - 90000;
        state.neededScore = state.score - 90000;   
    }
    else if(state.score > 85000){
        state.level = 29;
        state.toNextLevel = 90000 - 85000;
        state.neededScore = state.score - 85000;
        state.heartStats.speed = 8;
    }
    else if(state.score > 80000){
        state.level = 28;
        state.toNextLevel = 85000 - 80000;
        state.neededScore = state.score - 80000; 
    }
    else if(state.score > 75000){
        state.level = 27;
        state.toNextLevel = 80000 - 75000;
        state.neededScore = state.score - 75000;
        state.diamondStats.maxSpawnInterval = 6000;
    }
    else if(state.score > 70000){
        state.level = 26;
        state.toNextLevel = 75000 - 70000;
        state.neededScore = state.score - 70000;
    }
    else if(state.score > 65000){
        state.level = 25;
        state.toNextLevel = 70000 - 65000;
        state.neededScore = state.score - 65000;
    }
    else if(state.score > 60000){
        state.level = 24;
        state.toNextLevel = 65000 - 60000;
        state.neededScore = state.score - 60000; 
    }
    else if(state.score > 55000){
        state.level = 23;
        state.toNextLevel = 60000 - 55000;
        state.neededScore = state.score - 55000;
        state.heartStats.maxSpawnInterval = 20000;
        state.diamondStats.maxSpawnInterval = 7000;
    }
    else if(state.score > 50000){
        state.level = 22;
        state.toNextLevel = 55000 - 50000;
        state.neededScore = state.score - 50000;  
    }
    else if(state.score > 45000){
        state.level = 21;
        state.toNextLevel = 50000 - 45000;
        state.neededScore = state.score - 45000;
    }
    else if(state.score > 40000){
        state.level = 20;
        state.toNextLevel = 45000 - 40000;
        state.neededScore = state.score - 40000; 
    }
    else if(state.score > 36000){
        state.level = 19;
        state.toNextLevel = 40000 - 36000;
        state.neededScore = state.score - 36000;
        state.bugStats.maxSpawnInterval = 1300;
        state.diamondStats.maxSpawnInterval = 8000;
        state.bugStats.width = 72;
        state.bugStats.height = 58;
        state.heartStats.speed = 6;
    }
    else if(state.score > 32000){
        state.level = 18;
        state.toNextLevel = 36000 - 32000;
        state.neededScore = state.score - 32000; 
    }
    else if(state.score > 28000){
        state.level = 17;
        state.toNextLevel = 32000 - 28000;
        state.neededScore = state.score - 28000;
        state.bugStats.maxSpawnInterval = 1600;
        state.bugStats.width = 74;
        state.bugStats.height = 60;
    }
    else if(state.score > 25000){
        state.level = 16;
        state.toNextLevel = 28000 - 25000;
        state.neededScore = state.score - 25000; 
    }
    else if(state.score > 22000){
        state.level = 15;
        state.toNextLevel = 25000 - 22000;
        state.neededScore = state.score - 22000;
        state.bugStats.maxSpawnInterval = 1900;
        state.heartStats.maxSpawnInterval = 25000;
        state.diamondStats.maxSpawnInterval = 9000;
        state.bugStats.width = 76;
        state.bugStats.height = 63;
    }
    else if(state.score > 19000){
        state.level = 14;
        state.toNextLevel = 22000 - 19000;
        state.neededScore = state.score - 19000;
    }
    else if(state.score > 16000){
        state.level = 13;
        state.toNextLevel = 19000 - 16000;
        state.neededScore = state.score - 16000;
        state.bugStats.maxSpawnInterval = 2200;
        state.bugStats.width = 78;
        state.bugStats.height = 65;
    }
    else if(state.score > 14000){
        state.level = 12;
        state.toNextLevel = 16000 - 14000;
        state.neededScore = state.score - 14000;
    }
    else if(state.score > 12000){
        state.level = 11;
        state.toNextLevel = 14000 - 12000;
        state.neededScore = state.score - 12000;
        state.bugStats.maxSpawnInterval = 2500;
        state.diamondStats.maxSpawnInterval = 10000;
        state.bugStats.width = 80;
        state.bugStats.height = 68;
    }
    else if(state.score > 10000){
        state.level = 10;
        state.toNextLevel = 12000 - 10000;
        state.neededScore = state.score - 10000; 
    }
    else if(state.score > 8000){
        state.level = 9;
        state.toNextLevel = 10000 - 8000;
        state.neededScore = state.score - 8000;
        state.bugStats.maxSpawnInterval = 2800;
        state.bugStats.width = 82;
        state.bugStats.height = 70;
        state.heartStats.speed = 4;
    }
    else if(state.score > 7000){
        state.level = 8;
        state.toNextLevel = 8000 - 7000;
        state.neededScore = state.score - 7000;   
    }
    else if(state.score > 6000){
        state.level = 7;
        state.toNextLevel = 7000 - 6000;
        state.neededScore = state.score - 6000;
        state.bugStats.maxSpawnInterval = 3100;
        state.heartStats.maxSpawnInterval = 30000;
        state.diamondStats.maxSpawnInterval = 11000;
        state.bugStats.width = 84;
        state.bugStats.height = 73;
    }
    else if(state.score > 5000){
        state.level = 6;
        state.toNextLevel = 6000 - 5000;
        state.neededScore = state.score - 5000;  
    }
    else if(state.score > 4000){
        state.level = 5;
        state.toNextLevel = 5000 - 4000;
        state.neededScore = state.score - 4000;
    }
    else if(state.score > 3000){
        state.level = 4;
        state.toNextLevel = 4000 - 3000;
        state.neededScore = state.score - 3000;
        state.bugStats.maxSpawnInterval = 3400;
        state.bugStats.width = 86;
        state.bugStats.height = 75;
    }
    else if(state.score > 2000){
        state.level = 3;
        state.toNextLevel = 3000 - 2000;
        state.neededScore = state.score - 2000;
    }
    else if(state.score > 1000){
        state.level = 2;
        state.toNextLevel = 2000 - 1000;
        state.neededScore = state.score - 1000;
        state.bugStats.maxSpawnInterval = 3700;
        state.diamondStats.maxSpawnInterval = 13000;
        state.bugStats.width = 88;
        state.bugStats.height = 78;
    }

    if (state.level < 20) {
        state.bugStats.speed = state.level * 1.1;
        state.scoreRate = state.startScoreRate * (state.level / 2);
    }
}