'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'tr' | 'en'

type LanguageProviderContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageProviderContext = createContext<LanguageProviderContextType | undefined>(undefined)

// Çeviri dosyaları
const translations = {
  tr: {
    // Header
    'nav.home': 'Ana Sayfa',
    'nav.products': 'Ürünler',
    'nav.solutions': 'Çözümler',
    'nav.pricing': 'Fiyatlandırma',
    'nav.resources': 'Kaynaklar',
    'nav.company': 'Şirket',
    'nav.contact': 'İletişim',
    'nav.demo': 'Demo Al',
    'nav.login': 'Giriş Yap',
    
    // Theme Toggle
    'theme.light': 'Açık Tema',
    'theme.dark': 'Koyu Tema',
    'theme.system': 'Sistem Teması',
    
    // Language
    'language.turkish': 'Türkçe',
    'language.english': 'English',
    
    // Hero Section
    'hero.badge': 'Türkiye\'nin En Gelişmiş SaaS Platformu',
    'hero.title.line1': 'İşletmenizin',
    'hero.title.line2': 'Dijital Gücü',
    'hero.subtitle': 'destekli itibar yönetimi,',
    'hero.subtitle.highlight1': 'Yapay zeka',
    'hero.subtitle.highlight2': 'akıllı analitik',
    'hero.subtitle.highlight3': 'otomatik çözümlerle',
    'hero.subtitle.end': 'işletmenizi geleceğe taşıyın.',
    'hero.cta.primary': 'Ücretsiz Demo Al',
    'hero.cta.secondary': 'Demo Videoyu İzle',
    'hero.trust': 'Güvenilen Platform',
    'hero.trust.subtitle': 'Rakamlarla Başarı',
    'hero.stats.businesses': 'Aktif İşletme',
    'hero.stats.transactions': 'İşlem/Ay',
    'hero.stats.uptime': 'Uptime',
    'hero.stats.response': 'Ortalama Yanıt',
    'hero.scroll': 'Keşfet',

    // Reputation Management Page
    'reputation.hero.title': 'Olumsuz Yorumları',
    'reputation.hero.titleHighlight': 'Fırsata Çevirin',
    'reputation.hero.subtitle': 'Müşterileriniz işletmenizden ayrılmadan önce neden mutsuz olduklarını öğrenin. Kötü yorumlar herkese açık platformlara yazılmadan önce müdahale edin, itibarınızı koruyun ve organik puanlarınızı yükseltin.',
    'reputation.hero.trial': 'Ücretsiz Denemeye Başla',
    'reputation.hero.video': 'Nasıl Çalışır? (Video)',
    'reputation.hero.stat1': '10\'dan fazla şube',
    'reputation.hero.stat2': 'Yüzlerce mutlu işletme',
    'reputation.hero.stat3': 'Güvenle kullanılıyor',
    
    // LossAversion Section
    'lossAversion.title': 'Görmezden Geldiğiniz Her Kötü Yorum Size Neye Mal Oluyor?',
    'lossAversion.subtitle': 'Fark etmediğiniz sorunlar, işletmenizin geleceğini tehdit ediyor.',
    'lossAversion.customers.title': 'Sessizce Giden Müşteriler',
    'lossAversion.customers.description': 'Mutsuz müşterilerin %91\'i bir daha asla geri dönmez. Sorunu bilmediğiniz için onları sonsuza dek kaybedersiniz.',
    'lossAversion.reputation.title': 'Online İtibar Krizleri',
    'lossAversion.reputation.description': 'Google Maps veya Yemeksepeti\'ne yazılan tek bir kötü yorum, potansiyel müşterilerinizin %86\'sını kararından vazgeçirebilir.',
    'lossAversion.blindness.title': 'Operasyonel Körlük',
    'lossAversion.blindness.description': 'Hangi personelin, hangi ürünün veya hangi masanın sürekli sorun yarattığını bilmeden aynı hataları tekrar etmeye devam edersiniz.',
    'lossAversion.cost.title': '⚠️ Gerçek Maliyet Hesaplaması',
    'lossAversion.cost.description': 'Kaybettiğiniz her müşteri, ortalama 2.500 TL yaşam boyu değer kaybı demektir. Ayda sadece 10 müşteri kaybetseniz, yıllık 300.000 TL gelir kaybı yaşarsınız.',
    'lossAversion.cost.highlight1': '2.500 TL',
    'lossAversion.cost.highlight2': '300.000 TL',
    
    // ReputationBenefits Section
    'benefits.title': 'Mutfak Yazılım ile Kontrolü Elinize Alın',
    'benefits.subtitle': 'İtibar yönetimi sistemi ile işletmenizin tüm gücünü ortaya çıkarın.',
    'benefits.crisis.title': 'Krizi Anında Yakalayın',
    'benefits.crisis.description': 'Olumsuz geri bildirimler online platformlara düşmeden önce size özel panelinize gelir. Anında müdahale edip müşteriyi geri kazanın.',
    'benefits.positive.title': 'Pozitif Yorumları Uçurun',
    'benefits.positive.description': 'Memnun müşterileri tek tıkla Google, Tripadvisor gibi platformlara yönlendirerek organik yıldız puanınızı ve yorum sayınızı artırın.',
    'benefits.data.title': 'Veriye Dayalı Kararlar Alın',
    'benefits.data.description': 'Yapay zeka destekli analizlerle şikayetlerin kök nedenini (personel, ürün, süre) öğrenin ve işletmenizi verilerle yönetin.',
    'benefits.loyalty.title': 'Müşteri Bağlılığı Yaratın',
    'benefits.loyalty.description': 'Sorun yaşayan müşterilere otomatik veya manuel olarak SMS, WhatsApp ve e-posta ile ulaşıp indirim kodları sunarak en sadık müşterilerinize dönüştürün.',
    
    // ReputationProcess Section
    'process.title': 'Sadece 5 Dakikada Başlamaya Hazır',
    'process.subtitle': 'Kurulum çok kolay, hiçbir teknik bilgiye ihtiyacınız yok.',
    'process.step1.title': 'Hesabınızı Oluşturun',
    'process.step1.description': 'İşletme bilgilerinizi girin ve yorum toplamak istediğiniz platformları (Google, Yemeksepeti vb.) panelinize ekleyin.',
    'process.step1.time': '2 Dakika',
    'process.step2.title': 'QR Kodlarınızı Üretin',
    'process.step2.description': 'Her masanız, kuryeniz veya şubeniz için saniyeler içinde size özel QR kodlar oluşturun ve çıktısını alın.',
    'process.step2.time': '2 Dakika',
    'process.step3.title': 'Geri Bildirimleri Toplayın',
    'process.step3.description': 'QR kodları okutulmaya başlandığı an, tüm geri bildirimler anlık olarak panelinize, e-postanıza ve mobil bildiriminize düşsün.',
    'process.step3.time': '1 Dakika',
    'process.cta.title': '🚀 Hemen Başlayın',
    'process.cta.description': 'Kurulum bu kadar kolay! İlk QR kodunuzu 5 dakika içinde oluşturun ve müşterilerinizden geri bildirim almaya başlayın.',
    'process.cta.button': 'Ücretsiz Hesap Oluştur',
    
    // ReputationFeatures Section
    'features.title': 'İşletmenizi Büyütecek Güçlü Özellikler',
    'features.subtitle': 'Modern teknoloji ile desteklenen kapsamlı özellik seti.',
    'features.ai.title': 'AI Destekli Raporlama',
    'features.ai.description': 'GPT-4 ile şikayetlerin kök nedenini, duygu analizini ve trendleri otomatik olarak raporlar.',
    'features.communication.title': 'Çok Kanallı İletişim',
    'features.communication.description': 'Müşterilerinize SMS, WhatsApp veya markanıza özel e-posta şablonları ile anında yanıt verin.',
    'features.platforms.title': 'Platform Entegrasyonları',
    'features.platforms.description': 'Google Maps, Yemeksepeti, Getir, Tripadvisor ve daha fazlasındaki yorumları tek ekrandan takip edin.',
    'features.analytics.title': 'Detaylı Performans Analizi',
    'features.analytics.description': 'Personel, şube, masa ve ürün bazında memnuniyet skorlarını takip ederek zayıf noktaları tespit edin.',
    'features.customization.title': 'Özelleştirilebilir Arayüzler',
    'features.customization.description': 'Müşterinin göreceği yorum ekranını ve formları kendi logonuz ve renklerinizle tasarlayın.',
    'features.subdomain.title': 'Subdomain Desteği',
    'features.subdomain.description': 'isletme-adi.mutfakyazilim.com şeklinde size özel bir domain ile profesyonel bir görünüm kazanın.',
    
    // ReputationPricing Section
    'pricing.title': 'İşletmenizin İhtiyaçlarına Uygun Planı Seçin',
    'pricing.subtitle': 'Şeffaf fiyatlandırma, gizli maliyet yok. İstediğiniz zaman iptal edebilirsiniz.',
    'pricing.starter.name': 'Başlangıç',
    'pricing.starter.description': 'Tek şubeli işletmeler için ideal',
    'pricing.starter.cta': 'Başlangıç Planını Seç',
    'pricing.professional.name': 'Profesyonel',
    'pricing.professional.description': 'Büyüyen işletmeler ve zincirler için',
    'pricing.professional.cta': 'Profesyonel Planı Seç',
    'pricing.enterprise.name': 'Kurumsal',
    'pricing.enterprise.description': 'Büyük ölçekli operasyonlar için',
    'pricing.enterprise.price': 'Teklif Alın',
    'pricing.enterprise.cta': 'Bize Ulaşın',
    'pricing.popular': 'En Popüler',
    'pricing.trial': 'Tüm planlar 14 gün ücretsiz deneme süresine sahiptir. Kredi kartı gerektirmez.',
    'pricing.guarantee': '30 Gün Para İade Garantisi',
    'pricing.ssl': 'SSL Şifreleme',
    'pricing.support': '7/24 Türkçe Destek',
    
    // Pricing Plan Features
    'pricing.starter.feature1': '1 Şube',
    'pricing.starter.feature2': '5 QR Kodu',
    'pricing.starter.feature3': '2 Platform Entegrasyonu',
    'pricing.starter.feature4': 'Temel Raporlama',
    'pricing.starter.feature5': 'E-posta Desteği',
    'pricing.professional.feature1': '5 Şube',
    'pricing.professional.feature2': 'Sınırsız QR Kodu',
    'pricing.professional.feature3': '10 Platform Entegrasyonu',
    'pricing.professional.feature4': 'AI Destekli Analiz',
    'pricing.professional.feature5': 'SMS/WhatsApp Entegrasyonu',
    'pricing.professional.feature6': 'Öncelikli Destek',
    'pricing.enterprise.feature1': 'Sınırsız Şube',
    'pricing.enterprise.feature2': 'Sınırsız Entegrasyon',
    'pricing.enterprise.feature3': 'API Erişimi',
    'pricing.enterprise.feature4': 'Özel Müşteri Temsilcisi',
    'pricing.enterprise.feature5': 'Gelişmiş Güvenlik',
    'pricing.enterprise.feature6': '7/24 Telefon Desteği',
    
    // ReputationTestimonials Section
    'reputation.testimonials.title': 'Kullanıcılarımız Ne Diyor?',
    'reputation.testimonials.subtitle': 'Gerçek müşterilerimizin deneyimlerini keşfedin.',
    'reputation.testimonials.testimonial1.name': 'Ahmet Yılmaz',
    'reputation.testimonials.testimonial1.role': 'Sahibi',
    'reputation.testimonials.testimonial1.company': 'Lezzet Durağı Restoran',
    'reputation.testimonials.testimonial1.content': 'Mutfak Yazılım sayesinde Google puanımız 3.8\'den 4.7\'ye çıktı. Kötü yorumları daha kimse görmeden çözüme kavuşturuyoruz. İnanılmaz bir sistem.',
    'reputation.testimonials.testimonial2.name': 'Elif Kaya',
    'reputation.testimonials.testimonial2.role': 'İşletme Müdürü',
    'reputation.testimonials.testimonial2.company': 'Sahil Otel',
    'reputation.testimonials.testimonial2.content': 'Artık hangi garsonun daha çok şikayet aldığını net olarak görebiliyorum. Operasyonel verimliliğimiz %40 arttı. Kesinlikle tavsiye ederim.',
    'reputation.testimonials.testimonial3.name': 'Mehmet Özkan',
    'reputation.testimonials.testimonial3.role': 'Franchise Sahibi',
    'reputation.testimonials.testimonial3.company': 'Burger Palace Zinciri',
    'reputation.testimonials.testimonial3.content': '5 şubemizde kullanıyoruz. Müşteri memnuniyeti ortalama %35 arttı. Artık sorunları reaktif değil proaktif yönetiyoruz.',
    
    // ReputationFAQ Section
    'reputation.faq.title': 'Aklınızdaki Sorular',
    'reputation.faq.subtitle': 'Sık sorulan sorular ve cevapları. Başka sorularınız varsa bizimle iletişime geçin.',
    'reputation.faq.question1': 'Kurulum için teknik bilgiye ihtiyacım var mı?',
    'reputation.faq.answer1': 'Hayır. Panelimiz o kadar kolay ki, 5 dakika içinde her şeyi kendiniz kurup kullanmaya başlayabilirsiniz. Hiçbir kod yazmanıza veya teknik bilgiye ihtiyacınız yok.',
    'reputation.faq.question2': 'Verilerimin güvenliği nasıl sağlanıyor?',
    'reputation.faq.answer2': 'Tüm verileriniz 256-bit SSL şifreleme ile korunur. Verileriniz Türkiye\'deki sunucularımızda saklanır ve KVKK uyumlu güvenlik protokollerimizle korunur. Hiçbir şekilde üçüncü partilerle paylaşılmaz.',
    'reputation.faq.question3': 'Taahhüt gerekiyor mu? İstediğim zaman iptal edebilir miyim?',
    'reputation.faq.answer3': 'Aylık planlarımızda hiçbir taahhüt yoktur. Dilediğiniz zaman panelimizden tek tıkla iptal edebilirsiniz. İptal ettikten sonra hiçbir ücret tahsil edilmez.',
    'reputation.faq.question4': 'Hangi yorum platformlarını destekliyorsunuz?',
    'reputation.faq.answer4': 'Google Maps, Yemeksepeti, Getir, Trendyol, Tripadvisor, Booking.com, Foursquare, App Store, Google Play Store ve 50+ platform desteği sunuyoruz. Yeni platformlar sürekli eklenmektedir.',
    'reputation.faq.question5': 'Müşterilerim QR kod taramayı anlar mı?',
    'reputation.faq.answer5': 'QR kod kullanımı artık çok yaygın. Telefon kamerası ile QR kodu göstermek yeterli. Ayrıca QR kodlarınızın yanına "Deneyiminizi paylaşın" gibi açıklayıcı metinler ekleyebilirsiniz.',
    'reputation.faq.question6': 'Destek hizmeti nasıl çalışıyor?',
    'reputation.faq.answer6': '7/24 Türkçe destek hizmetimiz var. WhatsApp, telefon, email veya canlı chat ile bize ulaşabilirsiniz. Ortalama yanıt süremiz 2 dakikadır.',
    'reputation.faq.contact.title': 'Başka sorularınız mı var?',
    'reputation.faq.contact.button': 'Destek Ekibimizle İletişime Geçin',
    
    // ReputationFinalCTA Section
    'reputation.finalCta.title': 'İtibarınızı Şansa Bırakmayın.',
    'reputation.finalCta.titleHighlight': 'Rakiplerinizden Bir Adım Öne Geçin.',
    'reputation.finalCta.subtitle': 'Hemen bugün başlayın ve müşteri memnuniyetini işletmenizin en güçlü pazarlama aracına dönüştürün.',
    'reputation.finalCta.trial': '14 Gün Ücretsiz Dene',
    'reputation.finalCta.home': 'Ana Sayfaya Dön',
    'reputation.finalCta.feature1.title': '14 Gün Ücretsiz',
    'reputation.finalCta.feature1.description': 'Hiçbir risk almadan tüm özelliklerimizi test edin',
    'reputation.finalCta.feature2.title': 'Kredi Kartı Gerektirmez',
    'reputation.finalCta.feature2.description': 'Sadece e-posta adresinizle hemen başlayın',
    'reputation.finalCta.feature3.title': '7/24 Türkçe Destek',
    'reputation.finalCta.feature3.description': 'Uzman ekibimiz her zaman yanınızda',
    'reputation.finalCta.guarantee': '30 Gün Para İade Garantisi',
    'reputation.finalCta.ssl': 'SSL Güvenlik Sertifikası',
    'reputation.finalCta.uptime': '%99.9 Uptime Garantisi',
    'reputation.finalCta.trusted': '500+ İşletmenin Güvendiği Platform',

    // Footer
    'footer.product': 'Ürün',
    'footer.solutions': 'Çözümler',
    'footer.company': 'Şirket',
    'footer.support': 'Destek',
    'footer.resources': 'Kaynaklar',
    'footer.legal': 'Yasal',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.desc': 'Yenilikler ve özel fırsatlardan ilk siz haberdar olun',
    'footer.newsletter.placeholder': 'E-posta adresiniz',
    'footer.newsletter.subscribe': 'Abone Ol',
    'footer.newsletter.success': 'Başarıyla abone oldunuz!',
    'footer.brand.description': 'Türkiye\'nin en gelişmiş SaaS platformu ile işletmenizin dijital dönüşümünü tamamlayın. AI destekli çözümlerimizle rekabette öne geçin.',
    'footer.contact.title': 'İletişim',
    'footer.contact.phone': '+90 212 123 45 67',
    'footer.contact.email': 'info@mutfakyazilim.com',
    'footer.contact.address': 'Maslak Mahallesi, Sarıyer/İstanbul',
    'footer.follow': 'Bizi Takip Edin',
    'footer.rights': '© 2024 Mutfak Yazılım. Tüm hakları saklıdır.',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    'footer.cookies': 'Çerez Politikası',
    'footer.stats.businesses': 'Aktif İşletme',
    'footer.stats.transactions': 'Aylık İşlem',
    'footer.stats.uptime': 'Uptime',
    'footer.stats.satisfaction': 'Müşteri Memnuniyeti',
    'footer.trust.iso': 'ISO 27001 Güvenlik Sertifikası',
    'footer.trust.soc': 'SOC 2 Type II Güvenlik Denetimi',
    'footer.trust.gdpr': 'GDPR Uyumlu Veri Koruma',
    'footer.trust.uptime': '99.9% Hizmet Garantisi',
    'footer.trust.ssl': 'SSL Şifreli Güvenli Bağlantı',
    'footer.trust.transparent': 'Şeffaf Gerçek Zamanlı Raporlama',
    
    // Vision Section
    'vision.title': 'Teknolojiyi Değil, İşletmenizi Büyütmeye Odaklandık',
    'vision.subtitle': 'Mutfak Yazılım olarak, işletmelerin gerçek ihtiyaçlarını anlıyor ve bu ihtiyaçları karşılayacak çözümler geliştiriyoruz.',
    'vision.operational.title': 'Operasyonel Verimlilik',
    'vision.operational.description': 'Manuel süreçleri otomatize ederek, veri kayıplarını önleyerek ve personelinizin asıl işine odaklanmasını sağlayarak zaman ve maliyet tasarrufu yaratıyoruz.',
    'vision.experience.title': 'Eşsiz Müşteri Deneyimi',
    'vision.experience.description': 'Müşterilerinizin sesini duymanızı, ihtiyaçlarını anlamanızı ve onlara unutulmaz deneyimler sunarak sadık bir kitle oluşturmanızı sağlıyoruz.',
    'vision.growth.title': 'Sürdürülebilir Büyüme',
    'vision.growth.description': 'Veriye dayalı kararlar almanızı, gizli kalmış gelir fırsatlarını ortaya çıkarmanızı ve pazarınızda rekabet avantajı elde etmenizi sağlıyoruz.',
    
    // Product Ecosystem Section
    'ecosystem.title': 'Birbiriyle Konuşan Çözümler, Tek Bir Güçlü Panel',
    'ecosystem.subtitle': 'Her çözümümüz diğeriyle mükemmel uyum içinde çalışarak işletmenizin tüm operasyonel ihtiyaçlarını karşılar.',
    'ecosystem.reputation.title': 'İtibar Yönetimi',
    'ecosystem.reputation.status': '✓ Aktif',
    'ecosystem.reputation.description': 'Olumsuz yorumları daha kimse görmeden yakalayın, müdahale edin ve memnun müşterilerinizi Google, Yemeksepeti gibi platformlara yönlendirerek yıldızlarınızı parlatın.',
    'ecosystem.reputation.cta': 'İtibar Yönetimini İncele',
    'ecosystem.qr.title': 'Akıllı QR Menü',
    'ecosystem.qr.status': 'Geliştiriliyor',
    'ecosystem.qr.badge': 'Çok Yakında',
    'ecosystem.qr.description': 'Sipariş ve ödeme süreçlerini dijitalleştirin. Müşterilerinize modern bir deneyim sunarken, çapraz satış önerileriyla sepet ortalamasını artırın.',
    'ecosystem.qr.cta': 'Takipte Kalın',
    'ecosystem.future.title': 'Gelecek Projeler',
    'ecosystem.future.status': 'Geliştiriliyor',
    'ecosystem.future.badge': 'Planlama Aşaması',
    'ecosystem.future.description': 'Stok takibi, personel performansı, sadakat programları... İşletmenizin tüm ihtiyaçlarını karşılayacak yeni nesil çözümler için aralıksız çalışıyoruz.',
    'ecosystem.future.cta': 'Vizyonumuzu Öğrenin',
    
    // Infrastructure Section
    'infrastructure.title': 'Güvenilirliğin ve Hızın Arkasındaki Güç',
    'infrastructure.subtitle': 'Modern teknoloji altyapımız ile işletmenizin büyümesini hiçbir şey durduramaz.',
    'infrastructure.cloud.title': 'Ölçeklenebilir Bulut Altyapısı',
    'infrastructure.cloud.description': 'İşletmeniz büyüdükçe performans kaybı yaşamayın. Railway gibi modern platformlar üzerinde kesintisiz hizmet sunuyoruz.',
    'infrastructure.security.title': 'Güvenlik Odaklı Mimari',
    'infrastructure.security.description': 'Verileriniz bizim için kutsaldır. En güncel güvenlik protokolleri ve şifreleme standartları ile korunuyorsunuz.',
    'infrastructure.api.title': 'API Odaklı Entegrasyon',
    'infrastructure.api.description': 'Tüm çözümlerimiz, gelecekte ihtiyaç duyabileceğiniz diğer yazılımlarla kolayca entegre olacak esnek yapıda.',
    'infrastructure.performance.title': 'Anlık Performans',
    'infrastructure.performance.description': 'Milisaniye seviyesinde yanıt süreleri ile müşterilerinizin deneyimini hiçbir zaman olumsuz etkilemeyiz.',
    
    // Testimonials Section
    'testimonials.title': 'İş Ortaklarımız Bizim İçin Ne Diyor?',
    'testimonials.subtitle': 'Güvenilir iş ortaklarımızın deneyimlerini keşfedin.',
    'testimonials.quote': '"Mutfak Yazılım, sadece bir yazılım şirketi değil, bizim için bir çözüm ortağı. Sektörün dinamiklerini çok iyi biliyorlar ve sorunlarımıza proaktif çözümler üretiyorlar. Onlarla çalışmaya başladığımız için çok şanslıyız."',
    'testimonials.author.name': 'Serkan Öztürk',
    'testimonials.author.title': 'Kurucu, Zincir Restoran Grubu',
    'testimonials.partners': 'Güvenilir İş Ortaklarımız:',
    'testimonials.partner1': 'Restoran Grubu A',
    'testimonials.partner2': 'Otel Zinciri B',
    'testimonials.partner3': 'Kafe Franchise C',
    
    // Final CTA Section
    'cta.title': 'İşletmenizi Geleceğe Taşımaya Hazır Mısınız?',
    'cta.subtitle': 'Operasyonel karmaşayı geride bırakın ve Mutfak Yazılım\'ın sunduğu entegre çözümlerle verimliliği, müşteri memnuniyetini ve kârlılığınızı nasıl artırabileceğinizi bugün keşfedin.',
    'cta.consultation': 'Ücretsiz Danışmanlık Alın',
    'cta.trial': 'İtibar Yönetimini Deneyin',
    'cta.feature1': '30 Gün Ücretsiz Deneme',
    'cta.feature2': 'Kredi Kartı Gerektirmez',
    'cta.feature3': '7/24 Türkçe Destek',
    
    
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Bir hata oluştu',
    'common.success': 'Başarılı',
    'common.close': 'Kapat',
    'common.open': 'Aç',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.continue': 'Devam Et',
    'common.back': 'Geri',
    'common.next': 'İleri',
    'common.previous': 'Önceki',
    'common.search': 'Ara',
    'common.filter': 'Filtrele',
    'common.sort': 'Sırala',
    'common.view': 'Görüntüle',
    'common.edit': 'Düzenle',
    'common.delete': 'Sil',
    'common.add': 'Ekle',
    'common.remove': 'Kaldır',
    'common.update': 'Güncelle',
    'common.submit': 'Gönder',
    'common.reset': 'Sıfırla',
    'common.copy': 'Kopyala',
    'common.share': 'Paylaş',
    'common.download': 'İndir',
    'common.upload': 'Yükle',
    'common.print': 'Yazdır',
    'common.export': 'Dışa Aktar',
    'common.import': 'İçe Aktar',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.solutions': 'Solutions',
    'nav.pricing': 'Pricing',
    'nav.resources': 'Resources',
    'nav.company': 'Company',
    'nav.contact': 'Contact',
    'nav.demo': 'Get Demo',
    'nav.login': 'Sign In',
    
    // Theme Toggle
    'theme.light': 'Light Theme',
    'theme.dark': 'Dark Theme',
    'theme.system': 'System Theme',
    
    // Language
    'language.turkish': 'Türkçe',
    'language.english': 'English',
    
    // Hero Section
    'hero.badge': 'Turkey\'s Most Advanced SaaS Platform',
    'hero.title.line1': 'Your Business\'s',
    'hero.title.line2': 'Digital Power',
    'hero.subtitle': 'powered reputation management,',
    'hero.subtitle.highlight1': 'AI',
    'hero.subtitle.highlight2': 'smart analytics',
    'hero.subtitle.highlight3': 'automated solutions',
    'hero.subtitle.end': 'to take your business to the future.',
    'hero.cta.primary': 'Get Free Demo',
    'hero.cta.secondary': 'Watch Demo Video',
    'hero.trust': 'Trusted Platform',
    'hero.trust.subtitle': 'Success by Numbers',
    'hero.stats.businesses': 'Active Businesses',
    'hero.stats.transactions': 'Transactions/Month',
    'hero.stats.uptime': 'Uptime',
    'hero.stats.response': 'Avg Response',
    'hero.scroll': 'Explore',

    // Reputation Management Page
    'reputation.hero.title': 'Turn Negative Reviews',
    'reputation.hero.titleHighlight': 'Into Opportunities',
    'reputation.hero.subtitle': 'Learn why your customers are unhappy before they leave your business. Intervene before bad reviews are written on public platforms, protect your reputation and increase your organic ratings.',
    'reputation.hero.trial': 'Start Free Trial',
    'reputation.hero.video': 'How It Works? (Video)',
    'reputation.hero.stat1': 'More than 10 branches',
    'reputation.hero.stat2': 'Hundreds of happy businesses',
    'reputation.hero.stat3': 'Used with confidence',
    
    // LossAversion Section
    'lossAversion.title': 'What Does Every Bad Review You Ignore Cost You?',
    'lossAversion.subtitle': 'Problems you don\'t notice are threatening your business\'s future.',
    'lossAversion.customers.title': 'Quietly Leaving Customers',
    'lossAversion.customers.description': '91% of unhappy customers never return again. You lose them forever because you don\'t know the problem.',
    'lossAversion.reputation.title': 'Online Reputation Crises',
    'lossAversion.reputation.description': 'A single bad review on Google Maps or food delivery apps can discourage 86% of your potential customers.',
    'lossAversion.blindness.title': 'Operational Blindness',
    'lossAversion.blindness.description': 'Without knowing which staff, which product, or which table constantly causes problems, you continue to repeat the same mistakes.',
    'lossAversion.cost.title': '⚠️ Real Cost Calculation',
    'lossAversion.cost.description': 'Every customer you lose means an average lifetime value loss of $100. If you lose just 10 customers per month, you experience an annual revenue loss of $12,000.',
    'lossAversion.cost.highlight1': '$100',
    'lossAversion.cost.highlight2': '$12,000',
    
    // ReputationBenefits Section
    'benefits.title': 'Take Control with Mutfak Yazılım',
    'benefits.subtitle': 'Unleash your business\'s full potential with our reputation management system.',
    'benefits.crisis.title': 'Catch Crisis Instantly',
    'benefits.crisis.description': 'Negative feedback comes to your private panel before it goes to online platforms. Intervene immediately and win back the customer.',
    'benefits.positive.title': 'Boost Positive Reviews',
    'benefits.positive.description': 'Direct satisfied customers to platforms like Google, Tripadvisor with one click to increase your organic star rating and review count.',
    'benefits.data.title': 'Make Data-Driven Decisions',
    'benefits.data.description': 'Learn the root cause of complaints (staff, product, time) with AI-powered analytics and manage your business with data.',
    'benefits.loyalty.title': 'Create Customer Loyalty',
    'benefits.loyalty.description': 'Reach customers with problems automatically or manually via SMS, WhatsApp and email, offering discount codes to turn them into your most loyal customers.',
    
    // ReputationProcess Section
    'process.title': 'Ready to Start in Just 5 Minutes',
    'process.subtitle': 'Setup is very easy, you don\'t need any technical knowledge.',
    'process.step1.title': 'Create Your Account',
    'process.step1.description': 'Enter your business information and add the platforms (Google, Food delivery apps, etc.) you want to collect reviews from to your panel.',
    'process.step1.time': '2 Minutes',
    'process.step2.title': 'Generate Your QR Codes',
    'process.step2.description': 'Create custom QR codes for each of your tables, couriers or branches in seconds and print them out.',
    'process.step2.time': '2 Minutes',
    'process.step3.title': 'Collect Feedback',
    'process.step3.description': 'As soon as QR codes start being scanned, all feedback instantly goes to your panel, email and mobile notifications.',
    'process.step3.time': '1 Minute',
    'process.cta.title': '🚀 Get Started Now',
    'process.cta.description': 'Setup is this easy! Create your first QR code in 5 minutes and start receiving feedback from your customers.',
    'process.cta.button': 'Create Free Account',
    
    // ReputationFeatures Section
    'features.title': 'Powerful Features to Grow Your Business',
    'features.subtitle': 'Comprehensive feature set powered by modern technology.',
    'features.ai.title': 'AI-Powered Reporting',
    'features.ai.description': 'Automatically reports root causes of complaints, sentiment analysis and trends with GPT-4.',
    'features.communication.title': 'Multi-Channel Communication',
    'features.communication.description': 'Respond to your customers instantly via SMS, WhatsApp or custom email templates for your brand.',
    'features.platforms.title': 'Platform Integrations',
    'features.platforms.description': 'Track reviews from Google Maps, Food delivery apps, Tripadvisor and more from a single screen.',
    'features.analytics.title': 'Detailed Performance Analysis',
    'features.analytics.description': 'Track satisfaction scores by staff, branch, table and product to identify weak points.',
    'features.customization.title': 'Customizable Interfaces',
    'features.customization.description': 'Design the review screen and forms that customers will see with your own logo and colors.',
    'features.subdomain.title': 'Subdomain Support',
    'features.subdomain.description': 'Get a professional look with your own domain like business-name.mutfakyazilim.com.',
    
    // ReputationPricing Section
    'pricing.title': 'Choose the Right Plan for Your Business Needs',
    'pricing.subtitle': 'Transparent pricing, no hidden costs. Cancel anytime.',
    'pricing.starter.name': 'Starter',
    'pricing.starter.description': 'Perfect for single-location businesses',
    'pricing.starter.cta': 'Choose Starter Plan',
    'pricing.professional.name': 'Professional',
    'pricing.professional.description': 'For growing businesses and chains',
    'pricing.professional.cta': 'Choose Professional Plan',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.description': 'For large-scale operations',
    'pricing.enterprise.price': 'Get Quote',
    'pricing.enterprise.cta': 'Contact Us',
    'pricing.popular': 'Most Popular',
    'pricing.trial': 'All plans come with a 14-day free trial. No credit card required.',
    'pricing.guarantee': '30-Day Money Back Guarantee',
    'pricing.ssl': 'SSL Encryption',
    'pricing.support': '24/7 Turkish Support',
    
    // Pricing Plan Features
    'pricing.starter.feature1': '1 Branch',
    'pricing.starter.feature2': '5 QR Codes',
    'pricing.starter.feature3': '2 Platform Integrations',
    'pricing.starter.feature4': 'Basic Reporting',
    'pricing.starter.feature5': 'Email Support',
    'pricing.professional.feature1': '5 Branches',
    'pricing.professional.feature2': 'Unlimited QR Codes',
    'pricing.professional.feature3': '10 Platform Integrations',
    'pricing.professional.feature4': 'AI-Powered Analysis',
    'pricing.professional.feature5': 'SMS/WhatsApp Integration',
    'pricing.professional.feature6': 'Priority Support',
    'pricing.enterprise.feature1': 'Unlimited Branches',
    'pricing.enterprise.feature2': 'Unlimited Integrations',
    'pricing.enterprise.feature3': 'API Access',
    'pricing.enterprise.feature4': 'Dedicated Account Manager',
    'pricing.enterprise.feature5': 'Advanced Security',
    'pricing.enterprise.feature6': '24/7 Phone Support',
    
    // ReputationTestimonials Section
    'reputation.testimonials.title': 'What Do Our Users Say?',
    'reputation.testimonials.subtitle': 'Discover the experiences of our real customers.',
    'reputation.testimonials.testimonial1.name': 'Ahmet Yılmaz',
    'reputation.testimonials.testimonial1.role': 'Owner',
    'reputation.testimonials.testimonial1.company': 'Lezzet Durağı Restaurant',
    'reputation.testimonials.testimonial1.content': 'Thanks to Mutfak Yazılım, our Google rating increased from 3.8 to 4.7. We solve bad reviews before anyone sees them. It\'s an incredible system.',
    'reputation.testimonials.testimonial2.name': 'Elif Kaya',
    'reputation.testimonials.testimonial2.role': 'Business Manager',
    'reputation.testimonials.testimonial2.company': 'Sahil Hotel',
    'reputation.testimonials.testimonial2.content': 'Now I can clearly see which waiter gets more complaints. Our operational efficiency increased by 40%. I definitely recommend it.',
    'reputation.testimonials.testimonial3.name': 'Mehmet Özkan',
    'reputation.testimonials.testimonial3.role': 'Franchise Owner',
    'reputation.testimonials.testimonial3.company': 'Burger Palace Chain',
    'reputation.testimonials.testimonial3.content': 'We use it in 5 branches. Customer satisfaction increased by an average of 35%. Now we manage problems proactively, not reactively.',
    
    // ReputationFAQ Section
    'reputation.faq.title': 'Frequently Asked Questions',
    'reputation.faq.subtitle': 'Common questions and answers. Contact us if you have other questions.',
    'reputation.faq.question1': 'Do I need technical knowledge for setup?',
    'reputation.faq.answer1': 'No. Our panel is so easy that you can set up everything and start using it yourself in 5 minutes. You don\'t need to write any code or have technical knowledge.',
    'reputation.faq.question2': 'How is my data security ensured?',
    'reputation.faq.answer2': 'All your data is protected with 256-bit SSL encryption. Your data is stored on our servers in Turkey and protected with GDPR compliant security protocols. It is never shared with third parties.',
    'reputation.faq.question3': 'Is there a commitment required? Can I cancel anytime?',
    'reputation.faq.answer3': 'There is no commitment in our monthly plans. You can cancel with one click from our panel anytime. No charges will be applied after cancellation.',
    'reputation.faq.question4': 'Which review platforms do you support?',
    'reputation.faq.answer4': 'We support Google Maps, Yemeksepeti, Getir, Trendyol, Tripadvisor, Booking.com, Foursquare, App Store, Google Play Store and 50+ platforms. New platforms are constantly being added.',
    'reputation.faq.question5': 'Will my customers understand QR code scanning?',
    'reputation.faq.answer5': 'QR code usage is now very common. Just showing the QR code with the phone camera is enough. You can also add explanatory texts like "Share your experience" next to your QR codes.',
    'reputation.faq.question6': 'How does the support service work?',
    'reputation.faq.answer6': 'We have 24/7 Turkish support service. You can reach us via WhatsApp, phone, email or live chat. Our average response time is 2 minutes.',
    'reputation.faq.contact.title': 'Have other questions?',
    'reputation.faq.contact.button': 'Contact Our Support Team',
    
    // ReputationFinalCTA Section
    'reputation.finalCta.title': 'Don\'t Leave Your Reputation to Chance.',
    'reputation.finalCta.titleHighlight': 'Stay One Step Ahead of Competitors.',
    'reputation.finalCta.subtitle': 'Start today and turn customer satisfaction into your business\'s most powerful marketing tool.',
    'reputation.finalCta.trial': '14 Days Free Trial',
    'reputation.finalCta.home': 'Back to Home',
    'reputation.finalCta.feature1.title': '14 Days Free',
    'reputation.finalCta.feature1.description': 'Test all our features without any risk',
    'reputation.finalCta.feature2.title': 'No Credit Card Required',
    'reputation.finalCta.feature2.description': 'Start immediately with just your email address',
    'reputation.finalCta.feature3.title': '24/7 Turkish Support',
    'reputation.finalCta.feature3.description': 'Our expert team is always with you',
    'reputation.finalCta.guarantee': '30 Day Money Back Guarantee',
    'reputation.finalCta.ssl': 'SSL Security Certificate',
    'reputation.finalCta.uptime': '99.9% Uptime Guarantee',
    'reputation.finalCta.trusted': 'Trusted Platform by 500+ Businesses',

    // Footer
    'footer.product': 'Product',
    'footer.solutions': 'Solutions',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.desc': 'Be the first to hear about innovations and special opportunities',
    'footer.newsletter.placeholder': 'Your email address',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.newsletter.success': 'Successfully subscribed!',
    'footer.brand.description': 'Complete your business digital transformation with Turkey\'s most advanced SaaS platform. Get ahead of the competition with our AI-powered solutions.',
    'footer.contact.title': 'Contact',
    'footer.contact.phone': '+90 212 123 45 67',
    'footer.contact.email': 'info@mutfakyazilim.com',
    'footer.contact.address': 'Maslak District, Sarıyer/İstanbul',
    'footer.follow': 'Follow Us',
    'footer.rights': '© 2024 Mutfak Yazılım. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.stats.businesses': 'Active Businesses',
    'footer.stats.transactions': 'Monthly Transactions',
    'footer.stats.uptime': 'Uptime',
    'footer.stats.satisfaction': 'Customer Satisfaction',
    'footer.trust.iso': 'ISO 27001 Security Certificate',
    'footer.trust.soc': 'SOC 2 Type II Security Audit',
    'footer.trust.gdpr': 'GDPR Compliant Data Protection',
    'footer.trust.uptime': '99.9% Service Guarantee',
    'footer.trust.ssl': 'SSL Encrypted Secure Connection',
    'footer.trust.transparent': 'Transparent Real-Time Reporting',
    
    // Vision Section
    'vision.title': 'We Focus on Growing Your Business, Not Just Technology',
    'vision.subtitle': 'As Mutfak Yazılım, we understand the real needs of businesses and develop solutions to meet these needs.',
    'vision.operational.title': 'Operational Efficiency',
    'vision.operational.description': 'We create time and cost savings by automating manual processes, preventing data loss, and enabling your staff to focus on their core work.',
    'vision.experience.title': 'Unique Customer Experience',
    'vision.experience.description': 'We enable you to hear your customers\' voices, understand their needs, and create a loyal audience by providing them with unforgettable experiences.',
    'vision.growth.title': 'Sustainable Growth',
    'vision.growth.description': 'We enable you to make data-driven decisions, uncover hidden revenue opportunities, and gain competitive advantage in your market.',
    
    // Product Ecosystem Section
    'ecosystem.title': 'Interconnected Solutions, One Powerful Panel',
    'ecosystem.subtitle': 'Each of our solutions works in perfect harmony with others to meet all your business operational needs.',
    'ecosystem.reputation.title': 'Reputation Management',
    'ecosystem.reputation.status': '✓ Active',
    'ecosystem.reputation.description': 'Catch negative reviews before anyone sees them, intervene, and direct your satisfied customers to platforms like Google, Yemeksepeti to shine your stars.',
    'ecosystem.reputation.cta': 'Explore Reputation Management',
    'ecosystem.qr.title': 'Smart QR Menu',
    'ecosystem.qr.status': 'In Development',
    'ecosystem.qr.badge': 'Coming Soon',
    'ecosystem.qr.description': 'Digitalize ordering and payment processes. Offer your customers a modern experience while increasing basket average with cross-selling suggestions.',
    'ecosystem.qr.cta': 'Stay Tuned',
    'ecosystem.future.title': 'Future Projects',
    'ecosystem.future.status': 'In Development',
    'ecosystem.future.badge': 'Planning Phase',
    'ecosystem.future.description': 'Inventory tracking, staff performance, loyalty programs... We are working continuously for next-generation solutions that will meet all your business needs.',
    'ecosystem.future.cta': 'Learn Our Vision',
    
    // Infrastructure Section
    'infrastructure.title': 'The Power Behind Reliability and Speed',
    'infrastructure.subtitle': 'With our modern technology infrastructure, nothing can stop your business growth.',
    'infrastructure.cloud.title': 'Scalable Cloud Infrastructure',
    'infrastructure.cloud.description': 'Don\'t experience performance loss as your business grows. We provide uninterrupted service on modern platforms like Railway.',
    'infrastructure.security.title': 'Security-Focused Architecture',
    'infrastructure.security.description': 'Your data is sacred to us. You are protected with the latest security protocols and encryption standards.',
    'infrastructure.api.title': 'API-Focused Integration',
    'infrastructure.api.description': 'All our solutions are in a flexible structure that can be easily integrated with other software you may need in the future.',
    'infrastructure.performance.title': 'Instant Performance',
    'infrastructure.performance.description': 'With millisecond-level response times, we never negatively affect your customers\' experience.',
    
    // Testimonials Section
    'testimonials.title': 'What Do Our Business Partners Say About Us?',
    'testimonials.subtitle': 'Discover the experiences of our trusted business partners.',
    'testimonials.quote': '"Mutfak Yazılım is not just a software company, but a solution partner for us. They know the dynamics of the industry very well and produce proactive solutions to our problems. We are very lucky to have started working with them."',
    'testimonials.author.name': 'Serkan Öztürk',
    'testimonials.author.title': 'Founder, Chain Restaurant Group',
    'testimonials.partners': 'Our Trusted Business Partners:',
    'testimonials.partner1': 'Restaurant Group A',
    'testimonials.partner2': 'Hotel Chain B',
    'testimonials.partner3': 'Cafe Franchise C',
    
    // Final CTA Section
    'cta.title': 'Are You Ready to Take Your Business to the Future?',
    'cta.subtitle': 'Leave operational complexity behind and discover today how you can increase efficiency, customer satisfaction and profitability with the integrated solutions offered by Mutfak Yazılım.',
    'cta.consultation': 'Get Free Consultation',
    'cta.trial': 'Try Reputation Management',
    'cta.feature1': '30 Days Free Trial',
    'cta.feature2': 'No Credit Card Required',
    'cta.feature3': '24/7 Turkish Support',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.view': 'View',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.update': 'Update',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.copy': 'Copy',
    'common.share': 'Share',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.print': 'Print',
    'common.export': 'Export',
    'common.import': 'Import',
  }
}

export function LanguageProvider({
  children,
  defaultLanguage = 'tr',
  storageKey = 'mutfak-yazilim-language',
}: {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  useEffect(() => {
    // Client-side'da localStorage'dan dili oku
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem(storageKey) as Language
      if (storedLanguage && (storedLanguage === 'tr' || storedLanguage === 'en')) {
        setLanguage(storedLanguage)
      } else {
        // Browser dilini kontrol et
        const browserLanguage = navigator.language.toLowerCase()
        if (browserLanguage.startsWith('tr')) {
          setLanguage('tr')
        } else {
          setLanguage('en')
        }
      }
    }
  }, [storageKey])

  useEffect(() => {
    // HTML lang attribute'unu güncelle
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  const t = (key: string): string => {
    const translation = translations[language] as Record<string, string>
    return translation[key] || key
  }

  const changeLanguage = (newLanguage: Language) => {
    localStorage.setItem(storageKey, newLanguage)
    setLanguage(newLanguage)
  }

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
  }

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error('useLanguage must be used within a LanguageProvider')

  return context
} 