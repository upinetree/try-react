var TODOS = [
  {title: 'Try React.js'},
  {title: 'Buy a iPhone 6'},
  {title: 'Read a book'}
]

var Todos = React.createClass({
  render: function() {
    var todoNodes = [];
    this.props.todos.forEach(function(todo) {
      title = todo.title;
      todoNodes.push(<li key={title}>{title}</li>);
    });

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

  render: function() {
    return (
      <div>
        <TodoInput onNewTodo={this.addTodo} />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
});

React.render(
  <TodoApp />,
  document.getElementById("todo-container")
);
