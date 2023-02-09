import React from 'react'

function Summary() {
    const data = [
        {img:'https://i.ibb.co/WKBm4bq/download-removebg-preview.png', name:"50K+ Customers",details:"Worldwide millions of user using Intel processor and thousends of company building there pc with Intel processors"},
        {img:'https://i.ibb.co/nR1gnzX/review-icon-png-14-removebg-preview.png', name:"50M+ Annual Revenue ",details:"Intel is rapidly growing there user number  and producing over 50 million revenue worldwide"},
        {img:'https://i.ibb.co/djv1KSJ/processor-circuit-isolated-icon-vector-18795995-removebg-preview.png', name:"100+ products",details:"Intel has more than 100 types of processor with various generation."}
    ]
    return (
        
        <div className='m-20 lg:mx-32 mx-0'>
             <h1 className='text-3xl text-center m-10'>Overview</h1>
            <div className='grid lg:grid-cols-3  grid-cols-1 lg:gap-8 gap-0 justify-items-center'>
                {
                    data.map(d=>
                    <div class="card lg:w-72 w-64 bg-base-100 shadow-2xl mb-5">
                    <figure class="px-10 pt-10">
                        <img className='w-full' src={d.img} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{d.name}</h2>
                        <p>{d.details}</p>
                    </div>
                    </div>)
                }
            </div>  
        </div>
    )
}

export default Summary;
