import ParticleBackground from './components/ParticleBackground';
import FireworksBackground from './components/FireworksBackground';
import CherryBlossom from './components/CherryBlossom';
import TikTokProfileEmbed from './components/TikTokProfileEmbed';
import topBackground from './assets/images/summer_lantern_fireworks_scenery_1783924938769.jpg';
import { Section } from './components/Section';
import { motion } from 'motion/react';
import { Instagram, Youtube, Music2, FileText, ArrowUp, Sun, Moon, ExternalLink, ArrowRight } from 'lucide-react';
import { ScrollCarousel } from './components/ScrollCarousel';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

// Uploaded images
const LOGO_URL = "https://i.imgur.com/3gkwo9v.png";
const ABOUT_ILLUST_URL = "https://i.imgur.com/LqjTi4M.png";
const CHAR_URL = "https://i.imgur.com/Ee53ClW.png";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const popInItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function App() {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    console.log("GA Measurement ID check:", measurementId ? "Set" : "Not Set");
    if (measurementId) {
      ReactGA.initialize(measurementId);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
    }
  }, []);

  // Main Application Component
  return (
    <div className="min-h-screen text-solne-dark font-serif selection:bg-solne-gold selection:text-white relative">
      <ParticleBackground />
      
      {/* Character - Fixed Bottom Left (Scroll to Top) */}
      <div className="fixed bottom-0 left-0 p-2 md:p-8 z-50">
        <motion.button 
          initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative group cursor-pointer focus:outline-none text-left"
          aria-label="ページトップへ戻る"
        >
          {/* Guide Design */}
          <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
            <motion.div 
              animate={{ y: [0, -4, 0] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp className="w-3 h-3 md:w-4 md:h-4 text-solne-dark" strokeWidth={1} />
            </motion.div>
            <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-solne-dark font-light ml-1">
              TOP
            </span>
          </div>

          <img 
            src={CHAR_URL} 
            alt="Solne Character" 
            className="h-20 sm:h-24 md:h-48 lg:h-56 object-contain drop-shadow-2xl opacity-80 md:opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03] origin-bottom-left"
          />
        </motion.button>
      </div>

      {/* Navigation Menu - Fixed Top Right */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        className="fixed top-6 right-6 md:top-10 md:right-12 z-50"
      >
        <ul className="flex flex-col md:flex-row items-end gap-4 md:gap-8 text-xs md:text-sm tracking-[0.2em] font-light">
          <li>
            <a href="#news" className="text-solne-dark/60 hover:text-solne-dark transition-all duration-300 relative group flex items-center gap-2">
              <span className="w-0 h-[1px] bg-solne-gold transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
              <span className="group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">News</span>
            </a>
          </li>
          <li>
            <a href="#about" className="text-solne-dark/60 hover:text-solne-dark transition-all duration-300 relative group flex items-center gap-2">
              <span className="w-0 h-[1px] bg-solne-gold transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
              <span className="group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">About</span>
            </a>
          </li>
          <li>
            <a href="#music-latest" className="text-solne-dark/60 hover:text-solne-dark transition-all duration-300 relative group flex items-center gap-2">
              <span className="w-0 h-[1px] bg-solne-gold transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
              <span className="group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">Music</span>
            </a>
          </li>
          <li>
            <a href="#sheet-latest" className="text-solne-dark/60 hover:text-solne-dark transition-all duration-300 relative group flex items-center gap-2">
              <span className="w-0 h-[1px] bg-solne-gold transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
              <span className="group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">Sheet</span>
            </a>
          </li>
          <li>
            <a href="#link" className="text-solne-dark/60 hover:text-solne-dark transition-all duration-300 relative group flex items-center gap-2">
              <span className="w-0 h-[1px] bg-solne-gold transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
              <span className="group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">Link</span>
            </a>
          </li>
        </ul>
      </motion.nav>

      <main className="pt-32 pb-20 flex flex-col items-center relative z-10">
        
        {/* Hero Section */}
        <section className="w-full min-h-[90vh] flex flex-col items-center justify-start relative px-6 pt-10 pb-20 overflow-hidden bg-solne-dark/90">
          
          {/* Hero Background Watermark */}
          <div className="absolute inset-x-0 top-0 h-[120vh] pointer-events-none z-0 -mt-20 overflow-hidden">
            <div 
              className="w-full h-full opacity-60 bg-cover bg-center object-cover scale-100"
              style={{ 
                backgroundImage: `url(${topBackground})`
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-solne-dark/30 via-solne-dark/80 to-solne-dark"></div>
          </div>

          {/* Fireworks Effects */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <FireworksBackground />
          </div>

          {/* Logo & Background Wrapper */}
          <div className="relative w-full flex items-center justify-center mb-16 mt-8 md:mt-16 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
            {/* Glow effect behind the logo to ensure readability */}
            <div className="absolute inset-0 bg-white/30 blur-[60px] rounded-full transform translate-y-6 scale-[1.6] -z-10"></div>
            
            <motion.img 
              src={LOGO_URL} 
              alt="Solne Logo" 
              animate={{ 
                filter: [
                  'invert(1) drop-shadow(0 0 15px rgba(255,200,150,0.5))',
                  'invert(1) drop-shadow(0 0 35px rgba(255,180,80,0.9)) drop-shadow(0 0 10px rgba(255,255,255,0.8))',
                  'invert(1) drop-shadow(0 0 15px rgba(255,200,150,0.5))'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[85vw] md:w-[500px] lg:w-[600px] object-contain relative z-10 mix-blend-screen opacity-100"
            />
            </motion.div>
          </div>

          {/* New Song Promo Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
            className="w-full max-w-5xl relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-solne-dark/80 backdrop-blur-md border border-white/20"
          >
            {/* Watermark Background */}
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url(${topBackground})` }}
            ></div>

            <div className="relative z-20 flex flex-col items-center justify-center gap-8 p-8 md:p-12 lg:p-16 text-center text-white">
              {/* Text Content */}
              <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <motion.span 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/80 backdrop-blur-sm text-white text-sm md:text-base tracking-widest border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] font-medium"
                  >
                    <span className="text-lg">🎇</span> 好評公開中
                  </motion.span>
                </div>
                
                <h3 className="text-lg md:text-2xl tracking-[0.2em] text-white/90 font-light mb-4 whitespace-nowrap">
                  3rd Original Piano Solo
                </h3>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.2em] text-white font-medium mb-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] whitespace-nowrap">
                  「夏灯花火」
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center items-center">
                {/* YouTube Video */}
                <div className="w-full max-w-[800px] relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-2 border-white/20 bg-black aspect-video">
                  <iframe 
                    src="https://www.youtube.com/embed/uo7kyZqZD0k" 
                    title="YouTube Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
                <a 
                  href="https://mucome.net/work?id=164509" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-solne-gold text-white tracking-[0.2em] font-medium hover:bg-solne-gold/90 transition-all duration-300 shadow-[0_0_20px_rgba(219,157,100,0.4)] hover:shadow-[0_0_30px_rgba(219,157,100,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-solne-gold"
                >
                  <FileText className="w-5 h-5 animate-bounce" />
                  楽譜を購入する (mucome)
                </a>
                <a 
                  href="https://youtu.be/uo7kyZqZD0k" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent text-white border border-white/40 tracking-[0.2em] font-medium hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Youtube className="w-5 h-5 text-red-500" />
                  MVを視聴する (YouTube)
                </a>
              </div>

              {/* Secondary Promo */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 max-w-lg mx-auto w-full group"
              >
                <a 
                  href="https://youtu.be/gF1A2e0RqsE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-between overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-solne-gold/0 via-solne-gold/10 to-solne-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors duration-300 shrink-0">
                      <Youtube className="w-6 h-6 text-white group-hover:text-red-500 transition-colors duration-300" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] tracking-[0.2em] text-solne-gold mb-1">NEW VIDEO</span>
                      <span className="text-sm md:text-base text-white tracking-widest font-light">
                        「碧に包まれて」本人演奏動画公開
                      </span>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 relative z-10" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>


        {/* TikTok Section */}
        <Section id="tiktok" className="bg-white/30 backdrop-blur-md w-full max-w-none pt-24 pb-0 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
          <div className="max-w-3xl mx-auto w-full px-6 flex flex-col items-center">
            {/* TikTok Latest Videos Embed */}
            <div className="w-full bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-4 h-[1px] bg-solne-dark/30"></span>
                <span className="text-xs tracking-[0.2em] text-solne-dark/60 font-medium">LATEST SHORTS</span>
                <span className="w-4 h-[1px] bg-solne-dark/30"></span>
              </div>
              <TikTokProfileEmbed />
            </div>
          </div>
        </Section>

        {/* News Section */}
        <Section id="news" className="bg-white/30 backdrop-blur-md w-full max-w-none py-16 md:py-24 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
          <div className="max-w-3xl mx-auto w-full px-6 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl mb-8 tracking-[0.2em] text-solne-dark flex items-center gap-6">
              <span className="w-12 h-[1px] bg-solne-gold/50"></span>
              News
              <span className="w-12 h-[1px] bg-solne-gold/50"></span>
            </h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="w-full text-left space-y-4"
            >
              {/* News Item: 碧に包まれて Performance Video */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.08.09</time>
                <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
                  <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
                    <span className="font-sans">2</span>nd. Original 作品「碧に包まれて」の本人演奏動画をYouTubeにて公開しました。
                  </p>
                  <a 
                    href="https://youtu.be/gF1A2e0RqsE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest text-solne-gold border border-solne-gold/30 px-3 py-1 rounded-full hover:bg-solne-gold hover:text-white transition-all"
                  >
                    <Youtube className="w-3.5 h-3.5" /> 演奏動画を視聴する
                  </a>
                </div>
              </motion.div>

              {/* News Item: 3rd Original Sheet Release */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.07.17</time>
                <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
                  <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
                    <span className="font-sans">3</span>rd. Original 作品「夏灯花火」の楽譜を公開しました。mucomeにてお買い求めいただけます。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href="https://mucome.net/work?id=164509" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest text-white bg-solne-gold border border-solne-gold px-3 py-1 rounded-full hover:bg-solne-gold/80 transition-all shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" /> 楽譜を購入する
                    </a>
                    <a 
                      href="https://youtu.be/uo7kyZqZD0k" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest text-solne-gold border border-solne-gold/30 px-3 py-1 rounded-full hover:bg-solne-gold hover:text-white transition-all"
                    >
                      <Youtube className="w-3.5 h-3.5" /> MVを視聴する
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* News Item: 3rd Original Release */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.07.11</time>
                <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
                  <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
                    <span className="font-sans">3</span>rd. Original 作品「夏灯花火」を公開しました。
                  </p>
                  <a 
                    href="https://youtu.be/uo7kyZqZD0k" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest text-solne-gold border border-solne-gold/30 px-3 py-1 rounded-full hover:bg-solne-gold hover:text-white transition-all"
                  >
                    <Youtube className="w-3.5 h-3.5" /> 視聴する
                  </a>
                </div>
              </motion.div>

              {/* News Item: Sheet Music Platform Change */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.06.29</time>
                <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
                  <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
                    楽譜の公開場所をPiascoreからmucomeへと移行いたしました。今後はこちらからお買い求めいただけます。
                  </p>
                </div>
              </motion.div>

              {/* News Item: Shorts Teaser Release */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.06.28</time>
                <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
                  <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
                    <span className="font-sans">3</span>rd. Original 作品「夏灯花火」のショート予告動画をYouTubeにて公開しました。
                  </p>
                </div>
              </motion.div>

              {/* News Item: 3rd Original Teaser Release */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.06.21</time>
                <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
                  <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
                    <span className="font-sans">3</span>rd. Original 作品「夏灯花火」の公開予告を発表しました。7月12日(日) 21:00 公開予定です。
                  </p>
                </div>
              </motion.div>

              {/* News Item: 2nd Original Sheet Release */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.05.19</time>
                <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
                  <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
                    <span className="font-sans">2</span>nd. Original 作品「碧に包まれて」の楽譜を公開しました。
                  </p>
                  <a 
                    href="https://mucome.net/work?id=163660" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest text-solne-gold border border-solne-gold/30 px-3 py-1 rounded-full hover:bg-solne-gold hover:text-white transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" /> mucomeで購入
                  </a>
                </div>
              </motion.div>

              {/* News Item: 2nd Original Release */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.05.11</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    <span className="font-sans">2</span>nd. Original 作品「碧に包まれて」フルMV公開しました。
                  </p>
                </div>
              </motion.div>

              {/* News Item: Sheet Music Release */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.12</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    <span className="font-sans">1</span>st. Original 作品「桜色の夢」の楽譜を公開しました。
                  </p>
                </div>
              </motion.div>

              {/* News Item: Full MV Release */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.11</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    <span className="font-sans">1</span>st. Original 作品「桜色の夢」のフルMVを公開しました。
                  </p>
                </div>
              </motion.div>

              {/* News Item: TikTok Launch */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.09</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    TikTokアカウントを開設しました。
                  </p>
                </div>
              </motion.div>

              {/* News Item: Teaser Video */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.07</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    <span className="font-sans">1</span>st. Original 作品「桜色の夢」予告動画公開しました。
                  </p>
                </div>
              </motion.div>

              {/* News Item: Website Launch */}
              <motion.div variants={popInItem} className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.05</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    公式サイトを公開しました。今後の新曲情報などはこちらでお知らせいたします。
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" className="relative group w-full max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(219,157,100,0.15)] -z-10 mt-16 md:mt-0"></div>
          
          <div className="py-12 md:py-20 px-4 md:px-12 w-full flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl mb-12 md:mb-16 tracking-[0.2em] text-solne-dark flex flex-col items-center gap-4 mt-10 md:mt-0">
              <div className="flex items-center gap-6">
                <span className="w-8 md:w-16 h-[1px] bg-solne-gold/50"></span>
                About
                <span className="w-8 md:w-16 h-[1px] bg-solne-gold/50"></span>
              </div>
            </h2>
            
            <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Illustration Side */}
              <motion.div 
                initial={{ opacity: 0, x: -40, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
              >
                <div className="absolute inset-0 bg-solne-gold/10 rounded-full blur-[80px] sm:blur-[120px] scale-110 -z-10"></div>
                <img 
                  src={ABOUT_ILLUST_URL} 
                  alt="Solne Illustration" 
                  className="w-56 sm:w-72 md:w-80 max-w-full object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 hover:scale-[1.03]"
                />
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="w-full lg:w-1/2 space-y-10 text-sm md:text-lg leading-[2.2] md:leading-[2.5] tracking-[0.15em] text-solne-dark flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                
                <div className="space-y-3 md:space-y-4">
                  <p className="text-xl md:text-3xl font-serif text-solne-dark tracking-[0.2em]">Solne</p>
                  <p className="text-solne-gold font-medium tracking-[0.3em] text-[11px] md:text-sm">— 情景作曲家 ＆ 独学ピアニスト —</p>
                </div>

                <div className="w-12 h-[1px] bg-gradient-to-r from-solne-gold/40 to-transparent lg:hidden"></div>

                <div className="space-y-6 font-light text-solne-dark/80 relative z-10 w-full bg-white/30 lg:bg-transparent p-6 lg:p-0 rounded-3xl lg:rounded-none border border-white/40 lg:border-none shadow-sm lg:shadow-none">
                  <p className="text-[13px] sm:text-[14px] md:text-base leading-loose md:leading-[2.5] tracking-[0.2em] mb-6">
                    情景が浮かぶ<br className="hidden md:block" />
                    オリジナルピアノソロ曲や、<br />
                    様々な曲の「弾いてみた」を<br className="hidden md:block" />
                    投稿しています。
                  </p>
                  
                  <p className="text-[11px] sm:text-xs md:text-[14px] text-solne-dark/60 font-light pt-6 border-t border-solne-gold/20 leading-[2] tracking-[0.15em]">
                    このサイトでは、活動紹介や新曲のご案内など、<br className="hidden lg:block" />
                    Solneの音楽の世界への入り口をお届けします。
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Music Section */}
        <Section id="music">
          <h2 className="text-3xl md:text-4xl mb-16 tracking-[0.2em] text-solne-dark flex items-center gap-6">
            <span className="w-12 h-[1px] bg-solne-gold/50"></span>
            Music
            <span className="w-12 h-[1px] bg-solne-gold/50"></span>
          </h2>
          
          <ScrollCarousel>
            {/* Song Card: 夏灯花火 */}
            <a 
              id="music-latest"
              href="https://youtu.be/uo7kyZqZD0k" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex flex-col bg-white/50 backdrop-blur-md border border-white/60 rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(219,157,100,0.2)] hover:-translate-y-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-solne-light">
                {/* New Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="absolute top-4 left-4 z-20"
                >
                  <div className="bg-solne-gold/90 backdrop-blur-sm text-white text-[10px] tracking-[0.2em] px-3 py-1 rounded-full shadow-lg font-medium flex items-center gap-1.5 animate-pulse">
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                    NEW
                  </div>
                </motion.div>

                <img 
                  src="https://i.imgur.com/Wo5A8FC.jpeg" 
                  alt="夏灯花火" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-solne-dark/20 group-hover:bg-solne-dark/10 transition-colors duration-500 flex items-center justify-center">
                  {/* Central Play Button */}
                  <div className="w-12 h-12 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-all duration-300">
                    <Youtube className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <span className="text-[10px] tracking-widest text-solne-gold mb-3 border border-solne-gold/30 px-3 py-1 rounded-full bg-white/50 shadow-sm">
                  <span className="font-sans">3</span>rd. Original
                </span>
                <h3 className="text-base md:text-lg tracking-[0.15em] text-solne-dark font-medium mt-1">夏灯花火</h3>
                <p className="text-[10px] md:text-xs tracking-widest text-solne-dark/50 mt-2 font-light italic">Summer Lantern Fireworks</p>
                <div className="w-6 h-[1px] bg-solne-gold/30 my-4"></div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] md:text-xs tracking-widest text-solne-dark/60 group-hover:text-red-500 transition-colors flex items-center justify-center gap-2">
                    <Youtube className="w-4 h-4" /> Watch on YouTube
                  </span>
                </div>
              </div>
            </a>

            {/* Song Card: 碧に包まれて */}
            <a 
              href="https://youtu.be/_WpV5B3S9dI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex flex-col bg-white/50 backdrop-blur-md border border-white/60 rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(219,157,100,0.2)] hover:-translate-y-2 opacity-90 hover:opacity-100"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-solne-light">
                <img 
                  src="https://img.youtube.com/vi/_WpV5B3S9dI/maxresdefault.jpg" 
                  alt="碧に包まれて" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-solne-dark/20 group-hover:bg-solne-dark/10 transition-colors duration-500 flex items-center justify-center">
                  {/* Central Play Button */}
                  <div className="w-12 h-12 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-all duration-300">
                    <Youtube className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <span className="text-[10px] tracking-widest text-solne-gold mb-3 border border-solne-gold/30 px-3 py-1 rounded-full bg-white/50 shadow-sm">
                  <span className="font-sans">2</span>nd. Original
                </span>
                <h3 className="text-base md:text-lg tracking-[0.15em] text-solne-dark font-medium mt-1">碧に包まれて</h3>
                <p className="text-[10px] md:text-xs tracking-widest text-solne-dark/50 mt-2 font-light italic">Wrapped in Azure</p>
                <div className="w-6 h-[1px] bg-solne-gold/30 my-4"></div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] md:text-xs tracking-widest text-solne-dark/60 group-hover:text-red-500 transition-colors flex items-center justify-center gap-2">
                    <Youtube className="w-4 h-4" /> Watch on YouTube
                  </span>
                </div>
              </div>
            </a>

            {/* Song Card: 桜色の夢 */}
            <a 
              href="https://youtu.be/Zrr9Yxb_VXc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex flex-col bg-white/50 backdrop-blur-md border border-white/60 rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(219,157,100,0.2)] hover:-translate-y-2 opacity-90 hover:opacity-100"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-solne-light">
                <img 
                  src="https://i.imgur.com/3dYK3s9.jpeg" 
                  alt="桜色の夢" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-solne-dark/20 group-hover:bg-solne-dark/10 transition-colors duration-500 flex items-center justify-center">
                  {/* Central Play Button */}
                  <div className="w-12 h-12 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-all duration-300">
                    <Youtube className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <span className="text-[10px] tracking-widest text-solne-gold mb-3 border border-solne-gold/30 px-3 py-1 rounded-full bg-white/50 shadow-sm">
                  <span className="font-sans">1</span>st. Original
                </span>
                <h3 className="text-base md:text-lg tracking-[0.15em] text-solne-dark font-medium mt-1">桜色の夢</h3>
                <p className="text-[10px] md:text-xs tracking-widest text-solne-dark/50 mt-2 font-light">Dream in Cherry Blossom</p>
                <div className="w-6 h-[1px] bg-solne-gold/30 my-4"></div>
                <span className="text-[10px] md:text-xs tracking-widest text-solne-dark/60 group-hover:text-red-500 transition-colors flex items-center gap-2">
                  <Youtube className="w-4 h-4" /> Watch on YouTube
                </span>
              </div>
            </a>
            
            {/* Placeholder for future songs */}
            <div className="hidden md:flex shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex-col bg-white/20 backdrop-blur-sm border border-white/40 rounded-[24px] overflow-hidden border-dashed items-center justify-center aspect-[16/10] md:aspect-auto opacity-50">
              <Music2 className="w-8 h-8 text-solne-gold/30 mb-4" strokeWidth={1} />
              <p className="text-[10px] md:text-xs tracking-[0.2em] text-solne-dark/40 font-light">Coming Soon</p>
            </div>
          </ScrollCarousel>
        </Section>

        {/* Sheet Section */}
        <Section id="sheet" className="bg-white/30 backdrop-blur-md w-full max-w-none py-32 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
          <div className="max-w-5xl mx-auto w-full px-4 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl mb-16 tracking-[0.2em] text-solne-dark flex items-center gap-6">
              <span className="w-12 h-[1px] bg-solne-gold/50"></span>
              Sheet
              <span className="w-12 h-[1px] bg-solne-gold/50"></span>
            </h2>
            
            <ScrollCarousel>
              {/* Sheet Music Card: 夏灯花火 */}
              <a 
                id="sheet-latest"
                href="https://mucome.net/work?id=164509" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex flex-col bg-white/50 backdrop-blur-md border border-white/60 rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(219,157,100,0.2)] hover:-translate-y-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-solne-light">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <div className="bg-solne-gold text-white text-[9px] tracking-[0.2em] px-3 py-1 rounded-full shadow-lg font-medium animate-pulse">
                      NEW
                    </div>
                    <div className="bg-red-500 text-white text-[9px] tracking-[0.2em] px-3 py-1 rounded-full shadow-lg font-medium">
                      好評発売中
                    </div>
                  </div>
                  <img 
                    src="https://i.imgur.com/Wo5A8FC.jpeg" 
                    alt="夏灯花火 楽譜" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-solne-dark/10 group-hover:bg-solne-dark/30 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-solne-dark shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <FileText className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col items-center text-center">
                  <span className="text-[10px] tracking-widest text-solne-gold mb-3 border border-solne-gold/30 px-3 py-1 rounded-full bg-white/50 shadow-sm">
                    Piano Solo Sheet
                  </span>
                  <h3 className="text-base md:text-lg tracking-[0.15em] text-solne-dark font-medium mt-1">夏灯花火</h3>
                  <p className="text-[10px] md:text-xs tracking-widest text-solne-dark/50 mt-2 font-light mb-4 italic">Summer Lantern Fireworks</p>
                  <div className="w-6 h-[1px] bg-solne-gold/30 mb-4 hidden md:block"></div>
                  <span className="text-[10px] md:text-xs tracking-widest text-solne-dark/60 group-hover:text-solne-gold transition-colors flex items-center gap-2">
                    <FileText className="w-3 h-3" /> mucomeで購入 <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>

              {/* Sheet Music Card: 碧に包まれて */}
              <a 
                href="https://mucome.net/work?id=163660" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex flex-col bg-white/50 backdrop-blur-md border border-white/60 rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(219,157,100,0.2)] hover:-translate-y-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-solne-light">
                  <img 
                    src="https://img.youtube.com/vi/_WpV5B3S9dI/maxresdefault.jpg" 
                    alt="碧に包まれて 楽譜" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-solne-dark/10 group-hover:bg-solne-dark/30 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-solne-dark shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col items-center text-center">
                  <span className="text-[10px] tracking-widest text-solne-gold mb-3 border border-solne-gold/30 px-3 py-1 rounded-full bg-white/50 shadow-sm">
                    Piano Solo Sheet
                  </span>
                  <h3 className="text-base md:text-lg tracking-[0.15em] text-solne-dark font-medium mt-1">碧に包まれて</h3>
                  <p className="text-[10px] md:text-xs tracking-widest text-solne-dark/50 mt-2 font-light mb-4 italic">Wrapped in Azure</p>
                  <div className="w-6 h-[1px] bg-solne-gold/30 mb-4 hidden md:block"></div>
                  <span className="text-[10px] md:text-xs tracking-widest text-solne-dark/60 group-hover:text-solne-gold transition-colors flex items-center gap-2">
                    <FileText className="w-3 h-3" /> mucomeで購入 <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>

              {/* Sheet Music Card: 桜色の夢 */}
              <a 
                href="https://mucome.net/work?id=163659" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex flex-col bg-white/50 backdrop-blur-md border border-white/60 rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(219,157,100,0.2)] hover:-translate-y-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-solne-light">
                  <img 
                    src="https://i.imgur.com/3dYK3s9.jpeg" 
                    alt="桜色の夢 楽譜" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-solne-dark/10 group-hover:bg-solne-dark/30 transition-colors duration-500 flex items-center justify-center">
                    {/* Central Sheet Icon */}
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-solne-dark shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col items-center text-center">
                  <span className="text-[10px] tracking-widest text-solne-gold mb-3 border border-solne-gold/30 px-3 py-1 rounded-full bg-white/50 shadow-sm">
                    Piano Solo Sheet
                  </span>
                  <h3 className="text-base md:text-lg tracking-[0.15em] text-solne-dark font-medium mt-1">桜色の夢</h3>
                  <p className="text-[10px] md:text-xs tracking-widest text-solne-dark/50 mt-2 font-light mb-4">Dream in Cherry Blossom</p>
                  <div className="w-6 h-[1px] bg-solne-gold/30 mb-4 hidden md:block"></div>
                  <span className="text-[10px] md:text-xs tracking-widest text-solne-dark/60 group-hover:text-solne-gold transition-colors flex items-center gap-2">
                    <FileText className="w-3 h-3" /> mucomeで購入 <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
              
              {/* Placeholder for future sheets */}
              <div className="flex shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex-col bg-white/20 backdrop-blur-sm border border-white/40 rounded-[24px] overflow-hidden border-dashed items-center justify-center aspect-[16/10] sm:aspect-auto opacity-50 p-8 text-center transition-all duration-500 hover:opacity-80">
                <FileText className="w-8 h-8 text-solne-gold/30 mb-4" strokeWidth={1} />
                <p className="text-[10px] md:text-xs tracking-[0.2em] text-solne-dark/40 font-light">Coming Soon</p>
              </div>
            </ScrollCarousel>
          </div>
        </Section>

        {/* Link Section */}
        <Section id="link" className="pb-40">
          <h2 className="text-3xl md:text-4xl mb-20 tracking-[0.2em] text-solne-dark flex items-center gap-6">
            <span className="w-12 h-[1px] bg-solne-gold/50"></span>
            Link
            <span className="w-12 h-[1px] bg-solne-gold/50"></span>
          </h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-x-4 gap-y-12 md:gap-20 max-w-sm md:max-w-none mx-auto"
          >
            <motion.a variants={popInItem} href="https://x.com/solnepiano?s=11" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center text-solne-dark/60 group-hover:text-solne-gold group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(184,153,117,0.15)] transition-all duration-500">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="tracking-[0.2em] text-xs text-solne-dark/50 group-hover:text-solne-dark transition-colors">X</span>
            </motion.a>

            <motion.a variants={popInItem} href="https://www.youtube.com/@SolnePianoScenery" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center text-solne-dark/60 group-hover:text-solne-gold group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(184,153,117,0.15)] transition-all duration-500">
                <Youtube className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="tracking-[0.2em] text-xs text-solne-dark/50 group-hover:text-solne-dark transition-colors">YouTube</span>
            </motion.a>
            
            <motion.a variants={popInItem} href="https://www.instagram.com/solne_piano_scenery/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center text-solne-dark/60 group-hover:text-solne-gold group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(184,153,117,0.15)] transition-all duration-500">
                <Instagram className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="tracking-[0.2em] text-xs text-solne-dark/50 group-hover:text-solne-dark transition-colors">Instagram</span>
            </motion.a>
            
            <motion.a variants={popInItem} href="https://www.tiktok.com/@solne.piano.scenery?_r=1&_t=ZS-95R4K7BwjHs" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center text-solne-dark/60 group-hover:text-solne-gold group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(184,153,117,0.15)] transition-all duration-500">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </div>
              <span className="tracking-[0.2em] text-xs text-solne-dark/50 group-hover:text-solne-dark transition-colors">TikTok</span>
            </motion.a>
          </motion.div>
        </Section>

      </main>

      <footer className="py-12 text-center text-solne-dark/30 text-xs tracking-[0.2em] relative z-10 font-light">
        <p>&copy; {new Date().getFullYear()} Solne Piano Scenery. All rights reserved.</p>
      </footer>
    </div>
  );
}
