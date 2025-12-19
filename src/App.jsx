import React, { useState, useEffect } from 'react'
import { ArrowRight, Menu, Home, RefreshCw, Gift, CreditCard, Phone, Lightbulb, Banknote, DollarSign, Wallet, QrCode, AlertTriangle, X, Shield, ShieldAlert, MapPin, ChevronLeft, Delete, CheckCircle, Share2 } from 'lucide-react'

// --- DATOS ESTÁTICOS ---
const fraudCases = {
  case1: {
    icon: <ShieldAlert className="w-16 h-16 text-red-500" />,
    title: '¡Acceso no reconocido!',
    message: 'Esta transacción se originó desde un dispositivo inusual. Por tu seguridad, valida tu identidad.',
    button: 'Validar identidad',
    color: 'red'
  },
  case2: {
    icon: <Banknote className="w-16 h-16 text-red-500" />,
    title: '¡Operación inusual!',
    message: 'Hemos detectado un movimiento que compromete la totalidad de tu saldo. Esta transferencia requiere autorización.',
    button: 'Autorizar operación',
    color: 'red'
  },
  case3: {
    icon: <AlertTriangle className="w-16 h-16 text-orange-500" />,
    title: '¡Alerta de riesgo!',
    message: 'Detectamos una transferencia hacia un destinatario de reputación inusual. ¿Deseas continuar?',
    button: 'Continuar bajo mi riesgo',
    color: 'orange'
  },
  case4: {
    icon: <MapPin className="w-16 h-16 text-red-500" />,
    title: 'Ubicación inconsistente',
    message: 'Tu ubicación actual no coincide con tus patrones frecuentes de consumo. Valida que eres tú.',
    button: 'Validar ubicación',
    color: 'red'
  }
}

const operations = [
  { icon: <Phone className="w-8 h-8" />, label: 'Plinear a celular' },
  { icon: <Lightbulb className="w-8 h-8" />, label: 'Pagar servicios' },
  { icon: <ArrowRight className="w-8 h-8" />, label: 'Transferir dinero' },
  { icon: <Phone className="w-8 h-8" />, label: 'Recargar celular' },
  { icon: <CreditCard className="w-8 h-8" />, label: 'Pagar tarjetas' },
  { icon: <DollarSign className="w-8 h-8" />, label: 'Cambiar dólares' },
  { icon: <Banknote className="w-8 h-8" />, label: 'Retirar sin tarjeta' }
]

const favorites = [
  { name: 'Caleb Romero', type: 'Transf. interbancaria', initial: 'C' },
  { name: 'Dan Vilca', type: 'Transf. interbancaria', initial: 'D' }
]

