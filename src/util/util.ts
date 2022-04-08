export function autobind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

export class HideDiv {
  descContainer = document.querySelector(".desc-container") as HTMLDivElement;
  tempContainer = document.querySelector(".temp-container") as HTMLDivElement;
  cityContainer = document.querySelector(".city-container") as HTMLDivElement;

  constructor() {
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
