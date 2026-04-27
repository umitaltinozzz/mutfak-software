'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Building2, 
  Link, 
  QrCode, 
  Upload, 
  Star, 
  MapPin, 
  X,
  Sparkles,
  Download,
  Globe,
  Smartphone
} from 'lucide-react'

interface OnboardingProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

interface BusinessData {
  name: string
  logo: string | null
  address: string
  phone: string
  platform: 'google' | 'yemeksepeti' | 'tripadvisor' | ''
  platformUrl: string
  qrGenerated: boolean
}

const OnboardingWizard: React.FC<OnboardingProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '',
    logo: null,
    address: '',
    phone: '',
    platform: '',
    platformUrl: '',
    qrGenerated: false
  })

  const steps = [
    {
      id: 1,
      title: 'Profilinizi Onaylayın',
      description: 'İşletme bilgilerinizi teyit edin',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'İlk Yorum Kanalınızı Ekleyin',
      description: 'En çok kullandığınız platformu seçin',
      icon: Link,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'QR Kodunuzu Oluşturun',
      description: 'İlk QR kodunuzu üretin ve indirin',
      icon: QrCode,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const platforms = [
    {
      id: 'google',
      name: 'Google Maps',
      icon: '🗺️',
      color: 'from-blue-500 to-blue-600',
      description: 'En popüler platform',
      placeholder: 'https://goo.gl/maps/...'
    },
    {
      id: 'yemeksepeti',
      name: 'Yemeksepeti',
      icon: '🍕',
      color: 'from-orange-500 to-orange-600',
      description: 'Yemek siparişi',
      placeholder: 'https://yemeksepeti.com/...'
    },
    {
      id: 'tripadvisor',
      name: 'Tripadvisor',
      icon: '✈️',
      color: 'from-green-500 to-green-600',
      description: 'Turizm ve restoran',
      placeholder: 'https://tripadvisor.com/...'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Son adım - onboarding tamamlandı
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBusinessData(prev => ({
          ...prev,
          logo: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const generateQR = () => {
    // QR kod oluşturma simulasyonu
    setTimeout(() => {
      setBusinessData(prev => ({
        ...prev,
        qrGenerated: true
      }))
    }, 1500)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return businessData.name.trim() !== '' && businessData.address.trim() !== ''
      case 1:
        return businessData.platform !== '' && businessData.platformUrl.trim() !== ''
      case 2:
        return businessData.qrGenerated
      default:
        return false
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Mutfak Yazılım'a Hoş Geldiniz! 🚀</h2>
                <p className="text-white/80">Sadece 3 adımda panelinizi uçuşa hazırlayalım</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    index <= currentStep 
                      ? 'bg-white text-blue-600 shadow-lg' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1 mx-2 rounded-full transition-all ${
                      index < currentStep ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Step Title */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${steps[currentStep].color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    {React.createElement(steps[currentStep].icon, { 
                      className: "w-8 h-8 text-white" 
                    })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {steps[currentStep].description}
                  </p>
                </div>

                {/* Step Content */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Logo Upload */}
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          İşletme Logosu
                        </label>
                        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="logo-upload"
                          />
                          <label htmlFor="logo-upload" className="cursor-pointer text-center">
                            {businessData.logo ? (
                              <img 
                                src={businessData.logo} 
                                alt="Logo" 
                                className="w-20 h-20 object-cover rounded-lg mx-auto"
                              />
                            ) : (
                              <div>
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Logo yükleyin</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Business Info */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            İşletme Adı *
                          </label>
                          <input
                            type="text"
                            value={businessData.name}
                            onChange={(e) => setBusinessData(prev => ({ ...prev, name: e.target.value }))}
                            className="form-input w-full"
                            placeholder="Örn: Lezzet Durağı"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Telefon
                          </label>
                          <input
                            type="tel"
                            value={businessData.phone}
                            onChange={(e) => setBusinessData(prev => ({ ...prev, phone: e.target.value }))}
                            className="form-input w-full"
                            placeholder="0532 123 45 67"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Adres *
                      </label>
                      <textarea
                        value={businessData.address}
                        onChange={(e) => setBusinessData(prev => ({ ...prev, address: e.target.value }))}
                        className="form-input w-full h-24 resize-none"
                        placeholder="Tam adresinizi girin..."
                      />
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {platforms.map((platform) => (
                        <motion.div
                          key={platform.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setBusinessData(prev => ({ ...prev, platform: platform.id as any }))}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            businessData.platform === platform.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                          }`}
                        >
                          <div className="text-center space-y-3">
                            <div className="text-4xl">{platform.icon}</div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {platform.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {platform.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {businessData.platform && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Platform Linki
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="url"
                            value={businessData.platformUrl}
                            onChange={(e) => setBusinessData(prev => ({ ...prev, platformUrl: e.target.value }))}
                            className="form-input w-full pl-12"
                            placeholder={platforms.find(p => p.id === businessData.platform)?.placeholder}
                          />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Bu linkten yorumlarınızı otomatik olarak çekeceğiz
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <div className="w-40 h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl mx-auto flex items-center justify-center">
                        {businessData.qrGenerated ? (
                          <div className="text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
                            <p className="text-sm text-green-600 dark:text-green-400">QR Kod Hazır!</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">QR Kod Oluşturuluyor...</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          "Masa 1" için QR Kod
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Müşterileriniz bu QR kodu okutarak geri bildirim verebilecek
                        </p>
                      </div>

                      {!businessData.qrGenerated ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={generateQR}
                          className="btn-premium btn-primary"
                        >
                          <QrCode className="w-5 h-5 mr-2" />
                          QR Kod Oluştur
                        </motion.button>
                      ) : (
                        <div className="flex gap-4 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-premium btn-success"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            PDF İndir
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-premium btn-secondary"
                          >
                            <Smartphone className="w-5 h-5 mr-2" />
                            Telefonuma Gönder
                          </motion.button>
                        </div>
                      )}
                    </div>

                    {businessData.qrGenerated && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="business-alert success"
                      >
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Tebrikler!</span>
                        </div>
                        <p className="mt-1 text-sm">
                          İlk QR kodunuz hazır. Artık müşterilerinizden geri bildirim almaya başlayabilirsiniz.
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-800 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Adım {currentStep + 1} / {steps.length}</span>
              <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="btn-premium btn-ghost"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Geri
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={!canProceed()}
                className={`btn-premium ${
                  canProceed() 
                    ? currentStep === steps.length - 1 ? 'btn-success' : 'btn-primary'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Tamamla
                  </>
                ) : (
                  <>
                    İleri
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnboardingWizard 