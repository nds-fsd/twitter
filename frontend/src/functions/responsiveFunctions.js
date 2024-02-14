export function handleResize(setPantallaPequena) {
  const handleResize = () => {
    const esPantallaPequena = window.matchMedia("(max-width: 1000px)").matches;
    setPantallaPequena(esPantallaPequena);
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}
