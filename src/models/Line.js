import uuidv4 from "../utils/guid";

export default class Line {
    constructor() {
        this.id = uuidv4();
        this.points = [];
    }

    push(point) {
        this.points.push(point);
    }
}