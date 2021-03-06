export const getModalRoot = () => {
  const createModalRootElement = () => {
    const modalRootElement = document.getElementById('modal') || document.createElement('div');
    modalRootElement.setAttribute('id', 'modal');
    return modalRootElement as HTMLDivElement;
  };

  const attachModalRootElementToDom = (modalRootElement: HTMLDivElement) => {
    document.body.appendChild(modalRootElement);
    return modalRootElement;
  };

  return attachModalRootElementToDom(createModalRootElement());
};
