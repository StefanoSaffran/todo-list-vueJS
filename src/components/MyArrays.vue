<template>
    <div>
        <div v-for="(array, id) in Arrays" :key="id">
            <TodoItem :todoItem="array" @del-todo="$emit('del-todo', array.id)"/>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
    name: "MyArrays",
    components: {
        TodoItem
    },
    props: ["Arrays"]
}
</script>

<style scoped>

</style>
