import Link from "next/link";
import { ArrowRight } from "lucide-react";

import InstagramCard from "./InstagramCard";
import insta1 from '../../public/images/insta1.png'
import insta2 from '../../public/images/insta2.png'
import insta3 from '../../public/images/insta3.png'
import insta5 from '../../public/images/insta5.png'
import insta6 from '../../public/images/insta6.png'
import insta7 from '../../public/images/insta7.png'
import insta8 from '../../public/images/insta8.png'
import insta9 from '../../public/images/insta9.png'

const posts = [
  {
    image: insta1,
    postUrl: "https://www.instagram.com/p/DaCgiEhE_Ad/?igsh=MXV4czQ1aHhza3NnMg%3D%3D",
  },
  {
    image: insta2,
    postUrl: "https://www.instagram.com/p/DaAIpLKEzPV/?igsh=MWkzMGdldHIxYzgwZQ%3D%3D",
  },
  {
    image: insta3,
    postUrl: "https://www.instagram.com/p/DSZYR2pE46S/?igsh=MWt5bHV3dXM1bjZqNA%3D%3D",
  },
  {
    image: insta5,
    postUrl: "https://instagram.com/parijewelshttps://www.instagram.com/p/DacwGUPTCM6/?igsh=cHRmaXIzYnpraGVm",
  },
  {
    image: insta6,
    postUrl: "https://www.instagram.com/p/DRKNfoBk3vs/?igsh=cHJveGJtZnRzbTF6",
  },
  {
    image: insta7,
    postUrl: "https://www.instagram.com/p/DaChvBakzJW/?igsh=MTYxbGphdzZiZ3AzbQ%3D%3D&img_index=3",
  },
  {
    image: insta8,
    postUrl: "https://www.instagram.com/p/DZZS7zuk2hk/?igsh=aW1sdGJtbnduNm56&img_index=2",
  },
  {
    image: insta9,
    postUrl: "https://www.instagram.com/p/DZb45EvTsYz/?igsh=Z2hvdG9jaDhyc2Jy",
  },
];

export default function InstagramGallery() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-14 flex flex-col items-center justify-between gap-8 lg:flex-row">

          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[5px] text-[#E02C69]">
              FOLLOW US
            </p>

            <h2 className="mt-4 text-4xl font-bold text-[#3D2430]">
              Follow @PariJewels
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-600">
              Discover our latest jewellery collections, styling inspiration,
              and behind-the-scenes moments from Pari Jewels.
            </p>

          </div>

          <Link
            href="https://www.instagram.com/_pari_jewels?igsh=MXYyMGU3N3hlN2x1Zw%3D%3D"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-[#E02C69] px-6 py-3 font-medium text-[#E02C69] transition hover:bg-[#E02C69] hover:text-white"
          >
            Follow on Instagram
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Gallery */}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

          {posts.map((post, index) => (
            <InstagramCard
              key={index}
              {...post}
            />
          ))}

        </div>

      </div>
    </section>
  );
}