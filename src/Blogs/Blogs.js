import React from 'react'


function Blogs() {
    return (
        <div className='m-8'>
            <h2 className='text-2xl font-semibold '>1.  What are the different ways to manage a state in a react application ? </h2>
            <h4 className='text-xl'>1. Local state. <br />
                2. Global state. <br />
                3. Server state. <br />
                4. URL state.</h4>
            <h2 className='text-2xl font-semibold '>2.  Why you don not see the state directly in react ? <br /> example : const [products,setProducts]=useState([]) <br /> why  you do not set products =[... ] <br /> instead you use setProducts</h2>
            <h4 className='text-xl'>State এর মান কখনো সরাসরি set করা উচিত নয় কারণ state এর মান একাধিক বার পরিবর্তন করার প্রয়োজন হতে পারে । আপনি যখন setProducts ব্যবহার করবেন তখন আপনি আপনার প্রয়োজন মত setProducts কে call করে products এর মান পরিবর্তন করতে পারবেন । কিন্তু সরাসরি প্রোডাক্টের মান সেট করলে তা আর পরিবর্তন করা যাবেনা। </h4>
            <h2 className='text-2xl font-semibold '>3.  you have an array of products eack products has a name , price . how will you implemenet a search to find products by name</h2>
            <img src="https://i.ibb.co/WtNBdD5/Screenshot-3.jpg" alt="" />
            <h2 className='text-2xl font-semibold '>4.  what is unit test ? why should write unit test ? </h2>
            <h4 className='text-xl'>unit test হল কম্পিউটার প্রোগ্রামিং এর  কোড এর ছোট ছোট অংশ কে  আলাদা আলাদাভাবে টেস্ট করে দেখা । unit test করা প্রোয়োজন কারণ unit test এর মাধ্যমে কোড ঠিক ভাবে কাজ করছে কিনা তা নিশ্চিত হওয়া যায়। এবং এটা bug  খুজে বের করতে ও দূর করতে সাহায্য করে।</h4>
            <h2 className='text-2xl font-semibold '>5.  how to improve performance of a react application ? </h2>
            <h4 className='text-xl'>
                1. state গুলো কম্পনেন্টের ভেতরেই রাখা। যাতে state update করতে হলে দ্রুত আপডেট করা যায়।  state গুলো App.js এ থাকলে সেগুলো আপডেট করা সময়সাপেক্ষ হয় এবং এর ফলে এপ্লিকেশনের পারফরমেন্স খারাপ হয়।
                ২. একটা ফাংশানের মধ্যে আসা প্রপস গুলো যদি পরিবর্তন নাহয় তাহলে সেখানে React.memo use করা যেতে পারে ফলে ফাংশান বার বার রি রেন্ডার হবেনা।
                ৩. অপ্টিমাইজড ইমেজ ইউজ করা।
            </h4>
        </div>
    )
}

export default Blogs;
