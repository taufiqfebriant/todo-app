import { expect, test } from '@playwright/test';
import { env } from '../env/server.mjs';

test.beforeEach(async ({ page }) => {
	console.log(env.NODE_ENV);
	console.log(env.BASE_URL);
	await page.goto('/');
});

test.describe('New Todo', () => {
	test('should allow me to add todo item', async ({ page }) => {
		await page.getByTestId('add-todo-button').click();

		const newTodoInput =
			'[data-testid="todos-container"] > div:last-child > input[type="text"]';

		await page.locator(newTodoInput).click();

		await page.locator(newTodoInput).fill('Olahraga');

		await expect(page.locator(newTodoInput)).toHaveValue('Olahraga');

		await expect(page.locator(newTodoInput)).not.toHaveClass(
			'text-[#C2C9D6] line-through'
		);
	});
});

test.describe('Check todo', () => {
	test('should allow me to check todo item', async ({ page }) => {
		await page.getByTestId('add-todo-button').click();

		const newTodoInput =
			'[data-testid="todos-container"] > div:last-child > input[type="text"]';

		await page.locator(newTodoInput).click();

		await page.locator(newTodoInput).fill('Betulkan TV');

		await page
			.locator(
				'[data-testid="todos-container"] > div:last-child > input[type="checkbox"]'
			)
			.check();

		expect(await page.locator(newTodoInput).getAttribute('class')).toContain(
			'text-[#C2C9D6] line-through'
		);
	});
});

test.describe('Delete todo', () => {
	test('should allow me to delete todo item', async ({ page }) => {
		await page.getByTestId('add-todo-button').click();

		const newTodoInput =
			'[data-testid="todos-container"] > div:last-child > input[type="text"]';

		await page.locator(newTodoInput).click();

		await page.locator(newTodoInput).fill('Beli tepung');

		await page
			.locator('[data-testid="todos-container"] > div:last-child > button')
			.click();

		await expect(page.locator('[data-testid="todos-container"]')).toHaveText(
			'You have no todo'
		);
	});
});
