
        return <main role="main" id="site-content">
        <section className="hg_section--relative p-0">
          <div className="container-fluid no-pad-cols">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                {/* Media container style 2 - with custom minimum height(.min-600) */}
                <div className="media-container style2 min-h-400 d-flex align-items-center justify-content-center">
                  {/* Background with parallax effect */}
                  <div className="kl-bg-source kl-bgSource-imageParallax js-KyHtmlParallax is-fixed">
                    {/* Background image */}
                    <div className="kl-bg-source__bgimage" style={{backgroundImage: `url(${this.state.image_url})`}} />
                    {/*/ Background image */}
                    {/* Color overlay */}
                    <div className="kl-bg-source__overlay" style={{backgroundColor: 'rgba(0,0,0,0.15)'}} />
                    {/*/ Color overlay */}
                    {/* Gloss overlay */}
                    <div className="kl-bg-source__overlay-gloss" />
                    {/*/ Gloss overlay */}
                  </div>
                  {/*/ Background with parallax effect */}
                  <div className="media-container__link media-container__link--btn media-container__link--style-borderanim2 py-2 d-flex flex-column justify-content-center">
                    <div className="row">
                      <div className="borderanim2-svg text-center mx-auto">
                        <svg height={70} width={400} xmlns="http://www.w3.org/2000/svg">
                          <rect className="borderanim2-svg__shape" x={0} y={0} height={70} width={400} />
                        </svg>
                        <span className="media-container__text"> <a href="{{ route('search.index', $page->permalink->slug ) }}" className="white" title={this.state.meta_title}>{this.state.name}</a> </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-10 col-md-12 float-none mx-auto">
                        <div className="text-center pt-1">
                          <h2 className="tbk__title kl-font-alt fs-xs-xl fs-l fw-bold white">
                          {this.state.name}
                          </h2>
                          {
                            this.state.h1_tag && <div className="row">
                              <p className="white mt-2 text-center w-100">
                              <span className="d-block fs-xs-md fs-22">{this.state.h1_tag}</span>
                            </p>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/ Link button with pop-up */}
                </div>
                {/*/ Media container style 2 - with custom minimum height(.min-600) */}
              </div>
              {/*/ col-sm-12 col-md-12 */}
            </div>
            {/*/ row */}
          </div>
          {/*/ container-fluid */}
          <Masks style='3'/>
        </section>
        <section className="hg_section bg-white pt-40 pb-40">
          <div className="container page-container-responsive">
          <StepBox style = {4}/>
          </div>
          <Masks style={12}/>
        </section>
        <section className="hg_section--relative pt-80 pb-100 mb-0">
          <div className="container page-container-responsive">
            <div className="callout-banner">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-9">
                  <h4 className="m_title">{this.state.excerpt}</h4>
                  <p dangerouslySetInnerHTML={{__html: this.state.content}}></p>
                </div>
                <div className="col-12 col-sm-12 col-md-3">
                <ActionBox style={5}/>
                </div>
              </div>
            </div>
          </div>
          @include('components.ui_elements.masks',['style'=&gt;'11'])
        </section>
        <section className="hg_section--relative pb-80 pt-80 mb-0">
          <div className="page-container-responsive">
            <div className="row">
              <h2 className="wgt-title">
                <span className="tcolor-ext">{'{'}{'{'} $page-&gt;name {'}'}{'}'}</span> Vacation Rentals </h2>
              <div className="col-12">
                @include('components.listing_widget.listing_slider_style_3',['type' =&gt; 'tag'])
              </div>
            </div>
          </div>
          @include('components.ui_elements.masks',['style'=&gt;'6'])
        </section>
        <section className="hg_section--relative p-0 m-0">
          <div className="page-container-responsive p-5">
            @include('components.listing_widget.listing_slider_style_2', ['type' =&gt; 'tag', 'tag'=&gt; $page-&gt;name,'section_title' =&gt; 'More <span className="tcolor">' . $page-&gt;name . '</span> Rentals', 'section_desc' =&gt; 'We have a wide selection of Vacation Rentals located in <span className="tcolor">' . $page-&gt;name . '</span> for you to choose from.  <br /><br />Just find your perfect destination, contact the host &amp; get ready to start your dream vacation!'])
          </div>
          @include('components.ui_elements.masks',['style'=&gt;'1'])
        </section>
      </main>
      