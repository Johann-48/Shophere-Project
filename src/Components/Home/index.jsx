import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // ou fetch
import {
  FiHeart,
  FiTrendingUp,
  FiTrendingDown,
  FiTrash2,
  FiMoreVertical,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

//const categories = [
//  "Celulares",
//  "Moda",
//  "Casa",
//  "Esportes",
//  "Beleza",
//  "Eletrônicos",
//  "Brinquedos",
//  "Alimentos",
//  "Papelaria",
//  "Pets",
//  "Automotivo",
//  "Ferramentas",
//  "Livros",
//  "Outros",
//];

const fakeProducts = Array.from({ length: 8 }, (_, i) => {
  const price = parseFloat((Math.random() * 300 + 50).toFixed(2));
  const oldPrice =
    Math.random() > 0.5
      ? parseFloat((price + (Math.random() * 50 - 25)).toFixed(2))
      : null;
  return {
    id: i + 1,
    name: `Produto ${i + 1}`,
    price,
    oldPrice,
    description: "Descrição curta do produto",
    image: `/assets/produto${(i % 4) + 1}.png`,
  };
});

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState([]);
  const [cart, setCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  function handleLogout() {
    localStorage.removeItem("token"); // remove o token salvo
    localStorage.removeItem("user"); // se tiver um usuário salvo
    navigate("/login"); // redireciona para login
  }

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = selectedCategory
          ? `/api/products/categoria/${selectedCategory}`
          : `/api/products`;

        const response = await axios.get(url);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.products || [];

        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar produtos");
        setProducts([]);
      } finally {
        setLoading(false);
      }
      axios
        .get("/api/categories")
        .then((res) => {
          const categoriasDoBanco = res.data || [];
          const todasCategorias = [
            { id: null, nome: "Todos" },
            ...categoriasDoBanco,
          ];
          setCategories(todasCategorias);
        })
        .catch((err) => console.error("Erro ao buscar categorias:", err));
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900 min-h-screen font-sans relative">
      {/* Menu 3 Pontos (igual) */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-700 hover:text-black p-2 rounded-full hover:bg-gray-200 transition"
        >
          <FiMoreVertical size={22} />
        </button>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <ul className="text-sm text-gray-700">
                <Link to="/accountmanager">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Perfil
                  </li>
                </Link>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Configurações
                </li>
                <li
                  onClick={handleLogout} // ← aqui roda a função
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 font-medium"
                >
                  Sair
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Banner (igual) */}
      <div
        className="w-full h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/your-banner-image.jpg")' }}
      >
        <div className="bg-black bg-opacity-70 p-10 rounded-3xl text-white text-center shadow-2xl backdrop-blur-md">
          <h1 className="text-5xl font-extrabold mb-3">
            🛍️ Bem-vindo à <span className="text-red-400">ShopHere</span>
          </h1>
          <p className="text-lg">
            Ofertas imperdíveis, categorias exclusivas e novidades semanais para
            você!
          </p>
        </div>
      </div>

      {/* Se desejar, exiba loading ou erro */}
      {loading && <div className="p-6 text-center">Carregando produtos...</div>}
      {error && <div className="p-6 text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          {/* Seções de categorias (igual) */}
          <section className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              🗂️ Navegue por Categorias
            </h2>
            <div className="relative">
              <div className="flex overflow-x-auto gap-4 pb-4 px-1 scroll-smooth hide-scrollbar">
                {categories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`
      min-w-[130px] bg-white rounded-xl shadow-sm flex flex-col items-center
  justify-center text-center px-4 py-5 text-sm font-semibold hover:bg-red-100
  transition cursor-pointer border ${
    selectedCategory === cat.id
      ? "bg-red-100 border-red-400 shadow-lg scale-105"
      : "border-gray-200"
  }
    `}
                  >
                    <div className="text-3xl mb-2">🗂️</div>
                    {cat.nome}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Produtos em Destaque: renderize todos ou filtre conforme quiser */}

          <section className="p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ✨ Produtos em Destaque
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.isArray(products) &&
                products.slice(0, 10).map((product) => {
                  // Adaptar verificação de trend se houver oldPrice
                  let priceNum = null;
                  let oldPriceNum = null;
                  let priceTrend = null;
                  // Se seu backend retornar price como string "R$ 123,45", talvez seja melhor retornar valor numérico no JSON.
                  // Aqui assumimos que prod.price vem no formato "R$ 123.45" ou melhor: retorne no controller algo como price: Number.
                  // Ajuste conforme seu retorno. Exemplo se price for string "R$ 123.45":
                  if (typeof product.price === "string") {
                    // remover "R$ " e parseFloat
                    const parsed = parseFloat(
                      product.price.replace(/[R$\s]/g, "").replace(",", ".")
                    );
                    if (!isNaN(parsed)) priceNum = parsed;
                  } else if (typeof product.price === "number") {
                    priceNum = product.price;
                  }
                  // Se tiver oldPrice:
                  if (product.oldPrice) {
                    if (typeof product.oldPrice === "string") {
                      const parsedOld = parseFloat(
                        product.oldPrice
                          .replace(/[R$\s]/g, "")
                          .replace(",", ".")
                      );
                      if (!isNaN(parsedOld)) oldPriceNum = parsedOld;
                    } else if (typeof product.oldPrice === "number") {
                      oldPriceNum = product.oldPrice;
                    }
                  }
                  if (priceNum != null && oldPriceNum != null) {
                    priceTrend = priceNum > oldPriceNum ? "up" : "down";
                  }
                  // Imagem principal
                  const imageUrl =
                    product.mainImage || "/assets/placeholder.png";

                  return (
                    <Link to={`/produto/${product.id}`} key={product.id}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white rounded-2xl shadow-lg p-4 relative flex flex-col hover:ring-2 hover:ring-red-300 transition"
                      >
                        <img
                          src={imageUrl}
                          alt={product.title || product.name}
                          className="w-full h-32 object-contain mb-3"
                        />
                        <h3 className="text-lg font-semibold mb-1">
                          {product.title || product.name}
                        </h3>
                        {/* Nome da loja */}
                        {product.comercioNome && (
                          <p className="text-xs text-gray-500 mb-2">
                            Loja:{" "}
                            <span className="font-medium">
                              {product.comercioNome}
                            </span>
                          </p>
                        )}
                        {product.description && (
                          <p className="text-sm text-gray-500 mb-1">
                            {product.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          {priceNum != null ? (
                            <span className="text-red-500 font-bold">
                              R$ {priceNum.toFixed(2)}
                            </span>
                          ) : product.price ? (
                            <span className="text-red-500 font-bold">
                              {product.price}
                            </span>
                          ) : null}
                          {oldPriceNum != null && (
                            <span className="text-xs line-through text-gray-400">
                              R$ {oldPriceNum.toFixed(2)}
                            </span>
                          )}
                          {priceTrend === "up" && (
                            <FiTrendingUp className="text-orange-500" />
                          )}
                          {priceTrend === "down" && (
                            <FiTrendingDown className="text-green-500" />
                          )}
                        </div>
                        <div className="mt-auto flex justify-between items-center">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                          >
                            Comprar
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLike(product.id);
                            }}
                            className="text-red-500"
                          >
                            <FiHeart
                              className={
                                liked.includes(product.id)
                                  ? "fill-red-500"
                                  : "stroke-2"
                              }
                            />
                          </button>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
            </div>
          </section>

          {/* Seções “Mais Vendidos”, “Vitrine de Novidades” etc podem ser adaptadas para usar slices de products ou chamadas específicas */}
          <section className="p-6">
            <h2 className="text-2xl font-bold mb-4">🔥 Mais Vendidos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <Link
                  to={`/produto/${product.id}`}
                  key={`maisvendido-${product.id}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-xl shadow-md p-4"
                  >
                    <img
                      src={product.mainImage || "/assets/placeholder.png"}
                      alt={product.title || product.name}
                      className="h-24 w-full object-contain mb-2"
                    />
                    <h4 className="text-sm font-medium">
                      {product.title || product.name}
                    </h4>
                    {/* Nome da loja */}
                    {product.comercioNome && (
                      <p className="text-xs text-gray-500 mb-2">
                        Loja:{" "}
                        <span className="font-medium">
                          {product.comercioNome}
                        </span>
                      </p>
                    )}
                    {product.description && (
                      <p className="text-xs text-gray-500">
                        {product.description}
                      </p>
                    )}
                    {typeof product.price === "number" ? (
                      <p className="text-red-600 font-bold text-sm mt-1">
                        R$ {product.price.toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-red-600 font-bold text-sm mt-1">
                        {product.price}
                      </p>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>

          {/* Outras seções como “Vitrine de Novidades” ou banners promocionais podem permanecer estáticas ou buscar dados de endpoints específicos */}
          {/* Carrinho Flutuante e Footer permanecem iguais */}
          {cart.length > 0 && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-4 right-4 bg-white shadow-2xl p-4 rounded-xl w-80 z-50"
            >
              <h4 className="font-bold mb-2">🛒 Carrinho</h4>
              <ul className="max-h-48 overflow-y-auto divide-y divide-gray-200">
                {cart.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center text-sm py-2"
                  >
                    <div>
                      <p className="font-medium">{item.title || item.name}</p>
                      {item.price && (
                        <span className="text-gray-500 text-xs">
                          {typeof item.price === "string"
                            ? item.price
                            : `R$ ${parseFloat(item.price).toFixed(2)}`}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
              <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                Finalizar Compra
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
