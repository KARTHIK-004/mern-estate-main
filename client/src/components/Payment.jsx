import React from 'react'
import {PaymentElement} from '@stripe/react-stripe-js';

function Payment() {
  return (
    <form>
    <PaymentElement />
    <button>Submit</button>
  </form>
  )
}

export default Payment
