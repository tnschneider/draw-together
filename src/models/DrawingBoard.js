import throttle from "../utils/throttle";
import DrawingCanvas from "./DrawingCanvas";
import BaseCanvas from "./BaseCanvas";
import SocketIo from 'socket.io-client';
import ColorPicker from "./ColorPicker";
import ThicknessPicker from "./ThicknessPicker";

export default class DrawingBoard {
    constructor(anchor) {
        this.isDrawing = false;

        this.anchorEl = typeof(anchor) == 'string'
            ? document.querySelector(anchor)
            : this.anchorEl = anchor;

        this.baseCanvas = new BaseCanvas(this.anchorEl);
        this.colorPicker = new ColorPicker(this.anchorEl);
        this.thicknessPicker = new ThicknessPicker(this.anchorEl);

        this.drawingCanvas = null;

        this.allLines = [];

        throttle('mousemove', 'throttledmousemove');

        window.onmousedown = (e) => {
            if (!this.baseCanvas.mouseIsOver) return;
            this.startDrawing({ x: e.clientX, y: e.clientY });
        }

        window.onmouseup = (e) => {
            if (!this.isDrawing) return;
            this.stopDrawing({ x: e.clientX, y: e.clientY });
        }

        window.addEventListener('throttledmousemove', (e) => {
            if (!this.isDrawing) return;
            this.draw({ x: e.clientX, y: e.clientY });
        });

        this.socket = SocketIo('http://localhost:8080');
        this.socket.on('draw', (lines) => {
            this.baseCanvas.apply(lines);
        })
        this.socket.emit('setRoom', 'theRoom');
    }

    startDrawing(point) {
        this.isDrawing = true;
        this.drawingCanvas = new DrawingCanvas(this.anchorEl, this.normalize(point), this.colorPicker.color, this.thicknessPicker.thickness);
    }

    draw(point) {
        this.drawingCanvas.draw(this.normalize(point));
    }

    async stopDrawing() {
        var line = this.drawingCanvas.flush();
        this.baseCanvas.apply([line]);
        this.socket.emit('draw', [line]);
        this.allLines.push(line);
        this.drawingCanvas = null;
        this.isDrawing = false;
    }

    normalize(point) {
        return {
            x: point.x - this.baseCanvas.left,
            y: point.y - this.baseCanvas.top
        }
    }
}