import React, {useEffect, useState, useRef} from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import {getDecorators} from 'typescript';
import { getShowInfo, getRecommend } from '../../services';
import { IMovieInfoResponse } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { IMovieResponse } from '../Popular/types';
import { Link } from 'react-router-dom';
import { MovieCard } from '../../components/MovieCard';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {Pill} from '../../components/Pill';
import { FaClock } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import genres from '../../constants/genres.json';
import { FaHeartBroken } from "react-icons/fa";







const Show: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState<IMovieInfoResponse>();
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>('');

    const [moviesRecommended, setRecommendedMovies] = useState<IMovieResponse[]>([]);
    const [isLoadingRecommendations, setIsLoadingRecommendations] = useState<boolean>(false);


    const poster = IMAGE_SOURCE + show?.poster_path;
    const moviesRefRecommended = useRef<HTMLDivElement>(null);

    const [showAddBttn, setShowAddBttn] = useState(true);
    const [showRemoveBttn, setShowRemoveBttn] = useState(false);



    const goBack = () => {
        navigate(-1);
    }

    const addFavorite = () =>{
        const favs = favorites.length > 0? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id];

        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setShowAddBttn(false);
        setShowRemoveBttn(true);
    }

    const removeFavorite = () => {
        const favs = favorites.length > 0? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setShowAddBttn(true);
        setShowRemoveBttn(false);
    }


    const moveOverflow = (direction : 'left' | 'right') => {
        let movement;
    
        if(direction == 'left'){
          movement = -1250
        }else{
          movement = 1250
        }
    
        if (moviesRefRecommended.current) {
            moviesRefRecommended.current.scrollTo({
            left: moviesRefRecommended.current.scrollLeft + movement, 
            behavior: 'smooth'
          });
        }
        
    };

    const getRecommendedMovies = async() =>{
        await getRecommend(id)
        .then((data) => {
          if(data && data.data){
            setRecommendedMovies(data.data.results);
          }
        })
        .catch((err) => {
          console.log(err);
        })
      };

    const getShowInformation = async() =>{
        await getShowInfo(id)
        .then((data) => {
          if(data && data.data){
            console.log(data.data);
            
            setShow(data.data);

          }
        })
        .catch((err) => {
          console.log(err);
        })
    };

    useEffect(()=> {
      const favs = localStorage.getItem('favorites') || '';
      setFavorites(favs);
      if(favs.includes(String(id))){
        setShowAddBttn(false)
        setShowRemoveBttn(true)
      }
        getShowInformation();
    }, [])

    useEffect(() => {
        setIsLoadingRecommendations(true);
        getRecommendedMovies()
      }, [])

    const getGenre = (genreId: number): string => {
        const key = Object.values(genres.genres).find(genre => genre.id === genreId);

        if(key){
            return key.name;
        }
        return "Not classified"
    };
    

    return (
        <div>
            <div className='h-[500px] px-5 my-3 flex'>
                <img src={poster} alt="" className='h-full'/>
                <div className='px-8 py-10 flex flex-col grow gap-5'>
                    <h1 className='text-5xl font-bold'>{show?.title}</h1>
                    <div className='flex gap-10 w-1/2'>
                        <div className='flex gap-2 items-center'><FaClock /> {show?.runtime} min.</div>
                        <div className='flex gap-2 items-center'><FaCalendarDay />{show?.release_date.toString()}</div>
                        <div className='flex gap-2 items-center'><FaStar />{show?.vote_average}</div>
                        <div className='flex gap-2 items-center'><IoStatsChart />{show?.vote_count}</div>
                    </div>
                    {show?.overview}
                    <div className='flex w-[70%] justify-start gap-12'>
                        <div>
                            <h2 className='text-xl font-bold'>Genres</h2>
                            <div className='flex gap-3 my-3'>
                                {show?.genres.map((genre) => (
                                  <Pill title={getGenre(genre.id)} color='red'/>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-xl font-bold'>Favorite</h2>
                            {showAddBttn && <button onClick={addFavorite} className='text-md text-white font-bold bg-green-500 mt-3 p-2 flex gap-3 items-center rounded-lg'><FaHeart /> Add to Favorites</button>}
                            {showRemoveBttn && <button onClick={removeFavorite}  className='text-md text-white font-bold bg-red-500 mt-3 p-2 flex gap-3 items-center rounded-lg'><FaHeartBroken /> Remove from Favorites</button>}

                        </div>
                        
                    </div>
                    
                </div>
            </div>

        <div className='flex justify-start my-7'>
        <h1 className='font-semibold text-3xl ml-5'>Recommendations</h1>
        </div>

        {!isLoadingRecommendations && <div> Loading </div> }
        <div className=' relative'>
        <div className='flex gap-4 overflow-hidden mb-12' ref={moviesRefRecommended}>
        {moviesRecommended?.length > 0 &&
        
        moviesRecommended.map((movie) => (
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
        <div onClick={() => { moveOverflow('left')}} className='pointer-events-auto h-full w-[5%] flex flex-col justify-center items-start opacity-50 hover:opacity-100 bg-gradient-to-r from-black'>
            <IoIosArrowBack color='white' size={35} />
        </div>
        <div onClick={() => { moveOverflow('right')}} className='pointer-events-auto h-full w-[5%] flex flex-col justify-center items-end opacity-50 hover:opacity-100 bg-gradient-to-l from-black'>
            <IoIosArrowForward color='white' size={35} />
        </div>
        </div>
        </div>

        </div>
        
    )
}

export default Show