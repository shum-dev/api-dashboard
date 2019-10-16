import { useState } from 'react';

export default (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChange = e => {
    let currentTarget = e.target.name;
    let currentValue = e.target.value;
    setValue(prev => {
      return {...prev, [currentTarget]: currentValue}
    });
  }
  const reset = () => {
    setValue(initialVal);
  }
  return [value, setValue, handleChange, reset];
}