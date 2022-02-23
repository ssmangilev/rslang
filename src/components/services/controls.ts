class Control<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(
    parentNode: HTMLElement | null,
    tagName = "div",
    className = "",
    idName = "",
    content = "",
    authorization = false
  ) {
    const el = document.createElement(tagName);
    el.id = idName;
    el.className = className;
    el.textContent = content;
    if (parentNode) {
      parentNode.append(el);
    }
    if (authorization) {
      el.style.display = localStorage.getItem("token") ? "block" : "none";
    }
    this.node = el as NodeType;
  }

  // eslint-disable-next-line class-methods-use-this
  destroyСontent(parent: HTMLElement): void {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  destroyNode(): void {
    this.node.remove();
  }
}

export default Control;
