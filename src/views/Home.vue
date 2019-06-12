<template>
  <div id="app">
    <AddTodo @add-todo="addTodo"/>
    <MyArrays :Arrays="myArrays" @del-todo="deleteTodo"/>
  </div>
</template>

<script>
import MyArrays from "../components/MyArrays";
import AddTodo from "../components/AddTodo";
import TodoService from "../domain/TodoService";

export default {
  name: "app",
  components: {
    MyArrays,
    AddTodo
  },
  data() {
    return {
      myArrays: []
    };
  },
  methods: {
    deleteTodo(id) {
      this.service
        .delete(id)
        .then((res => this.myArrays = this.myArrays.filter(array => array.id !== id)))
        .catch(error => {
          console.log(error);
          reject("Error trying to delete a TODO");
        });
    },
    addTodo(newTodo) {
      let todo = {
        title: newTodo.title,
        completed: newTodo.completed
      };

      this.service
        .register(todo)
        .then(res => (this.myArrays = [...this.myArrays, res]))
        .catch(error => {
          console.log(error);
          reject("Error trying to add a TODO");
        });
    }
  },
  created() {
    this.service = new TodoService(
      "https://jsonplaceholder.typicode.com/todos"
    );

    this.service
      .list()
      .then(todosArray => (this.myArrays = todosArray))
      .catch(error => {
        console.log(error);
        reject("Error trying to retrieve the list");
      });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>
