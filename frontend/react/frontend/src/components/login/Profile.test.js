import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';



describe('Profile component', () => {
    test('empty name, correct email, correct phone', async () => {
        const {getByLabelText, getByText} = render(<Profile/>);
        fireEvent.change(getByLabelText('Name:'), {target: {value: ''}});
        fireEvent.change(getByLabelText('Email:'), {target: {value: 'test@example.com'}});
        fireEvent.change(getByLabelText('Phone:'), {target: {value: '1234567890'}});
        fireEvent.click(getByText('Submit'));

        expect(getByText('Name cannot be empty.')).toBeInTheDocument();
    });


    test('correct name, empty email, correct phone', () => {
        const { getByLabelText, getByText } = render(<Profile />);
        fireEvent.change(getByLabelText('Name:'), { target: { value: 'Martin' } });
        fireEvent.change(getByLabelText('Email:'), { target: { value: '@@@@@@@@dhsjdhjhds' } });
        fireEvent.change(getByLabelText('Phone:'), { target: { value: '1234567890' } });
        fireEvent.click(getByText('Submit'));

        expect(getByText('Email has not correct format.')).toBeInTheDocument();
    });

    test('correct name, wrong email, correct phone', () => {
        const { getByLabelText, getByText } = render(<Profile />);
        fireEvent.change(getByLabelText('Name:'), { target: { value: 'Martin' } });
        fireEvent.change(getByLabelText('Email:'), { target: { value: '@@@@@@@@dhsjdhjhds' } });
        fireEvent.change(getByLabelText('Phone:'), { target: { value: '1234567890' } });
        fireEvent.click(getByText('Submit'));

        expect(getByText('Email has not correct format.')).toBeInTheDocument();

    });

    test('correct name, correct email, empty phone', () => {
        const { getByLabelText, getByText } = render(<Profile />);
        fireEvent.change(getByLabelText('Name:'), { target: { value: 'Martin' } });
        fireEvent.change(getByLabelText('Email:'), { target: { value: 'martin.lapsa2@gmail.com' } });
        fireEvent.change(getByLabelText('Phone:'), { target: { value: '' } });
        fireEvent.click(getByText('Submit'));

        expect(getByText('Phone cannot be empty.')).toBeInTheDocument();

    });

    test('correct name, correct email, wrong phone', () => {
        const { getByLabelText, getByText } = render(<Profile />);
        fireEvent.change(getByLabelText('Name:'), { target: { value: 'Martin' } });
        fireEvent.change(getByLabelText('Email:'), { target: { value: '@@@@@@@@dhsjdhjhds' } });
        fireEvent.change(getByLabelText('Phone:'), { target: { value: '123456789078787' } });
        fireEvent.click(getByText('Submit'));

        expect(getByText('Phone has not correct format.')).toBeInTheDocument();
    });

    test('submit button logs success message', () => {
        const { getByLabelText, getByText } = render(<Profile />);

        // Mock console.log
        const consoleLogSpy = jest.spyOn(console, 'log');

        // Trigger form submission
        fireEvent.change(getByLabelText('Name:'), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText('Phone:'), { target: { value: '1234567890' } });
        fireEvent.click(getByText('Submit'));

        // Check if the console.log was called with the expected message
        expect(consoleLogSpy).toHaveBeenCalledWith('Form submitted successfully!');

        // Restore the original console.log implementation
        consoleLogSpy.mockRestore();
    });
});
