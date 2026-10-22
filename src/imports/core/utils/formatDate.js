const formatDate = (date, type = "short") => {
  if (!date) return "";

  const formats = {
    short: { day: "numeric", month: "short" },
    long: { day: "numeric", month: "short", year: "numeric" },
    month: { month: "short", year: "numeric" },
  };

  return new Date(date).toLocaleDateString("en-US", formats[type]);
};

export default formatDate;
