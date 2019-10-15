import React from 'react';
import Axios from 'axios'
import { toast } from 'react-toastify';
import dateFns from "date-fns";
export default class Comments extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            opend_reply_form : []
        }
        this.handlePostComment = this.handlePostComment.bind(this)
        this.renderReplies = this.renderReplies.bind(this)
        this.handlePostReply = this.handlePostReply.bind(this)
        this.handleCollapceReplyForm = this.handleCollapceReplyForm.bind(this)
    }
    handlePostComment(e){
        e.preventDefault();
        console.log()
        Axios.post(`/ajax/blog/post/comment`, {
            comments : e.target.comment.value,
            blogId : this.props.blogId
        }).then(Response =>{
            if(Response.data.status && Response.data.status == 'error'){
                toast.error(Response.data.message)
            }
            else{
                toast.success(Response.data.message)
            }
        })
    }
    handlePostReply(e, id){
        e.preventDefault();
        console.log()
        Axios.post(`/ajax/blog/post/comment/reply`, {
            reply : e.target.comment.value,
            blogId : this.props.blogId,
            commentid : id
        }).then(Response =>{
            if(Response.data.status && Response.data.status == 'error'){
                toast.error(Response.data.message)
            }
            else{
                toast.success(Response.data.message)
            }
        })
    }
    handleCollapceReplyForm(id){
        let opend_reply_form = this.state.opend_reply_form
        console.log(opend_reply_form, id)
        if(opend_reply_form.indexOf(id) == -1){
            opend_reply_form.push(id)
        }
        else{
            let index = opend_reply_form.indexOf(id)
            opend_reply_form.splice(index,1)
            
        }
        
        this.setState({
            opend_reply_form : opend_reply_form
        })
    }
    renderReplies(_comments){
        return <ol className="children">
        {
            _comments.map((comment, index) =>{
                return <li id="comment-intro" className="comment even thread-even depth-1"  key={index}>
                  <div className="cw clear">
                    <div className="ca"> <img src={comment.comment_profile_image} className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                    <div className="cm"> <cite className="fn">{comment.comment_profile_name}</cite> <a >{dateFns.format(dateFns.parse(comment.created_at), 'MMMM D, YYYY')} at {dateFns.format(dateFns.parse(comment.created_at), 'H:mm a')}</a></div>
                </div>
                <div className="ccon">
                    <div className="cc" dangerouslySetInnerHTML={{ __html : comment.comments }}>
                    </div>
                    <div className="rep"> 
                        <a rel="nofollow" 
                            style={{ cursor : 'pointer' }} 
                            className="comment-reply-link label label-primary bg-secondary text-white"  
                            aria-label="Reply to Emmerey Rose" 
                            data-toggle="collapse" 
                            onClick={()=>this.handleCollapceReplyForm(comment.id)}
                            role="button" 
                            aria-expanded="false" 
                            aria-controls={`"comment_reply${comment.id}"`}>Reply</a></div>
                </div>
                <div className={ this.state.opend_reply_form.includes(comment.id)  ?  "collapse mt-3 mb-3 show" : "collapse"} id={`"comment_reply${comment.id}"`}>
                    <div className="card card-body">
                    <form   onSubmit={(event) => this.handlePostReply(event, comment.id)}   className="comment-form" noValidate tp-global-watched="true">
                        <div className="cfc">
                            <textarea   name="comment" cols={45} rows={8} tabIndex={4} aria-required="true" placeholder="Your Reply" defaultValue={ ""} />
                        </div>
                        <p className="form-submit  mt-2"><input name="submit" type="submit" id="submit" className="button button-green button-small" defaultValue="Add Your Comment" /></p>
                    </form>
                    </div>
                </div>
                {
                    comment.child_comments.length ? this.renderReplies(comment.child_comments) : null
                }
                </li>
                
            })
        }
        </ol>
    }
    render(){
        return (
            <div id="comments" className="comments-area mt-4">
                <h2 className="comments-title">Comments</h2>
                <ol className="comment-list">
                {
                    this.props.comments.map((comment, index) =>{
                        return <li id="comment-intro" className="comment even thread-even depth-1"  key={index}>
                          <div className="cw clear">
                            <div className="ca"> <img src={comment.comment_profile_image} className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                            <div className="cm"> <cite className="fn">{comment.comment_profile_name}</cite> <a >{dateFns.format(dateFns.parse(comment.created_at), 'MMMM D, YYYY')} at {dateFns.format(dateFns.parse(comment.created_at), 'H:mm a')}</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc" dangerouslySetInnerHTML={{ __html : comment.comments }}>
                            </div>
                            <div className="rep"> 
                                <a rel="nofollow" 
                                    style={{ cursor : 'pointer' }} 
                                    className="comment-reply-link label label-primary bg-secondary text-white"  
                                    aria-label="Reply to Emmerey Rose" 
                                    data-toggle="collapse" 
                                    onClick={()=>this.handleCollapceReplyForm(comment.id)}
                                    role="button" 
                                    aria-expanded="false" 
                                    aria-controls={`"comment_reply${comment.id}"`}>Reply</a></div>
                        </div>
                        <div className={ this.state.opend_reply_form.includes(comment.id)  ?  "collapse mt-3 mb-3 show" : "collapse"} id={`"comment_reply${comment.id}"`}>
                            <div className="card card-body">
                            <form   onSubmit={(event) => this.handlePostReply(event, comment.id)}   className="comment-form" noValidate tp-global-watched="true">
                                <div className="cfc">
                                    <textarea   name="comment" cols={45} rows={8} tabIndex={4} aria-required="true" placeholder="Your Reply" defaultValue={ ""} />
                                </div>
                                <p className="form-submit  mt-2"><input name="submit" type="submit" id="submit" className="button button-green button-small" defaultValue="Add Your Comment" /></p>
                            </form>
                            </div>
                        </div>
                        {
                            comment.child_comments.length ? this.renderReplies(comment.child_comments) : null
                        }
                        </li>
                        
                    })
                }
                </ol>
                {/* <ol className="comment-list">
                    <li id="comment-intro" className="comment even thread-even depth-1">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/3e83c26e6e0ce7771bcaac2e8c9597ec?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/3e83c26e6e0ce7771bcaac2e8c9597ec?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                            <div className="cm"> <cite className="fn">Thomas Griffin</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-intro">January 30, 2017 at 8:00 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Thanks for reading this article – I hope you found it helpful.</p>
                                <p>I wanted to let you know about our <a temp-href="/features/exit-intent/" title="Click here to learn more about Exit Intent®" attr="__gaTracker( 'send', {hitType: 'event', eventCategory: 'CTA', eventAction: 'clicked', eventLabel: 'comment-feature-link' } )">powerful Exit Intent® technology</a> that converts abandoning website visitors into email subscribers and customers. Typically 70% of the people who visit your website will leave and never return, meaning all those marketing efforts to reach them have gone to waste.</p>
                                <p>OptinMonster’s Exit Intent® technology detects user behavior and prompts them with a targeted campaign at the precise moment they are about to leave.</p>
                                <p>You can unlock this powerful technology 100% free when you purchase our OptinMonster Pro plan.</p>
                                <p><a temp-href="/pricing/" title="Get started with OptinMonster today" attr="__gaTracker( 'send', {hitType: 'event', eventCategory: 'CTA', eventAction: 'clicked', eventLabel: 'comment-feature-cta' } )">Get started with OptinMonster today</a> and see why 700,000+ choose OptinMonster to get more subscribers and customers.</p>
                                <p>Thomas Griffin
                                    <br /> President of OptinMonster</p>
                            </div>
                        </div>
                    </li>
                    <li className="comment even thread-even depth-1" id="comment-58316">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/cf86da92362839bcd5b0a1367694cc0b?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/cf86da92362839bcd5b0a1367694cc0b?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                            <div className="cm"> <cite className="fn">Emmerey Rose</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-58316">February 1, 2017 at 3:51 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Interesting article Mary. Comments might not be an indicator of traffic but I think it’s a great way to connect and communicate with the readers. Yes, it’s not a necessity but it’s much better to have one I guess. Anyway, thanks for sharing! I had a good read.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=58316#respond" attr="return addComment.moveForm( &quot;comment-58316&quot;, &quot;58316&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Emmerey Rose">Reply</a></div>
                        </div>
                        <ol className="children">
                            <li className="comment byuser comment-author-marymaryfernandez-co bypostauthor odd depth-2" id="comment-58414">
                                <div className="cw clear">
                                    <div className="ca"> <img src="/wp-content/uploads/userphoto/7321.thumbnail.jpg" alt="Mary Fernandez" width={90} height={90} className="photo lazyloading" data-was-processed="true" /></div>
                                    <div className="cm"> <cite className="fn">Mary Fernandez</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-58414">February 1, 2017 at 11:20 pm</a></div>
                                </div>
                                <div className="ccon">
                                    <div className="cc">
                                        <p>I’m glad you enjoyed the read, Emmerey!</p>
                                    </div>
                                    <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=58414#respond" attr="return addComment.moveForm( &quot;comment-58414&quot;, &quot;58414&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Mary Fernandez">Reply</a></div>
                                </div>
                                <ol className="children">
                                    <li className="comment byuser comment-author-marymaryfernandez-co bypostauthor odd depth-2" id="comment-58414">
                                        <div className="cw clear">
                                            <div className="ca"> <img src="/wp-content/uploads/userphoto/7321.thumbnail.jpg" alt="Mary Fernandez" width={90} height={90} className="photo lazyloading" data-was-processed="true" /></div>
                                            <div className="cm"> <cite className="fn">Mary Fernandez</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-58414">February 1, 2017 at 11:20 pm</a></div>
                                        </div>
                                        <div className="ccon">
                                            <div className="cc">
                                                <p>I’m glad you enjoyed the read, Emmerey!</p>
                                            </div>
                                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=58414#respond" attr="return addComment.moveForm( &quot;comment-58414&quot;, &quot;58414&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Mary Fernandez">Reply</a></div>
                                        </div>
                                        <ol className="children">
                                            <li className="comment byuser comment-author-marymaryfernandez-co bypostauthor odd depth-2" id="comment-58414">
                                                <div className="cw clear">
                                                    <div className="ca"> <img src="/wp-content/uploads/userphoto/7321.thumbnail.jpg" alt="Mary Fernandez" width={90} height={90} className="photo lazyloading" data-was-processed="true" /></div>
                                                    <div className="cm"> <cite className="fn">Mary Fernandez</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-58414">February 1, 2017 at 11:20 pm</a></div>
                                                </div>
                                                <div className="ccon">
                                                    <div className="cc">
                                                        <p>I’m glad you enjoyed the read, Emmerey!</p>
                                                    </div>
                                                    <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=58414#respond" attr="return addComment.moveForm( &quot;comment-58414&quot;, &quot;58414&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Mary Fernandez">Reply</a></div>
                                                </div>
                                                <ol className="children">
                                                    <li className="comment byuser comment-author-marymaryfernandez-co bypostauthor odd depth-2" id="comment-58414">
                                                        <div className="cw clear">
                                                            <div className="ca"> <img src="/wp-content/uploads/userphoto/7321.thumbnail.jpg" alt="Mary Fernandez" width={90} height={90} className="photo lazyloading" data-was-processed="true" /></div>
                                                            <div className="cm"> <cite className="fn">Mary Fernandez</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-58414">February 1, 2017 at 11:20 pm</a></div>
                                                        </div>
                                                        <div className="ccon">
                                                            <div className="cc">
                                                                <p>I’m glad you enjoyed the read, Emmerey!</p>
                                                            </div>
                                                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=58414#respond" attr="return addComment.moveForm( &quot;comment-58414&quot;, &quot;58414&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Mary Fernandez">Reply</a></div>
                                                        </div>
                                                    </li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-66177">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/b070264d7aba14c194fe952009825f6a?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/b070264d7aba14c194fe952009825f6a?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                            <div className="cm"> <cite className="fn">Trey Clawson</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-66177">March 22, 2017 at 10:53 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Thanks for this post. I am currently starting up a blog for our company and I found it to be very helpful! I think that the advice to evaluate and do what is best for your individual audience was very wise and helped me come to a decision. Thanks for the unbiased content!</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=66177#respond" attr="return addComment.moveForm( &quot;comment-66177&quot;, &quot;66177&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Trey Clawson">Reply</a></div>
                        </div>
                        <ol className="children">
                            <li className="comment byuser comment-author-shall odd depth-2" id="comment-66185">
                                <div className="cw clear">
                                    <div className="ca"> <img src="https://secure.gravatar.com/avatar/d2a1d9dcedd78ef8d4ca9d2723e9e8f5?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/d2a1d9dcedd78ef8d4ca9d2723e9e8f5?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                                    <div className="cm"> <cite className="fn">Sharon Hurley Hall</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-66185">March 22, 2017 at 12:09 pm</a></div>
                                </div>
                                <div className="ccon">
                                    <div className="cc">
                                        <p>Glad that the post helped you decide on your own blog comment strategy, Trey. A good follow-up is our roundup of case studies on <a temp-href="/strategies-to-increase-blog-traffic-case-studies/">increasing blog traffic</a>. Please <a temp-href="http://twitter.com/optinmonster" target="_blank" rel="nofollow">follow us on Twitter</a> and <a temp-href="http://www.facebook.com/optinmonster" target="_blank" rel="nofollow">Facebook</a> to keep up with new posts.</p>
                                    </div>
                                    <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=66185#respond" attr="return addComment.moveForm( &quot;comment-66185&quot;, &quot;66185&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Sharon Hurley Hall">Reply</a></div>
                                </div>
                            </li>
                        </ol>
                    </li>
                    <li className="comment even thread-even depth-1" id="comment-67310">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/be145f061e1b72fdbc7dd6abd325409d?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/be145f061e1b72fdbc7dd6abd325409d?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                            <div className="cm"> <cite className="fn">Craig</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-67310">April 2, 2017 at 10:39 pm</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>One of the biggest questions I see in my circles is around using blog comments to spam URLs. Not so much the automated bot drivel, but the human “lightly-referencing the post but aiming for a link” kind of thing. In experimenting with removing the “URL” field, we cut down on that too; but I do feel we’re missing some of the conversation that came from people interested, but motivated to comment by the link attribution.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=67310#respond" attr="return addComment.moveForm( &quot;comment-67310&quot;, &quot;67310&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Craig">Reply</a></div>
                        </div>
                        <ol className="children">
                            <li className="comment byuser comment-author-shall odd depth-2" id="comment-67350">
                                <div className="cw clear">
                                    <div className="ca"> <img src="https://secure.gravatar.com/avatar/d2a1d9dcedd78ef8d4ca9d2723e9e8f5?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/d2a1d9dcedd78ef8d4ca9d2723e9e8f5?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                                    <div className="cm"> <cite className="fn">Sharon Hurley Hall</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-67350">April 3, 2017 at 5:59 am</a></div>
                                </div>
                                <div className="ccon">
                                    <div className="cc">
                                        <p>Thanks for that insight, Craig. For sure, there are people with something valuable to contribute who won’t comment without the opportunity for the link. Each blog has to decide whether the reduced comment moderation load is worth it. You might enjoy our article on <a temp-href="/email-marketing-vs-social-media-performance-2016-2019-statistics/">email marketing and social media statistics</a>. 🙂 And please <a temp-href="https://twitter.com/optinmonster" target="_blank" rel="nofollow">follow us on Twitter</a> and <a temp-href="https://www.facebook.com/optinmonster" target="_blank" rel="nofollow">Facebook</a> to keep up to date with all our articles.</p>
                                    </div>
                                    <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=67350#respond" attr="return addComment.moveForm( &quot;comment-67350&quot;, &quot;67350&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Sharon Hurley Hall">Reply</a></div>
                                </div>
                            </li>
                        </ol>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-96913">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/cfa336992252872680b1e823936fb765?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/cfa336992252872680b1e823936fb765?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                            <div className="cm"> <cite className="fn">Lidiya K</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-96913">November 11, 2017 at 7:53 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Thanks for the article, it was very helpful.</p>
                                <p>I’ve been wondering whether to remove and disable comments on my site for a long now. But I got solid reasons. Did a final research now, and your article together with the resources mentioned in it helped.</p>
                                <p>I believe it’s a good decision. Less clutter now, and the conversation moved to social media 🙂</p>
                                <p>Thanks again.</p>
                                <p>Best,
                                    <br /> Lidiya</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=96913#respond" attr="return addComment.moveForm( &quot;comment-96913&quot;, &quot;96913&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Lidiya K">Reply</a></div>
                        </div>
                        <ol className="children">
                            <li className="comment byuser comment-author-shall odd depth-2" id="comment-97148">
                                <div className="cw clear">
                                    <div className="ca"> <img src="https://secure.gravatar.com/avatar/d2a1d9dcedd78ef8d4ca9d2723e9e8f5?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/d2a1d9dcedd78ef8d4ca9d2723e9e8f5?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo lazyloading" height={48} width={48} data-was-processed="true" /></div>
                                    <div className="cm"> <cite className="fn">Sharon Hurley Hall</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-97148">November 13, 2017 at 4:19 am</a></div>
                                </div>
                                <div className="ccon">
                                    <div className="cc">
                                        <p>Happy to hear that you found the article useful, Lidiya. :)As a follow-up, check out our article on measuring <a temp-href="/how-to-measure-content-marketing-roi-metrics/" title="How to Measure Your Content Marketing ROI (The Metrics That Matter)">content marketing ROI</a>.</p>
                                    </div>
                                    <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=97148#respond" attr="return addComment.moveForm( &quot;comment-97148&quot;, &quot;97148&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Sharon Hurley Hall">Reply</a></div>
                                </div>
                            </li>
                        </ol>
                    </li>
                    <li className="comment even thread-even depth-1" id="comment-103039">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/a6654463168987ac44fb5dd7200b141e?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/a6654463168987ac44fb5dd7200b141e?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">Laura</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-103039">January 20, 2018 at 8:32 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Good read. Thanks for the data. It helps us at North of 52. We only have several comments per post and were evaluating the impact on metrics. Doesn’t seem to be any. Our highest read posts have no or one comment.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=103039#respond" attr="return addComment.moveForm( &quot;comment-103039&quot;, &quot;103039&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Laura">Reply</a></div>
                        </div>
                        <ol className="children">
                            <li className="comment byuser comment-author-shall odd depth-2" id="comment-103450">
                                <div className="cw clear">
                                    <div className="ca"> <img src="https://secure.gravatar.com/avatar/d2a1d9dcedd78ef8d4ca9d2723e9e8f5?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/d2a1d9dcedd78ef8d4ca9d2723e9e8f5?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                                    <div className="cm"> <cite className="fn">Sharon Hurley Hall</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-103450">January 24, 2018 at 11:11 am</a></div>
                                </div>
                                <div className="ccon">
                                    <div className="cc">
                                        <p>Hope that works well for you, Laura. As a follow-up, you might enjoy our recent guide to <a temp-href="/how-to-create-a-successful-content-marketing-strategy-in-8-simple-steps/" title="How to Create a Successful Content Marketing Strategy in 11 Simple Steps">content marketing strategy</a>.</p>
                                    </div>
                                    <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=103450#respond" attr="return addComment.moveForm( &quot;comment-103450&quot;, &quot;103450&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Sharon Hurley Hall">Reply</a></div>
                                </div>
                            </li>
                        </ol>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-123759">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/024182b9a357953dcf2bbc09715f55a1?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/024182b9a357953dcf2bbc09715f55a1?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">lutfor rahman</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-123759">January 14, 2019 at 9:33 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>this site is a very good site</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=123759#respond" attr="return addComment.moveForm( &quot;comment-123759&quot;, &quot;123759&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to lutfor rahman">Reply</a></div>
                        </div>
                        <ol className="children">
                            <li className="comment byuser comment-author-jsantora odd depth-2" id="comment-123768">
                                <div className="cw clear">
                                    <div className="ca"> <img src="/wp-content/uploads/userphoto/7364.thumbnail.jpg" alt="Jacinda Santora" width={90} height={90} className="photo" /></div>
                                    <div className="cm"> <cite className="fn">Jacinda Santora</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-123768">January 14, 2019 at 1:56 pm</a></div>
                                </div>
                                <div className="ccon">
                                    <div className="cc">
                                        <p>Thanks for stopping by, Lutfor!</p>
                                    </div>
                                    <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=123768#respond" attr="return addComment.moveForm( &quot;comment-123768&quot;, &quot;123768&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Jacinda Santora">Reply</a></div>
                                </div>
                            </li>
                        </ol>
                    </li>
                    <li className="comment even thread-even depth-1" id="comment-124618">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/3141a034757bd058faa4ef112e2be905?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/3141a034757bd058faa4ef112e2be905?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">prestige</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-124618">January 22, 2019 at 1:50 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Hy..Good read. Thanks for the data. It helps us at North of 52. We only have several comments per post and were evaluating the impact on metrics. Doesn’t seem to be any. Our highest read posts have no or one comment.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=124618#respond" attr="return addComment.moveForm( &quot;comment-124618&quot;, &quot;124618&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to prestige">Reply</a></div>
                        </div>
                        <ol className="children">
                            <li className="comment byuser comment-author-jsantora odd depth-2" id="comment-124728">
                                <div className="cw clear">
                                    <div className="ca"> <img src="/wp-content/uploads/userphoto/7364.thumbnail.jpg" alt="Jacinda Santora" width={90} height={90} className="photo" /></div>
                                    <div className="cm"> <cite className="fn">Jacinda Santora</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-124728">January 23, 2019 at 5:51 am</a></div>
                                </div>
                                <div className="ccon">
                                    <div className="cc">
                                        <p>We keep our comments open because they give us another way to stay in touch with our customers – and we really do love our customers! Comments can also help with SEO, though that boost may not be quite as big as it once was.</p>
                                        <p>Regardless, it’s nice to be able to address concerns as they come up, answer on-topic questions, and have some actual conversations with real visitors. 😊</p>
                                    </div>
                                    <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=124728#respond" attr="return addComment.moveForm( &quot;comment-124728&quot;, &quot;124728&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Jacinda Santora">Reply</a></div>
                                </div>
                            </li>
                        </ol>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-125822">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/ae108b980d53fbd9079577dd1a8b8fb8?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/ae108b980d53fbd9079577dd1a8b8fb8?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">varun</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-125822">February 2, 2019 at 8:58 pm</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>thanks very much great article i recently allowed comments on my blogspot blog</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=125822#respond" attr="return addComment.moveForm( &quot;comment-125822&quot;, &quot;125822&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to varun">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment odd thread-even depth-1" id="comment-125840">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/e43a10ab5700ec657dc64a4190571056?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/e43a10ab5700ec657dc64a4190571056?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">path2excell</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-125840">February 3, 2019 at 12:08 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Hi, It’s really a great post with lots of blog commenting sites. It’s very important for getting traffic and really thanks for sharing all.</p>
                            </div>import { Axios } from 'axios';
import { Axios } from 'axios';
import { axios } from 'axios';

                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=125840#respond" attr="return addComment.moveForm( &quot;comment-125840&quot;, &quot;125840&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to path2excell">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-126039">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/564aa2855a2c156020800a17815aaef3?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/564aa2855a2c156020800a17815aaef3?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">Sunil</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-126039">February 5, 2019 at 5:05 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Good article, keep going on..</p>
                                <p>Regards
                                    <br /> Sunil</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=126039#respond" attr="return addComment.moveForm( &quot;comment-126039&quot;, &quot;126039&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Sunil">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment odd thread-even depth-1" id="comment-126352">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/59245688358d8116049d5b967791ea30?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/59245688358d8116049d5b967791ea30?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">BusinessBox</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-126352">February 9, 2019 at 4:53 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>I really appreciate this post thank you for sharing these type of posts</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=126352#respond" attr="return addComment.moveForm( &quot;comment-126352&quot;, &quot;126352&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to BusinessBox">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-127527">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/b8df3444a38dd8f51eaf2f6881b9ebf4?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/b8df3444a38dd8f51eaf2f6881b9ebf4?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">Jenna Foster</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-127527">February 21, 2019 at 4:48 pm</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Aloha guys!</p>
                                <p>Very interesting article! Thank you! It relaxes me 🙂
                                    <br /> So, I think I will keep the comments so readers can get in touch with me easily but I’m grateful to let go the pressure from it.</p>
                                <p>Aloha, Jenna</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=127527#respond" attr="return addComment.moveForm( &quot;comment-127527&quot;, &quot;127527&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Jenna Foster">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment odd thread-even depth-1" id="comment-128964">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/d71fbad94818de95d41fa3089e049074?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/d71fbad94818de95d41fa3089e049074?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">Jaideep Singh</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-128964">March 6, 2019 at 5:15 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Hello,
                                    <br /> I read your blog and i found it very interesting and useful blog for me. I hope you will post more like this, i am very thankful to you for these type of post.
                                    <br /> Thank you.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=128964#respond" attr="return addComment.moveForm( &quot;comment-128964&quot;, &quot;128964&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Jaideep Singh">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-128993">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/bb7957a1dab0b2f39188bef5f266645c?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/bb7957a1dab0b2f39188bef5f266645c?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">David Webley</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-128993">March 6, 2019 at 8:15 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>I think concentrating on the merits and metrics of blog comments against any individual post misses some of the opportunities and merits comments can bring. Appearing to be open to customer engagement helps to build confidence in your brand. The opportunities gained by hearing the thoughts, desires and (with my commercial hat on) needs of your audience can be hugly beneficial. If we have a commercial site we are here, after all, to serve our audience, perhaps educate along the way but not lecture or dictate to. So any comment however small or infrequent can aid us in that undertaking to build content, products or services that are wanted by our customers. After all without our audience we have no customers, no customers no income.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=128993#respond" attr="return addComment.moveForm( &quot;comment-128993&quot;, &quot;128993&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to David Webley">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment odd thread-even depth-1" id="comment-129080">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/c8da586556fde8fea24d67afa1e22499?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/c8da586556fde8fea24d67afa1e22499?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">Megan K. Harding</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-129080">March 7, 2019 at 1:25 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>I really appreciate this post thank you for sharing these type of posts</p>
                                <p>We keep our comments open because they give us another way to stay in touch with our customers – and we really do love our customers! Comments can also help with digital marketing, though that boost may not be quite as big as it once was.</p>
                                <p>Regardless, it’s nice to be able to address concerns as they come up, answer on-topic questions, and have some actual conversations with real visitors. 😊</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=129080#respond" attr="return addComment.moveForm( &quot;comment-129080&quot;, &quot;129080&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Megan K. Harding">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-131408">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/688434fbe1cb040cf07b992809684b81?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/688434fbe1cb040cf07b992809684b81?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">Abhishek</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-131408">March 25, 2019 at 4:07 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Thanks for this post i just added comment in my blog.
                                    <br /> Very informative article.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=131408#respond" attr="return addComment.moveForm( &quot;comment-131408&quot;, &quot;131408&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Abhishek">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment odd thread-even depth-1" id="comment-132294">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/6f40506e05bf29af09cf384c3d716565?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/6f40506e05bf29af09cf384c3d716565?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">AK Coolroom Hire</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-132294">March 30, 2019 at 2:01 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Awesome post! This is helpful post. This article is clear and with lots of useful information. Thanks for the run down!</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=132294#respond" attr="return addComment.moveForm( &quot;comment-132294&quot;, &quot;132294&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to AK Coolroom Hire">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-134047">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/1ceca605611eee95fa9f7651eaca5a5f?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/1ceca605611eee95fa9f7651eaca5a5f?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">Will Smith</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-134047">April 10, 2019 at 7:03 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Thanks for the article. Comments are the best way to connect to users and know about their experiences.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=134047#respond" attr="return addComment.moveForm( &quot;comment-134047&quot;, &quot;134047&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Will Smith">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment odd thread-even depth-1" id="comment-134699">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/fabb605583536d2bf766b099378d1a09?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/fabb605583536d2bf766b099378d1a09?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">David Simmons</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-134699">April 15, 2019 at 2:11 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Commendable article,</p>
                                <p>Blog Comment is a great way to exchange ideas, thoughts or opinions about what people feel for a particular topic or a blog post. They helps the blog to attract traffic and makes it social so yes they will definitely helps in improving the performance of the website.</p>
                                <p>Thank you</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=134699#respond" attr="return addComment.moveForm( &quot;comment-134699&quot;, &quot;134699&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to David Simmons">Reply</a></div>
                        </div>
                    </li>
                    <li className="comment even thread-odd thread-depth-1" id="comment-135436">
                        <div className="cw clear">
                            <div className="ca"> <img src="https://secure.gravatar.com/avatar/796682d4b4baccad403e626ccf5497a8?s=48&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/796682d4b4baccad403e626ccf5497a8?s=96&d=mm&r=g 2x" className="avatar avatar-48 photo" height={48} width={48} /></div>
                            <div className="cm"> <cite className="fn">Logan Torres</cite> <a temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#comment-135436">April 21, 2019 at 12:11 am</a></div>
                        </div>
                        <div className="ccon">
                            <div className="cc">
                                <p>Comments are good to keep the page fresh.</p>
                            </div>
                            <div className="rep"> <a rel="nofollow" className="comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/?replytocom=135436#respond" attr="return addComment.moveForm( &quot;comment-135436&quot;, &quot;135436&quot;, &quot;respond&quot;, &quot;103539&quot; )" aria-label="Reply to Logan Torres">Reply</a></div>
                        </div>
                    </li>
                </ol>*/}
                <div id="respond" className="comment-respond"> 
                    <h3 id="reply-title" className="comment-reply-title">Add a Comment <small><a rel="nofollow" id="cancel-comment-reply-link" temp-href="/to-allow-blog-comments-or-not-heres-what-the-data-shows/#respond" style={{display: 'none'}}>Cancel reply</a></small></h3>
                    <form   onSubmit={this.handlePostComment} id="commentform" className="comment-form" noValidate tp-global-watched="true">
                        <p className="commentpolicy">We're glad you have chosen to leave a comment. Please keep in mind that all comments are moderated according to our <a temp-href="http://optinmonster.com/privacy/" title="OptinMonster Privacy Policy">privacy policy</a>, and all links are nofollow. Do NOT use keywords in the name field. Let's have a personal and meaningful conversation.</p>
                        <div className="cfc">
                            <textarea id="comment" name="comment" cols={45} rows={8} tabIndex={4} aria-required="true" placeholder="Your Comment" defaultValue={ ""} />
                        </div>
                        <p className="form-submit"><input name="submit" type="submit" id="submit" className="button button-green button-small" defaultValue="Add Your Comment" /></p>
                    </form>
                </div>
            </div>
        )
    }
}