import LineBuffer from "./LineBuffer";

export default class DrawingCanvas {
    constructor(anchorEl, point, color, thickness) {
        this.anchorEl = anchorEl;

        this.canvas = this.createDrawingCanvas();

        this.lineBuffer = new LineBuffer(this.canvas.getContext('2d'), color, thickness);

        this.draw(point);
    }

    draw(point) {
        this.lineBuffer.push(point);
    }

    flush() {
        let line = this.lineBuffer.flush();
        this.canvas.parentElement.removeChild(this.canvas);
        return line;
    }

    createDrawingCanvas() {
        let canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = 0;
        canvas.style.left = 0;
        canvas.width = 1000;
        canvas.height = 700;
        canvas.style.zIndex = 1000;
        canvas.style.border = 'solid 2px black';
        this.anchorEl.append(canvas);
        return canvas;
    }
}