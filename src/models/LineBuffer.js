import Line from "./Line";

export default class LineBuffer {
    constructor(ctx, color, thickness) {
        this.ctx = ctx;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = thickness;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.buf = [];
        this.currentLine = new Line(color, thickness);
    }

    push (point) {
        this.currentLine.push(point);
        this.buf.unshift(point);
        
        if (this.buf.length > 4) {
            this.buf.pop();
        }

        if (this.buf.length === 4) {
            this.ctx.moveTo(this.buf[0].x, this.buf[0].y);
            this.ctx.bezierCurveTo(this.buf[1].x, this.buf[1].y, this.buf[2].x, this.buf[2].y, this.buf[3].x, this.buf[3].y);
            this.ctx.stroke();
            this.buf = [{
                x: this.buf[0].x,
                y: this.buf[0].y
            }];
        }
    }

    flush() {
        if (this.buf.length === 1) {
            this.ctx.moveTo(this.buf[0].x, this.buf[0].y);
            this.ctx.lineTo(this.buf[0].x, this.buf[0].y);
        } else if (this.buf.length === 2) {
            this.ctx.moveTo(this.buf[0].x, this.buf[0].y);
            this.ctx.lineTo(this.buf[1].x, this.buf[1].y);
        } else if (this.buf.length === 3) {
            this.ctx.moveTo(this.buf[0].x, this.buf[0].y);
            this.ctx.quadraticCurveTo(this.buf[1].x, this.buf[1].y, this.buf[2].x, this.buf[2].y);
        }
        
        this.ctx.stroke();

        return this.currentLine;
    }
}