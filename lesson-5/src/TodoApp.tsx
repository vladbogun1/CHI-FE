import React, { Component } from 'react';
import './TodoApp.css';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

interface Task {
    text: string;
    completed: boolean;
}

interface State {
    tasks: Task[];
    filter: 'all' | 'completed' | 'incomplete';
    newTask: string;
}

class TodoApp extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tasks: [],
            filter: 'all',
            newTask: ''
        };
    }

    componentDidMount() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            this.setState({ tasks: JSON.parse(savedTasks) });
        }
        console.log('Component has been mounted');
    }

    componentDidUpdate(prevProps: {}, prevState: State) {
        if (prevState.tasks !== this.state.tasks) {
            localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
            console.log('Tasks have been updated');
        }
        if (prevState.filter !== this.state.filter) {
            console.log('Filter has been changed');
        }
    }

    handleAddTask = () => {
        const { tasks, newTask } = this.state;
        if (newTask.trim() === '') return;
        this.setState({
            tasks: [...tasks, { text: newTask, completed: false }],
            newTask: ''
        });
    }

    handleDeleteTask = (index: number) => {
        const { tasks } = this.state;
        this.setState({
            tasks: tasks.filter((_, i) => i !== index)
        });
    }

    handleToggleTask = (index: number) => {
        const { tasks } = this.state;
        this.setState({
            tasks: tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task)
        });
    }

    handleFilterChange = (filter: 'all' | 'completed' | 'incomplete') => {
        this.setState({ filter });
    }

    handleChangeNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newTask: event.target.value });
    }

    render() {
        const { tasks, filter, newTask } = this.state;
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed;
            return true;
        });

        return (

            <div className="app-container">
                <header className="header">
                    <h1>Task List</h1>
                </header>
                <div className="input-container">
                    <input
                        type="text"
                        value={newTask}
                        onChange={this.handleChangeNewTask}
                        className="task-input"
                        placeholder="Add new task..."
                    />
                    <button onClick={this.handleAddTask} className="add-button">Add</button>
                </div>
                <div className="filter-container">
                    <button
                        onClick={() => this.handleFilterChange('all')}
                        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                    >All
                    </button>
                    <button
                        onClick={() => this.handleFilterChange('completed')}
                        className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                    >Done
                    </button>
                    <button
                        onClick={() => this.handleFilterChange('incomplete')}
                        className={`filter-button ${filter === 'incomplete' ? 'active' : ''}`}
                    >ToDos
                    </button>
                </div>
                <ul className="task-list">
                    {filteredTasks.length === 0 && (
                        <li className="no-tasks">No tasks found</li>
                    )}
                    {filteredTasks.map((task, index) => (
                        <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <span className="task-text">{task.text}</span>
                            <div className="task-actions">
                                <button
                                    onClick={() => this.handleToggleTask(index)}
                                    className="icon-button"
                                >
                                    {task.completed ? <FaTimes/> : <FaCheck/>}
                                </button>
                                <button
                                    onClick={() => this.handleDeleteTask(index)}
                                    className="icon-button"
                                >
                                    <FaTrash/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoApp;
