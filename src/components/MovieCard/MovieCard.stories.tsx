import { Meta, StoryFn} from '@storybook/react';

import { IMovieCard } from './types';
import MovieCard from './MovieCard'
import React from 'react';


const meta = {
    title: 'Componentes/MovieCard',
    component: MovieCard,
    parameters: {
        layout: "centered",
        docs: {
            story:{
                inline: false,
                description: "A MovieCard component",
                iframeHeight: 400
            }
        }
    },
    argTypes: {
        title: {control: 'text'},
        genreId: {control: 'number'},
        movieId: {control: 'number'},
        voteAverage: {control: 'number'},
        posterPath: {control: 'text'},
    },
    tags:["autodocs"],
} as Meta;

export default meta;

const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args}/>;

export const Default = Template.bind({});
Default.args ={
    posterPath: "https://imag.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    title: "Avatar: The Way of Water",
    voteAverage: 7.8,
    genreId: 878,
    movieId: 76600
}