import React, {useEffect, useState} from 'react'
import { getPopular} from '../../services';
import { getTopRated} from '../../services';
import { getNowPlaying} from '../../services';
import { MovieCard } from '../../components/MovieCard';
import { IMovieCard} from '../../components/MovieCard/types';
import { movies as movieMock } from '../../constants/moviesMock';
import { IMovieResponse } from '../Popular/types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Routes/constants'

const Home: React.FC = () => {
  const [moviesPopular, setPopularMovies] = useState<IMovieResponse[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(false);
  
  const [moviesTopRated, setTopRatedMovies] = useState<IMovieResponse[]>([]);
  const [isLoadingTopRated, setIsLoadingTopRated] = useState<boolean>(false);
  
  const [moviesNowPlaying, setNowPlayingMovies] = useState<IMovieResponse[]>([]);
  const [isLoadingNowPlaying, setIsLoadingNowPlaying] = useState<boolean>(false);

  const getPopularMovies = async() =>{
    await getPopular()
    .then((data) => {
      if(data && data.data){
        console.log(data.data.results);
        setPopularMovies(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    setIsLoadingTopRated(true);
    getPopularMovies()
  }, [])
  

  const getTopRatedMovies = async() =>{
    await getTopRated()
    .then((data) => {
      if(data && data.data){
        console.log(data.data.results);
        setTopRatedMovies(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    setIsLoadingPopular(true);
    getTopRatedMovies()
  }, [])

  const getNowPlayingMovies = async() =>{
    await getNowPlaying()
    .then((data) => {
      if(data && data.data){
        console.log(data.data.results);
        setNowPlayingMovies(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    setIsLoadingNowPlaying(true);
    getNowPlayingMovies()
  }, [])







  
  const movieCards = []

  for(let i = 0; i < 12; i++) {

    
    movieCards.push(
      <MovieCard
      movieId={ movieMock[i].id}
      posterPath={ movieMock[i].poster_path}
      title={ movieMock[i].title}
      voteAverage={ movieMock[i].vote_average}
      genreId={ movieMock[i].genre_ids[0]}

    />
    )
  }

  return (
    <div className='mx-5'>
      <div className='flex justify-between my-7'>
        <h1 className='font-semibold text-3xl ml-5'>POPULAR</h1>
        <Link to={ROUTES.POPULAR}>
        <button className='bg-red-500 underline px-3 py-1 font-bold rounded-lg text-white text-sm'>View ALL</button>
        </Link>
      </div>

      {!isLoadingPopular && <div> Loading </div> }
      <div className='flex gap-4 overflow-hidden mb-12'>
        {moviesPopular?.length > 0 &&
        
        moviesPopular.map((movie) => (
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
      <div className='flex justify-between my-7'>
        <h1 className='font-semibold text-3xl ml-5'>TOP RATED</h1>
        <Link to={ROUTES.TOPRATED}>
        <button className='bg-red-500 underline px-3 py-1 font-bold rounded-lg text-white text-sm'>View ALL</button>
        </Link>
      </div>
      
      {!isLoadingTopRated && <div> Loading </div> }
      <div className='flex gap-4 overflow-hidden mb-12'>
        {moviesTopRated?.length > 0 &&
        
        moviesTopRated.map((movie) => (
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

      <div className='flex justify-between my-7'>
        <h1 className='font-semibold text-3xl ml-5'>NOW PLAYING</h1>
        <Link to={ROUTES.NOWPLAYING}>
        <button className='bg-red-500 underline px-3 py-1 font-bold rounded-lg text-white text-sm'>View ALL</button>
        </Link>
      </div>

      {!isLoadingNowPlaying && <div> Loading </div> }
      <div className='flex gap-4 overflow-hidden mb-12'>
        {moviesNowPlaying?.length > 0 &&
        
        moviesNowPlaying.map((movie) => (
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
}

export default Home