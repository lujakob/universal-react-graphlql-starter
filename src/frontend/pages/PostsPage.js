import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import Posts from '../components/Posts'

class PostsPage extends Component {

  render() {
    const {loading, error, posts} = this.props.data

    return (
      <div className="page posts-page">
        <p>Posts page</p>
        {loading &&
          <p>Loading...</p>
        }
        {posts && posts.length
          ? <Posts entries={posts}/>
          : <p>No entries</p>
        }
      </div>
    )
  }
}

const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      id
      title
    }
  }
`

const withData = graphql(POSTS_QUERY)

export default withData(PostsPage)