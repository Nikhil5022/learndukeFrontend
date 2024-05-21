import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

export default function Cart() {
    const location = useLocation();
    const [cartProducts, setCartProducts] = useState(location.state.products.map(product => ({ ...product, quantity: 1 })));

    const handleIncrease = (index) => {
        const newCartProducts = [...cartProducts];
        newCartProducts[index].quantity += 1;
        setCartProducts(newCartProducts);
    };

    const handleDecrease = (index) => {
        const newCartProducts = [...cartProducts];
        if (newCartProducts[index].quantity > 1) {
            newCartProducts[index].quantity -= 1;
            setCartProducts(newCartProducts);
        }
    };

    const handleDelete = (index) => {
        const newCartProducts = [...cartProducts];
        newCartProducts.splice(index, 1);
        setCartProducts(newCartProducts);
    };

    const calculateTotal = () => {
        let total = 0;
        cartProducts.forEach((product) => {
            total += product.price * product.quantity;
        });
        return total;
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-full md:w-10/12 lg:w-9/12 px-4">
                <div className="flex justify-between py-3 px-4 font-semibold border-b">
                    <div className="w-1/3">Product</div>
                    <div className="w-1/3 flex justify-center">Quantity</div>
                    <div className="w-1/3 text-right">Total</div>
                </div>
                {cartProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between py-3 px-4 border-b">
                        <div className="w-1/3">{product.name}</div>
                        <div className="w-1/3 flex justify-center">
                            <button onClick={() => handleDecrease(index)} className="px-4 py-2 bg-gray-200 rounded">
                                -
                            </button>
                            <span className="m-2">{product.quantity}</span>
                            <button onClick={() => handleIncrease(index)} className="px-3 py-2 bg-gray-200 rounded">
                                +
                            </button>
                        </div>
                        <div className="w-1/3 text-lg font-semibold text-right">Rs. {(product.price * product.quantity).toFixed(2)}</div>
                        <div>
                            <button onClick={() => handleDelete(index)} className="text-xl md:ml-5 mt-1"><MdDelete /></button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end py-3 px-4">
                    <div className="font-semibold">Total: Rs. {calculateTotal().toFixed(2)}</div>
                </div>
                <div className="flex justify-center py-4">
                    <button className="bg-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600">Checkout</button>
                </div>
            </div>
        </div>
    );
}
