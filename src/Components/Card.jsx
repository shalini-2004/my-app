import React, { useState } from 'react';
import axios from 'axios';
import './Card.css';

function Card({ book }) {
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const [latestReview, setLatestReview] = useState(null);
    const [additionalReview, setAdditionalReview] = useState(null);

    // Fetch reviews for the selected book
    const fetchReviews = (bookId) => {
        axios.get(`/api/reviews/${bookId}`)
            .then(response => setReviews(response.data))
            .catch(err => console.log(err));
    };

    const handleReviewSubmit = (bookId) => {
        axios.post('/api/reviews', { book_id: bookId, rating, comment })
            .then(response => {
                setComment('');
                setRating(1);
                fetchReviews(bookId); // Update reviews after submission
                setLatestReview({ book_id: bookId, rating, comment });
            })
            .catch(err => console.log(err));
    };

    const handleAdditionalAction = () => {
        setAdditionalReview({
            book_id: selectedBookId,
            rating: rating,
            comment: comment
        });
    };

    return (
        <div className="card-container">
            {book.length === 0 ? (
                <p>No books found. Try a different search.</p>
            ) : (
                book.map((item) => (
                    <div key={item.id} className="card">
                        <img 
                            src={item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x194"} 
                            alt={item.volumeInfo.title}
                        />
                        <div className="card-content">
                            <h3>{item.volumeInfo.title}</h3>
                            <p>Author(s): {item.volumeInfo.authors?.join(", ") || "Unknown"}</p>
                            <p>{item.volumeInfo.description?.substring(0, 100) + '...' || "No description available"}</p>

                            <button onClick={() => {
                                setSelectedBookId(item.id);
                                fetchReviews(item.id);
                                setShowReviews(true);
                            }}>
                                View Reviews
                            </button>

                            {selectedBookId === item.id && (
                                <div>
                                    <h4>Submit a Review:</h4>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleReviewSubmit(item.id);
                                    }}>
                                        <label>
                                            Rating:
                                            <input
                                                type="number"
                                                value={rating}
                                                min="1"
                                                max="5"
                                                onChange={(e) => setRating(parseInt(e.target.value))}
                                            />
                                        </label>
                                        <label>
                                            Comment:
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </label>
                                        <button 
                                            type="submit"
                                            onClick={handleAdditionalAction}
                                        >
                                            Submit Review
                                        </button>
                                    </form>

                                    <div>
                                        <p>Reviews:</p>
                                        <div className='ri'>
                                            {latestReview && (
                                                <>
                                                    <p>Most Recent Review:</p>
                                                    <p>Book ID: {latestReview.book_id}</p>
                                                    <p>Rating: {latestReview.rating}</p>
                                                    <p>Comment: {latestReview.comment}</p>
                                                </>
                                            )}
                                        </div>

                                        {showReviews && (
                                            <ul>
                                                {reviews.map(review => (
                                                    <li key={review.id}>
                                                        <p>Book ID: {review.book_id}</p>
                                                        <p>Rating: {review.rating}</p>
                                                        <p>Comment: {review.comment}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Display additional review details here */}
                                        {additionalReview && (
                                            <div>
                                                <p>Additional Review Details:</p>
                                                <p>Book ID: {additionalReview.book_id}</p>
                                                <p>Rating: {additionalReview.rating}</p>
                                                <p>Comment: {additionalReview.comment}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Card;
