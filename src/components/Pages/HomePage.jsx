import React from 'react';
import BannerCarousel from '../HomePage/BannerCarousel';
import CategoriesSection from '../HomePage/CategoriesSection';
import FeaturedProducts from '../HomePage/FeaturedProducts';
import SpecialOffers from '../HomePage/SpecialOffers';
import BestSellers from '../HomePage/BestSellers';
import ProductCategoriesSection from '../HomePage/ProductCategoriesSection';
import NewProducts from '../HomePage/NewProducts';
import WelcomeSection from '../HomePage/WelcomeSection';
import FloatingButtons from '../HomePage/FloatingButtons';
import '../HomePage/HomePage.css';

const HomePage = ({ onCategoryClick, wishlistItems, onWishlistToggle, onAddToCart }) => {
  return (
    <div className="w-full bg-white">
      <BannerCarousel />
      <CategoriesSection onCategoryClick={onCategoryClick} />
      <FeaturedProducts 
        wishlistItems={wishlistItems} 
        onWishlistToggle={onWishlistToggle}
        onAddToCart={onAddToCart}
      />
      <SpecialOffers />
      <BestSellers 
        wishlistItems={wishlistItems} 
        onWishlistToggle={onWishlistToggle}
        onAddToCart={onAddToCart}
      />
      <ProductCategoriesSection onCategoryClick={onCategoryClick} />
      <NewProducts 
        wishlistItems={wishlistItems} 
        onWishlistToggle={onWishlistToggle}
        onAddToCart={onAddToCart}
      />
      <WelcomeSection />
      <FloatingButtons />
    </div>
  );
};

export default HomePage;