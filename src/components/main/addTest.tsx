'use client';

import { useState } from 'react';
import { api } from '@/trcp/react.tsx';

function AddTest() {
  const [name, setName] = useState('');
  const utils = api.useUtils();

  const { mutate } = api.hello.addName.useMutation({
    onSuccess: async () => {
      await utils.hello.test.refetch();
      setName('');
    },
  });

  const handleAddName = async () => {
    mutate({ name });
  };

  const { data } = api.hello.test.useQuery();

  return (
    <>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a new name"
        />
        <button onClick={handleAddName} type="button">
          Add
        </button>
      </div>
      {data &&
        data.map((result) => (
          <div key={result.id}>
            {result.id} - {result.name}
          </div>
        ))}
    </>
  );
}

export default AddTest;
