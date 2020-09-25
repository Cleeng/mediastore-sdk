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
    <p style={{ textAlign: 'center', padding: 10 }}>Test card data</p>
    {[
      { label: 'Card number', value: '4988 4388 4388 4305' },
      { label: 'Expires', value: '03/30' },
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
    <div style={{ textAlign: 'right', padding: 10, cursor: 'pointer' }}>
      (click to copy)
    </div>
  </form>
);

export default CreditCardExample;
