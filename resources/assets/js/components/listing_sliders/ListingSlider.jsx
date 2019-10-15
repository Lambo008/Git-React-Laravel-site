import React from 'react'
import Axios from 'axios';
import Slider from "react-slick";
import './slider.css'
export default class ListingSlider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listings : []
        }
    }
    componentDidMount(){
        if(this.props.type == 'state'){
            Axios.get('/ajax/pages/getStateListings/' + this.props.page_name + '/' + this.props.type)
            .then(Response =>{
                console.log(Response)
                this.setState({
                    listings : Response.data
                })
            })
        }
        if(this.props.type == 'city'){
            Axios.get('/ajax/pages/getCityListings/' + this.props.page_name + '/' + this.props.type)
            .then(Response =>{
                console.log(Response)
                this.setState({
                    listings : Response.data
                })
            })
        }
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.type == 'state'){
            Axios.get('/ajax/pages/getStateListings/' + nextprops.page_name + '/' + nextprops.type)
            .then(Response =>{
                console.log(Response)
                this.setState({
                    listings : Response.data
                })
            })
        }
    }
    render(){
      let slide_list = this.state.listings.map((listing) => {
        return  <div className="listing list_view " key={listing.id}>
        <div className="panel-image listing-img">
          
          <a href={`/homes/${listing.address_url}/${listing.id}`} target="_blank" className="media-photo media-cover">
            <div className="listing-img-container media-cover text-center">
              <img id="rooms_image_10968" src={listing.featured_image} className="img-responsive-height" />
            </div>
          </a>

        </div>
        <div className="panel-body panel-card-section">
          <div className="media">
            <div className="category_city hm_cate">
              <span >{listing.sub_name}
              </span>
            </div>
           
          
            <div itemProp="description" className="pull-left text-muted listing-location text-truncate nt_star">
              <a href="#" className="text-normal link-reset pull-left">
                <span className="pull-left">
                  <span className="pull-left"><div className="star-rating"> <div className="foreground"> </div> <div className="background mb_blck"><i className="icon icon-star icon-light-gray" /> <i className="icon icon-star icon-light-gray" /> <i className="icon icon-star icon-light-gray" /> <i className="icon icon-star icon-light-gray" /> <i className="icon icon-star icon-light-gray" /> </div> </div>
                  </span>
                </span>
              </a>
            </div>
          </div>
          <a href={`/homes/${listing.address_url}/${listing.id}`} target="_blank" className="text-normal">
              <h3 title={listing.name} itemProp="name" className="h5 listing-name text-truncate row-space-top-1">
               {listing.name}
              </h3>
            </a>
        </div>
      </div>
    })
    const settings = {
      lazyLoad: true,
      arrows: false,
      dots : false,
      centerPadding: "60px",
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      className: "center",
      centerPadding : '50px',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
        if(this.props.style == 2){
          return <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              {/* Recent Work carousel 1 default style element */}
              <div className="recentwork_carousel recentwork_carousel--1 clearfix">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    {/* Left side */}
                    <div className="recentwork_carousel__left mb-md-50">
                      {/* Title */}
                      <h3 className="recentwork_carousel__title m_title">
                      More <span className="tcolor">{this.props.section_title}</span> Rentals
                      </h3>
                      {/*/ Title */}
                      {/* Description */}
                      <p className="recentwork_carousel__desc">
        We have a wide selection of Vacation Rentals located in <span classname="tcolor">{this.props.section_title}</span> for you to choose from.  <br /><br />Just find your perfect destination, contact the host &amp; get ready to start your dream vacation!
                      </p>
                      {/*/ Description */}
                      {/* Slick navigation */}
                    </div>
                    {/*/ Left side - .recentwork_carousel__left */}
                  </div>
                  {/*/ col-sm-12 col-md-12 col-lg-3 */}
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    {/*  Recent Work - carousel wrapper */}
                    {slide_list.length ? 
                          <Slider {...settings}>
                        {slide_list}
                        </Slider>
                        : <div></div>}
                    {/*/ Recent Work - carousel wrapper - .recentwork_carousel__crsl-wrapper */}
                  </div>
                  {/*/ col-sm-12 col-md-12 col-lg-9 */}
                </div>
                {/*/ row */}
              </div>
              {/*/ Recent Work carousel 1 default style element */}
            </div>
            {/*/ col-sm-12 col-md-12 */}
          </div>
          {/*/ row */}
        </div>
        }
        if(this.props.style == 3){
            
            return <div className="kl-store-page">
            <div className="related products">
                <div className="products">
                <div className="row">
                    <div className="col-md-12">
                {slide_list.length ? 
                          <Slider {...settings}>
                        {slide_list}
                        </Slider>
                        : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
       else{
           return <div></div>
       }
    }
}