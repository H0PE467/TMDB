import React from 'react';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { IMovieCard } from './types';
import { IGenre } from './types';
import genres from '../../constants/genres.json';
import {useNavigate} from 'react-router-dom';
import { ROUTES } from '../../Routes/constants';
import {Pill} from '../Pill';
import { FaStar } from "react-icons/fa6";

// imports
// constantes
// hooks
// state
// constantes no estado
// funciones
// useeffect
// return

const MovieCard: React.FC<IMovieCard> = ({
    title, 
    genreId, 
    movieId, 
    voteAverage, 
    posterPath
}) => {
    const navigate = useNavigate();
    
    const poster = IMAGE_SOURCE + posterPath;

    const getGenre = (genreId: number): string => {
        const key = Object.values(genres.genres).find(genre => genre.id === genreId);

        if(key){
            return key.name;
        }
        return "Not classified"
    };
    
    // const getColor = (vote)

    const navigateMovies = (id: number, movieName: string) =>{
        navigate(`${ROUTES.SHOW}${id}`, { state: { movieName }});
    }
    return (
        <div
            onClick={() => {
                navigateMovies(movieId, title);
            }}
            className='h-[350px] w-[234px] flex-shrink-0 relative overflow-hidden rounded-lg shadow-[0px_-1px_5px_2px_rgba(0,0,0,0.5)]'
            
        >
            <img src={poster} className='rounded-lg transition-transform duration-700 hover:scale-[1.15] hover:brightness-50'  alt="poster" /> 

            <div className='w-full absolute bottom-0 left-0 p-2 pb-3 pt-5 bg-gradient-to-t from-black'>
                <Pill title={getGenre(genreId)} color='blue'/>
                <p className='text-white font-bold text-lg'>{title}</p>
                <div className='flex items-center gap-2 mt-2'>
                  <FaStar color='white' />
                  <p className='text-white font-bold'>{voteAverage} /10</p>
                </div>
            </div>
            
              
        </div>
    )
}

export default MovieCard