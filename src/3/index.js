var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h3 className="commentAuthor">{this.props.author}</h3>
        {this.props.children}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.user.login}>
          {comment.body}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        I am a CommentForm
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },

  loadComments: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadComments();
    setInterval(this.loadComments, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

React.render(
  <CommentBox url="https://api.github.com/repos/upinetree/try-react/issues/comments" pollInterval={2000} />,
  document.getElementById("comments")
);
