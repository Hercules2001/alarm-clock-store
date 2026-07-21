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
  const [selectedColor, setSelectedColor] = useState("black");
  
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

  const handleShare = async () => {
    const shareData = {
      title: 'Kuro Lumina Smart Alarm Clock',
      text: 'Check out this premium smart alarm clock from Kuro!',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQty = prev + delta;
      return newQty > 0 ? newQty : 1; 
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
        body: JSON.stringify({ ...formData, quantity, color: selectedColor }),
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
    { 
      name: "Rahul S.", 
      title: "Game Changer for Mornings",
      text: "Absolutely love it! The design is so premium and it fits perfectly on my nightstand. The brightness is just right, and the sunrise feature wakes me up naturally.", 
      date: "2 days ago",
      rating: "★★★★★" 
    },
    { 
      name: "Priya M.", 
      title: "Premium Quality & Feel",
      text: "Best alarm clock I've ever owned. Very easy to set up and looks amazing. Highly recommend if you want to upgrade your bedroom aesthetic.", 
      date: "1 week ago",
      rating: "★★★★★" 
    },
    { 
      name: "Amit K.", 
      title: "Worth Every Rupee",
      text: "Looks exactly like the pictures. The premium plastic finish is smooth and feels super durable. The alarm is loud enough to wake me up.", 
      date: "2 weeks ago",
      rating: "★★★★★" 
    },
  ];

  return (
    <main className={styles.main}>
      {/* Promo Banner */}
      <div className={styles.promoBanner}>
        Free Express Shipping on All Orders Today!
      </div>

      {/* Top Navbar */}
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.brand}>Kuro</div>
          <div className={styles.navLinks}>
            <span className={styles.navLink}>Features</span>
            <span className={styles.navLink}>Reviews</span>
            <span className={styles.navLink}>FAQ</span>
            <button onClick={handleBuyNowClick} className={styles.navBuyBtn}>
              Order Now
            </button>
          </div>
        </nav>
      </header>

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
            {['1', '2', '3', '4', '5', '6', 'white 1', 'both'].map((imgName) => (
              <div 
                key={imgName}
                className={`${styles.thumbnail} ${activeMedia === imgName ? styles.thumbnailActive : styles.thumbnailInactive}`}
                onClick={() => setActiveMedia(imgName)}
              >
                <img src={`/assets/${imgName}.jpg`} alt={`Thumb ${imgName}`} className={styles.thumbnailImage} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details & Checkout */}
        <div className={styles.productInfoWrapper}>
          <div className={styles.productInfo}>
            <div>
              <span className={styles.badge}>Trending Now</span>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>Lumina Smart Alarm Clock</h1>
                <button onClick={handleShare} className={styles.shareBtn} aria-label="Share">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              
              <div className={styles.reviewsSummary}>
                <span className={styles.stars}>★★★★★</span>
                <span>4.9/5 based on 1,284 Reviews</span>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <span className={styles.price}>₹{pricePerUnit}</span>
              <span className={styles.originalPrice}>₹{originalPricePerUnit}</span>
              <span className={styles.discountBadge}>SAVE 50%</span>
            </div>

            <p className={styles.description}>
              Wake up refreshed with the Kuro Lumina. Featuring dynamic ambient lighting, intelligent sunrise simulation, and a sleek modern design that elevates any bedroom aesthetic. Limited stock available.
            </p>

            <div className={styles.quantityWrapper} style={{marginBottom: "1rem"}}>
              <span className={styles.quantityLabel}>Color:</span>
              <div style={{display: "flex", gap: "10px"}}>
                <button 
                  style={{padding: "8px 16px", border: selectedColor === "black" ? "2px solid #000" : "1px solid #ccc", borderRadius: "4px", background: "#fff", cursor: "pointer", color: "#000", fontWeight: selectedColor === "black" ? "bold" : "normal"}}
                  onClick={() => {
                    setSelectedColor("black");
                    setActiveMedia("1");
                  }}
                >
                  Black
                </button>
                <button 
                  style={{padding: "8px 16px", border: selectedColor === "white" ? "2px solid #000" : "1px solid #ccc", borderRadius: "4px", background: "#fff", cursor: "pointer", color: "#000", fontWeight: selectedColor === "white" ? "bold" : "normal"}}
                  onClick={() => {
                    setSelectedColor("white");
                    setActiveMedia("white 1");
                  }}
                >
                  White
                </button>
              </div>
            </div>

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
                <h2 className={styles.checkoutTitle}>Express Checkout</h2>
                {success ? (
                  <div className={styles.successMessage}>
                    Thank you! Your order has been placed successfully.<br/> We will dispatch it shortly.
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
                      {loading ? "Processing..." : `Complete Order (COD) - ₹${pricePerUnit * quantity}`}
                    </button>
                  </form>
                )}
              </div>
            )}

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span> Premium Plastic Build
              </li>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span> Smart Sunrise Simulation
              </li>
              <li className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span> Cash on Delivery
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
        <h2 className={styles.reviewsTitle}>Trusted by 1,000+ Customers</h2>
        <div className={styles.reviewGrid}>
          {reviews.map((review, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewStars}>{review.rating}</div>
                <div className={styles.reviewDate}>{review.date}</div>
              </div>
              <h3 className={styles.reviewTitle}>{review.title}</h3>
              <p className={styles.reviewText}>"{review.text}"</p>
              <div className={styles.reviewFooter}>
                <div className={styles.reviewAuthorInitial}>{review.name.charAt(0)}</div>
                <div className={styles.reviewAuthorDetails}>
                  <span className={styles.reviewAuthor}>{review.name}</span>
                  <span className={styles.verifiedBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                    </svg>
                    Verified Buyer
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>Kuro</div>
          <div className={styles.footerLinks}>
            <span className={styles.footerLink}>About Us</span>
            <span className={styles.footerLink}>Shipping Policy</span>
            <span className={styles.footerLink}>Refund Policy</span>
            <span className={styles.footerLink}>Contact Support</span>
            <span className={styles.footerLink}>Terms of Service</span>
          </div>
          <div className={styles.footerDivider}></div>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} Kuro India. All rights reserved. Premium digital essentials.
          </div>
        </div>
      </footer>
    </main>
  );
}
