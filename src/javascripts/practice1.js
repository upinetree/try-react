var Hello = React.createClass({
  render: function() {
    return (
      <div>Hello {this.props.name}!!</div>
    );
  }
})

// var MustBeWrapped= React.createClass({
//   render: function() {
//     return (
//       <div>XJS elements</div>
//       <div>must be wrapped</div>
//     );
//   }
// })

var MustBeWrapped= React.createClass({
  render: function() {
    return (
      <div>
        <div>XJS elements</div>
        <div>must be wrapped</div>
      </div>
    );
  }
})

React.render(<Hello name="React" />, document.getElementById("hello"));
React.render(<MustBeWrapped />, document.getElementById("app"));
