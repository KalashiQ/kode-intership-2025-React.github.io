import { User } from "../types";

export const sortUsersByAlphabet = (users: User[]): User[] => {
  return [...users].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });
};

export const sortUsersByBirthday = (users: User[]): User[] => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return [...users].sort((a, b) => {
    const [, monthA, dayA] = a.birthday.split("-");
    const [, monthB, dayB] = b.birthday.split("-");

    const dateA = new Date(currentYear, parseInt(monthA) - 1, parseInt(dayA));
    const dateB = new Date(currentYear, parseInt(monthB) - 1, parseInt(dayB));

    if (dateA < currentDate) {
      dateA.setFullYear(currentYear + 1);
    }
    if (dateB < currentDate) {
      dateB.setFullYear(currentYear + 1);
    }

    return dateA.getTime() - dateB.getTime();
  });
};
