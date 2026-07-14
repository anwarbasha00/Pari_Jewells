'use client';

import { useRouter } from "next/navigation";
import { MdModeEdit } from "react-icons/md";

interface EditButtonProps {
  id: string;
}

export default function EditButton({ id }: EditButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/ammu/edit-products/${id}`)}
      className="rounded-lg border border-[#F0C8CF] px-3 py-2 text-[#E02C69] hover:bg-[#FFE8EC] transition cursor-pointer"
    >
      <MdModeEdit />
    </button>
  );
}