import type { Metadata } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/lib/theme-provider'
import { LanguageProvider } from '@/lib/language-provider'
import SessionProviderWrapper from '@/components/SessionProviderWrapper'
import '../styles/globals.css'

// Premium Font Configuration
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif']
})

const outfitDisplay = Outfit({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'monospace']
})

// Enhanced SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://mutfakyazilim.com'),
  title: {
    default: 'Mutfak Yazılım | Türkiye\'nin En Gelişmiş Enterprise SaaS Platformu',
    template: '%s | Mutfak Yazılım'
  },
  description: 'Yapay zeka destekli itibar yönetimi, akıllı analitik ve otomatik çözümlerle işletmenizi dijital çağa taşıyın. 50.000+ işletmenin güvendiği platform.',
  keywords: [
    'itibar yönetimi',
    'SaaS platformu',
    'yapay zeka',
    'işletme yazılımı',
    'müşteri deneyimi',
    'dijital dönüşüm',
    'otomatik yanıtlama',
    'akıllı analitik',
    'enterprise çözümler',
    'restoran yazılımı'
  ],
  authors: [{ name: 'Mutfak Yazılım', url: 'https://mutfakyazilim.com' }],
  creator: 'Mutfak Yazılım',
  publisher: 'Mutfak Yazılım',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/',
      'en-US': '/en'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://mutfakyazilim.com',
    siteName: 'Mutfak Yazılım',
    title: 'Mutfak Yazılım | Enterprise SaaS Platform',
    description: 'Yapay zeka destekli itibar yönetimi ve akıllı çözümlerle işletmenizi geleceğe taşıyın. 50.000+ işletmenin güvendiği platform.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mutfak Yazılım - Enterprise SaaS Platform',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Mutfak Yazılım Logo',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mutfakyazilim',
    creator: '@mutfakyazilim',
    title: 'Mutfak Yazılım | Enterprise SaaS Platform',
    description: 'Yapay zeka destekli itibar yönetimi ve akıllı çözümlerle işletmenizi geleceğe taşıyın.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#0066FF'
      }
    ]
  },
  manifest: '/site.webmanifest',
  category: 'technology',
  classification: 'Business Software',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  }
}

