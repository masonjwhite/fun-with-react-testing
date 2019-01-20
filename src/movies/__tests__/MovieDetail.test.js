import React from 'react';
import {
	render,
	cleanup,
	waitForElement
} from 'react-testing-library';

import MovieDetail from '../MovieDetail';

global.fetch = require('jest-fetch-mock'); // Mock fetch

afterEach(() => {
	cleanup(); // Cleanup test DOM
	console.error.mockClear(); // Clear the console.error mock
});

// Mock match prop
const match = {
	params: {
		id: 'alsdjfal;sdjf'
	}
};

console.error = jest.fn(); // Mock console.error

// Test data
const movie = {
	id: 'hi',
	title: 'Level Up'
};

test('<MovieDetail />', async () => {
	// Mock fetch response
	fetch.mockResponseOnce(JSON.stringify(movie));

	const { getByTestId } = render(
		<MovieDetail match={match} />
	);

	// How to handle async (waits for movie-title to render)
	await waitForElement(() => getByTestId('movie-title'));

	// Assert that the movie-title is equal to our test data
	expect(getByTestId('movie-title').textContent).toBe(
		movie.title
	);
});
