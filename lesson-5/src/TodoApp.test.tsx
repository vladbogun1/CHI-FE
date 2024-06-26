import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoApp from './TodoApp';

describe('TodoApp Component', () => {
    test('renders without crashing', () => {
        render(<TodoApp />);
        expect(screen.getByText('Task List')).toBeInTheDocument();
    });

    test('can add a new task', () => {
        render(<TodoApp />);
        const input = screen.getByRole('textbox');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('can toggle a task as completed', () => {
        render(<TodoApp />);
        const input = screen.getByRole('textbox');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Toggle Task' } });
        fireEvent.click(addButton);

        const toggleButton = screen.getByRole('button', { name: /check/i });
        fireEvent.click(toggleButton);

        expect(screen.getByText('Toggle Task')).toHaveClass('completed');
    });

    test('can delete a task', () => {
        render(<TodoApp />);
        const input = screen.getByRole('textbox');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Delete Task' } });
        fireEvent.click(addButton);

        const deleteButton = screen.getByRole('button', { name: /trash/i });
        fireEvent.click(deleteButton);

        expect(screen.queryByText('Delete Task')).not.toBeInTheDocument();
    });

    test('can filter tasks', () => {
        render(<TodoApp />);
        const input = screen.getByRole('textbox');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Completed Task' } });
        fireEvent.click(addButton);

        fireEvent.change(input, { target: { value: 'Incomplete Task' } });
        fireEvent.click(addButton);

        const toggleButton = screen.getAllByRole('button', { name: /check/i })[0];
        fireEvent.click(toggleButton);

        const allFilter = screen.getByText('All');
        const completedFilter = screen.getByText('Done');
        const incompleteFilter = screen.getByText('ToDos');

        fireEvent.click(completedFilter);
        expect(screen.getByText('Completed Task')).toBeInTheDocument();
        expect(screen.queryByText('Incomplete Task')).not.toBeInTheDocument();

        fireEvent.click(incompleteFilter);
        expect(screen.getByText('Incomplete Task')).toBeInTheDocument();
        expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();

        fireEvent.click(allFilter);
        expect(screen.getByText('Completed Task')).toBeInTheDocument();
        expect(screen.getByText('Incomplete Task')).toBeInTheDocument();
    });
});
