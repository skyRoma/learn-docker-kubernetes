import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';

export const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState<Record<string, number>>({});
  const [index, setIndex] = useState('');

  const fetchValues = async () => {
    const response = await axios.get('api/values/current');
    setValues(response.data);
  };

  const fetchIndexes = async () => {
    const response = await axios.get('api/values');
    setSeenIndexes(response.data);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.post('api/values', {
      index,
    });

    setIndex('');
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index: </label>
        <input
          type="number"
          value={index}
          onChange={(event) => {
            setIndex(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I've seen:</h3>
      {seenIndexes.map(({ number }) => number).join(', ')}

      <h3>Calculated values:</h3>
      {Object.keys(values).map((key) => (
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      ))}
    </div>
  );
};
