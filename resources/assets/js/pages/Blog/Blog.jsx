import React from 'react'
import './blog.scss'
import { Route, Link } from "react-router-dom";
import Index from './pages/Index';
import Axios from 'axios';
import dateFns from "date-fns";
import BlogDetail from './pages/Detail';
import Category from './pages/Category';
import Tags from './pages/Tags';
import Author from './pages/Author';

export default class Blog extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      featured: [],

      latest_listing: [],
      posts: [],
      tags: []
    }
  }
  componentDidMount() {
    
    var l = document.createElement("a");
    l.href = location.href;
    var path = l.pathname.replace("/blog/", "")
    var blogId = null;
    if(Number.isInteger(parseInt(path))){
      blogId = path;
    }
    
    
    Axios.get(blogId ? '/ajax/blog/index?blogid=' + blogId : '/ajax/blog/index')
      .then(response => {
        this.setState({
          categories: response.data.categories,
          featured: response.data.featured,
          last_featured: response.data.last_featured,
          latest_listing: response.data.latest_listing,
          posts: response.data.posts,
          tags: response.data.tags,
        })
      })
  }
  render() {
    

    return <div className="blog_panel  my-5">
      <div className="row">
        <div className="col-lg-8 col-md-11 col-sm-11 blog-section-pagination blog ">
          <Route exact path={`${this.props.match.url}`} component={Index} />
          <Route exact path={`${this.props.match.url}/:blogID`} component={BlogDetail} />
          <Route exact path={`${this.props.match.url}/category/:slug`} component={Category} />
          <Route exact path={`${this.props.match.url}/tag/:slug`} component={Tags} />
          <Route exact path={`${this.props.match.url}/author/:authorid`} component={Author} />
        </div>
        <div className="col-lg-3 col-md-11   col-sm-11  container">
          <div id="secondary" className="widget-area" role="complementary">
            {/* <aside id="text-3" className="widget widget_text">
    <h4 className="widget-title">Connect With Us</h4>
    <div className="textwidget">
      <ul className="social-icons">
        <li className="twitter">
          <a href="http://twitter.com/optinmonster" title="OptinMonster on Twitter" target="_blank">
            <i className="fa fa-twitter" />
          </a>
        </li>
        <li className="facebook">
          <a href="http://www.facebook.com/optinmonster" title="OptinMonster on Facebook" target="_blank">
            <i className="fa fa-facebook-square" />
          </a>
        </li>
        <li className="youtube">
          <a href="http://www.youtube.com/user/optinmonster" title="OptinMonster on YouTube" target="_blank">
            <i className="fa fa-youtube-play" />
          </a>
        </li> 
        <li className="linkedin">
          <a href="http://www.linkedin.com/company/optinmonster" title="OptinMonster on LinkedIn" target="_blank">
            <i className="fa fa-linkedin-square" />
          </a>
        </li>
      </ul>
    </div>
  </aside> */}

            <aside id="categories-4" className="widget widget_categories">
              <h4 className="widget-title">CATEGORIES</h4>
              <ul>
                {
                  this.state.categories.map((category, index) => {
                    return <li className={`cat-item cat-item-${index}`} key={index}>
                      <a href={`/blog/category/${category.slug}`} >{category.name}</a>
                    </li>
                  })
                }
              </ul>
            </aside>
            <aside className="widget widget_multipanel_menus mt-5">
              <h4 className="widget-title">FEATURED POSTS</h4>
              <div className="multipanel-menus-outer">
                <div className="multipanel-menus-unslider"  >
                  <ul >
                    <li style={{}}>
                      <ul id="menu-popular-posts-1" className>
                      {
                         this.state.featured.map((blog, index) => {
                        return <li id="menu-item-119436" className="menu-item">
                          <a href={`/blog/${blog.id}`}>{blog.title}</a>
                        </li>
                        })
                      }
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
            <aside className="widget widget_multipanel_menus mt-5">
              <h4 className="widget-title">TAGS</h4>
              <div className="multipanel-menus-outer">
              {
                this.state.tags.map((tag, index) => {
                  return <span className="badge badge-pill badge-secondary mr-2 mb-2" key={index}><a href={`/blog/tag/${tag.slug}`} className="text-white  p-2"> {tag.name} </a></span>
                })
              }
              </div>
            </aside>
          </div>


          {/* <div className="featured_post_side">
            <div className="featured_post_header">
              <span>  </span>
            </div>
            {
              this.state.featured.map((blog, index) => {
                return <div className="featured_list" key={index}>
                  <div className="slick_posts">
                    <div className="slick_posts_container">
                      <div className="row">
                        <div className="featured_post">
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="featured_post_img_container ">
                              <a href={`/blog/${blog.id}`}> <img src={blog.image} className="img-responsive" alt="Post Image" /></a>
                            </div>
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-12">
                            <div className="featured_post_title">
                              <span><a href={`/blog/${blog.id}`}>{blog.title}</a></span>
                              <p> {dateFns.format(dateFns.parse(blog.publish_date), 'MMM D, YYYY')} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }

          </div> */}
          {/* <div className="featured_post_side">
            <div className="featured_post_header">
              <span> RECENT LISTINGS </span>
            </div>
            <div className="featured_list">
              <div className="slick_posts">
                <div className="slick_posts_container">
                  {
                    this.state.latest_listing.map((listing, index) => {
                      return <div className="row mt-2" key={index}>
                        <div className="featured_post">
                          <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="featured_post_img_container ">
                              <a href={`/homes/${listing.address_url}/${listing.id}`} target="_blank"> <img src={listing.featured_image} className="img-responsive" alt="Room Image" /></a>
                            </div>
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-12">
                            <div className="featured_post_title">
                              <span><a href={`/homes/${listing.address_url}/${listing.id}`} target="_blank">{listing.name}</a></span>
                              <p>{listing.sub_name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    })
                  }

                </div>

              </div>
            </div>
          </div> */}
          {/* <div className="tags_side">
            <div className="tags_post_header">
              <span> TAGS </span>
            </div>
            <div className="tags_list">
              {
                this.state.tags.map((tag, index) => {
                  return <span className="tag_item" key={index}><a href={`/blog/tag/${tag.slug}`}> {tag.name} </a></span>
                })
              }
            </div>
          </div> */}
        </div>
      </div>
    </div>
  }
}