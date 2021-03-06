import LineBuffer from "./LineBuffer";

export default class BaseCanvas {
    constructor(anchorEl) {
        this.lineIds = [];
        this.mouseIsOver = false;
        this.canvas = this.createEl(anchorEl);
    }

    apply(lines) {
        let newLines = lines.filter(x => !this.lineIds.includes(x.id));
        for (let line of newLines) {
            let buffer = new LineBuffer(this.canvas.getContext('2d'), line.color, line.thickness);
            for (let pt of line.points) {
                buffer.push(pt);
            }
            this.lineIds.push(line.id);
        }
    }

    createEl(anchorEl) {
        let canvas = document.createElement('canvas');

        canvas.style.position = 'absolute';
        canvas.style.top = 0;
        canvas.style.left = 0;
        canvas.width = 1000;
        canvas.height = 700;
        canvas.style.border = 'solid 2px black';
        canvas.mouseIsOver = false;
        canvas.onmouseover = () => { this.mouseIsOver = true; }
        canvas.onmouseout = () => { this.mouseIsOver = false; }
        document.body.style.margin = 0;
        anchorEl.append(canvas);

        return canvas;
    }

    get left() {
        return this.canvas.getBoundingClientRect().left;
    }

    get top() {
        return this.canvas.getBoundingClientRect().top;
    }
}