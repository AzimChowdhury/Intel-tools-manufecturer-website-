import React from 'react'

function Footer() {
    return (
        <footer class="footer mt-20 p-10 px-28 bg-base-200 text-base-content">
  <div>
    <img className='w-28' src='https://i.ibb.co/djv1KSJ/processor-circuit-isolated-icon-vector-18795995-removebg-preview.png' alt='logo'/>
    <p>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
  </div> 
  <div>
    <span class="footer-title">Services</span> 
    <p class="link link-hover">Branding</p> 
    <p class="link link-hover">Design</p> 
    <p class="link link-hover">Marketing</p> 
    <p class="link link-hover">Advertisement</p>
  </div> 
  <div>
    <span class="footer-title">Company</span> 
    <p class="link link-hover">About us</p> 
    <p class="link link-hover">Contact</p> 
    <p class="link link-hover">Jobs</p> 
    <p class="link link-hover">Press kit</p>
  </div> 
  <div>
    <span class="footer-title">Legal</span> 
    <p class="link link-hover">Terms of use</p> 
    <p class="link link-hover">Privacy policy</p> 
    <p class="link link-hover">Cookie policy</p>
  </div>
</footer>
    )
}

export default Footer;
