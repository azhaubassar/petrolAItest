const BASE_URL = 'http://api.tvmaze.com';
const MOVIES_CATALOGUE = `${BASE_URL}/shows`;
const MOVIE_BY_ID = `${MOVIES_CATALOGUE}`;


const getAllMovies = async () => {
  const URL = MOVIES_CATALOGUE;

  const params = {
    method: 'GET'
  };

  const response = await fetch(URL, params);
  const datas = await response.json();
  return datas;
};

const getMovieById = async (id: string) => {
    const URL = `${MOVIE_BY_ID}/${id}`;
    const params = {
      method: 'GET',
    };
  
    const response = await fetch(URL, params);
    const datas = await response.json();
    return datas;
};

export { getAllMovies,getMovieById };
