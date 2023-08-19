export const isTriggerDescendant: (child: HTMLElement) => boolean = function (child: HTMLElement) {
  let parentNode: ParentNode | null = child as ParentNode;

  while (parentNode && (parentNode as HTMLElement).classList) {
    if ((parentNode as HTMLElement).classList.contains("nmTrigger")) {
      return true;
    }
    parentNode = parentNode.parentNode;
  }

  return false;
};
