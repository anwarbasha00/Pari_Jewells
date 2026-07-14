import Hero from "./components/layout/Hero";
import Categories from "./components/layout/Categories";
import ProductListing from "./components/layout/ProductListing";
import { getProducts } from "../lib/products";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import WhyChoosePari from "./components/layout/WhyChoosePari";
import Testimonials from "./components/layout/Testimonials";
import InstagramCard from "./components/layout/InstagramCard";
import InstagramGallery from "./components/layout/InstagramGallery";
import Footer from "./components/layout/Footer";
export default async function HomePage() {
  const featured = await getProducts({
  featured: true,
});
const bestSellers = await getProducts({
  bestSeller: true,
});  
const newArrivals = await getProducts({
  newArrival: true,
  limit: 8,
});
  return (
    <>
      <AnnouncementBar/>
      <Navbar/>
      <Hero />

      <Categories />

      <ProductListing
        title="Featured Collection"
        subtitle="Handpicked Luxury Pieces"
        products={featured}
        buttonText="View Collection"
        buttonLink="products?filter=bestseller"
      />

      <ProductListing
        title="New Arrivals"
        subtitle="Latest Designs"
        products={newArrivals}
        buttonText="Shop New"
        buttonLink="products?filter=new"
      />

      <ProductListing
        title="Best Sellers"
        subtitle="Most Loved Jewellery"
        products={bestSellers}
        buttonText="Explore Best Sellers"
        buttonLink="products?filter=bestseller"
      />

      <WhyChoosePari/>

      <Testimonials/>

      <InstagramGallery/>

      <Footer/>
    </>
  );
}