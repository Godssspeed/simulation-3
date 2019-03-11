import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, searchPosts } from "../../ducks/reducer";
import "./Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      myPost: true,
      title: ""
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  handleCheck = () => {
    this.setState({ myPost: !this.state.myPost });
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    const { title } = this.state;
    this.props.searchPosts(title);
  };
  render() {
    console.log(this.state);
    const { posts } = this.props;
    console.log(posts);
    console.log(this.props);

    const postList =
      posts &&
      posts.map(e => {
        return (
          <Link to={`/post/${e.id}`}>
            <div key={e.id} className="post">
              <h1>{e.title}</h1>
              <span>by {e.username}</span>
              <img src={e.profile_pic} alt={`${e.username}'s profile pic`} />
            </div>
          </Link>
        );
      });
    return (
      <div className="dashboard">
        <div className="searchbar">
          <form onSubmit={this.handleSearch}>
            <input
              placeholder="Search by Title"
              onChange={e => this.handleChange(e)}
            />
            <button type="submit">search</button>
          </form>
          <button onClick={this.props.getPosts}>reset</button>
          <div className="checkbox">
            <label htmlFor="myPosts">My Posts</label>
            <input
              type="checkbox"
              id="myPosts"
              name="myPosts"
              defaultChecked
              onClick={this.handleCheck}
            />
          </div>
        </div>
        <div className="postList">{postList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getPosts, searchPosts }
)(Dashboard);
