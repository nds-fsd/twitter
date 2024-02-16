export function formatDate(dateToChange) {
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const dateString = dateToChange.date;
  const dateObject = dateString ? new Date(dateString) : null;
  const formattedDate = dateObject
    ? new Intl.DateTimeFormat("es-ES", dateFormat).format(dateObject)
    : "Fecha no disponible";

  return {
    ...dateToChange,
    date: formattedDate.slice(0, -3),
  };
}
