export function formatMeowDate(meow) {
  const dateFormat = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const dateString = meow.date;
  const dateObject = dateString ? new Date(dateString) : null;
  const formattedDate = dateObject
    ? new Intl.DateTimeFormat("es-ES", dateFormat).format(dateObject)
    : "Fecha no disponible";

  return {
    ...meow,
    date: formattedDate.slice(0, -3),
  };
}
