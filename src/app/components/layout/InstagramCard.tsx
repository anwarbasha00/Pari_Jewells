import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
interface InstagramCardProps {
  image: string;
  postUrl: string;
}

export default function InstagramCard({
  image,
  postUrl,
}: InstagramCardProps) {
  return (
    <Link
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-3xl"
    >
      <Image
        src={image}
        alt="Instagram Post"
        width={600}
        height={600}
        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/45">

        <FaInstagram className="h-9 w-9 text-white" />
          

        <div className="mt-3 flex items-center gap-2 text-white opacity-0 transition-all duration-300 delay-75 group-hover:opacity-100">
          <span className="text-sm font-medium">
            View Post
          </span>

          <ExternalLink size={16} />
        </div>

      </div>
    </Link>
  );
}