"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    pincode: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Media carousel state. 'video' for video, otherwise '1', '2', etc. for images.
  const [activeMedia, setActiveMedia] = useState("video");

  const pricePerUnit = 499;
  const originalPricePerUnit = 998;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBuyNowClick = () => {
    setShowCheckout(true);
    setTimeout(() => {
      document.getElementById("checkoutSection")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQty = prev + delta;
      return newQty > 0 ? newQty : 1; // minimum 1
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, quantity }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit order. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const reviews = [
    { name: "Rahul S.", text: "Absolutely love it! The design is so premium and it fits perfectly on my nightstand. The brightness is just right.", rating: "★★★★★" },
    { name: "Priya M.", text: "Best alarm clock I've ever owned. Very easy to set up and looks amazing. Highly recommend!", rating: "★★★★☆" },
    { name: "Amit K.", text: "Looks exactly like the pictures. Premium quality and the alarm is loud enough to wake me up.", rating: "★★★★★" },
  ];

  return (
    <main className={styles.main}>
      {/* Top Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.brand}>Kuro</div>
        <div className={styles.navLinks}>
          <span className={styles.navLink}>Home</span>
          <span className={styles.navLink}>Shop</span>
          <span className={styles.navLink}>Contact</span>
        </div>
      </nav>

      {/* Main Product Section */}
      <section className={styles.productContainer}>
        {/* Left Side: Media Gallery (Carousel) */}
        <div className={styles.mediaGallery}>
          <div className={styles.mainMediaWrapper}>
            {activeMedia === "video" ? (
              <video 
                className={styles.mainMediaItem} 
                autoPlay 
                muted 
                loop 
                playsInline
                controls
              >
                <source src="/assets/product video.mp4" type="video/mp4" />
              </video>
            ) : (
              <img 
                src={`/assets/${activeMedia}.jpg`} 
                alt="Product View" 
                className={styles.mainMediaItem}
              />
            )}
          </div>
          
          <div className={styles.thumbnailRow}>
            {/* Video Thumbnail */}
            <div 
              className={`${styles.thumbnail} ${activeMedia === "video" ? styles.thumbnailActive : styles.thumbnailInactive}`}
              onClick={() => setActiveMedia("video")}
            >
              <video className={styles.thumbnailImage} muted playsInline>
                <source src="/assets/product video.mp4" type="video/mp4" />
              </video>
              <div className={styles.playIconOverlay}>▶</div>
            </div>
            
            {/* Image Thumbnails */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div 
                key={num}
                className={`${styles.thumbnail} ${activeMedia === String(num) ? styles.thumbnailActive : styles.thumbnailInactive}`}
                onClick={() => setActiveMedia(String(num))}
              >
                <img src={`/assets/${num}.jpg`} alt={`Thumb ${num}`} className={styles.thumbnailImage} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details & Checkout */}
        <div className={styles.productInfoWrapper}>
          <div className={styles.productInfo}>
            <div>
              <span className={styles.badge}>Best Seller</span>
              <h1 className={styles.title}>Lumina Smart Alarm Clock</h1>
              
              <div className={styles.reviewsSummary}>
                <span className={styles.stars}>★★★★★</span>
                <span>4.8/5 (1,284 Reviews)</span>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <span className={styles.price}>₹{pricePerUnit}</span>
              <span className={styles.originalPrice}>₹{originalPricePerUnit}</span>
              <span className={styles.discountBadge}>-50%</span>
            </div>

            <p className={styles.description}>
              Wake up refreshed with the Kuro Lumina. Featuring dynamic ambient lighting, intelligent sunrise simulation, and a sleek modern design that elevates any bedroom aesthetic. Limited stock available.
            </p>

            <div className={styles.quantityWrapper}>
              <span className={styles.quantityLabel}>Quantity:</span>
              <div className={styles.quantityControls}>
                <button className={styles.qtyBtn} onClick={() => handleQuantityChange(-1)}>-</button>
                <div className={styles.qtyValue}>{quantity}</div>
                <button className={styles.qtyBtn} onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className={styles.actionButtons}>
              {!showCheckout && (
                <button onClick={handleBuyNowClick} className={styles.buyNowBtn}>
                  Buy Now - ₹{pricePerUnit * quantity}
                </button>
              )}
            </div>

            {/* Checkout Form (Conditional) */}
            {showCheckout && (
              <div id="checkoutSection" className={styles.checkoutContainer}>
                <h2 className={styles.checkoutTitle}>Express Checkout (Cash on Delivery)</h2>
                {success ? (
                  <div className={styles.successMessage}>
                    Thank you! Your order has been placed successfully. We will dispatch it shortly.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroupFull}>
                        <label className={styles.label} htmlFor="name">Full Name *</label>
                        <input required className={styles.input} type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
                      </div>

                      <div>
                        <label className={styles.label} htmlFor="phone">Phone Number *</label>
                        <input required className={styles.input} type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                      </div>
                      
                      <div>
                        <label className={styles.label} htmlFor="email">Email Address (Optional)</label>
                        <input className={styles.input} type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                      </div>

                      <div className={styles.formGroupFull}>
                        <label className={styles.label} htmlFor="address">Full Delivery Address *</label>
                        <input required className={styles.input} type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="House No, Street, City" />
                      </div>

                      <div>
                        <label className={styles.label} htmlFor="pincode">Pincode *</label>
                        <input required className={styles.input} type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="e.g. 400001" />
                      </div>

                      <div>
                        <label className={styles.label} htmlFor="landmark">Landmark (Optional)</label>
                        <input className={styles.input} type="text" id="landmark" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Near..." />
                      </div>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                      {loading ? "Processing..." : `Complete Order - ₹${pricePerUnit * quantity}`}
                    </button>
                  </form>
                )}
              </div>
            )}

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span> Premium Glass & Alloy Build
              </li>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span> Smart Sunrise Simulation
              </li>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span> 1-Year Kuro Warranty
              </li>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span> Free Express Delivery
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
        <div className={styles.reviewGrid}>
          {reviews.map((review, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.stars}>{review.rating}</div>
              <p className={styles.reviewText}>"{review.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p className={styles.reviewAuthor}>{review.name}</p>
                <span className={styles.verifiedBadge}>Verified Buyer</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
