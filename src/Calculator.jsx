import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:9876/numbers/';

const AverageCalculator = () => {
    const [numberId, setNumberId] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const { data } = await axios.get(API_URL + numberId);
        setResponse(data);
        } catch (error) {
        console.error('Error:', error.response.data);
        }
    };

    return (
        <div>
        <h2>Average Calculator</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Enter a qualified number ID (p, f, e, r):
            <input
                type="text"
                value={numberId}
                onChange={(e) => setNumberId(e.target.value)}
                required
            />
            </label>
            <button className='h1' type="submit">Calculate</button>
        </form>
        {response && (
            <div>
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
        )}
        </div>
    );
};
AverageCalculator.listen(9876, () => {
    console.log('Average Calculator microservice listening on port 9876');
});
export default AverageCalculator;
