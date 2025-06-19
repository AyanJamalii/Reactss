import React, { useEffect, useState } from 'react'
import './Carts.css'
const CartsFetcher = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [error, setError] = useState(null)


    useEffect(() => {
        FetchCart()
    }, []);

    const FetchCart = async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/products')
            const data = await res.json()
            setProducts(data)
            setError(null)
        } catch (err) {
            setError('Failed to load products.')
        }
    }

    const addToCart = (product) => {
        setCart((prev) => [...prev, product])
        setIsSideBarOpen(true)
    }

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const totalAmount = cart.reduce((total, item) => total + item.price, 0).toFixed(2)


  return (
    <div className='app'>
      <h1>Your Products</h1>
      {error && <p>{error}</p>}
      <div className="products-grid">
        {products.map((product) => (
            <div key={product.id} className='product-card'>
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <p>${product.price}</p>
                <p style={{color: 'gray', fontWeight: '400'}}><i>{product.description}</i></p>
                <button onClick={() => addToCart(product)}>Add To Cart</button>
            </div>
        ))}
      </div>

      <div className={`sidebar ${isSideBarOpen ? 'open' : ''}`}>
        <button onClick={() => setIsSideBarOpen(false)} className='close-btn'>X</button>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
            <p>No item yet.</p>
        ):(
            cart.map((item) => (
                <div key={item.id} className='cart-item'>
                    <img src={item.image} alt={item.title} />
                    <h5>{item.title}</h5>
                    <p>${item.price}</p>
                    <button onClick={() => removeItem(item.id)}>Remove Item</button>
                </div>
            ))
        )}
        <hr />
        <h3> Total: {totalAmount}</h3>
      </div>
    </div>
  )
}

export default CartsFetcher
