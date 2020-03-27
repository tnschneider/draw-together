export default function throttle (type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function (e) {
        if (running) { return; }
        running = true;
        setTimeout(function () {
            obj.dispatchEvent(new MouseEvent(name, {
                clientX: e.clientX,
                clientY: e.clientY,
            }));
            running = false;
        }, 10);
    };
    obj.addEventListener(type, func);
}