// --- MODAL DE SEGURIDAD (PIN) ---
const SecurityModal = ({ isOpen, fraudCaseKey, onClose, onSuccess }) => {
  const [step, setStep] = useState('warning'); 
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('warning');
      setPin('');
      setError(false);
    }
  }, [isOpen]);

  // VALIDACIÓN AUTOMÁTICA DEL PIN
  useEffect(() => {
    if (pin.length === 4) {
      if (pin === '1234') {
        setTimeout(() => onSuccess(), 300);
      } else {
        setError(true);
        setTimeout(() => {
          setPin('');
          setError(false);
        }, 500);
      }
    }
  }, [pin, onSuccess]);

  if (!isOpen || !fraudCaseKey) return null;
  const caseData = fraudCases[fraudCaseKey];

  const handleNumClick = (num) => { if (pin.length < 4) setPin(prev => prev + num); };
  const handleDelete = () => setPin(prev => prev.slice(0, -1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-2"><X className="w-6 h-6" /></button>

        {step === 'warning' && (
          <div className="flex flex-col items-center text-center animate-in zoom-in duration-300">
            <div className={`w-20 h-20 ${caseData.color === 'red' ? 'bg-red-100' : 'bg-orange-100'} rounded-full flex items-center justify-center mb-5`}>{caseData.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{caseData.title}</h3>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed px-2">{caseData.message}</p>
            <button onClick={() => setStep('pin')} className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold shadow-lg transition active:scale-95">{caseData.button}</button>
          </div>
        )}

        {step === 'pin' && (
          <div className="flex flex-col items-center animate-in slide-in-from-right duration-300">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Ingresa tu Clave Digital</h3>
            <div className={`flex gap-6 mb-8 ${error ? 'animate-shake' : ''}`}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`w-4 h-4 rounded-full border-2 border-green-500 transition-all duration-200 ${i < pin.length ? 'bg-green-500' : 'bg-transparent'} ${error ? 'border-red-500 bg-red-500' : ''}`} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 w-full px-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button key={num} onClick={() => handleNumClick(num.toString())} className="h-14 rounded-lg text-2xl font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition">{num}</button>
              ))}
              <div />
              <button onClick={() => handleNumClick('0')} className="h-14 rounded-lg text-2xl font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition">0</button>
              <button onClick={handleDelete} className="h-14 flex items-center justify-center text-gray-500 hover:text-gray-700"><Delete className="w-6 h-6" /></button>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes shake {0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.animate-shake{animation:shake 0.3s ease-in-out}`}</style>
    </div>
  );
};

// --- PANTALLAS PREVIAS ---
const OperationsScreen = ({ setCurrentScreen }) => (
  <div className="flex-1 bg-gray-900 overflow-auto pb-20">
    <div className="bg-gradient-to-b from-green-400 to-green-500 px-4 py-6">
      <div className="flex items-center justify-between mb-6"><Menu className="w-6 h-6 text-white" /><h1 className="text-white text-2xl font-semibold">Operaciones</h1><div className="w-6" /></div>
      <div className="bg-white rounded-3xl p-6">
        <div className="grid grid-cols-3 gap-6">
          {operations.map((op, idx) => (
            <button key={idx} onClick={() => idx === 2 && setCurrentScreen('transfer')} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">{op.icon}</div>
              <span className="text-sm text-gray-700 text-center leading-tight">{op.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="px-4 mt-8"><h2 className="text-blue-600 text-xl font-semibold mb-4">Pagos favoritos</h2>
      <div className="space-y-3">
        {favorites.map((fav, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">{fav.initial}</div><div><div className="font-semibold text-gray-800">{fav.name}</div><div className="text-sm text-gray-500">{fav.type}</div></div></div>
            <button className="text-green-500"><ArrowRight className="w-5 h-5"/></button>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const TransferScreen = ({ setCurrentScreen, setRecipientData }) => {
  const [activeTab, setActiveTab] = useState('interbank');
  const [localAccount, setLocalAccount] = useState('');
  const [swiftCode, setSwiftCode] = useState('');

  const handleAccountChange = (e) => {
    let text = e.target.value;
    if (activeTab === 'international') {
      text = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      if (text.length <= 34) setLocalAccount(text);
    } else {
      text = text.replace(/[^0-9]/g, '');
      if (text.length <= 20) setLocalAccount(text);
    }
  };

  const isFormValid = () => {
    if (!localAccount) return false;
    if (activeTab === 'interbank') return localAccount.length >= 10;
    if (activeTab === 'other') return localAccount.length === 20;
    if (activeTab === 'international') return localAccount.length > 5;
    return false;
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;
    let mockName = 'Usuario Desconocido';
    if (activeTab === 'interbank') mockName = 'Carlos Alberto Ruiz Vega';
    if (activeTab === 'other') mockName = 'María Fernanda López Torres';
    if (activeTab === 'international') mockName = 'Global Services Solutions LLC';

    setRecipientData({
      name: mockName, account: localAccount, type: activeTab, swift: swiftCode,
      bank: activeTab === 'other' ? 'BBVA Continental' : (activeTab === 'interbank' ? 'Interbank' : 'Bank of America')
    });
    setCurrentScreen('details');
  };

  const getPlaceholder = () => {
    if (activeTab === 'interbank') return '000 0000000000';
    if (activeTab === 'other') return '000 000 000000000000 00 (CCI)';
    return 'Número de cuenta / IBAN';
  };

  return (
    <div className="flex-1 bg-white overflow-auto pb-20">
      <div className="px-4 py-6 relative">
        <button onClick={() => setCurrentScreen('operations')} className="absolute left-4 top-4 p-2 rounded-md bg-white shadow-sm"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">Transferencias</h1>
        <div className="flex gap-2 mb-8">
          <button onClick={() => { setActiveTab('interbank'); setLocalAccount(''); }} className={`flex-1 py-3 rounded-lg font-medium transition ${activeTab === 'interbank' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>Interbank</button>
          <button onClick={() => { setActiveTab('other'); setLocalAccount(''); }} className={`flex-1 py-3 rounded-lg font-medium transition ${activeTab === 'other' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>Otro banco</button>
          <button onClick={() => { setActiveTab('international'); setLocalAccount(''); }} className={`flex-1 py-3 rounded-lg font-medium transition ${activeTab === 'international' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>Al exterior</button>
        </div>
        <div className="mb-8 space-y-6">
          {activeTab === 'international' && (
            <div className="mb-4"><label className="block text-xs text-gray-500 mb-1 uppercase">Código SWIFT</label><input type="text" onChange={(e) => setSwiftCode(e.target.value)} placeholder="AAAA BB CC 123" className="w-full border-b-2 border-gray-200 py-3 text-lg uppercase outline-none" /></div>
          )}
          <div><label className="block text-gray-700 font-medium mb-3">{activeTab === 'other' ? 'Ingresa el CCI (20 dígitos)' : 'Ingresa la cuenta'}</label><input type={activeTab === 'international' ? 'text' : 'tel'} value={localAccount} onChange={handleAccountChange} placeholder={getPlaceholder()} className="w-full border-b-2 border-gray-200 py-3 text-lg tracking-widest outline-none" /></div>
        </div>
        <button onClick={handleSubmit} className={`w-full py-4 rounded-xl font-medium text-lg transition ${isFormValid() ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`} disabled={!isFormValid()}>Siguiente</button>
      </div>
    </div>
  );
};

// --- DETAILS SCREEN (CON VALIDACIÓN DE SALDO) ---
const DetailsScreen = ({ amount, setAmount, currency, setCurrency, setCurrentScreen, recipientData }) => {
  const BASE_BALANCE_SOLES = 12450.00;
  const EXCHANGE_RATE_VENTA = 3.780;
  const isDollarDisabled = recipientData.type === 'interbank' || recipientData.type === 'other';

  useEffect(() => { if (isDollarDisabled) setCurrency('Soles'); }, [isDollarDisabled, setCurrency]);

  const displayBalance = currency === 'Soles' 
    ? `S/ ${BASE_BALANCE_SOLES.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    : `$ ${(BASE_BALANCE_SOLES / EXCHANGE_RATE_VENTA).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) setAmount(val);
  };

  // VALIDACIÓN DE SALDO INSUFICIENTE
  const handleNext = () => {
    const numericAmount = parseFloat(amount || 0);
    const maxBalance = currency === 'Soles' ? BASE_BALANCE_SOLES : (BASE_BALANCE_SOLES / EXCHANGE_RATE_VENTA);

    if (numericAmount <= 0) return;

    if (numericAmount > maxBalance) {
      alert("⚠️ Saldo insuficiente para realizar esta operación.");
      return; // DETIENE EL AVANCE
    }

    setCurrentScreen('confirmation');
  };

  return (
    <div className="flex-1 bg-white overflow-auto pb-20">
      <div className="px-4 py-6 relative">
        <button onClick={() => setCurrentScreen('transfer')} className="absolute left-4 top-4 p-2 rounded-md bg-white shadow-sm border border-gray-100"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">Monto</h1>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Para:</div><div className="font-bold text-gray-800 text-lg mb-1">{recipientData.name}</div><div className="text-sm text-gray-600 tracking-wide font-mono">{recipientData.account}</div>
          <div className="flex items-center gap-2 mt-3"><div className="bg-white border border-gray-200 text-xs px-2 py-1 rounded text-gray-500 font-medium">{recipientData.type === 'international' ? '🌍 Internacional' : '🏦 Local'}</div></div>
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">Elige la moneda</label>
          <div className="flex gap-3 bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setCurrency('Soles')} className={`flex-1 py-3 rounded-lg font-semibold text-sm ${currency === 'Soles' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}>Soles (S/)</button>
            <button onClick={() => !isDollarDisabled && setCurrency('Dólares')} disabled={isDollarDisabled} className={`flex-1 py-3 rounded-lg font-semibold text-sm ${currency === 'Dólares' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}>Dólares ($) {isDollarDisabled && '🔒'}</button>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">Ingresa el monto</label>
          <div className="relative"><span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">{currency === 'Soles' ? 'S/' : '$'}</span><input type="text" inputMode="decimal" value={amount} onChange={handleAmountChange} placeholder="0.00" className="w-full bg-transparent border-b-2 border-gray-200 py-2 pl-12 text-4xl font-bold text-gray-800 focus:border-green-500 outline-none" /></div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2"><label className="text-gray-500 text-sm">Desde</label><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Cuenta Sueldo</span></div>
          <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-white shadow-sm">
            <div><div className="font-semibold text-gray-800">Ahorro Sueldo Soles</div><div className="text-xs text-gray-400">**** 8930</div></div>
            <div className="text-right"><span className={`font-bold text-lg block ${currency === 'Dólares' ? 'text-blue-600' : 'text-gray-700'}`}>{displayBalance}</span></div>
          </div>
        </div>
        <button onClick={handleNext} disabled={!amount || parseFloat(amount) <= 0} className={`w-full py-4 rounded-xl font-medium text-lg shadow-lg ${amount && parseFloat(amount) > 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>Siguiente</button>
      </div>
    </div>
  );
};

// --- CONFIRMATION SCREEN ---
const ConfirmationScreen = ({ currency, amount, setFraudCase, setShowAlert, setCurrentScreen, recipientData, isPinVerified, onConfirmSuccess }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Si ya validó el PIN, no analizamos de nuevo
    if (isPinVerified) return;

    const performFraudAnalysis = async () => {
      setIsAnalyzing(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/analyze_fraud", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account_id: recipientData.account,
            amount: parseFloat(amount),
            type: recipientData.type
          }),
        });

        const result = await response.json();

        // Si la API devuelve un caso de fraude (no es 'success'), activamos el modal
        if (result.case !== "success") {
          setFraudCase(result.case);
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error conectando al servidor KRAMPUS:", error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    performFraudAnalysis();
  }, [isPinVerified]); // Solo se ejecuta al montar la pantalla de confirmación

  return (
    <div className="flex-1 bg-white overflow-auto pb-20 relative">
      {/* Overlay de Carga/Análisis */}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <RefreshCw className="w-12 h-12 text-green-500 animate-spin mb-4" />
          <p className="text-gray-600 font-bold animate-pulse">Analizando seguridad con IA...</p>
        </div>
      )}

      <div className="px-4 py-6 relative">
        <button onClick={() => setCurrentScreen('details')} className="absolute left-4 top-4 p-2 rounded-md bg-white shadow-sm border border-gray-100">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">Confirmación</h1>
        
        <div className="space-y-6 mb-8 bg-white rounded-xl">
          <div className="border-b border-gray-100 pb-4">
            <div className="text-sm text-gray-500 mb-1">MONTO TOTAL</div>
            <div className="text-3xl font-bold text-gray-800">{currency === 'Soles' ? 'S/' : '$'} {parseFloat(amount || 0).toFixed(2)}</div>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <div className="text-sm text-gray-500 mb-1">DESTINATARIO</div>
            <div className="font-semibold text-gray-800 text-lg">{recipientData.name}</div>
            <div className="text-gray-600 tracking-wide text-sm">{recipientData.account}</div>
          </div>
        </div>
        
        {isPinVerified ? (
           <div className="mb-8 flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-100">
             <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
             <p className="text-xs text-green-800 leading-relaxed">Identidad validada por <strong>KRAMPUS</strong>. Puedes finalizar.</p>
           </div>
        ) : (
          <div className="mb-8 flex items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <p className="text-xs text-blue-800 leading-relaxed">Operación protegida. Analizando en tiempo real.</p>
          </div>
        )}

        <button 
          onClick={onConfirmSuccess} 
          className="w-full bg-green-500 text-white py-4 rounded-xl font-medium text-lg shadow-lg hover:bg-green-600 transition"
        >
          Confirmar Transferencia
        </button>
      </div>
    </div>
  );
}

