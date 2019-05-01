
var minDate = new Date();
minDate.setDate(minDate.getDate() - 365);
var minDd = minDate.getDate();
var minMm = minDate.getMonth() + 1; //January is 0!
var minYyyy = minDate.getFullYear();

if (minDd < 10) {
    minDd = '0' + minDd;
}

if (minMm < 10) {
    minMm = '0' + minMm;
}

minDate = minYyyy + '-' + minMm + '-' + minDd;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("dateRangeFrom").setAttribute("max", today);
document.getElementById("dateRangeTo").setAttribute("max", today);

document.getElementById("dateRangeFrom").setAttribute("min", minDate);
document.getElementById("dateRangeto").setAttribute("min", minDate);