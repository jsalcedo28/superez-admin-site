import React from 'react';
import notFound from '../../assets/img/notfound.png';
import { StoreCommunityListBodyListener } from '../../listeners/StoreCommunity/StoreCommunityListBodyListener';
import StarRatings from 'react-star-ratings';

class StoreCommunityListBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      reviewComments: [],
      comment: '',
      commentRating: '',
      subject: '',
      rating1: 0,
      rating2: 0,
      rating3: 0
    };

    this.comment = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRatingChange1 = this.handleRatingChange1.bind(this);
    this.handleRatingChange2 = this.handleRatingChange2.bind(this);
    this.handleRatingChange3 = this.handleRatingChange3.bind(this);

    StoreCommunityListBodyListener.setStoresState =
      StoreCommunityListBodyListener.setStoresState.bind(this);
  }

  componentDidMount() {
    fetch('https://api.getsuperez.com/stores')
      .then((response) => response.json())
      .then((data) => this.setState({ stores: data.slice(0, 3) }));
  }

  handleCommentClick(store) {
    fetch('http://localhost:62688/api/community/stores/reviews', {
      method: 'POST',
      body: JSON.stringify({
        customer_id: '5b08266ef15c53c020fd2edf',
        store_id: store._id,
        comment: this.state.commentRating,
        subject: this.state.subject,
        created_at: new Date(),
        rating: store._id === '5af7085b61f86e42ca973a5b' 
          ? this.state.rating1 
          : store._id === '5b08d76561f86e42ca98b4ab' 
            ? this.state.rating2 
            : store._id === '5b0969b061f86e42ca98c1c1' 
              ? this.state.rating3 
              : ''
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(() => {
        this.setState({ commentRating: '' });
        this.setState({ subject: '' });

        Array.from(document.getElementsByClassName('comment-rating')).forEach(
          function(element) {
            element.value = '';
          }
        );

        Array.from(document.getElementsByClassName('subject')).forEach(
          function(element) {
            element.value = '';
          }
        );

        fetch('https://api.getsuperez.com/stores')
          .then((response) => response.json())
          .then((data) => this.setState({ stores: data.slice(0, 3) }));

        fetch(`http://localhost:62688/api/community/stores/ratings/${store._id}`)
          .then((response) => response.json())
          .then((data) => this.setState({ reviewComments: data }));
      });
  }

  handleShowReviewsClick(storeId) {
    fetch(`http://localhost:62688/api/community/stores/ratings/${storeId}`)
      .then((response) => response.json())
      .then((data) => this.setState({ reviewComments: data }));
  }

  handleReplyClick(comment, storeId) {
    fetch('http://localhost:62688/api/community/stores/comments', {
      method: 'POST',
      body: JSON.stringify({
        review_id: comment.review_id,
        customer_id: comment.customer_id,
        parent_comment_id: comment._id,
        thread: comment.thread + 1,
        text: this.state.comment,
        reported_abuse: false,
        created_at: new Date()
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(() => {
        this.setState({ comment: '' });

        Array.from(document.getElementsByClassName('comment')).forEach(
          function(element) {
            element.value = '';
          }
        );

        fetch('https://api.getsuperez.com/stores')
          .then((response) => response.json())
          .then((data) => this.setState({ stores: data.slice(0, 3) }));

        fetch(`http://localhost:62688/api/community/stores/ratings/${storeId}`)
          .then((response) => response.json())
          .then((data) => this.setState({ reviewComments: data }));
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'comment') {
      let commentCopy = JSON.parse(JSON.stringify(this.state.comment));

      commentCopy = value;

      this.setState({ comment: commentCopy });
    } else if (name === 'comment-rating') {
      let commentRatingCopy = JSON.parse(JSON.stringify(this.state.commentRating));

      commentRatingCopy = value;

      this.setState({ commentRating: commentRatingCopy });
    } else if (name === 'subject') {
      let subjectCopy = JSON.parse(JSON.stringify(this.state.subject));

      subjectCopy = value;

      this.setState({ subject: subjectCopy });
    }
  }

  handleRatingChange1(newRating) {
    this.setState({
      rating1: newRating
    });
  }

  handleRatingChange2(newRating) {
    this.setState({
      rating2: newRating
    });
  }

  handleRatingChange3(newRating) {
    this.setState({
      rating3: newRating
    });
  }

  render() {
    const { stores, reviewComments, rating1, rating2, rating3 } = this.state;

    return (
      <React.Fragment>
        <h5>Available stores</h5>
        <table className="table table-responsive-sm table-hover table-outline 
        mb-0"
        >
          <thead className="thead-light">
            <tr>
              <th className="text-center">
                <i className="icon-picture"></i>
              </th>
              <th className="text-center">Store Name</th>
              <th className="text-center">Comment</th>
              <th className="text-center">Rating</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              stores.length > 0
                ? (
                  stores.map((p, i) =>
                    <tr key={p.upc + p.store_code}>
                      <td className="text-center">
                        <img
                          width="72"
                          src={p.logo_url
                            ? p.logo_url
                            : notFound}
                          alt="getsuperez@gmail.com"
                        />
                      </td>
                      <td className="text-center">
                        {p.name}
                      </td>
                      <td 
                        className="text-center"
                        style={{
                          width: '25%'
                        }}>
                        <StarRatings
                          rating={p.review_average}
                          starDimension="20px"
                          starSpacing="0px"
                          starRatedColor="rgb(240, 193, 75)"
                          numberOfStars={5}
                        /> ({p.review_count}) 
                        <br />{p.review_average} out of 5 stars
                      </td>
                      <td 
                        className="text-center"
                        style={{
                          width: '25%'
                        }}
                      >
                        {
                          i === 0 ? 
                            (<StarRatings
                              rating={rating1}
                              starDimension="20px"
                              starSpacing="0px"
                              starRatedColor="rgb(240, 193, 75)"
                              numberOfStars={5}
                              changeRating={this.handleRatingChange1}
                            />) : i === 1 ?
                              (<StarRatings
                                rating={rating2}
                                starDimension="20px"
                                starSpacing="0px"
                                starRatedColor="rgb(240, 193, 75)"
                                numberOfStars={5}
                                changeRating={this.handleRatingChange2}
                              />) : i === 2 ?
                                (<StarRatings
                                  rating={rating3}
                                  starDimension="20px"
                                  starSpacing="0px"
                                  starRatedColor="rgb(240, 193, 75)"
                                  numberOfStars={5}
                                  changeRating={this.handleRatingChange3}
                                />) : (<React.Fragment/>)
                        }
                        <input
                          type="text"
                          className="form-control subject"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          onChange={this.handleInputChange}
                        />
                        <input
                          type="text"
                          className="form-control comment-rating"
                          id="comment-rating"
                          name="comment-rating"
                          placeholder="Comment"
                          onChange={this.handleInputChange}
                        />
                      </td>
                      <td
                        className="text-center"
                        style={{
                          width: '20%'
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-square btn-outline-primary"
                          onClick={() => this.handleCommentClick(p)}
                        >
                      Comment
                        </button>
                        <button
                          type="button"
                          className="btn btn-square btn-outline-primary"
                          onClick={() => this.handleShowReviewsClick(p._id)}
                        >
                      Show Reviews
                        </button>
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td className="text-center" colSpan="7">
                  No results found
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>
        <br/>
        <h5>Comments</h5>
        <table className="table table-responsive-sm table-hover table-outline 
        mb-0"
        >
          <thead className="thead-light">
            <tr>
              <th className="text-center">Rating</th>
              <th className="text-center">Subject</th>
              <th className="text-center">Comments</th>
            </tr>
          </thead>
          <tbody>
            {
              reviewComments.length > 0
                ? (
                  reviewComments.map((p) =>
                    <tr key={p._id}>
                      <td
                        className="text-center"
                        style={{
                          width: '30%'
                        }}
                      >
                        <StarRatings
                          rating={p.rating}
                          starDimension="20px"
                          starSpacing="0px"
                          starRatedColor="rgb(240, 193, 75)"
                          numberOfStars={5}
                        /> • {new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} 
                        <br />{p.rating} out of 5 stars
                      </td>
                      <td className="text-center">
                        {p.subject}
                      </td>
                      <td className="text-center">
                        <table className="table table-responsive-sm table-hover table-outline 
        mb-0"
                        >
                          <tbody>
                            {
                              p.comments.length > 0
                                ? (
                                  p.comments.map((c) =>
                                    <tr key={c._id}>
                                      <td className="text-center">
                                        {c.thread === 1 
                                          ? 'Principal' 
                                          : (c.thread - 1) > 1 
                                            ? (c.thread - 2) + ' > ' + (c.thread - 1)
                                            : 'Principal > ' + (c.thread - 1)}
                                      </td>
                                      <td className="text-center">
                                        {c.text}
                                      </td>
                                      <td 
                                        className="text-center"
                                        style={{
                                          width: '35%'
                                        }}
                                      >
                                        <input
                                          type="text"
                                          className="form-control comment"
                                          id="comment"
                                          name="comment"
                                          placeholder="Comment"
                                          onChange={this.handleInputChange}
                                        />
                                      </td>
                                      <td
                                        className="text-center"
                                        style={{
                                          width: '15%'
                                        }}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-square btn-outline-primary"
                                          onClick={() => this.handleReplyClick(c, p.store_id)}
                                        >
                      Reply
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                ) : (
                                  <tr>
                                    <td className="text-center" colSpan="2">
                  No comments found
                                    </td>
                                  </tr>
                                )
                            }
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td className="text-center" colSpan="3">
                  No results found
                    </td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default StoreCommunityListBody;