// Structured Data for Enterprise
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mutfakyazilim.com/#organization",
      "name": "Mutfak Yazılım",
      "url": "https://mutfakyazilim.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mutfakyazilim.com/logo.png",
        "width": 512,
        "height": 512
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+90-212-123-4567",
        "contactType": "customer service",
        "availableLanguage": ["Turkish", "English"]
      },
      "sameAs": [
        "https://twitter.com/mutfakyazilim",
        "https://linkedin.com/company/mutfakyazilim",
        "https://instagram.com/mutfakyazilim"
      ],
      "foundingDate": "2020",
      "numberOfEmployees": "50-100",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "TR",
        "addressLocality": "İstanbul",
        "addressRegion": "İstanbul",
        "streetAddress": "Maslak Mahallesi"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://mutfakyazilim.com/#website",
      "url": "https://mutfakyazilim.com",
      "name": "Mutfak Yazılım",
      "description": "Türkiye'nin en gelişmiş enterprise SaaS platformu",
      "publisher": {
        "@id": "https://mutfakyazilim.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://mutfakyazilim.com/arama?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Mutfak Yazılım İtibar Yönetimi",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "TRY",
        "price": "0",
        "name": "Ücretsiz Demo"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "2847",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="tr" 
      className={`${inter.variable} ${outfitDisplay.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
      dir="ltr"
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Performance hints */}
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
        
        {/* Theme and PWA */}
        <meta name="theme-color" content="#0066FF" />
        <meta name="color-scheme" content="light" />
        <meta name="msapplication-TileColor" content="#0066FF" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical path CSS */
            .glass { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
            .glass-strong { backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); }
            .text-gradient { background: linear-gradient(135deg, #0066FF 0%, #00FF88 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            .bg-gradient-mesh { background: radial-gradient(circle at 20% 80%, #0066ff14 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00ff8814 0%, transparent 50%), radial-gradient(circle at 40% 40%, #ff6b3514 0%, transparent 50%); }
            /* Prevent flash of unstyled content */
            body { visibility: hidden; }
            .fonts-loaded body { visibility: visible; }
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 selection:bg-primary-100 selection:text-primary-900 transition-colors duration-300">
        <ThemeProvider defaultTheme="system">
          <LanguageProvider defaultLanguage="tr">
            <SessionProviderWrapper>
            {/* Performance monitoring - disable in development */}
            {process.env.NODE_ENV === 'production' && (
              <>
                {/* Google Analytics - Replace with your tracking ID */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'GA_TRACKING_ID', {
                        page_title: document.title,
                        page_location: window.location.href,
                      });
                    `,
                  }}
                />
                
                {/* Microsoft Clarity - Replace with your project ID */}
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                      })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
                    `,
                  }}
                />
              </>
            )}

            {/* Font loading optimization */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  document.documentElement.classList.add('fonts-loaded');
                `,
              }}
            />

            {/* WCAG 2.1 AA Accessibility Features */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50 focus:z-[9999] focus:outline-2 focus:outline-white focus:outline-offset-2"
              role="navigation"
              aria-label="Ana içeriğe atlama linki"
            >
              Ana içeriğe geç
            </a>

            {/* Additional skip links for better navigation */}
            <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-4 focus-within:left-4 focus-within:z-[9999] space-y-2">
              <a 
                href="#navigation" 
                className="block bg-primary-600 text-white px-4 py-2 rounded-lg focus:outline-2 focus:outline-white focus:outline-offset-2"
                aria-label="Navigasyon menüsüne git"
              >
                Navigasyona git
              </a>
              <a 
                href="#footer" 
                className="block bg-primary-600 text-white px-4 py-2 rounded-lg focus:outline-2 focus:outline-white focus:outline-offset-2"
                aria-label="Footer bölümüne git"
              >
                Footer'a git
              </a>
            </div>

            {/* Screen reader announcements */}
            <div 
              id="sr-announcements" 
              className="sr-only" 
              aria-live="polite" 
              aria-atomic="true"
              role="status"
            ></div>

            {/* Main layout structure */}
            <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
              {/* Premium Header */}
              <div id="navigation">
                <Header />
              </div>
              
              {/* Main content with proper spacing */}
              <main 
                id="main-content" 
                className="flex-1 pt-24 lg:pt-32"
                role="main"
                tabIndex={-1}
                aria-label="Ana sayfa içeriği"
              >
                {/* Background effects container */}
                <div className="fixed inset-0 -z-10 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-mesh opacity-30 dark:opacity-20"></div>
                  
                  {/* Performance-optimized floating elements */}
                  <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-electric rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob will-change-transform"></div>
                  <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-fire rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000 will-change-transform"></div>
                  <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-premium rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000 will-change-transform"></div>
                </div>
                
                {children}
              </main>
              
              {/* Premium Footer */}
              <Footer />
            </div>

            {/* Live chat widget placeholder */}
            <div id="live-chat-widget" className="fixed bottom-6 right-6 z-40">
              {/* Live chat implementation would go here */}
            </div>

            {/* Performance optimization scripts */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // Optimize animations for reduced motion preference
                  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    document.documentElement.style.setProperty('--animation-duration', '0s');
                  }
                  
                  // Lazy load optimization
                  if ('IntersectionObserver' in window) {
                    const imageObserver = new IntersectionObserver((entries, observer) => {
                      entries.forEach(entry => {
                        if (entry.isIntersecting) {
                          const img = entry.target;
                          img.src = img.dataset.src;
                          img.classList.remove('lazy');
                          observer.unobserve(img);
                        }
                      });
                    });
                    
                    document.querySelectorAll('img[data-src]').forEach(img => {
                      imageObserver.observe(img);
                    });
                  }
                  
                  // Service Worker registration for PWA
                  if ('serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'production') {
                    window.addEventListener('load', () => {
                      navigator.serviceWorker.register('/sw.js')
                        .then(registration => {
                          console.log('SW registered: ', registration);
                        })
                        .catch(registrationError => {
                          console.log('SW registration failed: ', registrationError);
                        });
                    });
                  }
                `,
              }}
            />
            </SessionProviderWrapper>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 