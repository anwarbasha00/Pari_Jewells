import ProductListing from "../layout/ProductListing";

interface Props {
    products: any[];
}

export default function RelatedProducts({
    products,
}: Props) {

    return (

        <ProductListing
            title="You May Also Like"
            subtitle="Discover more jewellery you'll love."
            products={products}
        />

    );

}