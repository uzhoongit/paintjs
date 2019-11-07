const geCanvas = document.getElementById("jsCanvas");
const gContext = geCanvas.getContext("2d");
//const gColor = document.querySelectorAll(".jsColor");
const gColor = document.getElementsByClassName("jsColor");
const geRangeThickness = document.getElementById("jsRangeThickness");
const geButtonMode = document.getElementById("jsButtonMode");
const geBTNSave = document.getElementById("jsButtonSave");

const DEFAULT_COLOR = "#2C2C2C";

let gbPainting = false;
let gbFillingMode = false;

gContext.strokeStyle = DEFAULT_COLOR;
gContext.fillStyle = DEFAULT_COLOR;
gContext.lineWidth = 2.5;

function onMouseMove(e) {
     if(gbPainting && !gbFillingMode) {
        gContext.lineTo(e.offsetX, e.offsetY);  // 끝점 지정
        gContext.stroke();                      // 그리기
    }
}

function onMouseDown(e) {
    gbPainting = true;
    if(gbPainting && !gbFillingMode) {
        gContext.beginPath();                   // 경로 열기
        gContext.moveTo(e.offsetX, e.offsetY);  // 시작점 지정
    } 
    
    if(gbFillingMode) {
        gContext.fillRect(0, 0, geCanvas.width, geCanvas.height);
    }
}

function onMouseUp(e) {
    gContext.closePath(); // 경로 닫기
    // gContext.stroke(); // closePath 하고 stroke 하면 시작점과 직선으로 자동 연결
    gbPainting = false;
}

function fnStopPainting() {
    gbPainting = false;
}

function handlePickColor(e) {
    gContext.strokeStyle = e.target.style.backgroundColor;
    gContext.fillStyle = gContext.strokeStyle;
}

function handleThickness(e) {
    gContext.lineWidth = e.target.value;
}

function handleMode() {
    if(gbFillingMode) {
        gbFillingMode = false
        geButtonMode.innerText = "PAINT";
    } else {
        gbFillingMode = true
        geButtonMode.innerText = "FILL";
    }
}

function handleSave() {
    const lLink = document.createElement("a");
    lLink.href = geCanvas.toDataURL("image/jpeg");
    lLink.download = "aaa";
    lLink.click();
}

if(geCanvas) {
    geCanvas.addEventListener("mousemove", onMouseMove);
    geCanvas.addEventListener("mousedown", onMouseDown);
    geCanvas.addEventListener("mouseup", onMouseUp);
    geCanvas.addEventListener("mouseleave", fnStopPainting);
}

Array.from(gColor).forEach(value => value.addEventListener("click", handlePickColor));

geRangeThickness.addEventListener("input", handleThickness);

geButtonMode.addEventListener("click", handleMode);

geBTNSave.addEventListener("click", handleSave);