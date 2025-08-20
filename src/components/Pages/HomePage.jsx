import React from 'react';
import BannerCarousel from '../HomePage/BannerCarousel';
import CategoriesSection from '../HomePage/CategoriesSection';
import BrandMarquee from '../HomePage/BrandMarquee';
import FeaturedProducts from '../HomePage/FeaturedProducts';
import SpecialOffers from '../HomePage/SpecialOffers';
import BestSellers from '../HomePage/BestSellers';
import ProductCategoriesSection from '../HomePage/ProductCategoriesSection';
import NewProducts from '../HomePage/NewProducts';
import WelcomeSection from '../HomePage/WelcomeSection';
import FloatingButtons from '../HomePage/FloatingButtons';
import '../HomePage/HomePage.css';

const HomePage = ({ onCategoryClick, wishlistItems, onWishlistToggle, onAddToCart, cartItems, onNavigate }) => {
    return (
        <div className="w-full bg-white">
            <BannerCarousel />
            <CategoriesSection onCategoryClick={onCategoryClick} />
            <BrandMarquee />
            <FeaturedProducts
                wishlistItems={wishlistItems}
                onWishlistToggle={onWishlistToggle}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onNavigate={onNavigate}
            />
            <SpecialOffers
                wishlistItems={wishlistItems}
                onWishlistToggle={onWishlistToggle}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onNavigate={onNavigate}
            />
            <BestSellers
                wishlistItems={wishlistItems}
                onWishlistToggle={onWishlistToggle}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onNavigate={onNavigate}
            />
            <ProductCategoriesSection onCategoryClick={onCategoryClick} />
            <NewProducts
                wishlistItems={wishlistItems}
                onWishlistToggle={onWishlistToggle}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onNavigate={onNavigate}
            />
            <WelcomeSection />
            <FloatingButtons />
        </div>
    );
};

export default HomePage;