"use strict";
var cizimAlani = null,
	btnEraser = null,
    btnClear = null,
    btnSave = null,
    inputColor = null,
    inputSize = null,
    paint = null,
    canvasWidth = 1050,
    canvasHeight = 700,
    ciziliyor = false,
    lineWidth = 3;

function initialize() {
    cizimAlani = document.querySelector("#canvas-area");
    cizimAlani.width = canvasWidth;
    cizimAlani.height = canvasHeight;

    paint = cizimAlani.getContext("2d");

	btnEraser =document.querySelector("#erase");
    btnClear = document.querySelector("#clear");
    btnSave = document.querySelector("#save");
    inputColor = document.querySelector("#color");
    inputSize = document.querySelector("#size");

    window.onmouseup = function () {
        ciziliyor = false;
        paint.beginPath();
    }

    cizimAlani.onmousedown = function (e) {
        ciziliyor = true;
    }

    cizimAlani.onmousemove = function (e) {
        if (ciziliyor) {
            paint.lineTo(e.offsetX, e.offsetY);
            paint.lineWidth = lineWidth * 2;
            paint.lineCap = "round";
            paint.lineJoin = "round";
            paint.stroke();
            paint.beginPath();
            paint.arc(e.offsetX, e.offsetY, lineWidth, 0, 2 * Math.PI, true);
            paint.fill();
            paint.beginPath();
            paint.moveTo(e.offsetX, e.offsetY);
        }
    }

    btnClear.onclick = function () {
        paint.clearRect(0, 0, cizimAlani.width, cizimAlani.height);
    }

    btnSave.onclick = function () {
        cizimAlani.toBlob(function (blob) {
            var link = document.createElement("a");
            link.download = "cizim.png";
            link.href = URL.createObjectURL(blob);
            link.dispatchEvent(new MouseEvent('click'));
        }, 'image/png', 1);
    }

    inputColor.onchange = function () {
        paint.fillStyle = this.value;
        paint.strokeStyle = this.value;
    }

    inputSize.onchange = function () {
        lineWidth = this.value;
    }
}

window.onload = initialize;