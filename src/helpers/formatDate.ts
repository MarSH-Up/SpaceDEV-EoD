function formatDate(month: number, day: number, year: number): string {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  export default formatDate;