'use client'

import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import Link from 'next/link'

export default function FailurePayment() {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-red-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
        <XCircle className="text-red-500 mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-4">
          Something went wrong while processing your payment. Please try again.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </motion.div>
  )
}
