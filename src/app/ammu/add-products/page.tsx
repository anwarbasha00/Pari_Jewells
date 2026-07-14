import ProductForm from "../../components/ProductForm";
import Navbar from "../layout/Navbar"
export default function Page() {
    return (
      <>
      <Navbar/>
    <ProductForm mode="create" />
    </>
  );
}