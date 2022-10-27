import { Inter } from '@next/font/google';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

type Todo = {
	id: number;
	name: string;
	checked: boolean;
};

type TodoProps = {
	data: Todo;
	onCheckboxClick: () => void;
	onDelete: () => void;
};

const Todo = (props: TodoProps) => {
	return (
		<div key={props.data.id} className="flex items-center gap-x-3 px-4">
			<input
				type="checkbox"
				name={`todo-${props.data.id}`}
				onClick={props.onCheckboxClick}
				className="h-[1.125rem] w-[1.125rem]"
			/>

			<input
				className={clsx('h-12 w-full bg-transparent text-lg focus:outline-none', {
					'text-[#C2C9D6] line-through': props.data.checked,
				})}
				defaultValue={props.data.name}
			/>

			<button type="button" onClick={props.onDelete} className="h-12 text-red-500">
				<FaTrash />
			</button>
		</div>
	);
};

const initialTodos: Todo[] = [
	{
		id: 1,
		name: 'Nyapu',
		checked: false,
	},
	{
		id: 2,
		name: 'Beli mie',
		checked: false,
	},
];

const inter = Inter();

const Home: NextPage = () => {
	const [todos, setTodos] = useState(initialTodos);

	const handleCheckboxClick = (id: number) => {
		setTodos(current => {
			const newTodos = current.map(todo => {
				if (todo.id === id) {
					return { ...todo, checked: !todo.checked };
				}

				return todo;
			});

			return newTodos;
		});
	};

	const deleteTodo = (id: number) => {
		setTodos(current => current.filter(todo => todo.id !== id));
	};

	const addTodo = () => {
		const lastTodo = todos[todos.length - 1];
		const id = lastTodo ? lastTodo.id + 1 : 1;

		setTodos(current => [...current, { id, checked: false, name: '' }]);
	};

	return (
		<main className={`${inter.className} py-10`}>
			<h1 className="text-center text-4xl font-bold">Todo app</h1>

			<div className="mt-4 flex justify-end">
				<button
					type="button"
					onClick={addTodo}
					className="flex h-8 w-8 items-center justify-center rounded-md bg-[#262E37]"
				>
					<FaPlus />
				</button>
			</div>

			<div className="mt-4 divide-y divide-[#313C42] rounded-md bg-[#262E37]">
				{todos.map(todo => (
					<Todo
						key={todo.id}
						data={todo}
						onCheckboxClick={() => handleCheckboxClick(todo.id)}
						onDelete={() => deleteTodo(todo.id)}
					/>
				))}
			</div>
		</main>
	);
};

export default Home;
