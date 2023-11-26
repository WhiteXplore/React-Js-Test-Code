import React, { useState, useEffect } from 'react';

function MLModelAPI() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input_data: [0.0, 1.0, 7.0, 5.0, 6.0],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setResult(data);
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>ML Model API</h1>
      <button id="predict-button" onClick={() => fetchData()}>
        Predict
      </button>
      <div id="result">
        {result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          'Loading result...'
        )}
      </div>
    </div>
  );
}

export default MLModelAPI;
