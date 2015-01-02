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
        <Comment author={comment.author}>
          {comment.text}
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
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});

    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name" ref="author" />
        <input type="text" placeholder="Comment" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },

  render: function() {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById("comments")
);
