//Function that returns the genres of the movie
export const setGenre = (idGenre, genres) => {
  const genreName = [];
  genres.forEach((genre) => {
    idGenre.forEach((id) => {
      if (id === genre.id) {
        genreName.push(`${genre.name}  `);
      }
    });
  });
  return genreName;
};
