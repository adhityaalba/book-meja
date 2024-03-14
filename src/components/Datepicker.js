import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

const Datepicker = () => {
  const [value, setvalue] = useState(new Date());
  return (
    <div>
      <DateTimePicker onChange={setvalue} value={value} />
    </div>
  );
};

export default Datepicker;
