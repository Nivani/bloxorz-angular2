export function initializeKeyboardInput(left: Function, right: Function, up: Function, down: Function) {
    document.documentElement.onkeydown = (event: KeyboardEvent) => {
        switch (event.keyCode) {
            case 37:
                left();
                break;
            case 38:
                up();
                break;
            case 39:
                right();
                break;
            case 40:
                down();
                break;
        }
    };
}