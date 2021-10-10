<main>
	<h4>Todo Sample</h4>
	<form>
		<input type="text" bind:value={name} />
		<button type="submit" on:click|preventDefault={handleClick}>Add new</button>
		<button on:click={handleClear}>Clear all</button>
	</form>
	{#if listTodo.length === 0}
		 <h5>There are no data</h5>
	{:else}
		<ul>
			{#each listTodo as todo}
				<TodoItem todo={todo} on:delete={deleteTodo} on:toggleState={toggleCompleted} />
			{/each}
		</ul>
	{/if}
</main>

<script>
	import { onMount } from 'svelte'

	// components
	import TodoItem from "./components/TodoItem.svelte";
	import { getStore, saveStore } from "./service/LocalStoreUtils.js"

	let name = '';
	let listTodo = []
	// let message = ''

	onMount(() => {
		listTodo = getStore()
	});

	// function hasTodo() {
	// 	return listTodo.length > 0
	// }

	const deleteTodo = (evt) => {
		const { id } = evt.detail
		listTodo = listTodo.filter(item => item.id !== id)
		saveStore(listTodo)
	}

	const toggleCompleted = ({ detail }) => {
		const { id, completed } = detail
		let index = listTodo.findIndex(todo => todo.id === id)
		if (index !== -1) {
			let newTodo = [...listTodo]
			newTodo[index].completed = !completed
			listTodo = newTodo
			saveStore(listTodo)
		}
	}

	const handleClick = (e) => {
		let value = name.trim()
		if (value.length === 0) {
			alert('Name empty!')
			return
		}
		let index = listTodo.findIndex(item => item.name.toLowerCase() === value.toLowerCase())
		if (index === -1) {
			listTodo = [{
				id: +new Date(),
				completed: false,
				name: value
			}, ...listTodo]
			name = ''
			saveStore(listTodo)
		} else {
			alert('Name exited!')
		}
	}

	function handleClear() {
		listTodo = []
		saveStore(listTodo)
	}
</script>

<style>
	main {
		padding: 0.5em 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	ul {
        display: flex;
		padding: 0px;
		margin: 0px;
		flex-direction: column;
        list-style: none;
    }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>