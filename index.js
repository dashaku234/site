
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [catalog, setCatalog] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/catalog.json')
      .then(res => res.json())
      .then(setCatalog)
      .catch(() => setCatalog([]))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">Home Restore & Save</h1>
        <p className="text-gray-200">Refurbished Appliances at 50% Off</p>
      </header>

      <main className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalog.map((product, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setSelected(product)}
          >
            <img src={product.img} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="line-through text-gray-400">{product.originalPrice}</span>
                <span className="text-blue-900 font-bold">{product.discountedPrice}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <img src={selected.img} alt={selected.name} className="w-full h-56 object-cover rounded" />
            <h2 className="text-2xl font-bold mt-4">{selected.name}</h2>
            <p className="text-gray-600 mt-2">{selected.description}</p>
            <div className="mt-3">
              {selected.reviews?.map((r, i) => <p key={i}>⭐ {r}</p>)}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="line-through text-gray-400">{selected.originalPrice}</span>
              <span className="text-xl font-bold text-blue-900">{selected.discountedPrice}</span>
            </div>
            <button className="mt-5 w-full bg-blue-900 text-white py-2 rounded-lg">
              Buy with PayPal
            </button>
            <button onClick={() => setSelected(null)} className="mt-2 w-full bg-gray-200 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-gray-300 text-center p-6 mt-10">
        <p>© 2025 Home Restore & Save. All rights reserved.</p>
      </footer>
    </div>
  )
}
