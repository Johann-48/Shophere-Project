import React, { useState, useEffect } from "react";
import {
  FaTruck,
  FaUndo,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaArrowLeft,
} from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

const defaultProduct = {
  title: "Betoneira CSM Mxv 400L",
  price: "R$ 3.999,90",
  oldPrice: null,
  stars: 5,
  stock: true,
  description:
    "A Betoneira da renomada marca CSM é a solução perfeita para suas necessidades de mistura de materiais de construção. Robusta, eficiente e confiável.",
  mainImage:
    "https://casadopicapau.vtexassets.com/arquivos/ids/164635/40104201.png?v=638248684185000000",
  thumbnails: [
    "https://casadopicapau.vtexassets.com/arquivos/ids/164635/40104201.png?v=638248684185000000",
    "https://cdn.leroymerlin.com.br/products/betoneira_400l_1_taco_max_mono_220v_csm_92016421_8d9a_600x600.jpg",
    "https://cdn.leroymerlin.com.br/products/betoneira_400l_1_taco_max_mono_220v_csm_92016421_6604_600x600.jpg",
    "https://cdn.leroymerlin.com.br/products/betoneira_400l_1_taco_max_mono_220v_csm_92016421_cd55_600x600.jpg",
    "https://cdn.leroymerlin.com.br/products/betoneira_400l_1_taco_max_mono_220v_csm_92016421_bbe1_600x600.jpeg",
  ],
};

const relatedProductsList = [
  {
    id: 1,
    title: "Serra Mármore 4.3/8",
    price: "R$1499",
    oldPrice: "R$1999",
    stars: 4,
    mainImage:
      "https://images.tcdn.com.br/img/img_prod/502737/serra_marmore_vonder_smv1300_1300w_13_000rpm_com_disco_diamantado_4_3_8_127_v_3576_1_27b081b1983fe525676e79caae57bd18.jpg",
    thumbnails: [
      "https://images.tcdn.com.br/img/img_prod/502737/serra_marmore_vonder_smv1300_1300w_13_000rpm_com_disco_diamantado_4_3_8_127_v_3576_1_27b081b1983fe525676e79caae57bd18.jpg",
      "https://cdn.leroymerlin.com.br/products/serra_marmore_vonder_smv_1300s_sem_kit_de_refrigeracao_127v_1547140504_d386_600x600.jpg",
      "https://cdn.leroymerlin.com.br/products/serra_marmore_vonder_smv_1300s_sem_kit_de_refrigeracao_127v_1547140504_ffde_600x600.jpg",
    ],
    description:
      "Serra Mármore com motor potente e disco diamantado para cortes precisos e alta durabilidade.",
    stock: true,
  },
  {
  id: 2,
  title: "Gerador 5kva",
  price: "R$960",
  oldPrice: "R$1160",
  stars: 3,
  mainImage:
    "https://images.tcdn.com.br/img/img_prod/502737/gerador_energia_a_gasolina_csm_gm5500_force_5_5kva_monofasico_bivolt_5500w_motor_11hp_4t_812_1_989532d066d3ceafe5fda8ddd5e0e6f3.jpg",
  thumbnails: [
    "https://images.tcdn.com.br/img/img_prod/502737/gerador_energia_a_gasolina_csm_gm5500_force_5_5kva_monofasico_bivolt_5500w_motor_11hp_4t_812_1_989532d066d3ceafe5fda8ddd5e0e6f3.jpg",
    "https://cdn.leroymerlin.com.br/products/gerador_portatil_de_energia_3,5_kva_a_gasolina_gm_3500_6,5hp_1566899563_913c_600x600.jpg",
    "https://cdn.leroymerlin.com.br/products/gerador_portatil_de_energia_3,5_kva_a_gasolina_gm_3500_6,5hp_1566899563_2689_600x600.jpg",
    "https://cdn.leroymerlin.com.br/products/gerador_portatil_de_energia_3,5_kva_a_gasolina_gm_3500_6,5hp_1566899563_80a4_600x600.jpg",
  ],
  description:
    "Gerador a gasolina compacto e eficiente, ideal para uso residencial e comercial.",
  stock: false,
},
   {
    id: 3,
    title: "Andaime 1m",
    price: "R$370",
    oldPrice: "R$400",
    stars: 5,
    mainImage:
      "https://maqcenter.com.br/wp-content/uploads/2018/07/image71.jpeg",
    thumbnails: [
      "https://maqcenter.com.br/wp-content/uploads/2018/07/image71.jpeg",
      "https://images.tcdn.com.br/img/img_prod/1268646/aluguel_kit_guarda_corpo_para_andaime_1_metro_com_rodape_17_1_22f3c1ba808b9f490c12d48ac1658cb5.jpg",
      "https://www.acolok.com.br/imagens/main/produtos/acessorios.jpg",
      
    ],
    description:
      "Andaime seguro e resistente para facilitar o seu trabalho em altura com máxima segurança.",
    stock: true,
  },
  {
    id: 4,
    title: "Extratora",
    price: "R$990",
    oldPrice: "R$1499",
    stars: 4,
    mainImage:
      "https://www.tintasdarka.com.br/estatico/darka/images/produto/extratoraparalimpezaelv1300vonder.png",
    thumbnails: [
      "https://www.tintasdarka.com.br/estatico/darka/images/produto/extratoraparalimpezaelv1300vonder.png",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdvd-m1fopgc3eatkc7",
      "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/bautotin/catalog/api/bautotin_integrac/6670503de88e7.jpg",
      "https://www.tintasdarka.com.br/estatico/darka/images/produto/extratoraparalimpezaelv1300vonder_1.png?v=1684933502",
    ],
    description:
      "Extratora potente e eficiente para limpeza profunda de carpetes, estofados e mais.",
    stock: true,
  },
];

