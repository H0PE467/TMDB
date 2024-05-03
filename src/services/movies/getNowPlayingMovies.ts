import httpInstance from "../httpInstance";

export const getNowPlaying = async()=>{
    let res: any;
    // const endpoint = `popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    const endpoint = `now_playing?api_key=af6e0e60e8eaa75280ad9c6088641862&language=en-US`
    
    await httpInstance.get(endpoint).then((data) =>{
        res = data;
    }).catch((err) =>{
        res = err.response;
    })
    return res;
}





