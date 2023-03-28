"use client"
import React, { useState, useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { Inter } from 'next/font/google';
import * as Separator from '@radix-ui/react-separator';
import { styled } from '@stitches/react';
import { blueDark, grass, slate } from '@radix-ui/colors';
import {AiOutlineShopping} from 'react-icons/Ai'

const inter = Inter({ subsets: ['latin'] });

const CartSummary = ({}) => {
  const [loading, setLoading] = useState(false)
  const [cartEmpty, setCartEmpty] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [caughtError, setAPIError] = useState<boolean>(false)
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
  } = useShoppingCart()

  useEffect(() => setCartEmpty(!cartCount), [cartCount])

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
	const body = { cartDetails };
	const res = await fetch('/checkout', {
	  method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
	  body: JSON.stringify(body || {}),
	    });
        setAPIError(false);
      const url = await res.json()
      window.location.href = url.url
    }
    catch (error) {
        console.log(errorMessage);
        setAPIError(true);
    }
    }

  return (
    <Box css={{width: '100%', maxWidth: 600, margin: '0 15px'}}>
    <form onSubmit={handleCheckout} className={inter.className}>
      <h1 style={{display: 'flex', verticalAlign: 'middle'}}><AiOutlineShopping style={{ height: '30px', width:'30px'}}/>Cart</h1>
      <SeparatorRoot css={{margin: '15px 0'}} />
      {errorMessage ? (
        <p style={{ color: 'red' }}>Error: {errorMessage}</p>
      ) : null}
      {/* This is where we'll render our cart */}
      <h3 suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </h3>
      <Text>
        Total: {formattedTotalPrice}
      </Text>

      {/* Redirects the user to Stripe */}
      <Button
        variant='green'
        className="cart-style-background"
        type="submit"
        css={{marginRight: 25}}
      >
        Checkout
      </Button>
      <Button
        variant='blue'
        className="cart-style-background"
        type="button"
        onClick={clearCart}
      >
        Clear Cart
      </Button>
    </form>
    </Box>
  )
}

//styling for the cart 
const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: slate.slate7,
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 },
});

const Box = styled('div', {});
const Text = styled('div', {
  color: 'black',
  fontSize: 15,
  fontFamily: 'inter',
  lineHeight: '20px',
  marginBottom: 10,
});

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  fontFamily: 'Inter',
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      blue: {
        backgroundColor: 'white',
        color: blueDark.blue1,
        '&:hover': { backgroundColor: slate.slate7 },
      },
    green: {
        backgroundColor: grass.grass4,
        color: grass.grass11,
        '&:hover': {backgroundColor: grass.grass5},
        '&:focus': {boxShadow: `0 0 0 2px ${grass.grass7}`}
    }
  },
},

  defaultVariants: {
    variant: 'blue',
  },
})

export default CartSummary