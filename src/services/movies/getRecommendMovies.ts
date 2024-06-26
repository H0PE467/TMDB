import httpInstance from "../httpInstance";

export const getRecommend = async(movieId? : string)=>{
    let res: any;
    const endpoint = `${movieId}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    
    await httpInstance.get(endpoint).then((data) =>{
        res = data;        
    }).catch((err) =>{
        res = err.response;
    })
    return res;
}





