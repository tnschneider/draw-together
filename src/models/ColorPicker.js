export default class ColorPicker {
    constructor(anchorEl) {
        this.picker = this.createPicker(anchorEl);
    }

    get color() {
        return this.picker.value;
    }

    createPicker(anchorEl) { 
        let picker = document.createElement('input');
        picker.type = 'color';
        picker.style.position = 'absolute';
        picker.style.top = '750px';
        picker.style.left = 0;
        anchorEl.appendChild(picker);
        return picker;
    }
}