import ParticleBackground from './components/ParticleBackground';
import CherryBlossom from './components/CherryBlossom';
import Nemophila from './components/Nemophila';
import TikTokProfileEmbed from './components/TikTokProfileEmbed';
import { Section } from './components/Section';
import { motion } from 'motion/react';
import { Instagram, Youtube, Music2, FileText, ArrowUp, Sun, Moon, ExternalLink, ArrowRight } from 'lucide-react';
import { ScrollCarousel } from './components/ScrollCarousel';

// Uploaded images
const LOGO_URL = "https://i.imgur.com/3gkwo9v.png";
const CHAR_URL = "https://i.imgur.com/0ipCuQk.png";

export default function App() {
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
          {['News', 'About', 'Music', 'Sheet', 'Link'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`}
                className="text-solne-dark/60 hover:text-solne-dark transition-all duration-300 relative group flex items-center gap-2"
              >
                <span className="w-0 h-[1px] bg-solne-gold transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
                <span className="group-hover:-translate-y-0.5 transition-transform duration-300 inline-block">{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      <main className="pt-32 pb-20 flex flex-col items-center relative z-10">
        
        {/* Hero Section */}
        <section className="w-full min-h-[90vh] flex flex-col items-center justify-start relative px-6 pt-10 pb-20 overflow-hidden">
          
          {/* Hero Background Watermark */}
          <div className="absolute inset-x-0 top-0 h-[120vh] pointer-events-none z-0 -mt-20">
            <div 
              className="w-full h-full opacity-60 bg-cover bg-center object-cover mix-blend-normal"
              style={{ backgroundImage: `url('https://i.imgur.com/J5oQejK.jpeg')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/50 to-solne-light"></div>
          </div>

          {/* Floral Effects */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Nemophila />
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
            <div className="absolute inset-0 bg-white/80 blur-[60px] rounded-full transform translate-y-6 scale-[1.6] -z-10"></div>
            
            {/* Orbit Track & Elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3, delay: 1, ease: "easeOut" }}
                className="w-[72%] md:w-[68%] aspect-square rounded-full border-[0.5px] border-solne-gold/15 absolute"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ 
                  opacity: { duration: 3, delay: 1, ease: "easeOut" },
                  rotate: { duration: 45, repeat: Infinity, ease: "linear" }
                }}
                className="w-[72%] md:w-[68%] aspect-square rounded-full relative"
              >
                {/* Sun */}
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-solne-gold/20 blur-md rounded-full scale-[2]"></div>
                    <Sun className="w-5 h-5 md:w-6 md:h-6 text-solne-gold drop-shadow-[0_0_8px_rgba(184,153,117,0.6)]" strokeWidth={0.75} />
                  </motion.div>
                </div>
                {/* Moon */}
                <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-solne-dark/10 blur-md rounded-full scale-[2]"></div>
                    <Moon className="w-5 h-5 md:w-6 md:h-6 text-solne-dark drop-shadow-[0_0_8px_rgba(58,38,40,0.3)]" strokeWidth={0.75} />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <img 
              src={LOGO_URL} 
              alt="Solne Logo" 
              className="w-[85vw] md:w-[500px] lg:w-[600px] object-contain relative z-10 drop-shadow-2xl mix-blend-multiply"
            />
            </motion.div>
          </div>

          {/* New Song Promo Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
            className="w-full max-w-5xl relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-md border border-white/60"
          >
            {/* Watermark Background */}
            <div 
              className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: `url('https://i.imgur.com/J5oQejK.jpeg')` }}
            ></div>

            <div className="relative z-20 flex flex-col items-center justify-center gap-8 p-8 md:p-12 lg:p-16 text-center">
              {/* Text Content */}
              <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <motion.span 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm text-solne-dark text-sm md:text-base tracking-widest border border-blue-200 shadow-md font-medium"
                  >
                    <span className="text-lg">🌿</span> 2nd. 作品公開
                  </motion.span>
                  <motion.a 
                    href="https://store.piascore.com/scores/417018"
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-solne-gold text-white text-sm md:text-base tracking-widest border border-solne-gold shadow-lg font-medium hover:bg-solne-gold/90 transition-colors"
                  >
                    <FileText className="w-4 h-4" /> 楽譜 公開中
                  </motion.a>
                </div>
                
                <h3 className="text-lg md:text-2xl tracking-[0.2em] text-solne-dark/90 font-light mb-4 whitespace-nowrap">
                  <span className="font-sans">2</span>nd. Original Piano Solo
                </h3>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] text-solne-dark font-medium mb-10 drop-shadow-sm whitespace-nowrap">
                  「碧に包まれて」
                </h2>
              </div>

              {/* YouTube Full Video Embed */}
              <div className="w-full max-w-4xl relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-4 border-white/80 bg-white aspect-video">
                <iframe 
                  src="https://www.youtube.com/embed/_WpV5B3S9dI" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full z-10"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </section>

        {/* TikTok Section */}
        <Section id="tiktok" className="bg-white/30 backdrop-blur-md w-full max-w-none pt-32 pb-0 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
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
            
            <div className="w-full text-left space-y-4">
              {/* News Item: 2nd Original Sheet Release */}
              <div className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.05.19</time>
                <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
                  <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
                    <span className="font-sans">2</span>nd. Original 作品「碧に包まれて」の楽譜を公開しました。
                  </p>
                  <a 
                    href="https://store.piascore.com/scores/417018" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest text-solne-gold border border-solne-gold/30 px-3 py-1 rounded-full hover:bg-solne-gold hover:text-white transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" /> Piascoreで購入
                  </a>
                </div>
              </div>

              {/* News Item: 2nd Original Release */}
              <div className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.05.11</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    <span className="font-sans">2</span>nd. Original 作品「碧に包まれて」フルMV公開しました。
                  </p>
                </div>
              </div>

              {/* News Item: Sheet Music Release */}
              <div className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.12</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    <span className="font-sans">1</span>st. Original 作品「桜色の夢」の楽譜を公開しました。
                  </p>
                </div>
              </div>

              {/* News Item: Full MV Release */}
              <div className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.11</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    <span className="font-sans">1</span>st. Original 作品「桜色の夢」のフルMVを公開しました。
                  </p>
                </div>
              </div>

              {/* News Item: TikTok Launch */}
              <div className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.09</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    TikTokアカウントを開設しました。
                  </p>
                </div>
              </div>

              {/* News Item: Teaser Video */}
              <div className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.07</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    <span className="font-sans">1</span>st. Original 作品「桜色の夢」予告動画公開しました。
                  </p>
                </div>
              </div>

              {/* News Item: Website Launch */}
              <div className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40">
                <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">2026.04.05</time>
                <div className="flex-1">
                  <p className="text-solne-dark/70 group-hover:text-solne-dark transition-colors leading-relaxed tracking-wider font-light text-sm md:text-base">
                    公式サイトを公開しました。今後の新曲情報などはこちらでお知らせいたします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" className="relative group w-full max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(219,157,100,0.15)] -z-10 mt-16 md:mt-0"></div>
          
          <div className="py-12 md:py-20 px-4 md:px-12 w-full flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl mb-12 md:mb-16 tracking-[0.2em] text-solne-dark flex flex-col items-center gap-4 mt-10 md:mt-0">
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-solne-gold mb-1 font-medium bg-white/50 px-4 py-1 rounded-full border border-solne-gold/20 shadow-sm">PROFILE</span>
              <div className="flex items-center gap-6">
                <span className="w-8 md:w-16 h-[1px] bg-solne-gold/50"></span>
                About
                <span className="w-8 md:w-16 h-[1px] bg-solne-gold/50"></span>
              </div>
            </h2>
            
            <div className="space-y-10 md:space-y-12 text-sm md:text-lg leading-[2.2] md:leading-[2.5] tracking-[0.15em] text-solne-dark flex flex-col items-center text-center">
              
              <div className="space-y-3 md:space-y-4">
                <p className="text-xl md:text-3xl font-serif text-solne-dark tracking-[0.2em]">Solne</p>
                <p className="text-solne-gold font-medium tracking-[0.3em] text-[11px] md:text-sm">— 情景作曲家 ＆ 独学ピアニスト —</p>
              </div>

              <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-transparent via-solne-gold/40 to-transparent"></div>

              <div className="space-y-6 md:space-y-8 font-light text-solne-dark/80 px-2 md:px-0 w-full flex flex-col items-center bg-white/20 p-8 md:p-12 rounded-[2rem] border border-white/50 shadow-[0_4px_20px_rgba(219,157,100,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-solne-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-solne-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                
                <p className="text-[13px] sm:text-[14px] md:text-base leading-loose md:leading-[2.5] hidden md:block tracking-[0.2em] relative z-10 text-center">
                  情景が浮かぶ<br />
                  オリジナルピアノソロ曲や、<br />
                  様々な曲の「弾いてみた」を<br />
                  投稿しています。
                </p>
                <p className="text-[13px] leading-[2.4] block md:hidden tracking-[0.15em] relative z-10 text-center">
                  情景が浮かぶ<br />オリジナルピアノソロ曲や、<br />
                  様々な曲の「弾いてみた」を<br />投稿しています。
                </p>
              </div>
              
              <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-transparent via-solne-gold/40 to-transparent"></div>

              <p className="text-[11px] sm:text-xs md:text-[14px] text-solne-dark/60 font-light max-w-xl mx-auto px-4 pb-8 md:pb-0 leading-[2] tracking-[0.15em]">
                このサイトでは、活動紹介や新曲のご案内など、<br className="hidden sm:block" />
                Solneの音楽の世界への入り口をお届けします。
              </p>
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
            {/* Song Card: 碧に包まれて */}
            <a 
              href="https://youtu.be/_WpV5B3S9dI" 
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
                  <a 
                    href="https://store.piascore.com/scores/417018"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] md:text-xs tracking-widest text-solne-gold/70 hover:text-solne-gold transition-all flex items-center justify-center gap-2 py-1"
                  >
                    <FileText className="w-4 h-4" /> Sheet Music Available
                  </a>
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
              {/* Sheet Music Card: 碧に包まれて */}
              <a 
                href="https://store.piascore.com/scores/417018" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group shrink-0 w-[78vw] sm:w-[300px] md:w-auto snap-start flex flex-col bg-white/50 backdrop-blur-md border border-white/60 rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(32,45,70,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(219,157,100,0.2)] hover:-translate-y-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-solne-light">
                  {/* New Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-solne-gold text-white text-[9px] tracking-[0.2em] px-3 py-1 rounded-full shadow-lg font-medium animate-pulse">
                      NEW
                    </div>
                  </div>
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
                    <FileText className="w-3 h-3" /> Piascoreで購入 <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>

              {/* Sheet Music Card: 桜色の夢 */}
              <a 
                href="https://store.piascore.com/scores/408615" 
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
                    <FileText className="w-3 h-3" /> Piascoreで購入 <ExternalLink className="w-3 h-3" />
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
          
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-x-4 gap-y-12 md:gap-20 max-w-sm md:max-w-none mx-auto">
            <a href="https://x.com/solnepiano" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center text-solne-dark/60 group-hover:text-solne-gold group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(184,153,117,0.15)] transition-all duration-500">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="tracking-[0.2em] text-xs text-solne-dark/50 group-hover:text-solne-dark transition-colors">X</span>
            </a>

            <a href="https://www.youtube.com/@SolnePianoScenery" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center text-solne-dark/60 group-hover:text-solne-gold group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(184,153,117,0.15)] transition-all duration-500">
                <Youtube className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="tracking-[0.2em] text-xs text-solne-dark/50 group-hover:text-solne-dark transition-colors">YouTube</span>
            </a>
            
            <a href="https://www.instagram.com/solne_piano_scenery/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center text-solne-dark/60 group-hover:text-solne-gold group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(184,153,117,0.15)] transition-all duration-500">
                <Instagram className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="tracking-[0.2em] text-xs text-solne-dark/50 group-hover:text-solne-dark transition-colors">Instagram</span>
            </a>
            
            <a href="https://www.tiktok.com/@solne.piano.scenery?_r=1&_t=ZS-95R4K7BwjHs" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center text-solne-dark/60 group-hover:text-solne-gold group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(184,153,117,0.15)] transition-all duration-500">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </div>
              <span className="tracking-[0.2em] text-xs text-solne-dark/50 group-hover:text-solne-dark transition-colors">TikTok</span>
            </a>
          </div>
        </Section>

      </main>

      <footer className="py-12 text-center text-solne-dark/30 text-xs tracking-[0.2em] relative z-10 font-light">
        <p>&copy; {new Date().getFullYear()} Solne Piano Scenery. All rights reserved.</p>
      </footer>
    </div>
  );
}
