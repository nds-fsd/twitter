import { getUserSession } from "./localStorage.js";
import { formatMeowDate } from "./dateFormat.js";

export function updateMeowsWithNewMeow(meows, newMeow) {
  if (!newMeow) return meows;

  const { name, surname, username } = getUserSession();
  const newMeowToShow = {
    ...newMeow,
    nameAuthor: name,
    surnameAuthor: surname,
    authorUsername: username,
    date: formatMeowDate(newMeow).date,
  };

  return [newMeowToShow, ...meows];
}
