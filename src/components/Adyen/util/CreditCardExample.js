/* istanbul ignore file */
import React from 'react';

const CreditCardExample = () => (
  <form
    style={{
      alignSelf: 'flex-end',
      margin: 40,
      background: 'lightblue',
      border: 'solid 1px black'
    }}
  >
    {[
      { label: 'Card number', value: '5555 4444 3333 1111' },
      { label: 'Expires', value: '10/20' },
      { label: 'CVV', value: '737' }
    ].map(({ label, value }) => (
      <div
        key={label}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10
        }}
      >
        <label htmlFor={label}>{label}</label>
        <input
          type="text"
          name={label}
          onClick={({ target }) => {
            target.focus();
            target.select();
            document.execCommand('copy');
          }}
          defaultValue={value}
          contentEditable="false"
          style={{ marginLeft: 20, border: 'none' }}
        />
      </div>
    ))}
    <div style={{ textAlign: 'right', padding: 10 }}>(click to copy)</div>
  </form>
);

export default CreditCardExample;
