'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cart'
import { Product } from '@/lib/types' // Make sure it's the correct path

interface Props {
  product: Product
  showPercentage?: boolean
}

const ProductShow: FC<Props> = ({ product, showPercentage }) => {

  const [liked, setLiked] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);

  
  if (!product) return null;



  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountedPrice = product.discountPrice
    ? Math.round(product.discountPrice)
    : product.price;

  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;

  return (
    <motion.div className="keen-slider__slide mt-5 p-1">
      <div className="bg-white rounded-lg shadow group relative overflow-hidden transition">
        {/* Badges */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10">
            NEW
          </span>
        )}

        {showPercentage && discountPercent && (
          <span className="absolute top-8 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10">
            -{discountPercent}%
          </span>
        )}

        {/* Image */}
        <Link href={`/product/${product.id}`} className="block relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-40 object-cover rounded-md"
          />
        </Link>

        {/* Action Buttons */}
        <button
          onClick={() => setLiked(!liked)}
          className="bg-white p-1 rounded-full shadow hover:bg-gray-100 absolute right-2 top-2"
        >
          <Heart
            className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
          />
        </button>

        <Link href={`/product/${product.id}`} className='absolute right-2 top-12'>
          <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </Link>

        {/* Details */}
        <div className="p-2">
          <h3 className="font-semibold text-base line-clamp-1">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-1">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < (product.rating || 0) ? 'fill-yellow-500' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.reviews || 0})</span>
          </div>

          {/* Price and Cart */}
          <div className="flex items-center gap-2 justify-between py-2">
            <p className="text-teal-600 font-bold text-sm">₹{discountedPrice}</p>

            <button
              onClick={handleAddToCart}
              className="bg-white p-1 rounded-full md:rounded-md shadow hover:bg-gray-100 flex gap-2 items-center"
            >
              <ShoppingCart className="w-4 h-4 text-teal-600" />
              <p className='hidden md:block md:text-xs font-semibold'>Add To Cart</p>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductShow
