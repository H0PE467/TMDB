import React, {useEffect, useState} from 'react'
import { MovieCard } from '../../components/MovieCard';
import { movies } from '../../constants/moviesMock';
import { MdSort } from "react-icons/md";
import { IMovieResponse } from './types';
import { getTopRated } from '../../services';

const TopRated: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTopRatedMovies = async() =>{
    await getTopRated()
    .then((data) => {
      if(data && data.data){
        console.log(data.data.results);
        setMovies(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    setIsLoading(true);
    getTopRatedMovies()
  }, [])

  return (
    <div className='mx-5'>
      <div className='flex justify-between my-7'>
        <h1 className='font-semibold text-3xl ml-5'>TOP RATED</h1>
        <div className='flex gap-5 '>
          <button className='bg-blue-500 px-3 py-1 font-bold rounded-lg text-white text-sm flex items-center justify-center gap-2'> <MdSort /><p>Sort by Name</p></button>
          <button className='bg-blue-500 px-3 py-1 font-bold rounded-lg text-white text-sm flex items-center justify-center gap-2'> <MdSort /><p>Sort by Name</p></button>
        </div>
      </div>
      {!isLoading && <div> Loading </div> }
      <div className='flex flex-wrap gap-4 mb-12'>
        {movies?.length > 0 &&
        
        movies.map((movie) => (
          <MovieCard
            key = {movie.id}
            movieId = {movie.id}
            posterPath = {movie.poster_path}
            title = {movie.title}
            genreId = {movie.genre_ids[0]}
            voteAverage = {movie.vote_average}

          />
        ))}
      </div>

    </div>
  )
};

export default TopRated