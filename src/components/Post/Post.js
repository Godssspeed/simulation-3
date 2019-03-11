import React, { Component } from "react";
import axios from "axios";

export class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: [],
      content: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/post/${+id}`).then(response => {
      this.setState({ post: response.data });
    });
  }

  componentDidUpdate(prevState) {
    const { id } = this.props.match.params;
    if (this.state !== prevState) {
      axios.get(`/api/post/${+id}`).then(response => {
        this.setState({ post: response.data });
      });
    }
  }

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleEdit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { content } = this.state;
    axios.put(`/api/post/${+id}/edit`, { content }).then(response => {
      axios.get(`/api/post/${+id}`).then(response => {
        this.setState({ post: response.data });
      });
    });
  };

  render() {
    const { post } = this.state;
    const postInfo =
      post &&
      post.map(e => {
        return (
          <div key={e.id}>
            <h1>{e.title}</h1>
            <h2>{e.content}</h2>
            <img src={e.img} alt="wefewfew" />
            <p>Posted by {e.username}</p>
          </div>
        );
      });
    return (
      <div>
        {postInfo}
        <form onSubmit={this.handleEdit}>
          <input onChange={e => this.handleChange(e)} />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default Post;
