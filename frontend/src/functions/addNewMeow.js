import { getUserSession } from "./localStorage.js";
import { formatDate } from "./dateFormat.js";

export function updateMeowsWithNewMeow(meows, newMeow) {
  if (!newMeow) return meows;

  const { name, surname, username } = getUserSession();
  const newMeowToShow = {
    ...newMeow,
    nameAuthor: name,
    surnameAuthor: surname,
    authorUsername: username,
    date: formatDate(newMeow).date,
  };

  return [newMeowToShow, ...meows];
}
