'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`/api/products/delete/${id}`);

      alert("Product deleted successfully.");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg border border-red-300 px-3 py-2 text-red-600 hover:bg-red-50"
    >
        <MdDelete />
    </button>
  );
}