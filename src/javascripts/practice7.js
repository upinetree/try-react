var TODOS = [
  {id: 1, title: 'Try React.js'  , done: false},
  {id: 2, title: 'Buy a iPhone 6', done: false},
  {id: 3, title: 'Read a book'   , done: false}
]

var Todos = React.createClass({
  handleToggle: function(todo) {
    this.props.onToggle(todo.id);
  },

  render: function() {
    var todoNodes = [];
    this.props.todos.forEach(function(todo) {
      title = todo.title;
      className = todo.done ? "done" : ""
      todoNodes.push(
        <li className={className} onClick={this.handleToggle.bind(this, todo)} key={title}>
          {title}
        </li>
      );
    }.bind(this));

    return (
      <ul>{todoNodes}</ul>
    );
  }
});

var TodoInput = React.createClass({
  handleKeyDown: function(e) {
    if (e.which !== 13) { return; } // 13: ENTER_KEY

    event.preventDefault();

    val = this.refs.todoTitle.getDOMNode().value;
    this.props.onNewTodo(val);
    this.refs.todoTitle.getDOMNode().value = '';
  },

  render: function() {
    return (
      <input
        type="text"
        placeholder="What to do next?"
        onKeyDown={this.handleKeyDown}
        ref="todoTitle"
      />
    );
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: TODOS,
    };
  },

  addTodo: function(title) {
    newTodos = this.state.todos.concat({
      title: title
    });
    this.setState({todos: newTodos});
  },

  toggle: function(todoId) {
    updatedTodos = this.state.todos.map(function(todo) {
      if (todo.id !== todoId) { return todo };
      return {id: todo.id, title: todo.title, done: !todo.done};
    });
    this.setState({todos: updatedTodos});
  },

  render: function() {
    return (
      <div>
        <TodoInput onNewTodo={this.addTodo} />
        <Todos todos={this.state.todos} onToggle={this.toggle} />
      </div>
    );
  }
});

React.render(
  <TodoApp />,
  document.getElementById("todo-container")
);
