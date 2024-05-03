export interface IMovieCard{
    title: string;
    genreId: number;
    movieId: number;
    voteAverage: number;
    posterPath: string;
}

export interface IGenre{
    id: number;
    name: string;
}