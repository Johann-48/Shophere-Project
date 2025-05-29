import React from "react";
import { FaTruck, FaUndo } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

const ProductPage = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        Account / Gaming / <span className="text-black font-medium">Havic HV G-92 Gamepad</span>
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="border p-1">
              <img src="/thumb.png" alt="thumb" className="w-20 h-20 object-contain" />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/main.png"
            alt="produto"
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Info */}
        <div className="md:w-[400px] space-y-4">
          <h2 className="text-2xl font-semibold">Betoneira</h2>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500 text-sm">★★★★★</div>
            <span className="text-sm text-gray-500">(150 Reviews)</span>
            <span className="text-sm text-green-600 ml-2">In Stock</span>
          </div>

          <div className="text-2xl font-bold">R$ 3999,90</div>

          <p className="text-sm text-gray-600">
            A Betoneira da renomada marca CSM é a solução perfeita para suas necessidades de mistura de materiais de construção. O modelo Mxv, com capacidade de tambor de 400L
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Cores:</span>
            <BsCircleFill className="text-yellow-400" />
            <BsCircleFill className="text-black" />
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full">
            Entrar em contato com a loja
          </button>

          {/* Shipping + Return */}
          <div className="border rounded divide-y">
            <div className="flex items-center gap-3 p-3">
              <FaTruck className="text-xl" />
              <div>
                <p className="font-semibold text-sm">Entrega Gratis</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <FaUndo className="text-xl" />
              <div>
                <p className="font-semibold text-sm">Devolução</p>
                <p className="text-xs text-gray-500">
                  Grátis em até 15 dias depois da compra
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              title: "Serra Mármore 4.3/8",
              price: "R$1499",
              old: "R$1999",
              reviews: 88,
            },
            {
              title: "Gerador 5kva",
              price: "R$960",
              old: "R$1160",
              reviews: 75,
            },
            {
              title: "Andaime 1m",
              price: "R$370",
              old: "R$400",
              reviews: 99,
            },
            {
              title: "Extratora",
              price: "R$990",
              old: "R$1499",
              reviews: 65,
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 text-center rounded border">
              <img src="/rel.png" alt={item.title} className="h-24 mx-auto mb-2" />
              <p className="text-sm mb-1">{item.title}</p>
              <p className="text-red-500 font-semibold text-sm">{item.price} <span className="text-gray-400 line-through ml-1">{item.old}</span></p>
              <p className="text-yellow-500 text-sm">★★★★★ <span className="text-gray-500">({item.reviews})</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
