const geCanvas = document.getElementById("jsCanvas");
const gContext = geCanvas.getContext("2d");

let gbPainting = false;

function onMouseMove(e) {
     if(gbPainting) {
        gContext.lineTo(e.offsetX, e.offsetY);
        gContext.stroke();
    }
}

function onMouseDown(e) {
    gbPainting = true;

    gContext.beginPath();
    gContext.moveTo(e.offsetX, e.offsetY);
}

function onMouseUp(e) {
    gContext.closePath();
    // gContext.stroke();
    gbPainting = false;
}

function fnStopPainting() {
    gbPainting = false;
}

if(geCanvas) {
    geCanvas.addEventListener("mousemove", onMouseMove);
    geCanvas.addEventListener("mousedown", onMouseDown);
    geCanvas.addEventListener("mouseup", onMouseUp);
    geCanvas.addEventListener("mouseleave", fnStopPainting);
}