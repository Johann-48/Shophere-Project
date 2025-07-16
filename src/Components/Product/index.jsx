import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaTruck,
  FaUndo,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaArrowLeft,
} from "react-icons/fa";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${id}`);
        const prod = res.data;
        console.log("Produto carregado:", prod); // 👈 VERIFIQUE ISSO NO CONSOLE
        setProduct(prod);
        setMainImage(prod.mainImage || "/assets/placeholder.png");
        setThumbnails(prod.thumbnails || []);
        setQuantity(1);
        setFavorited(false);
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError("Produto não encontrado.");
      } finally {
        setLoading(false);
      }
    };

    if (!id || id === "undefined" || id === "null") {
      setError("Produto inválido ou não selecionado.");
      setLoading(false);
      return;
    }
    fetchProduct();
  }, [id]);

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

  if (loading) {
    return <div className="p-6 max-w-7xl mx-auto">Carregando produto...</div>;
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-red-500">
        {error}
        <button
          onClick={() => window.history.back()}
          className="mt-4 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <FaArrowLeft /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
          type="button"
        >
          <FaArrowLeft /> Voltar
        </button>
      </div>

      {/* Loja clicável */}
      <div className="mb-4 text-sm text-gray-600">
        Loja:{" "}
        <button
          onClick={() => navigate(`/commerce/${product.comercio.id}`)}
          className="font-semibold hover:underline focus:outline-none"
          type="button"
        >
          {product.comercio.nome}
        </button>
      </div>
      <div className="flex items-center mb-6"></div>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-4">
          {thumbnails.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(src)}
              className="border rounded-lg p-1 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-red-600"
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

        {/* Imagem principal */}
        <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl p-6 shadow-md">
          <img
            src={mainImage}
            alt={product.title}
            className="max-h-[400px] object-contain rounded"
            loading="lazy"
          />
        </div>

        {/* Detalhes do produto */}
        <div className="md:w-[420px] space-y-6 flex flex-col">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400 text-lg">
              {renderStars(product.stars || 0)}
            </div>
            <span className="text-gray-500 text-sm">
              ({product.reviewsCount || 0} Reviews)
            </span>
            <span
              className={`ml-auto font-semibold text-sm ${
                product.stock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock ? "Em estoque" : "Indisponível"}
            </span>
            {product.stock && (
              <span className="text-sm text-gray-600 ml-2">
                ({product.quantidade} disponíveis)
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-red-600">{product.price}</p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through text-lg">
                {product.oldPrice}
              </p>
            )}
          </div>

          <p className="text-gray-700 text-base leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700 select-none">
              Quantidade:
            </span>
            <div className="flex items-center border rounded-md overflow-hidden select-none">
              <button
                onClick={decrement}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-red-600"
                type="button"
              >
                -
              </button>
              <span className="px-6 py-2 font-mono">{quantity}</span>
              <button
                onClick={increment}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-red-600"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button
              onClick={() =>
                (window.location.href = `tel:${product.comercio.telefone}`)
              }
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-600"
              type="button"
            >
              📞 Entrar em contato com a loja –{" "}
              {product.comercio?.nome || "Loja"}
            </button>
            {product.barcode && (
              <button
                onClick={() => navigate(`/comparar/${product.barcode}`)}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-md font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-yellow-600"
                type="button"
              >
                Comparar Preços 🛍️
              </button>
            )}
            <button
              onClick={toggleFavorite}
              aria-label={
                favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
              }
              className={`w-14 h-14 flex justify-center items-center border rounded-md transition ${
                favorited
                  ? "text-red-600 bg-red-100"
                  : "text-gray-400 hover:text-red-600 hover:bg-red-100"
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
                <p className="text-gray-500 text-sm">
                  Receba em até 7 dias úteis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <FaUndo className="text-2xl text-gray-700" />
              <div>
                <p className="font-semibold text-gray-800">Devolução</p>
                <p className="text-gray-500 text-sm">
                  Grátis em até 15 dias depois da compra
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Avaliações */}

      <section className="mt-16">
        <div className="flex items-center justify-between mb-6 select-none">
          <h3 className="text-2xl font-semibold">Avaliações dos clientes</h3>
          {/* Botão para escrever avaliação */}
          <Link
            to={`/review/${product.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Escreva uma avaliação
          </Link>
        </div>

        {product.reviewsCount > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((rev, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex items-center mb-1">
                  {renderStars(rev.note)}
                  <span className="ml-2 text-sm text-gray-500">{rev.user}</span>
                </div>
                <p className="text-gray-700">{rev.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-500">Nenhuma avaliação disponível.</p>
            {/* Também podemos sugerir escrever a primeira avaliação aqui */}
            <Link
              to={`/review/${product.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Seja o primeiro a avaliar
            </Link>
          </div>
        )}
      </section>
      {/* Relacionados */}
      <section className="mt-16">
        <h3 className="text-2xl font-semibold mb-6 select-none">
          Produtos relacionados
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <p className="text-gray-500">Sem produtos relacionados.</p>
        </div>
      </section>
    </div>
  );
}
