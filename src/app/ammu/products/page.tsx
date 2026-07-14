import { connectDB } from "@/src/lib/connectdb";
import Product from "@/src/models/product.model";
import Link from "next/link";
import { FiPlus, FiSearch, FiPackage, FiStar } from "react-icons/fi";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";
import Navbar from "../layout/Navbar"
interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    stock?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  await connectDB();

const params = await searchParams;
const search = params.search || "";
const category = params.category || "";
const stock = params.stock || "";

const query: any = {};

// Search
if (search) {
  query.$or = [
    {
      name: {
        $regex: search,
        $options: "i",
      },
    },
    {
      keywords: {
        $in: [new RegExp(search, "i")],
      },
    },
  ];
}

// Category
if (category) {
  query.category = category;
}

// Stock
if (stock === "instock") {
  query.stock = {
    $gt: 0,
  };
}

if (stock === "outofstock") {
  query.stock = 0;
}

if (stock === "lowstock") {
  query.stock = {
    $gt: 0,
    $lte: 5,
  };
}

const products = await Product.find(query).lean();

const allProducts = await Product.find().lean();

const totalProducts = allProducts.length;
const featuredProducts = allProducts.filter((p: any) => p.featured).length;
const outOfStock = allProducts.filter((p: any) => !p.inStock).length;

  const categories = new Set(
    products.map((p: any) => p.category)
  ).size;

  const categorie = [...new Set(products.map((product: any) => product.category))];

  
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#FFF7F7] p-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mt-2">

        <div>
          <h1 className="text-4xl font-bold text-[#3D2430]">
            Products
          </h1>

          <p className="mt-2 text-[#7D5A67]">
            Manage your jewellery catalogue, pricing and inventory.
          </p>
        </div>

        <Link
          href="/ammu/add-products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E02C69] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#C91F59]"
        >
          <FiPlus size={18} />
          Add Product
        </Link>

      </div>

      {/* ================= STATS ================= */}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}

        <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#A69A9A]">
                Total Products
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                {totalProducts}
              </h2>
            </div>

            <div className="rounded-xl bg-[#FFE8EC] p-3">
              <FiPackage
                size={28}
                className="text-[#E02C69]"
              />
            </div>

          </div>
        </div>

        {/* Featured */}

        <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#A69A9A]">
                Featured
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                {featuredProducts}
              </h2>
            </div>

            <div className="rounded-xl bg-[#FFF2D8] p-3">
              <FiStar
                size={28}
                className="text-[#B98A2A]"
              />
            </div>

          </div>

        </div>

        {/* Categories */}

        <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#A69A9A]">
                Categories
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                {categories}
              </h2>
            </div>

            <div className="rounded-xl bg-[#FFE8EC] p-3">

              <span className="text-xl font-bold text-[#E02C69]">
                #
              </span>

            </div>

          </div>

        </div>

        {/* Stock */}

        <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#A69A9A]">
                Out of Stock
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                {outOfStock}
              </h2>
            </div>

            <div className="rounded-xl bg-red-100 p-3">

              <span className="font-bold text-red-500">
                !
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= FILTER BAR ================= */}
    <form method="GET">
  <div className="mt-8 rounded-2xl border border-[#F0C8CF] bg-white p-5 shadow-sm">
    <div className="flex flex-wrap items-center gap-4">

      {/* Search */}
      <div className="relative flex-1 min-w-[300px]">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69A9A]" />

        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search products..."
          className="h-12 w-full rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] pl-11 pr-4 outline-none transition focus:border-[#E02C69] focus:ring-4 focus:ring-[#E02C69]/10"
        />
      </div>

      {/* Category */}
      <select
        name="category"
        defaultValue={category}
        className="h-12 w-52 rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] px-4 outline-none focus:border-[#E02C69] focus:ring-4 focus:ring-[#E02C69]/10"
      >
        <option value="">All Categories</option>
        <option value="">inStock</option>

        {categorie.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

     <select
  name="stock"
  defaultValue={stock}
  className="h-12 w-52 rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] px-4 outline-none focus:border-[#E02C69] focus:ring-4 focus:ring-[#E02C69]/10"
>
  <option value="">All Stock</option>
  <option value="instock">In Stock</option>
  <option value="outofstock">Out of Stock</option>
  <option value="lowstock">Low Stock (≤5)</option>
</select>

      {/* Search Button */}
      <button
        type="submit"
        className="h-12 rounded-xl bg-[#E02C69] px-6 font-semibold text-white transition hover:bg-[#C91F59]"
      >
        Search
      </button>

      {/* Clear Button */}
      <Link
        href="/ammu/products"
        className="flex h-12 items-center justify-center rounded-xl border border-[#F0C8CF] bg-white px-6 font-medium text-[#3D2430] transition hover:bg-[#FFF1F4]"
      >
        Clear
      </Link>

    </div>
  </div>
</form>

      {/* ================= PRODUCT TABLE ================= */}
{products.length === 0 ? (

  <div className="rounded-2xl bg-white py-24 text-center shadow-sm">

    <h2 className="text-2xl font-bold text-[#3D2430]">
      No Products Found
    </h2>

    <p className="mt-3 text-gray-500">
      Try changing your search or filters.
    </p>

  </div>

) : (

   <div className="mt-8">
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#F0C8CF] bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="sticky top-0 bg-[#FFF1F4]">

                <tr className="text-left text-[#3D2430]">

                  <th className="px-6 py-5 font-semibold">
                    Product
                  </th>

                  <th className="px-6 py-5 font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-5 font-semibold">
                    Price
                  </th>

                  <th className="px-6 py-5 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-5 font-semibold">
                    Stock
                  </th>

                  <th className="px-6 py-5 text-center font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map((product: any) => (

                  <tr
  key={product._id.toString()}
  className={`border-t transition hover:bg-[#FFF7F7]
    ${
      product.stock === 0
        ? "bg-red-50 border-red-100"
        : product.stock <= 5
        ? "bg-orange-50 border-orange-100"
        : "border-[#F8DDE3]"
    }
  `}
>

                    {/* PRODUCT */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <Image
                          src={product?.images?.[0]?.url || "/images/placeholder.png"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-xl border border-[#F0C8CF] object-cover"
                        />


                        <div>

                          <h3 className="font-semibold text-[#3D2430]">
                            {product.name}
                          </h3>

                          <p className="mt-1 line-clamp-2 max-w-xs text-sm text-[#7D5A67]">
                            {product.description}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-[#FFF1F4] px-4 py-2 text-sm font-medium text-[#E02C69]">

                        {product.category}

                      </span>

                    </td>

                    {/* PRICE */}

                    <td className="px-6 py-5">

                      <div>

                        <p className="text-lg font-bold text-[#3D2430]">

                          ₹{product.price}

                        </p>

                        {product.originalPrice > product.price && (

                          <div className="mt-1 flex items-center gap-2">

                            <span className="text-sm text-[#A69A9A] line-through">

                              ₹{product.originalPrice}

                            </span>

                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">

                              {product?.discount || 0}%

                            </span>

                          </div>

                        )}

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">

                      <div className="flex flex-wrap gap-2">

                        {product.featured && (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                            ⭐ Featured
                          </span>
                        )}

                        {product.bestseller && (
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                            🔥 Bestseller
                          </span>
                        )}

                        {product.newArrival && (
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            🆕 New
                          </span>
                        )}

                        {product.inStock ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            ✔ In Stock
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            ✖ Out of Stock
                          </span>
                        )}

                      </div>

                    </td>
                    {/* STOCK*/}
                   <td className="px-6 py-5">

  {product.stock === 0 ? (

    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
      Out of Stock
    </span>

  ) : product.stock <= 5 ? (

    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
      {product.stock} Left
    </span>

  ) : (

    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
      {product.stock} Available
    </span>

  )}

</td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-3">

                        <EditButton
                          id={product._id.toString()}
                        />


                        <DeleteButton
                          id={product._id.toString()}
                        />

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>

)}
    </div>
    </>
  );
}