import React from 'react'
import Axios from 'axios';
import dateFns from "date-fns";
import { Route, Link } from "react-router-dom";
import AuthorDetail from './AuthorDetail';
import Comments from '../components/Comments';
export default class BlogDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      blog_detail: {},
      related_posts: [],
      comments : []
    }
  }
  componentDidMount() {
    console.log()
    Axios.get(`/ajax/blog/detail/${this.props.match.params.blogID}`)
      .then(response => {
        this.setState({
          blog_detail: response.data.post,
          related_posts: response.data.related_posts,
          comments: response.data.comments
        })
        console.log(response.data)
      })
  }
  render() {
    return <div className="col-lg-offset-2 col-md-offset-1 col-sm-offset-1 single ">
      <div className="post_panel" id="content">
        <div className="itemContainer featured-post">
          <div className="zn_full_image" style={{ overflow: 'hidden' }}>
            <img src={this.state.blog_detail.image} className="img-responsive" alt={this.state.blog_detail.title} />
          </div>
        </div>
        <div className="text_panel mt-4">
          <div className="row">
            <div className="float-left">
              <time dateTime={dateFns.format(dateFns.parse(this.state.blog_detail.publish_date), 'YYYY-MM-DD')} className="icon">
                <em>{dateFns.format(dateFns.parse(this.state.blog_detail.publish_date), 'dddd')}</em>
                <strong>{dateFns.format(dateFns.parse(this.state.blog_detail.publish_date), 'MMM')}</strong>
                <span>{dateFns.format(dateFns.parse(this.state.blog_detail.publish_date), 'D')}</span>
              </time>
            </div>
            <div className="col">
              <div className="entry-header  pt-3">
                <h2 className="entry-title ">
                  {this.state.blog_detail.title}
                  <span className="catItemDateCreated">
                  </span>
                  <span className="catItemAuthor">by <a href={`/blog/author/${this.state.blog_detail.author_id}`} title={this.state.blog_detail.author_name} rel="author">{this.state.blog_detail.author_name}</a></span>
                </h2>
              </div>
              <div className="entry-meta pt-3"> 
                <span>
                  <em>by</em> 
                  <span className="post-author">{this.state.blog_detail.author_name}</span>
                  <em>on</em> <span className="post-date">{dateFns.format(dateFns.parse(this.state.blog_detail.publish_date), 'MMMM D, YYYY')}</span>
                </span>
              </div>
              {/* <div className="post_footer">
                <span className="post_author">
                  <i className="fa fa-user" />
                  by <a href={`/blog/author/${this.state.blog_detail.author_id}`}></a>
                </span>
                {
                  this.state.blog_detail.categories && this.state.blog_detail.categories.length ? this.state.blog_detail.categories.map((category, index) => {
                    return <span className="post_categories">
                      <i className="fa fa-folder" />
                      <a href={`/blog/category/${category.slug}`} >{category.name}{this.state.blog_detail.categories.length - 1 != index ? ', ' : ''} </a>
                    </span>
                  })
                    : null
                }
              </div> */}
            </div>
          </div>
          <div className="single_post_container">
            <div className="row">
            {/* <div className="ea-share-count-wrap before_content mt-3">
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://optinmonster.com/to-allow-blog-comments-or-not-heres-what-the-data-shows/&display=popup&ref=plugin&src=share_button" title="Share on Facebook" target="_blank" className="ea-share-count-button style-awesome ea-share-no-count facebook" data-postid={103539}>
                <span className="ea-share-count-icon-label">
                  <i className="ea-share-count-icon fa fa-facebook" />
                  <span className="ea-share-count-label">Share</span>
                </span>
              </a>
              <a href="https://twitter.com/share?url=https://optinmonster.com/to-allow-blog-comments-or-not-heres-what-the-data-shows/&text=To+Allow+Blog+Comments+or+Not%3F+Here%26%238217%3Bs+What+the+Data+Shows&via=optinmonster" title="Share on Twitter" target="_blank" className="ea-share-count-button style-awesome ea-share-no-count twitter" data-postid={103539}>
                <span className="ea-share-count-icon-label">
                  <i className="ea-share-count-icon fa fa-twitter" />
                  <span className="ea-share-count-label">Tweet</span>
                </span>
              </a>
              <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://optinmonster.com/to-allow-blog-comments-or-not-heres-what-the-data-shows/" title="Share on LinkedIn" target="_blank" className="ea-share-count-button style-awesome ea-share-no-count linkedin" data-postid={103539}>
                <span className="ea-share-count-icon-label">
                  <i className="ea-share-count-icon fa fa-instagram" />
                  <span className="ea-share-count-label">Share</span>
                </span>
              </a>
              <span className="ea-share-count-button style-awesome included_total" data-postid={103539}>
                <span className="ea-share-count-icon-label">
                  <i className="ea-share-count-icon easc-icon-share" />
                  <span className="ea-share-count-label">Shares</span>
                </span>
                <span className="ea-share-count">44</span>
              </span>
            </div> */}

              <span className="entry-content" dangerouslySetInnerHTML={{ __html: this.state.blog_detail.content }}></span>
            </div>
          </div>
        </div>
        <hr />
        {
          this.state.blog_detail.author_id && <AuthorDetail author_id={this.state.blog_detail.author_id} />
        }
        {/* <Comments blogId = {this.props.match.params.blogID} comments={this.state.comments}/> */}
        <div id="disqus_thread"></div>
        

      </div>
    </div>
  }
}