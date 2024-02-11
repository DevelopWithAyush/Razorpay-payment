import React from 'react'

const Home = () => {
    const amount = 300

    const handleonclick = async () => {


        try {
            const response = await fetch('http://localhost:5000/api/key', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            const key = data.key
            
            const res = await fetch(`http://localhost:5000/api/checkout`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({amount})
            });
            const json = await res.json()
            const order = json.order
            console.log(order)


            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Develop with ayush",
                description: "Tutorial of RazorPay",
                image: "",
                order_id: order.id,
                callback_url: "http://localhost:5000/api/paymentverification",
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <div className='home-section'>
            <h1>this is product</h1>
            <div className="home-Section-cart">
                <img src="https://www.nilkamalfurniture.com/cdn/shop/products/SIGNATUREIBK_BRD_800x.jpg?v=1659095931" alt="" />
                <p>rs-{amount}</p>

                <button onClick={handleonclick}>buy now</button>
            </div>

        </div>
    )
}

export default Home;
