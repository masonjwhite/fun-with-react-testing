import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
	render,
	cleanup,
	waitForElement
} from 'react-testing-library';

import MoviesList from '../MoviesList';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
	cleanup(); // Cleanup test DOM
	console.error.mockClear(); // Clear mock
});

console.error = jest.fn(); // Mock console.error

// Test data
const movies = {
	success: true,
	results: [
		{
			id: 'hi',
			title: 'Level Up',
			poster_path: 'adsfadsfa.jpg'
		},
		{
			id: 'hiz',
			title: 'Level Up',
			poster_path: 'adsfadsfa.jpg'
		},
		{
			id: 'haafdsaiz',
			title: 'Level Up',
			poster_path: 'adsfadsfa.jpg'
		},
		{
			id: 'haafdljlkjsaiz',
			title: 'Level Up',
			poster_path: 'adsfadsfa.jpg'
		}
	]
};

// Singular movie test data from movies
const movie = movies.results[0];

test('<MoviesList />', async () => {
	fetch.mockResponseOnce(JSON.stringify(movies)); // Mock fetch response

	// MemoryRouter is because our component has a Link component in it
	const {
		getByTestId,
		queryByTestId,
		getAllByTestId
	} = render(
		<MemoryRouter>
			<MoviesList />
		</MemoryRouter>
	);

	// Assert loading to be rendered when no data is present
	expect(getByTestId('loading')).toBeTruthy();

	// Wait for movie-link to render
	await waitForElement(() => getByTestId('movie-link'));

	// Assert loading will NOT be rendered when data IS present
	expect(queryByTestId('loading')).toBeFalsy();

	// Assert that movie-link href is what we expect
	expect(
		getByTestId('movie-link').getAttribute('href')
	).toBe(`/${movie.id}`);

	// Assert that movie-link's length is what we expect
	expect(getAllByTestId('movie-link').length).toBe(
		movies.results.length
	);
});

test('<MoviesList /> api fail', async () => {
	movies.success = false; // Set success property to false
	fetch.mockResponseOnce(JSON.stringify(movies)); // Mock response from fetch

	// MemoryRouter is because our component has a Link component in it
	const { getByTestId } = render(
		<MemoryRouter>
			<MoviesList />
		</MemoryRouter>
	);

	// Assert loading is rendered when no data is present
	expect(getByTestId('loading')).toBeTruthy();
});
