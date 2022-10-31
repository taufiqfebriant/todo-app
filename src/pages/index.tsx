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
		<div key={props.data.id} className="flex h-12 items-center gap-x-3 px-4">
			<input
				type="checkbox"
				name={`todo-${props.data.id}-checkbox`}
				onClick={props.onCheckboxClick}
				className="h-[1.125rem] w-[1.125rem] hover:cursor-pointer"
			/>

			<input
				type="text"
				name={`todo-${props.data.id}-text`}
				className={clsx('h-full w-full bg-transparent focus:outline-none', {
					'text-[#C2C9D6] line-through': props.data.checked
				})}
				defaultValue={props.data.name}
			/>

			<button type="button" onClick={props.onDelete} className="text-red-500">
				<FaTrash />
			</button>
		</div>
	);
};

const inter = Inter({
	subsets: ['latin']
});

const Home: NextPage = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

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
			<div className="flex items-center justify-between">
				<h1 className="text-center text-4xl font-bold">Todo app (ok)</h1>

				<button
					type="button"
					onClick={addTodo}
					className="flex h-8 w-8 items-center justify-center rounded-md bg-[#262E37]"
					data-testid="add-todo-button"
				>
					<FaPlus />
				</button>
			</div>

			<div
				className="mt-6 divide-y divide-[#313C42] rounded-md bg-[#262E37]"
				data-testid="todos-container"
			>
				{todos.length ? (
					todos.map(todo => (
						<Todo
							key={todo.id}
							data={todo}
							onCheckboxClick={() => handleCheckboxClick(todo.id)}
							onDelete={() => deleteTodo(todo.id)}
						/>
					))
				) : (
					<p className="h-12 text-center leading-[3rem]">You have no todo</p>
				)}
			</div>
		</main>
	);
};

export default Home;
