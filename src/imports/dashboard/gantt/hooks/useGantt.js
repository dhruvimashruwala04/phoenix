import formatDate from "@/imports/core/utils/formatDate";

const useGantt = () => {
  const DAY = 24 * 60 * 60 * 1000;

  const addDays = (date, amount) => {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
  };

  const toDateString = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getScales = (view) => {
    switch (view) {
      case "day":
        return [
          { unit: "month", step: 1, format: "%F %Y" },
          { unit: "day", step: 1, format: "%d" },
        ];

      case "week":
        return [
          { unit: "month", step: 1, format: "%F %Y" },
          {
            unit: "week",
            step: 1,
            format: (date) => date.getDate(),
          },
        ];

      case "month":
        return [
          { unit: "year", step: 1, format: "%Y" },
          { unit: "month", step: 1, format: "%F" },
        ];

      default:
        return [];
    }
  };

  return {
    addDays,
    DAY,
    toDateString,
    getScales,
  };
};

export default useGantt;
