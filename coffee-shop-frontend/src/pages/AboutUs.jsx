import React from 'react';
import './AboutUs.css'; 

function AboutUs() {
  return (
    <div className="about-us-page">
    <h1>About CodeBrew Cafe</h1>
    <div className="about-us-content">
      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in the heart of the city, CodeBrew Cafe began with a simple
          vision: to create a space where coffee enthusiasts can come together
          and enjoy exceptional coffee, cozy ambiance, and great company.
          Our journey started with a passion for quality, sustainability, and
          a deep love for coffee culture.
        </p>
      </div>
      <div className="about-section">
        <h2>Our Values</h2>
        <p>
          At CodeBrew Cafe, we believe in sustainability, quality, and community.
          Our coffee is ethically sourced, and we work closely with local farmers
          to ensure the highest quality beans. We aim to reduce our carbon
          footprint by using eco-friendly products and recycling wherever
          possible.
        </p>
      </div>
      <div className="about-section">
        <h2>Mission Statement</h2>
        <p>
          Our mission is to deliver the finest coffee experience while promoting
          sustainability and ethical practices. We strive to be a place where
          people can connect, relax, and indulge in a carefully crafted menu
          that satisfies diverse tastes.
        </p>
      </div>
      <div className="about-section">
        <h2>Specialties</h2>
        <div className="specialties">
          <div className="specialty-item">
            <img src="https://media.tenor.com/FO-RIDSApdoAAAAM/beans-coffee.gif" alt="Coffee Beans" />
            <h3>Freshly Roasted Coffee</h3>
            <p>Experience the rich flavor of freshly roasted, locally sourced beans.</p>
          </div>
          <div className="specialty-item">
            <img src="https://i.pinimg.com/originals/d9/7f/b8/d97fb86b7a8437628bb019db6e026792.gif" alt="Latte Art" />
            <h3>Latte Art</h3>
            <p>Enjoy a delightful cup with beautiful latte art from our skilled baristas.</p>
          </div>
          <div className="specialty-item">
            <img src="https://giffiles.alphacoders.com/223/2230.gif" alt="Pastries" />
            <h3>Gourmet Pastries</h3>
            <p>Indulge in a variety of freshly baked pastries that pair perfectly with your coffee.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default AboutUs;
