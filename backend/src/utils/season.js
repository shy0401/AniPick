function getCurrentSeasonAndYear(date = new Date()) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month >= 1 && month <= 3) return { season: 'WINTER', year };
  if (month >= 4 && month <= 6) return { season: 'SPRING', year };
  if (month >= 7 && month <= 9) return { season: 'SUMMER', year };

  return { season: 'FALL', year };
}

module.exports = { getCurrentSeasonAndYear };
