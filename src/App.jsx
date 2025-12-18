import React, { useState } from 'react'
import { ArrowRight, Menu, Home, RefreshCw, Gift, CreditCard, Phone, Lightbulb, Banknote, DollarSign, Wallet, QrCode, AlertTriangle, X, Shield, ShieldAlert, MapPin, ChevronLeft } from 'lucide-react'

export default function BankingApp() {
  const [currentScreen, setCurrentScreen] = useState('operations')
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('Soles')
  const [showAlert, setShowAlert] = useState(false)
  const [fraudCase, setFraudCase] = useState(null)

  const fraudCases = {
    case1: {
      icon: <ShieldAlert className="w-16 h-16 text-red-500" />,
      title: '¡Acceso no reconocido!',
      message:
        'Esta transacción se originó desde un dispositivo inusual (Android en Arequipa). Tu dispositivo frecuente es iPhone en Lima.',
      button: 'Bloquear cuenta',
      color: 'red'
    },
    case2: {
      icon: <Banknote className="w-16 h-16 text-red-500" />,
      title: '¡Operación inusual!',
      message:
        '¡Operación inusual! Hemos detectado un movimiento que compromete la totalidad de tu saldo. Por seguridad, esta transferencia ha sido pausada.',
      button: 'Contactar soporte',
      color: 'red'
    },
    case3: {
      icon: <AlertTriangle className="w-16 h-16 text-orange-500" />,
      title: '¡Alerta de riesgo!',
      message:
        '¡Alerta de riesgo! Detectamos una transferencia hacia un destinatario de reputación inusual. Si alguien te solicitó este dinero, podría ser una estafa.',
      button: 'Contactar asesor',
      color: 'orange'
    },
    case4: {
      icon: <MapPin className="w-16 h-16 text-red-500" />,
      title: 'Ubicación inconsistente',
      message:
        'Hace 15 minutos realizaste una compra física en Lima, y ahora intentas comprar en Piura. Es físicamente imposible viajar tan rápido.',
      button: 'Reportar clonación',
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
    { name: 'caleb', type: 'Transf. interbancaria', initial: 'C' },
    { name: 'Dan', type: 'Transf. interbancaria', initial: 'D' }
  ]

  const OperationsScreen = () => (
    <div className="flex-1 bg-gray-900 overflow-auto pb-20">
      <div className="bg-gradient-to-b from-green-400 to-green-500 px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Menu className="w-6 h-6 text-white" />
          <h1 className="text-white text-2xl font-semibold">Operaciones</h1>
          <div className="w-6" />
        </div>

        <div className="bg-white rounded-3xl p-6">
          <div className="grid grid-cols-3 gap-6">
            {operations.map((op, idx) => (
              <button
                key={idx}
                onClick={() => idx === 2 && setCurrentScreen('transfer')}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  {op.icon}
                </div>
                <span className="text-sm text-gray-700 text-center leading-tight">{op.label}</span>
              </button>
            ))}
          </div>

          <button className="w-full mt-6 bg-green-500 text-white py-3 rounded-xl font-medium">Afíliate a Pago automático</button>
        </div>
      </div>

      <div className="px-4 mt-8">
        <h2 className="text-blue-600 text-xl font-semibold mb-4">Pagos favoritos</h2>
        <div className="space-y-3">
          {favorites.map((fav, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">{fav.initial}</div>
                <div>
                  <div className="font-semibold text-gray-800">{fav.name}</div>
                  <div className="text-sm text-gray-500">{fav.type}</div>
                </div>
              </div>
              <button className="text-green-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

        {/* bottom nav moved to root */}
    </div>
  )

  const TransferScreen = () => (
    <div className="flex-1 bg-white overflow-auto pb-20">
      <div className="px-4 py-6 relative">
        <button onClick={() => setCurrentScreen('operations')} className="absolute left-4 top-4 p-2 rounded-md bg-white shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">Transferencias</h1>

        <div className="flex gap-2 mb-8">
          <button className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium">Interbank</button>
          <button className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-lg font-medium">Otro banco</button>
          <button className="flex-1 bg-gray-100 text-gray-400 py-3 rounded-lg font-medium">Al exterior</button>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">Ingresa el número de cuenta de destino</label>
          <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="000 0000000000" className="w-full border-b-2 border-gray-200 py-3 text-lg text-gray-400 focus:border-green-500 outline-none" maxLength={17} />
        </div>

        <button onClick={() => { if (accountNumber) setCurrentScreen('details') }} className={`w-full py-4 rounded-xl font-medium text-lg ${accountNumber ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>Siguiente</button>
      </div>
    </div>
  )

  const DetailsScreen = () => (
    <div className="flex-1 bg-white overflow-auto pb-20">
      <div className="px-4 py-6 relative">
        <button onClick={() => setCurrentScreen('transfer')} className="absolute left-4 top-4 p-2 rounded-md bg-white shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">Transferencias</h1>

        <div className="bg-gray-100 rounded-2xl p-4 mb-6">
          <div className="font-semibold text-gray-800 mb-1">A Dan</div>
          <div className="text-sm text-gray-600">002 191 172533330088 58</div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">Elige la moneda</label>
          <div className="flex gap-2">
            <button onClick={() => setCurrency('Soles')} className={`flex-1 py-3 rounded-lg font-medium ${currency === 'Soles' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>Soles</button>
            <button onClick={() => setCurrency('Dólares')} className={`flex-1 py-3 rounded-lg font-medium ${currency === 'Dólares' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>Dólares</button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">Ingresa el monto a transferir</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => { if (currency === 'Soles') setAmount(e.target.value) }}
            placeholder={currency === 'Soles' ? '' : 'Cuenta en S/. - no editable'}
            className={`w-full border-b-2 py-3 text-xl font-medium text-gray-800 focus:border-green-600 outline-none ${currency === 'Soles' ? 'border-green-500' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
            disabled={currency === 'Dólares'}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-500 text-sm mb-2">Transfiere desde</label>
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-800">Ahorro sueldo soles</div>
            <div className="text-sm text-gray-500">Saldo: S/</div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">Tipo de cambio ref. compra: <span className="font-semibold">3.345</span> Venta: <span className="font-semibold">3.39</span></div>

        {currency === 'Dólares' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">La moneda seleccionada debe ser la misma que la cuenta de destino</p>
          </div>
        )}

        <button onClick={() => setCurrentScreen('confirmation')} className="w-full bg-green-500 text-white py-4 rounded-xl font-medium text-lg">Siguiente</button>
      </div>
    </div>
  )

  const ConfirmationScreen = () => (
    <div className="flex-1 bg-white overflow-auto pb-20 relative">
      <div className="px-4 py-6 relative">
        <button onClick={() => setCurrentScreen('details')} className="absolute left-4 top-4 p-2 rounded-md bg-white shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">Confirmación</h1>

        <div className="text-center mb-8">
          <h2 className="text-xl text-gray-800 mb-2">Estás a un paso de<br /><span className="font-semibold">realizar tu transferencia</span></h2>
          <p className="text-gray-600">Tu transferencia inmediata se realizará en<br /><span className="font-semibold">10 minutos</span> como máximo.</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-500 mb-1">MONEDA Y MONTO</div>
            <div className="text-lg font-semibold text-gray-800">{currency === 'Soles' ? `S/ ${amount || '5.00'}` : `${amount || '0.00'} USD`}</div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-500 mb-1">COMISIÓN</div>
            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">GRATIS</div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-500 mb-1">MONTO TOTAL</div>
            <div className="text-lg font-semibold text-gray-800">{currency === 'Soles' ? `S/ ${amount || '5.00'}` : `${amount || '0.00'} USD`}</div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-500 mb-1">CUENTA CARGO</div>
            <div className="font-semibold text-gray-800">Ahorro Sueldo Soles</div>
            <div className="text-gray-600">200 3403528930</div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <div className="text-sm text-gray-500 mb-1">CUENTA DESTINO</div>
            <div className="font-semibold text-gray-800">Banco de Crédito del Perú</div>
            <div className="text-gray-600">Caleb Dan Romero Vilca</div>
            <div className="text-gray-600">002 191 172533330088 58</div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">TIPO DE OPERACIÓN</div>
            <div className="font-semibold text-gray-800">Transferencia inmediata</div>
          </div>
        </div>

        <div className="mb-6 bg-gray-50 rounded-xl p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">🛡️ Simular Detección KRAMPUS:</div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setFraudCase('case1'); setShowAlert(true); }} className="bg-red-100 text-red-700 text-xs py-2 px-3 rounded-lg font-medium hover:bg-red-200 transition">Dispositivo desconocido</button>
              <button onClick={() => { setCurrency('Soles'); setAmount('5000'); setFraudCase('case2'); setShowAlert(true); }} className="bg-red-100 text-red-700 text-xs py-2 px-3 rounded-lg font-medium hover:bg-red-200 transition">Vaciado de cuenta</button>
            <button onClick={() => { setFraudCase('case3'); setShowAlert(true); }} className="bg-orange-100 text-orange-700 text-xs py-2 px-3 rounded-lg font-medium hover:bg-orange-200 transition">Destinatario alto riesgo</button>
            <button onClick={() => { setFraudCase('case4'); setShowAlert(true); }} className="bg-red-100 text-red-700 text-xs py-2 px-3 rounded-lg font-medium hover:bg-red-200 transition">Velocidad imposible</button>
          </div>
        </div>

        <button onClick={() => { setFraudCase('case1'); setShowAlert(true); }} className="w-full bg-green-500 text-white py-4 rounded-xl font-medium text-lg">Confirmar</button>
      </div>

      {showAlert && fraudCase && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-end mb-2">
              <button onClick={() => { setShowAlert(false); setFraudCase(null); }} className="text-gray-400 hover:text-gray-600 transition"><X className="w-6 h-6" /></button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className={`w-24 h-24 ${fraudCases[fraudCase].color === 'red' ? 'bg-red-100' : 'bg-orange-100'} rounded-full flex items-center justify-center mb-4 shadow-lg`}>{fraudCases[fraudCase].icon}</div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">{fraudCases[fraudCase].title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-sm">{fraudCases[fraudCase].message}</p>

              <button onClick={() => { setShowAlert(false); setFraudCase(null); }} className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg">{fraudCases[fraudCase].button}</button>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-400"><Shield className="w-4 h-4" /><span>Protegido por KRAMPUS</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-gray-100 shadow-2xl h-screen flex flex-col relative overflow-hidden rounded-3xl">
      <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center text-xs">
        <span>9:42</span>
        <div className="flex gap-2 items-center">
          <span>4G+</span>
          <span>LTE</span>
          <div className="flex gap-0.5">
            <div className="w-1 h-3 bg-white"></div>
            <div className="w-1 h-3 bg-white"></div>
            <div className="w-1 h-3 bg-white"></div>
            <div className="w-1 h-3 bg-white opacity-50"></div>
          </div>
        </div>
      </div>

      {currentScreen === 'operations' && <OperationsScreen />}
      {currentScreen === 'transfer' && <TransferScreen />}
      {currentScreen === 'details' && <DetailsScreen />}
      {currentScreen === 'confirmation' && <ConfirmationScreen />}

      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 flex items-center justify-around py-3 px-4 z-20 rounded-t-2xl">
        <button className="flex flex-col items-center gap-1">
          <Home className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-500">Inicio</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <RefreshCw className="w-6 h-6 text-green-500" />
          <span className="text-xs text-green-600 font-medium">Operaciones</span>
        </button>
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center -mt-8">
          <QrCode className="w-8 h-8 text-white" />
        </button>
        <button className="flex flex-col items-center gap-1">
          <Gift className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-500">Beneficios</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Wallet className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-500">Para ti</span>
        </button>
      </div>
    </div>
  )
}