function scoreScreenBlink(state, color, screen, counter) {
    if (counter >= 0) {
        if (counter < 100 && counter >= 95) {
            screen.style.backgroundColor = color;
        } else if (counter < 95 && counter >= 90) {
            screen.style.backgroundColor = "#0942093b";
        } else if (counter < 90 && counter >= 85) {
            screen.style.backgroundColor = color;
        } else if (counter < 85 && counter >= 80) {
            screen.style.backgroundColor = "#0942093b";
        } else if (counter < 80 && counter >= 75) {
            screen.style.backgroundColor = color;
        } else if (counter < 75 && counter >= 70) {
            screen.style.backgroundColor = "#0942093b";
        } else if (counter < 70 && counter >= 65) {
            screen.style.backgroundColor = color;
        } else if (counter < 65 && counter >= 60) {
            screen.style.backgroundColor = "#0942093b";
        } else if (counter < 60 && counter >= 55) {
            screen.style.backgroundColor = color;
        } else if (counter < 55 && counter >= 50) {
            screen.style.backgroundColor = "#0942093b";
        }
    } else {
        state.isGetHearth = false;
    }
}