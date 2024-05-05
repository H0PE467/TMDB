import React, {useEffect, useState, useRef } from 'react'
import { getPopular, getTopRated, getNowPlaying} from '../../services';
import { MovieCard } from '../../components/MovieCard';
import { IMovieCard} from '../../components/MovieCard/types';
import { movies as movieMock } from '../../constants/moviesMock';
import { Link } from 'react-router-dom';


import { IMovieResponse } from '../Popular/types';

import { ROUTES } from '../../Routes/constants'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const Home: React.FC = () => {
  const [moviesPopular, setPopularMovies] = useState<IMovieResponse[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(false);
  
  const [moviesTopRated, setTopRatedMovies] = useState<IMovieResponse[]>([]);
  const [isLoadingTopRated, setIsLoadingTopRated] = useState<boolean>(false);
  
  const [moviesNowPlaying, setNowPlayingMovies] = useState<IMovieResponse[]>([]);
  const [isLoadingNowPlaying, setIsLoadingNowPlaying] = useState<boolean>(false);

  const moviesRefPopular = useRef<HTMLDivElement>(null);
  const moviesRefNowPlaying = useRef<HTMLDivElement>(null);
  const moviesRefTopRated = useRef<HTMLDivElement>(null);

  const getPopularMovies = async() =>{
    await getPopular()
    .then((data) => {
      if(data && data.data){
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

  const moveOverflow = (target : 'Popular' | 'NowPlaying' | 'TopRated', direction : 'left' | 'right') => {

    let objectiveOverflow;
    let movement;

    if (target == 'Popular') {
      objectiveOverflow = moviesRefPopular;
    }
    else if (target == 'NowPlaying') {
      objectiveOverflow = moviesRefNowPlaying;
    }
    else{
      objectiveOverflow = moviesRefTopRated;
    }

    if(direction == 'left'){
      movement = -1250
    }else{
      movement = 1250
    }

    if (objectiveOverflow.current) {
      objectiveOverflow.current.scrollTo({
        left: objectiveOverflow.current.scrollLeft + movement, 
        behavior: 'smooth'
      });
    }    
  };







  return (
    <div className='mx-5'>
      <div className='flex justify-between my-7'>
        <h1 className='font-semibold text-3xl ml-5'>POPULAR</h1>
        <Link to={ROUTES.POPULAR}>
        <button className='bg-red-500 underline px-3 py-1 font-bold rounded-lg text-white text-sm'>View ALL</button>
        </Link>
      </div>

      {!isLoadingPopular && <div> Loading </div> }
      <div className=' relative'>
        <div className='flex gap-4 overflow-hidden mb-12' ref={moviesRefPopular}>
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
        
        <div className='w-full h-full top-0 absolute flex justify-between pointer-events-none'> 
          <div onClick={() => { moveOverflow('Popular', 'left')}} className='pointer-events-auto h-full w-[5%] flex flex-col justify-center items-start opacity-50 hover:opacity-100 bg-gradient-to-r from-black'>
            <IoIosArrowBack color='white' size={35} />
          </div>
          <div onClick={() => { moveOverflow('Popular', 'right')}} className='pointer-events-auto h-full w-[5%] flex flex-col justify-center items-end opacity-50 hover:opacity-100 bg-gradient-to-l from-black'>
            <IoIosArrowForward color='white' size={35} />
          </div>
        </div>
      </div>
      






      <div className='flex justify-between my-7'>
        <h1 className='font-semibold text-3xl ml-5'>TOP RATED</h1>
        <Link to={ROUTES.TOPRATED}>
        <button className='bg-red-500 underline px-3 py-1 font-bold rounded-lg text-white text-sm'>View ALL</button>
        </Link>
      </div>
      
      {!isLoadingTopRated && <div> Loading </div> }
      <div className=' relative'>
      <div className='flex gap-4 overflow-hidden mb-12' ref={moviesRefTopRated}>
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

      <div className='w-full h-full top-0 absolute flex justify-between pointer-events-none'> 
          <div onClick={() => { moveOverflow('TopRated', 'left')}} className='pointer-events-auto h-full w-[5%] flex flex-col justify-center items-start opacity-50 hover:opacity-100 bg-gradient-to-r from-black'>
            <IoIosArrowBack color='white' size={35} />
          </div>
          <div onClick={() => { moveOverflow('TopRated', 'right')}} className='pointer-events-auto h-full w-[5%] flex flex-col justify-center items-end opacity-50 hover:opacity-100 bg-gradient-to-l from-black'>
            <IoIosArrowForward color='white' size={35} />
          </div>
        </div>
      </div>

      <div className='flex justify-between my-7'>
        <h1 className='font-semibold text-3xl ml-5'>NOW PLAYING</h1>
        <Link to={ROUTES.NOWPLAYING}>
        <button className='bg-red-500 underline px-3 py-1 font-bold rounded-lg text-white text-sm'>View ALL</button>
        </Link>
      </div>

      {!isLoadingNowPlaying && <div> Loading </div> }
      <div className=' relative'>
      <div className='flex gap-4 overflow-hidden mb-12' ref={moviesRefNowPlaying}>
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

      <div className='w-full h-full top-0 absolute flex justify-between pointer-events-none'> 
      <div onClick={() => { moveOverflow('NowPlaying', 'left')}} className='pointer-events-auto h-full w-[5%] flex flex-col justify-center items-start opacity-50 hover:opacity-100 bg-gradient-to-r from-black'>
        <IoIosArrowBack color='white' size={35} />
      </div>
      <div onClick={() => { moveOverflow('NowPlaying', 'right')}} className='pointer-events-auto h-full w-[5%] flex flex-col justify-center items-end opacity-50 hover:opacity-100 bg-gradient-to-l from-black'>
        <IoIosArrowForward color='white' size={35} />
      </div>
      </div>
      </div>
      
    </div>
    
  )
}

export default Home