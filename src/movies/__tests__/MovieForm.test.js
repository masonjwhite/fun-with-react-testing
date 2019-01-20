import React from 'react';
import {
	render,
	cleanup,
	fireEvent
} from 'react-testing-library';
import MovieForm from '../MovieForm';

afterEach(cleanup); // Cleanup test DOM after each test

const onSubmit = jest.fn(); // Mock onSubmit

test('<MovieForm>', () => {
	const {
		queryByTestId,
		getByText,
		getByLabelText
	} = render(<MovieForm submitForm={onSubmit} />);

	// Assert that movie-form is rendered
	expect(queryByTestId('movie-form')).toBeTruthy();

	// Fire onChange event to text input
	fireEvent.change(getByLabelText('Text'), {
		target: { value: 'hello' }
	});

	// Fire onClick event on submit button
	fireEvent.click(getByText('Submit'));

	// Assert onSubmit mock to have been called
	expect(onSubmit).toHaveBeenCalledTimes(1);

	// Assert onSubmit to have been called with 'hello'
	expect(onSubmit).toHaveBeenCalledWith({
		text: 'hello'
	});
});
