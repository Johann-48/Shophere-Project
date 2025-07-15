import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FiTrash2, FiXCircle, FiMoon, FiSun, FiInfo, FiCheck } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes auxiliares
const RatingTooltip = ({ rating, darkMode }) => {
  const descriptions = [
    "Péssimo - Totalmente insatisfeito",
    "Ruim - Muitos problemas",
    "Regular - Poderia melhorar",
    "Bom - Atendeu expectativas",
    "Excelente - Superou expectativas"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`absolute top-full mt-2 left-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-800'} text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10`}
    >
      {descriptions[rating - 1]}
    </motion.div>
  );
};

const ProgressBar = ({ progress, darkMode }) => (
  <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 mb-4`}>
    <motion.div 
      className={`${darkMode ? 'bg-blue-500' : 'bg-blue-600'} h-2.5 rounded-full`} 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

const Tag = ({ tag, selected, onClick, darkMode }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-3 py-1 border rounded-full text-sm focus:outline-none transition-colors ${
      selected
        ? 'bg-blue-100 border-blue-500 text-blue-700'
        : `${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'}`
    }`}
  >
    {tag}
    {selected && <FiCheck className="inline ml-1" />}
  </motion.button>
);

export default function ReviewForm() {
  const MAX_IMAGES = 5;
  const MAX_CHARS = 200;
  const MAX_TAGS = 5;
  const DRAFT_KEY = 'review_form_draft';
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting }
  } = useForm({ mode: 'onChange' });
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showRatingTooltip, setShowRatingTooltip] = useState(false);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar preferência do usuário no localStorage ou no sistema
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showHelp, setShowHelp] = useState(false);
  
  // Efeito para persistir o modo escuro
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const prosText = watch('pros', '');
  const consText = watch('cons', '');
  
  // Calcular progresso do preenchimento
  const calculateProgress = () => {
    let progress = 0;
    if (rating > 0) progress += 30;
    if (prosText?.length > 10) progress += 20;
    if (consText?.length > 10) progress += 20;
    if (tags.length > 0) progress += 15;
    if (images.length > 0) progress += 15;
    return Math.min(progress, 100);
  };
  
  const progress = calculateProgress();
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error(`Alguns arquivos foram rejeitados. Formatos aceitos: JPEG, PNG. Tamanho máximo: 5MB.`);
    }

    const next = acceptedFiles.slice(0, MAX_IMAGES - images.length);
    
    next.forEach((file, index) => {
      const reader = new FileReader();
      const imageId = `${file.name}-${Date.now()}`;
      
      // Simular progresso de upload
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 90) clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [imageId]: Math.min(progress, 90) }));
      }, 200);
      
      reader.onload = () => {
        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [imageId]: 100 }));
        
        setTimeout(() => {
          setImages(prev => [...prev, { id: imageId, src: reader.result }]);
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[imageId];
            return newProgress;
          });
        }, 300);
      };
      
      reader.onerror = () => {
        clearInterval(progressInterval);
        toast.error(`Erro ao carregar ${file.name}`);
      };
      
      // Compressão simulada para imagens grandes
      if (file.size > 2 * 1024 * 1024) {
        toast.warn(`Imagem ${file.name} é muito grande. Estamos otimizando...`);
        setTimeout(() => {
          reader.readAsDataURL(file);
        }, 1000);
      } else {
        reader.readAsDataURL(file);
      }
    });
  }, [images]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: MAX_IMAGES,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const availableTags = [
    'Qualidade',
    'Cor exata',
    'Cheiro',
    'Conforto',
    'Preço',
    'Durabilidade',
    'Embalagem',
    'Entrega',
    'Atendimento',
    'Material'
  ];

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(prev => prev.filter(t => t !== tag));
    } else if (tags.length < MAX_TAGS) {
      setTags(prev => [...prev, tag]);
    } else {
      toast.warn(`Você só pode selecionar até ${MAX_TAGS} tags.`);
    }
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const submit = async (data) => {
    try {
      // Simular envio assíncrono
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const payload = { 
        rating, 
        tags, 
        images: images.map(img => img.src), 
        pros: data.pros, 
        cons: data.cons 
      };
      console.log('Submitting:', payload);
      
      // Limpar rascunho após envio bem-sucedido
      localStorage.removeItem(DRAFT_KEY);
      
      toast.success('Avaliação enviada com sucesso!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Resetar formulário
      setRating(0);
      setTags([]);
      setImages([]);
      reset();
    } catch (error) {
      toast.error('Erro ao enviar avaliação. Tente novamente.');
    }
  };

  const clearDraft = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o formulário?')) {
      localStorage.removeItem(DRAFT_KEY);
      setRating(0);
      setTags([]);
      setImages([]);
      reset();
      toast.info('Formulário limpo com sucesso!');
    }
  };

  // Carregar rascunho salvo
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const { rating, tags, images, formData } = JSON.parse(savedDraft);
        if (rating) setRating(rating);
        if (tags) setTags(tags);
        if (images) setImages(images);
        if (formData) reset(formData);
        
        toast.info('Rascunho recuperado!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, [reset]);
  
  // Salvar rascunho quando os dados mudam
  useEffect(() => {
    const formData = {
      pros: watch('pros'),
      cons: watch('cons')
    };
    
    const draft = { rating, tags, images, formData };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [rating, tags, images, watch('pros'), watch('cons')]);

  return (
    <div className={`min-h-screen py-8 transition-colors ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <motion.form
          onSubmit={handleSubmit(submit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-3xl mx-auto p-6 rounded-2xl shadow-xl transition-colors ${
            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
          }`}
        >
          {/* Cabeçalho com controles */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">Deixe sua avaliação</h2>
              <p className="text-sm opacity-75">Sua opinião ajuda outras pessoas</p>
            </div>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full focus:outline-none transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label={darkMode ? "Modo claro" : "Modo escuro"}
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
              
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className={`p-2 rounded-full focus:outline-none transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label="Ajuda"
              >
                <FiInfo />
              </button>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <ProgressBar progress={progress} darkMode={darkMode} />
          
          {/* Ajuda */}
          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-blue-50'
                }`}>
                  <h3 className="font-bold mb-2">Dicas para uma boa avaliação:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Seja específico sobre o que gostou ou não</li>
                    <li>Mencione características importantes para você</li>
                    <li>Fotos ajudam muito outras pessoas</li>
                    <li>Seu rascunho é salvo automaticamente</li>
                    <li>Você pode selecionar até {MAX_TAGS} tags</li>
                    <li>Envie até {MAX_IMAGES} imagens (5MB cada)</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Rating Stars */}
          <div className="mb-6">
            <label className="font-medium block mb-2">Avaliação*</label>
            <div className="flex items-center relative">
              {[1, 2, 3, 4, 5].map((val) => (
                <motion.button
                  key={val}
                  type="button"
                  onClick={() => setRating(val)}
                  onMouseEnter={() => {
                    setHoverRating(val);
                    setShowRatingTooltip(true);
                  }}
                  onMouseLeave={() => {
                    setHoverRating(0);
                    setShowRatingTooltip(false);
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="text-3xl mx-1 focus:outline-none relative"
                  aria-label={`Avaliar com ${val} estrelas`}
                >
                  <span
                    className={
                      rating >= val || hoverRating >= val
                        ? 'text-yellow-400'
                        : darkMode
                        ? 'text-gray-500'
                        : 'text-gray-300'
                    }
                  >
                    ★
                  </span>
                </motion.button>
              ))}
              
              {showRatingTooltip && hoverRating > 0 && (
                <RatingTooltip rating={hoverRating} darkMode={darkMode} />
              )}
            </div>
            {rating === 0 && (
              <p className="text-red-500 text-sm mt-1">Selecione uma nota*</p>
            )}
          </div>
          
          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex justify-between items-center">
                <label className="font-medium">Pontos Positivos</label>
                <span className={`text-xs ${
                  prosText?.length > MAX_CHARS ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {prosText?.length || 0}/{MAX_CHARS}
                </span>
              </div>
              <textarea
                {...register('pros', { 
                  maxLength: {
                    value: MAX_CHARS,
                    message: `Máximo de ${MAX_CHARS} caracteres`
                  } 
                })}
                placeholder="O que você mais gostou..."
                className={`w-full mt-1 p-3 border rounded-lg resize-none transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                rows={4}
              />
              {errors.pros && (
                <p className="text-red-500 text-sm mt-1">{errors.pros.message}</p>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label className="font-medium">Pontos Negativos</label>
                <span className={`text-xs ${
                  consText?.length > MAX_CHARS ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {consText?.length || 0}/{MAX_CHARS}
                </span>
              </div>
              <textarea
                {...register('cons', { 
                  maxLength: {
                    value: MAX_CHARS,
                    message: `Máximo de ${MAX_CHARS} caracteres`
                  } 
                })}
                placeholder="O que poderia melhorar..."
                className={`w-full mt-1 p-3 border rounded-lg resize-none transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                rows={4}
              />
              {errors.cons && (
                <p className="text-red-500 text-sm mt-1">{errors.cons.message}</p>
              )}
            </div>
          </div>
          
          {/* Tags Selector */}
          <div className="mb-6">
            <label className="font-medium block mb-2">Tags (opcional)</label>
            <div className="flex flex-wrap gap-2">
              <LayoutGroup>
                {availableTags.map((tag) => (
                  <Tag
                    key={tag}
                    tag={tag}
                    selected={tags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    darkMode={darkMode}
                  />
                ))}
              </LayoutGroup>
            </div>
            {tags.length >= MAX_TAGS && (
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Limite de tags atingido ({MAX_TAGS})
              </p>
            )}
          </div>
          
          {/* Image Upload */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">Fotos (opcional)</label>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {images.length}/{MAX_IMAGES}
              </span>
            </div>
            
            <div
              {...getRootProps()}
              className={`flex flex-wrap gap-3 p-4 border-2 border-dashed rounded-lg cursor-pointer min-h-[120px] transition-colors ${
                isDragActive
                  ? darkMode
                    ? 'border-blue-400 bg-blue-900/20'
                    : 'border-blue-400 bg-blue-50'
                  : darkMode
                  ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              
              {images.length === 0 && !Object.keys(uploadProgress).length && (
                <div className={`w-full flex flex-col items-center justify-center text-center py-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <p className="mb-2">
                    {isDragActive
                      ? 'Solte as imagens aqui'
                      : 'Arraste imagens ou clique para selecionar'}
                  </p>
                  <p className="text-sm">
                    Máximo {MAX_IMAGES} imagens (JPEG, PNG) de até 5MB
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {images.map((img) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-24 h-24 rounded-lg overflow-hidden shadow"
                  >
                    <img
                      src={img.src}
                      alt={`preview-${img.id}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                      className={`absolute top-1 right-1 rounded-full p-1 shadow focus:outline-none transition-colors ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'
                      }`}
                      aria-label="Remover imagem"
                    >
                      <FiXCircle size={16} className="text-red-500" />
                    </button>
                  </motion.div>
                ))}
                
                {Object.entries(uploadProgress).map(([id, progress]) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className={`w-16 h-1 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-full overflow-hidden`}>
                        <motion.div
                          className={`h-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium">
                      {progress < 100 ? 'Carregando...' : 'Processando'}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Controles do formulário */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              type="submit"
              disabled={!isValid || rating === 0 || isSubmitting}
              whileHover={{ scale: isValid && rating > 0 ? 1.02 : 1 }}
              whileTap={{ scale: isValid && rating > 0 ? 0.98 : 1 }}
              className={`flex-1 py-3 rounded-lg font-semibold transition focus:outline-none ${
                isValid && rating > 0
                  ? darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  : darkMode
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar Avaliação'
              )}
            </motion.button>
            
            <motion.button
              type="button"
              onClick={clearDraft}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`py-3 px-4 rounded-lg font-medium transition focus:outline-none ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Limpar Tudo
            </motion.button>
          </div>
        </motion.form>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}