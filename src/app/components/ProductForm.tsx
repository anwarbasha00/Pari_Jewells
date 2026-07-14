'use client';

import React, { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id?: string;

  name: string;
  description: string;

  price: number;
  originalPrice: number;
  discount: number;

  category: string;
  keywords: string[];

  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  inStock: boolean;
  stock:number;

  images: {
    public_id: string;
    url: string;
  }[];
}

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
}

const ProductForm = ({
  mode,
  product,
}: ProductFormProps) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    product?.images?.[0]?.url || null
  );

  const [image, setImage] = useState<File | null>(null);

  const [name, setName] = useState(
    product?.name || ""
  );

  const [description, setDescription] = useState(
    product?.description || ""
  );

  const [price, setPrice] = useState(
    product?.price?.toString() || ""
  );

  const [originalPrice, setOriginalPrice] = useState(
    product?.originalPrice?.toString() || ""
  );

  const [discount, setDiscount] = useState(
    product?.discount?.toString() || ""
  );
  const [stock, setStock] = useState(
    product?.stock?.toString() || ""
  );


  const [category, setCategory] = useState(
    product?.category || ""
  );

  const [keywords, setKeywords] = useState(
    product?.keywords?.join(", ") || ""
  );

  const [featured, setFeatured] = useState(
    product?.featured || false
  );

  const [bestseller, setBestseller] = useState(
    product?.bestseller || false
  );

  const [newArrival, setNewArrival] = useState(
    product?.newArrival ?? true
  );

  const [inStock, setInStock] = useState(
    product?.inStock ?? true
  );

  // ===========================
  // Image Upload
  // ===========================

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    handleImageChange(e.target.files[0]);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {

    e.preventDefault();

    if (!e.dataTransfer.files.length) return;

    handleImageChange(
      e.dataTransfer.files[0]
    );
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
  };

  // ===========================
  // Submit
  // ===========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    const sellingPrice = Number(price);
    const mrp = Number(originalPrice);

    const discount =
      mrp > 0
        ? Math.round(
            ((mrp - sellingPrice) / mrp) * 100
          )
        : 0;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    formData.append(
      "price",
      sellingPrice.toString()
    );
    formData.append(
      "stock",
      stock.toString()
    );

    formData.append(
      "originalPrice",
      mrp.toString()
    );

    formData.append(
      "discount",
      discount.toString()
    );

    formData.append(
      "stock",
      stock.toString()
    );
    formData.append(
      "category",
      category
    );

    formData.append(
      "keywords",
      keywords
    );

    formData.append(
      "featured",
      String(featured)
    );

    formData.append(
      "bestseller",
      String(bestseller)
    );

    formData.append(
      "newArrival",
      String(newArrival)
    );

    formData.append(
      "inStock",
      String(inStock)
    );

    if (image) {
      formData.append("image", image);
    }

    try {

      if (mode === "create") {

        await axios.post(
          "/api/products",
          formData
        );

        alert("Product Added Successfully");

      } else {

        await axios.patch(
          `/api/products/update/${product?._id}`,
          formData
        );

        alert("Product Updated Successfully");
      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

    return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-[#F0C8CF] bg-white p-6 shadow-[0_10px_30px_rgba(224,44,105,0.08)] sm:p-8 lg:p-10">

        {/* Header */}

        <div className="mb-8 border-b border-[#F0C8CF] pb-6">

          <h1 className="text-3xl font-semibold text-[#3D2430]">

            {mode === "create"
              ? "Add New Product"
              : "Edit Product"}

          </h1>

          <p className="mt-2 text-sm text-[#A69A9A]">

            {mode === "create"
              ? "Create and publish a new jewellery product."
              : "Update your jewellery product information."}

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT COLUMN */}

            <div className="space-y-5">

              {/* IMAGE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#3D2430]">

                  Product Image

                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileInput}
                />

                <div
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="
                  group
                  relative
                  flex
                  min-h-72
                  cursor-pointer
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-3xl
                  border-2
                  border-dashed
                  border-[#F0C8CF]
                  bg-[#FFF7F7]
                  transition-all
                  duration-300
                  hover:border-[#E02C69]
                  hover:bg-[#FFF1F5]
                  "
                >

                  {preview ? (

                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />

                  ) : (

                    <div className="text-center">

                      <div className="text-6xl">

                        📷

                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-[#3D2430]">

                        Upload Product Image

                      </h3>

                      <p className="mt-2 text-sm text-[#A69A9A]">

                        Drag & Drop your image here

                      </p>

                      <p className="my-3 text-[#A69A9A]">

                        or

                      </p>

                      <button
                        type="button"
                        className="
                        rounded-xl
                        bg-[#E02C69]
                        px-5
                        py-2
                        font-medium
                        text-white
                        "
                      >

                        Browse Files

                      </button>

                      <p className="mt-4 text-xs text-[#A69A9A]">

                        JPG, PNG or WEBP (Max 5MB)

                      </p>

                    </div>

                  )}

                </div>

              </div>

              {/* PRODUCT NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#3D2430]">

                  Product Name

                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter product name"
                  className="
                  w-full
                  rounded-xl
                  border
                  border-[#F0C8CF]
                  px-4
                  py-3
                  text-[#3D2430]
                  placeholder:text-[#A69A9A]
                  focus:border-[#E02C69]
                  focus:outline-none
                  "
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#3D2430]">

                  Description

                </label>

                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Write a short product description..."
                  className="
                  w-full
                  rounded-xl
                  border
                  border-[#F0C8CF]
                  px-4
                  py-3
                  text-[#3D2430]
                  placeholder:text-[#A69A9A]
                  focus:border-[#E02C69]
                  focus:outline-none
                  "
                />

              </div>

            </div>

            {/* RIGHT COLUMN STARTS HERE */}

            <div className="space-y-5">
                              {/* CATEGORY */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3D2430]">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Ring, Necklace"
                  className="w-full rounded-xl border border-[#F0C8CF] px-4 py-3 text-[#3D2430] placeholder:text-[#A69A9A] focus:border-[#E02C69] focus:outline-none"
                />
              </div>

              {/* SELLING PRICE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3D2430]">
                  Selling Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-[#F0C8CF] px-4 py-3 focus:border-[#E02C69] focus:outline-none"
                />
              </div>

              {/* ORIGINAL PRICE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3D2430]">
                  Original Price
                </label>

                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-[#F0C8CF] px-4 py-3 focus:border-[#E02C69] focus:outline-none"
                />
              </div>

              {/* DISCOUNT */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3D2430]">
                  Discount
                </label>

                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] px-4 py-3 text-[#E02C69] font-semibold"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3D2430]">
                stock
                </label>

                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] px-4 py-3 text-[#E02C69] font-semibold"
                />
              </div>

              {/* KEYWORDS */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3D2430]">
                  Keywords
                </label>

                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="gold, wedding, elegant"
                  className="w-full rounded-xl border border-[#F0C8CF] px-4 py-3 focus:border-[#E02C69] focus:outline-none"
                />
              </div>

              {/* STATUS */}

              <div className="rounded-2xl border border-[#F0C8CF] bg-[#FFF7F7] p-5">

                <h3 className="mb-4 font-semibold text-[#3D2430]">
                  Product Status
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <label className="flex items-center gap-2 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) =>
                        setFeatured(e.target.checked)
                      }
                      className="h-4 w-4 accent-[#E02C69]"
                    />

                    Featured

                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={bestseller}
                      onChange={(e) =>
                        setBestseller(e.target.checked)
                      }
                      className="h-4 w-4 accent-[#E02C69]"
                    />

                    Bestseller

                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={newArrival}
                      onChange={(e) =>
                        setNewArrival(e.target.checked)
                      }
                      className="h-4 w-4 accent-[#E02C69]"
                    />

                    New Arrival

                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) =>
                        setInStock(e.target.checked)
                      }
                      className="h-4 w-4 accent-[#E02C69]"
                    />

                    In Stock

                  </label>

                </div>

              </div>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-4 border-t border-[#F0C8CF] pt-6">

            < Link href="/ammu">
            <button
              type="button"
              className="rounded-xl border border-[#F0C8CF] px-6 py-3 font-medium text-[#7D5A67] transition hover:bg-[#FFF7F7]"
            >
              Cancel
            </button>
            </Link>
            

            <button
              type="submit"
              className="rounded-xl bg-[#E02C69] px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-[#C91F59]"
            >
              {mode === "create"
                ? "Add Product"
                : "Update Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ProductForm;