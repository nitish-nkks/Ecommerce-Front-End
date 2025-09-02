import React, { useEffect, useState } from 'react';
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
import { getProducts, getCategoriesWithProducts } from '../../api/api'; 
const HomePage = ({ onCategoryClick, wishlistItems, onWishlistToggle, onAddToCart, onUpdateQuantity, cartItems, onNavigate }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProducts()
            .then(res => {
                if (res.data) {
                    const products = res.data?.data || [];
                    setProducts(products);
                }
            })
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    useEffect(() => {
        getCategoriesWithProducts()
            .then(res => {
                if (res.data) {
                    const categories = res.data?.data || [];
                    setCategories(categories);
                }
            })
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="w-full bg-white">
            <BannerCarousel />
            <CategoriesSection
                onCategoryClick={onCategoryClick}
                categories={categories}
            />
            <BrandMarquee />
            <FeaturedProducts
                products={products}
                wishlistItems={wishlistItems}
                onWishlistToggle={onWishlistToggle}
                onAddToCart={onAddToCart}
                updateCartItemQuantity={onUpdateQuantity}
                cartItems={cartItems}
                onNavigate={onNavigate}
            />
            <SpecialOffers
                products={products}
                wishlistItems={wishlistItems}
                onWishlistToggle={onWishlistToggle}
                onAddToCart={onAddToCart}
                updateCartItemQuantity={onUpdateQuantity}
                cartItems={cartItems}
                onNavigate={onNavigate}
            />
            <BestSellers
                products={products}
                wishlistItems={wishlistItems}
                onWishlistToggle={onWishlistToggle}
                onAddToCart={onAddToCart}
                updateCartItemQuantity={onUpdateQuantity}
                cartItems={cartItems}
                onNavigate={onNavigate}
            />
            <ProductCategoriesSection
                onCategoryClick={onCategoryClick}
                categories={categories}
            />
            <NewProducts
                products={products}
                wishlistItems={wishlistItems}
                onWishlistToggle={onWishlistToggle}
                onAddToCart={onAddToCart}
                updateCartItemQuantity={onUpdateQuantity}
                cartItems={cartItems}
                onNavigate={onNavigate}
            />
            <WelcomeSection />
            <FloatingButtons />
        </div>
    );
};

export default HomePage;