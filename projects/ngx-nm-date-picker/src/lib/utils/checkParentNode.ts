export const isClassDescendant: (child: HTMLElement, className: string) => boolean = (
  child: HTMLElement,
  className: string
) => {
  let parentNode: ParentNode | null = child as ParentNode;

  while (parentNode && (parentNode as HTMLElement).classList) {
    if ((parentNode as HTMLElement).classList.contains(className)) {
      return true;
    }
    parentNode = parentNode.parentNode;
  }

  return false;
};

export const removeParentNodeListener: (child: HTMLElement, className: string) => void = (
  child: HTMLElement,
  className: string
) => {
  let parentNode: ParentNode | null = child as ParentNode;

  while (parentNode && (parentNode as HTMLElement).classList) {
    if ((parentNode as HTMLElement).classList.contains(className)) {
      const cloneNode = (parentNode as HTMLElement).cloneNode();
      (parentNode as HTMLElement).replaceWith(cloneNode)
    }
    parentNode = parentNode.parentNode;
  }
};
