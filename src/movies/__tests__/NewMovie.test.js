import React from 'react';
import { render, cleanup } from 'react-testing-library';
import NewMovie from '../NewMovie';

afterEach(cleanup);

test('<NewMovie>', () => {
	const { getByTestId, queryByTestId, container } = render(
		<NewMovie />
	);

	// Assert page-title to be 'New Movie'
	expect(getByTestId('page-title').textContent).toBe(
		'New Movie'
	);

	// Assert movie-form to render
	expect(queryByTestId('movie-form')).toBeTruthy();

	// Assert container's first child to match snapshot
	expect(container.firstChild).toMatchSnapshot();
});
