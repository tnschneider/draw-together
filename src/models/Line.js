import uuidv4 from "../utils/guid";

export default class Line {
    constructor(color, thickness) {
        this.id = uuidv4();
        this.color = color;
        this.thickness = thickness;
        this.points = [];
    }

    push(point) {
        this.points.push(point);
    }
}