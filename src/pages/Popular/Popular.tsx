import React, {useEffect, useState} from 'react'
import { getPopular} from '../../services';
import { MovieCard} from '../../components/MovieCard';
import { IMovieCard} from '../../components/MovieCard/types';
import { IMovieResponse } from './types';
import { MdSort } from "react-icons/md";

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPopularMovies = async() =>{
    await getPopular()
    .then((data) => {
      if(data && data.data){
        setMovies(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    setIsLoading(true);
    getPopularMovies()
  }, [])

  const [ordenadoPorTitulo, setOrdenadoPorTitulo] = useState(false);
  const [ordenadoPorVoto, setOrdenadoPorVoto] = useState(false);

  const ordenarPorTitulo = () => {
    setOrdenadoPorTitulo(true);
    setOrdenadoPorVoto(false); // Reiniciar el estado del otro botón
  };

  // Función para ordenar las películas por voto promedio
  const ordenarPorVotoAverage = () => {
    setOrdenadoPorVoto(true);
    setOrdenadoPorTitulo(false); // Reiniciar el estado del otro botón
  };


  return (
    <div className='mx-5'>
      <div className='flex justify-between my-7'>
        <h1 className='font-semibold text-3xl ml-5'>POPULAR</h1>
        <div className='flex gap-5 '>
          <button onClick={ordenarPorTitulo} className='bg-blue-500 px-3 py-1 font-bold rounded-lg text-white text-sm flex items-center justify-center gap-2'> <MdSort /><p>Sort by Name</p></button>
          <button onClick={ordenarPorVotoAverage}  className='bg-blue-500 px-3 py-1 font-bold rounded-lg text-white text-sm flex items-center justify-center gap-2'> <MdSort /><p>Sort by Calification</p></button>
        </div>
      </div>
      {!isLoading && <div> Loading </div> }
      <div className='flex flex-wrap gap-4 mb-12'>
        {movies?.length > 0 &&
          (ordenadoPorTitulo
            ? movies
                .slice()
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    genreId={movie.genre_ids[0]}
                    voteAverage={movie.vote_average}
                  />
                ))
            : ordenadoPorVoto
            ? movies
                .slice()
                .sort((a, b) => b.vote_average - a.vote_average)
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    genreId={movie.genre_ids[0]}
                    voteAverage={movie.vote_average}
                  />
                ))
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  posterPath={movie.poster_path}
                  title={movie.title}
                  genreId={movie.genre_ids[0]}
                  voteAverage={movie.vote_average}
                />
              )))}
      </div>
    </div>
  )
};

export default Popular