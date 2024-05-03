import React, {useEffect, useState} from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import {getDecorators} from 'typescript';

const Show: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>('');


    const goBack = () => {
        navigate(-1);
    }

    const addFavorite = () =>{
        const favs = favorites.length > 0? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id];

        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }

    const removeFavorite = () => {
        const favs = favorites.length > 0? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }

    // const runGetFavorites = async () => {
    //     if (favorites.length) {
    //         const favoritesArray = JSON.parse(favorites);
    //         const newShows = await Promise.all(
    //             favoritesArray.map( async (favorite: string) => {
    //                 return getDefaultCompilerOptions()
    //             })
    //         )
    //     }
    // }

    useEffect(()=> {
        // Aqui llamar el endpoint
    }, [])

    return (
        <div>
            <div>Show: {id}</div>
            <div>Titulo desde el state {location.state.movie}</div>
            <button onClick={goBack}></button>
        </div>
    )
}

export default Show