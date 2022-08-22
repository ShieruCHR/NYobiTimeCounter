window.onclick = apply;
window.onload = apply;

function apply() {
    let total = calculateTotal();
    let nonWatched = calculateNonWatched();
    let watched = calculateWatched();
    let totalString = "動画時間の合計: " + formatTime(total) + "\n視聴済み: " + formatTime(watched) + "\n未視聴: " + formatTime(nonWatched);
    let element = document.getElementById("total-time");
    if (element == null) {
        element = document.createElement("p");
        element.id = "total-time";
        element.style.marginTop = "1%";
        element.style.color = "gray";
        document.getElementsByClassName("u-list-header")[0].appendChild(element);
    }
    element.innerText = totalString;
}

function formatTime(time) {
    return time[0] + "時間" + time[1] + "分" + time[2] + "秒";
}

function getAllTimeElements() {
    return Array.from(document.getElementsByClassName("movie-length"));
}

function calculate() {
    return sumAllTimes(getAllTimes(getAllTimeElements()));
}

function calculateTotal() {
    return sumAllTimes(getAllTimes(getAllTimeElements()));
}

function calculateNonWatched() {
    let allElements = getAllTimeElements();
    let nonWatchedElements = allElements.filter(element => {
        let card = element.parentElement.parentElement.parentElement;
        return !card.classList.contains("good") && !card.classList.contains("bad");
    });
    return sumAllTimes(getAllTimes(nonWatchedElements));
}

function calculateWatched() {
    let allElements = getAllTimeElements();
    let watchedElements = allElements.filter(element => {
        let card = element.parentElement.parentElement.parentElement;
        return card.classList.contains("good") || card.classList.contains("bad");
    });
    return sumAllTimes(getAllTimes(watchedElements));
}

function getAllTimes(timeElements) {
    let times = [];
    timeElements.forEach(element => {
        let splitted = element.innerText.split(":");
        times.push([
            parseInt(splitted[0]),
            parseInt(splitted[1])
        ]);
    });
    return times;
}

function sumAllTimes(times) {
    let totalSeconds = 0;
    times.forEach(time => {
        totalSeconds += time[0] * 60 + time[1];
    });

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    let seconds = totalSeconds - hours * 3600 - minutes * 60;
    return [hours, minutes, seconds];
}