// --- SUCCESS SCREEN (CON SELLO KRAMPUS ABAJO) ---
const SuccessScreen = ({ recipientData, amount, currency, setCurrentScreen, setAmount, setIsPinVerified }) => {
  const currentDate = new Date().toLocaleString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const operationCode = Math.floor(10000000 + Math.random() * 90000000);

  const handleClose = () => {
    setAmount('');
    setIsPinVerified(false);
    setCurrentScreen('operations');
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto pb-4 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-green-500 px-4 pt-8 pb-20 rounded-b-[2.5rem] shadow-lg text-center relative">
        <div className="flex justify-center mb-4"><div className="bg-white p-3 rounded-full shadow-md"><CheckCircle className="w-10 h-10 text-green-500" /></div></div>
        <h1 className="text-white text-2xl font-bold mb-1">¡Transferencia exitosa!</h1>
        <p className="text-green-100 text-sm">{currentDate}</p>
      </div>
      <div className="mx-4 -mt-12 bg-white rounded-2xl shadow-xl p-6 relative z-10">
        <div className="text-center border-b border-gray-100 pb-6 mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Monto transferido</p>
          <p className="text-3xl font-bold text-gray-800">{currency === 'Soles' ? 'S/' : '$'} {parseFloat(amount).toFixed(2)}</p>
        </div>
        <div className="space-y-5">
          <div><p className="text-gray-400 text-xs mb-1">DESTINATARIO</p><p className="font-semibold text-gray-800 text-lg">{recipientData.name}</p><p className="text-gray-500 text-sm">{recipientData.bank}</p><p className="text-gray-400 text-xs mt-1">{recipientData.account}</p></div>
          <div><p className="text-gray-400 text-xs mb-1">DESDE</p><p className="font-semibold text-gray-800">Ahorro Sueldo Soles</p><p className="text-gray-400 text-xs">**** 8930</p></div>
          <div><p className="text-gray-400 text-xs mb-1">NRO. DE OPERACIÓN</p><p className="font-mono text-gray-800">{operationCode}</p></div>
        </div>
      </div>

      {/* --- AQUÍ ESTÁ EL SELLO DE KRAMPUS AGREGADO --- */}
      <div className="mt-6 mx-4 flex items-center justify-center gap-2 bg-blue-50 py-3 rounded-xl border border-blue-100">
        <Shield className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-medium text-blue-700">Operación protegida por Krampus</span>
      </div>

      <div className="p-4 mt-2 space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"><Share2 className="w-4 h-4" /> Compartir constancia</button>
        <button onClick={handleClose} className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition">Ir al inicio</button>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function BankingApp() {
  const [currentScreen, setCurrentScreen] = useState('operations')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('Soles')
  const [showAlert, setShowAlert] = useState(false)
  const [fraudCase, setFraudCase] = useState(null)
  const [recipientData, setRecipientData] = useState({ name: '', account: '', type: 'interbank', swift: '', bank: '' });
  const [isPinVerified, setIsPinVerified] = useState(false);

  const handlePinVerified = () => {
    setIsPinVerified(true);
    setShowAlert(false);
    setFraudCase(null);
  };

  const handleFinalSuccess = () => {
    setCurrentScreen('success'); 
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 shadow-2xl h-screen flex flex-col relative overflow-hidden rounded-3xl">
      <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center text-xs"><span>9:42</span><div className="flex gap-2 items-center"><span>4G+</span><div className="flex gap-0.5"><div className="w-1 h-3 bg-white"></div><div className="w-1 h-3 bg-white"></div><div className="w-1 h-3 bg-white"></div></div></div></div>

      {currentScreen === 'operations' && <OperationsScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'transfer' && <TransferScreen setCurrentScreen={setCurrentScreen} setRecipientData={setRecipientData} />}
      {currentScreen === 'details' && <DetailsScreen amount={amount} setAmount={setAmount} currency={currency} setCurrency={setCurrency} setCurrentScreen={setCurrentScreen} recipientData={recipientData} />}
      
      {currentScreen === 'confirmation' && (
        <ConfirmationScreen 
          currency={currency} 
          amount={amount} 
          setFraudCase={setFraudCase} 
          setShowAlert={setShowAlert} 
          setCurrentScreen={setCurrentScreen} 
          recipientData={recipientData} 
          isPinVerified={isPinVerified} 
          onConfirmSuccess={handleFinalSuccess} 
        />
      )}

      {currentScreen === 'success' && (
        <SuccessScreen 
          recipientData={recipientData} 
          amount={amount} 
          currency={currency} 
          setCurrentScreen={setCurrentScreen} 
          setAmount={setAmount}
          setIsPinVerified={setIsPinVerified} 
        />
      )}

      {currentScreen !== 'success' && (
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 flex items-center justify-around py-3 px-4 z-20 rounded-t-2xl">
          <button className="flex flex-col items-center gap-1 text-gray-400"><Home className="w-6 h-6" /><span className="text-xs">Inicio</span></button>
          <button className="flex flex-col items-center gap-1 text-green-600"><RefreshCw className="w-6 h-6" /><span className="text-xs font-medium">Operaciones</span></button>
          <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center -mt-8 shadow-lg"><QrCode className="w-8 h-8 text-white" /></button>
          <button className="flex flex-col items-center gap-1 text-gray-400"><Gift className="w-6 h-6" /><span className="text-xs">Beneficios</span></button>
          <button className="flex flex-col items-center gap-1 text-gray-400"><Wallet className="w-6 h-6" /><span className="text-xs">Para ti</span></button>
        </div>
      )}

      <SecurityModal isOpen={showAlert} fraudCaseKey={fraudCase} onClose={() => { setShowAlert(false); setFraudCase(null); }} onSuccess={handlePinVerified} />
    </div>
  )
}