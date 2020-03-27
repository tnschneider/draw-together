export default function throttle (type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function (e) {
        if (running) { return; }
        running = true;
        setTimeout(function () {
            obj.dispatchEvent(new MouseEvent(name, e));
            running = false;
        }, 10);
    };
    obj.addEventListener(type, func);
}