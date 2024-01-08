import { useBeerContext } from "../hooks/useBeerContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BeerDetails = ({beer}) => {
    const {dispatch} = useBeerContext()

    const handleClick = async () => {
        const response = await fetch('api/beer/' + beer._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_BEER', payload: json})
        }
    }

    const handleDeleteReview = async (reviewIndex) => {
        const response = await fetch(`api/beer/${beer._id}/reviews/${reviewIndex}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          const updatedBeer = await response.json();
          dispatch({ type: 'UPDATE_BEER', payload: updatedBeer });
        }
      };

    return ( 
        <div className="beer-details">
            <h4>Beer: <span>{beer.title}</span></h4>
            <p><strong>Brewer: </strong>{beer.brewer} </p>
            <p><strong>Rating: </strong>{beer.rating} </p>
            <p><strong>Added: </strong>{formatDistanceToNow(new Date(beer.createdAt), {addSuffix:true})}</p>
            <div>
                <h5>Reviews:</h5>
                {beer.reviews && beer.reviews.length > 0 ? (
                <ul>
                    {beer.reviews.map((review, index) => (
                    <li key={index}>
                        <p><strong>Reviewer: </strong>{review.reviewerName}</p>
                        <p><strong>Comment: </strong>{review.comment}</p>
                        <p><strong>Date Added: </strong>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</p>
                        <button className="delete-review-btn" onClick={() => handleDeleteReview(index)}>Delete Review</button>
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No reviews yet.</p>
                )}
            </div>
            <button className="delete-beer-btn" onClick={handleClick}>Delete</button>
        </div>
     );
}
 
export default BeerDetails;