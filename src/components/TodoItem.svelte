<script>
    import { createEventDispatcher } from "svelte";
    export let todo;

    const dispatch = createEventDispatcher();

    const handleDelte = () => {
        if (window.confirm("Are you sure delete?")) {
            dispatch("delete", todo);
        }
    }
    const handleCompleted = () => {
        dispatch("toggleState", todo);
    }

</script>

<li class="item">
    <span class="{todo.completed ? 'completed' : ''}" on:click={handleCompleted}>
        <span class="name">{todo.name}</span>
    </span>
    <i on:click={handleDelte} />
</li>

<style>
    li {
        min-width: 500px;
        width: fit-content;
        text-align: left;
        margin: 10px auto;
        background-color: blanchedalmond;
    }
    .item {
        padding: 2px;
        margin-left: 8px;
        height: 50px;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 1.15em;
    }
    .item > span {
        display: flex;
        min-width: 60px;
        align-items: center;
        margin: 0 10px;
    }
    .name {
        color: red;
        cursor: pointer;
    }
    .completed * {
        text-decoration-line: line-through;
        color: blue;
        font-style: italic;
    }
    .item i {
        background: lightslategray;
        width: 12px;
        height: 4px;
        cursor: pointer;
        margin-left: 10px;
        display: block;
    }
    i:hover {
        border-color: #becbd4;
        background: #f16e79;
    }
</style>
