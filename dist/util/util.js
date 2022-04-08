export function autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
export class HideDiv {
    constructor() {
        this.descContainer = document.querySelector(".desc-container");
        this.tempContainer = document.querySelector(".temp-container");
        this.cityContainer = document.querySelector(".city-container");
        this.hideAll();
    }
    hideAll() {
        this.tempContainer.style.visibility = "hidden";
        this.cityContainer.style.visibility = "hidden";
        this.descContainer.style.visibility = "hidden";
    }
    showAll() {
        this.tempContainer.style.visibility = "visible";
        this.cityContainer.style.visibility = "visible";
        this.descContainer.style.visibility = "visible";
    }
}
