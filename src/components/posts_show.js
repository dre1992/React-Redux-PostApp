import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions';
import {Link} from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    //can add a extra check if(!this.props.post) to check whether we already have a post or not
    //id we are not so obsessed with the performance we can just refetch the post (dealing with stale data)
    const {id}=this.props.match.params;
    this.props.fetchPost(id);
  }
  onDeleteClick() {
    const {id}=this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });

  }

  render() {

    const {post}=this.props;
    if(!post){
      return <div>Loading....</div> //the first time the render method is called we have no post because we get the id after componentDidMount
                                    // that means we have undefined at   return {post:posts[ownProps.match.params.id]}; (mapStateToProps) .
    }
    return(
      <div>
        <Link to="/">Back to index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
          >
          Delete post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({posts},ownProps) {
  return {post:posts[ownProps.match.params.id]};       //we could put that in a separate file and leave PostsShow to only render the view
  //ownProps is equal to this.props, that way we can access the id that is passed via react-router-dom to the component and use it
  //to only grab the post that we want and not the big posts object

}

export default connect(mapStateToProps,{ fetchPost, deletePost })(PostsShow);
