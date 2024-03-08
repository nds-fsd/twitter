export function formatDate(dateToChange) {
  const dateFormat = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const dateString = dateToChange.date || dateToChange.createdAt;
  const dateObject = dateString ? new Date(dateString) : null;
  const formattedDate = dateObject
    ? new Intl.DateTimeFormat("es-ES", dateFormat).format(dateObject)
    : "Fecha no disponible";

  const formattedDateString = formattedDate.slice(0, -3);
  const dateKey = dateToChange.date !== undefined ? "date" : "createdAt";

  return {
    ...dateToChange,
    [dateKey]: formattedDateString,
  };
}
