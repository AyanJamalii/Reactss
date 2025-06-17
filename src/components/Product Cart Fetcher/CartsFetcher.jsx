import React, { useEffect, useState } from 'react'
import './Carts.css'
const CartsFetcher = () => {
    const [products, setProcuts] = useState([])
    const [cart, setCart] = useState([]);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
    fetchCarts();
    }, []);

    const fetchCarts = async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/products')
            const data = await res.json()
            setProcuts(data)
            setError(null)
        } catch (error) {
            setError('Error occured, Please Try agian later.')
        }
    }
    
    const addToCart = (product) => {
        setCart((prev) => [...prev, product])
        setIsSideBarOpen(true)
    }

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }
 
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2)



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
                    {/* <p><i>{product.description}</i></p>  */}
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>

        <div className={`sidebar ${isSideBarOpen ? 'open' : ''}`}>
            <button className='close-btn' onClick={() => setIsSideBarOpen(false)}>X</button>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>No item yet.</p>
            ):(
                cart.map((item) => (
                    <div key={item.id} className='cart-item'>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                        <p>${item.price}</p>
                        <button onClick={() => removeItem(item.id)}>-</button>
                    </div>
                ))
            )}
            <hr />
            <h3>total: ${totalPrice}</h3>
        </div>
      
    </div>
  )
}

export default CartsFetcher
