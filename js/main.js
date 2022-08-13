window.onclick = apply;
window.onload = apply;

function apply() {
    let total = calculate();
    let totalString = "動画時間の合計: " + total[0] + "時間" + total[1] + "分" + total[2] + "秒";
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

function calculate() {
    let timeElements = Array.from(document.getElementsByClassName("movie-length"));
    let times = [];
    timeElements.forEach(element => {
        let splitted = element.innerText.split(":");
        times.push([parseInt(splitted[0]), parseInt(splitted[1])]);
    });

    let totalSeconds = 0;
    times.forEach(time => {
        totalSeconds += time[0] * 60 + time[1];
    });

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    let seconds = totalSeconds - hours * 3600 - minutes * 60;
    return [hours, minutes, seconds];
}