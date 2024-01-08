import { useState } from "react";
import { useBeerContext } from "../hooks/useBeerContext";

const BeerForm = () => {
    const [title, setTitle] = useState('')
    const [brewer, setBrewer] = useState('')
    const [rating, setRating] = useState('')
    const [error, setError] = useState(null)
    const {dispatch} = useBeerContext()
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const beer = {title, brewer, rating}
        const response = await fetch('/api/beer', {
            method: 'POST',
            body: JSON.stringify(beer),
            headers: {'Content-Type': 'application/json'}
        })
        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setEmptyFields([])
            setTitle('')
            setBrewer('')
            setRating('')
            setError(null)
            console.log('new beer was added')
            dispatch({type: 'CREATE_BEER', payload: json})
        }
    }
    
    return ( 
        <div>
            <form className="create-beer" onSubmit={handleSubmit}>
            <h3>Add new beer</h3>
            <label>Beer name:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Brewer:</label>
            <input 
                type="text"
                onChange={(e) => setBrewer(e.target.value)}
                value={brewer}
                className={emptyFields.includes('brewer') ? 'error' : ''}
            />
            <label>Rating:</label>
            <input 
                type="number" min="0.1" max="5" step="0.1"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                className={emptyFields.includes('rating') ? 'error' : ''}
            />
            <button>Add beer</button>
            {error && <div className="error">{error}</div>}
        </form>
        <form className="create-review" onSubmit={handleSubmit}>
            <h3>Add a review</h3>
            <label>Reviewer name:</label>
            <input 
                type="text"
                onChange={(e) => (e.target.value)}
                value={title}
                className={emptyFields.includes('') ? 'error' : ''}
            />
            <label>Comment:</label>
            <textarea 
                type="text"
                onChange={(e) => (e.target.value)}
                value={brewer}
                className={emptyFields.includes('') ? 'error' : ''}
            /><br></br>
            <br></br>
            <button>Add a review</button>
            {error && <div className="error">{error}</div>}
            
        </form>
        </div>
        
        
     );
}
 
export default BeerForm;