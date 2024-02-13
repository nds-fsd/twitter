export const handleKeyDown = (e) => {
  e.target.style.height = "inherit";
  e.target.style.height = `${e.target.scrollHeight}px`;
};
export const ajustarAlturaTextArea = (ref) => {
  const textArea = ref.current;
  if (textArea) {
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  }
};