const reviewsData = [
  {
    id: 1,
    name: "Carlos Silva",
    rating: 5,
    comment: "Produto excelente, muito resistente e entrega rápida!",
  },
  {
    id: 2,
    name: "Fernanda Lima",
    rating: 4,
    comment: "Ótima betoneira, só o preço que poderia ser um pouco menor.",
  },
  {
    id: 3,
    name: "João Pedro",
    rating: 5,
    comment: "Superou minhas expectativas, recomendo a todos.",
  },
];

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState(defaultProduct.mainImage);
  const [thumbnails, setThumbnails] = useState(defaultProduct.thumbnails);
  const [quantity, setQuantity] = useState(1);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const product = selectedProduct || defaultProduct;
    setMainImage(product.mainImage);
    setThumbnails(product.thumbnails);
    setQuantity(1);
    setFavorited(false);
  }, [selectedProduct]);

  const increment = () => setQuantity((q) => (q < 10 ? q + 1 : q));
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : q));
  const toggleFavorite = () => setFavorited(!favorited);

  const renderStars = (count) => (
    <>
      {[...Array(5)].map((_, i) =>
        i < count ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      )}
    </>
  );

  const product = selectedProduct || defaultProduct;

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <p className="text-sm text-gray-500 mb-6 select-none">
        Account / Construção /{" "}
        <span className="text-gray-900 font-semibold">{product.title}</span>
      </p>

    {selectedProduct && (
  <button
    onClick={() => setSelectedProduct(null)}
    className="mb-6 inline-flex items-center gap-3 
               bg-gradient-to-r from-red-500 to-red-700 
               text-white font-semibold px-5 py-3 rounded-lg 
               shadow-lg hover:from-red-600 hover:to-red-800 
               focus:outline-none focus:ring-4 focus:ring-red-300 
               transition-transform transform hover:scale-105 active:scale-95"
    aria-label="Voltar para Betoneira"
    type="button"
  >
    <FaArrowLeft className="text-lg" />
    Voltar para Betoneira
  </button>
)}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex md:flex-col gap-4">
          {thumbnails.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(src)}
              className="border rounded-lg p-1 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label={`Imagem ${idx + 1}`}
              type="button"
            >
              <img
                src={src}
                alt={`${product.title} imagem ${idx + 1}`}
                className="w-20 h-20 object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl p-6 shadow-md transition-all duration-300 ease-in-out">
          <img
            src={mainImage}
            alt={product.title}
            className="max-h-[400px] object-contain rounded"
            loading="lazy"
          />
        </div>

        <div className="md:w-[420px] space-y-6 flex flex-col">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400 text-lg">{renderStars(product.stars)}</div>
            <span className="text-gray-500 text-sm">(150 Reviews)</span>
            <span
              className={`ml-auto font-semibold text-sm ${
                product.stock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock ? "Em estoque" : "Indisponível"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-red-600">{product.price}</p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through text-lg">{product.oldPrice}</p>
            )}
          </div>

          <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700 select-none">Quantidade:</span>
            <div className="flex items-center border rounded-md overflow-hidden select-none">
              <button
                onClick={decrement}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label="Diminuir quantidade"
                type="button"
              >
                -
              </button>
              <span className="px-6 py-2 font-mono">{quantity}</span>
              <button
                onClick={increment}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label="Aumentar quantidade"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Entrar em contato com a loja"
              type="button"
            >
              Entrar em contato com a loja
            </button>
            <button
              onClick={toggleFavorite}
              aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              className={`w-14 h-14 flex justify-center items-center border rounded-md transition ${
                favorited ? "text-red-600 bg-red-100" : "text-gray-400 hover:text-red-600 hover:bg-red-100"
              } focus:outline-none focus:ring-2 focus:ring-red-600`}
              type="button"
            >
              {favorited ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
          </div>

          <div className="border rounded-lg divide-y divide-gray-200 shadow-sm mt-6">
            <div className="flex items-center gap-4 p-4">
              <FaTruck className="text-2xl text-gray-700" />
              <div>
                <p className="font-semibold text-gray-800">Entrega Grátis</p>
                <p className="text-gray-500 text-sm">Receba em até 7 dias úteis</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <FaUndo className="text-2xl text-gray-700" />
              <div>
                <p className="font-semibold text-gray-800">Devolução</p>
                <p className="text-gray-500 text-sm">Grátis em até 15 dias depois da compra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!selectedProduct && (
        <section className="mt-16">
          <h3 className="text-2xl font-semibold mb-6 select-none">
            Avaliações dos clientes
          </h3>
          <div className="space-y-6">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-800 select-none">
                    {review.name}
                  </span>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16">
        <h3 className="text-2xl font-semibold mb-6 select-none">
          Produtos relacionados
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {relatedProductsList.map((item) => (
            <button
              key={item.id}
              className="bg-white p-5 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600"
              onClick={() => setSelectedProduct(item)}
              aria-label={`Ver detalhes do produto ${item.title}`}
              type="button"
            >
              <img
                src={item.mainImage}
                alt={item.title}
                className="h-28 mx-auto mb-4 object-contain rounded"
                loading="lazy"
              />
              <p className="text-sm font-semibold mb-1 truncate">{item.title}</p>
              <div className="flex items-center gap-2">
                <p className="text-red-600 font-bold text-lg">{item.price}</p>
                {item.oldPrice && (
                  <p className="text-gray-400 line-through text-sm">{item.oldPrice}</p>
                )}
              </div>
              <div className="flex text-yellow-400 text-sm mt-1 space-x-1">
                {[...Array(5)].map((_, i) =>
                  i < item.stars ? (
                    <FaStar key={i} />
                  ) : (
                    <FaRegStar key={i} />
                  )
                )}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
