export default class ThicknessPicker {
    constructor(anchorEl) {
        this.picker = this.createPicker(anchorEl);
    }

    get thickness() {
        return this.picker.value;
    }

    createPicker(anchorEl) { 
        let picker = document.createElement('input');
        picker.type = 'range';
        picker.min = 1;
        picker.max = 10;
        picker.value = 3;
        picker.style.position = 'absolute';
        picker.style.top = '800px';
        picker.style.left = 0;
        anchorEl.appendChild(picker);
        return picker;
    }
}