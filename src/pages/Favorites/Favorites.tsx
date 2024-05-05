import React, {useEffect} from 'react'
import { IMovieCard } from '../../components/MovieCard/types'
import { useState } from 'react';
import {MovieCard} from '../../components/MovieCard';
import { getShowInfo } from '../../services';
import { IMovieInfoResponse } from '../Show/types';
import { Link } from 'react-router-dom';
import {ROUTES} from '../../Routes/constants';

const Favorites = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [shows, setShows] = useState<IMovieInfoResponse[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";

    const runGetFavorites = async ()=> {
        if (favorites.length) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favorite: string) =>{
                    return getShowInfo(String(favorite))
                    .then((res) => {
                        if (res && res.data) {
                            console.log(res.data);
                            console.log(res.data.genres);
                            return res.data
                        }
                    })
                    .catch((err) =>{
                        console.log(err, "err");
                        
                    })
                })
            )
        setShows(newShows);
        
        setLoading(false);

        }

    };

useEffect(() =>{
    runGetFavorites();
}, []);



  return (
    <div>
        {loading && <div> Loading </div> }
        <div className='flex flex-wrap gap-4 m-12'>
        {shows?.length > 0 ?
    shows.map((show) => (
        <MovieCard
            key={show.id}
            movieId={show.id}
            posterPath={show.poster_path}
            title={show.title}
            genreId={show.genres[0].id}
            voteAverage={show.vote_average}
                />
            )) :
            <div className='m-10'>
                <p className='text-3xl font-bold'>Oops... Parece que aun no tienes Favoritos</p>
                <Link to={ROUTES.HOME}  className='text-3xl text-blue-800 underline'>Sigue Explorando</Link>

            </div>
        }
        </div>
    </div>
  );
};

export default Favorites