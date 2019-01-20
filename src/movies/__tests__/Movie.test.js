import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from '../Movie';

afterEach(() => {
	cleanup(); // Cleans up the test DOM after each test
	console.error.mockClear(); // Clears our mock after each test
});

console.error = jest.fn(); // Mock console.error

test('<Movie />', () => {
	render(<Movie />);

	// Assert that console.error is called if no props are passed in
	expect(console.error).toHaveBeenCalled();
});

// Test data
const movie = {
	id: '123',
	title: 'Brink',
	poster_path: 'brink.jpg'
};

test('<Movie /> with movie', () => {
	// MemoryRouter is because Movie has a Link component in it!
	const { getByTestId } = render(
		<MemoryRouter>
			<Movie movie={movie} />
		</MemoryRouter>
	);

	// Assert that console.error is not called
	expect(console.error).not.toHaveBeenCalled();

	// Assert that the movie-link href is what we expect
	expect(
		getByTestId('movie-link').getAttribute('href')
	).toBe(`/${movie.id}`);

	// Assert that the move-img's src is what we expect
	expect(getByTestId('movie-img').src).toBe(
		`${POSTER_PATH}${movie.poster_path}`
	);
});
