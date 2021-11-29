export const getModalRoot = () => {
  const createModalRootElement = () => {
    const modalRootElement = document.createElement('div');
    modalRootElement.setAttribute('id', 'modal');
    return modalRootElement;
  };

  const attachModalRootElementToDom = (modalRootElement: HTMLDivElement) => {
    document.body.appendChild(modalRootElement);
    return modalRootElement;
  };

  return attachModalRootElementToDom(createModalRootElement());
};
