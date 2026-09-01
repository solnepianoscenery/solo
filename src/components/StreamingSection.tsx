import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Headphones, Sparkles, Radio } from 'lucide-react';

interface PlatformLogo {
  name: string;
  subText?: string;
  renderIcon: () => ReactNode;
}

const PLATFORM_LOGOS: PlatformLogo[] = [
  {
    name: 'Apple Music',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#FC3C44] to-[#F9243C] flex items-center justify-center shadow-md">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Spotify',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1DB954] flex items-center justify-center shadow-md">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-black fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.348-1.435-5.304-1.76-8.785-.963-.335.077-.67-.133-.746-.469-.077-.334.132-.67.467-.746 3.808-.87 7.076-.496 9.714 1.115.295.18.387.563.207.856zm1.223-2.724c-.227.368-.711.484-1.08.257-2.688-1.652-6.785-2.131-9.965-1.166-.413.127-.85-.107-.977-.52-.127-.414.107-.851.52-.978 3.632-1.102 8.147-.568 11.245 1.327.369.227.484.712.257 1.08zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.13-1.168-.624-.15-.494.13-1.018.624-1.168 3.532-1.072 9.404-.866 13.115 1.337.445.264.59.838.327 1.282-.264.443-.838.59-1.281.326z"/>
        </svg>
      </div>
    ),
  },
  {
    name: 'YouTube Music',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FF0000] flex items-center justify-center shadow-md">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2 1l5-3-5-3v6z"/>
        </svg>
      </div>
    ),
  },
  {
    name: 'LINE MUSIC',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#00C300] flex items-center justify-center shadow-md">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 4v8.5c-.7-.4-1.5-.6-2.5-.6-2.5 0-4.5 1.8-4.5 4s2 4 4.5 4 4.5-1.8 4.5-4V8h4V4h-6z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Amazon Music',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#141B26] border border-[#25D1DA]/30 flex flex-col items-center justify-center shadow-md px-1">
        <span className="text-[9px] font-bold text-white tracking-tighter leading-none mb-0.5">amazon</span>
        <span className="text-[7px] font-bold text-[#25D1DA] tracking-widest leading-none">MUSIC</span>
      </div>
    ),
  },
  {
    name: 'AWA',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black flex items-center justify-center shadow-md">
        <span className="text-white font-black text-xs sm:text-sm tracking-widest">AWA</span>
      </div>
    ),
  },
  {
    name: 'iTunes Store',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#EA4CC0] via-[#C33FB8] to-[#6A1B9A] flex items-center justify-center shadow-md">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
        </svg>
      </div>
    ),
  },
  {
    name: 'レコチョク',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#E6007E] flex items-center justify-center shadow-md">
        <span className="text-white font-extrabold text-lg sm:text-xl font-sans">レ</span>
      </div>
    ),
  },
  {
    name: 'mora',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1A1A1A] flex flex-col items-center justify-center shadow-md gap-0.5">
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-1 h-3 bg-white rounded-t-sm"></span>
          <span className="w-1 h-2 bg-white rounded-t-sm"></span>
          <span className="w-1 h-3 bg-white rounded-t-sm"></span>
        </div>
        <span className="text-[7px] font-bold text-white tracking-tight">mora</span>
      </div>
    ),
  },
  {
    name: 'Rakuten Music',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#BF0000] flex flex-col items-center justify-center shadow-md px-1">
        <span className="text-[8px] font-bold text-white tracking-tighter leading-none">Rakuten</span>
        <span className="text-[6.5px] font-medium text-white/90 tracking-wide leading-none mt-0.5">music</span>
      </div>
    ),
  },
  {
    name: 'Deezer',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#A238FF] flex items-center justify-center shadow-md">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    ),
  },
  {
    name: 'KKBOX',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#00B4D8] flex items-center justify-center shadow-md">
        <span className="text-white font-black text-sm sm:text-base">K</span>
      </div>
    ),
  },
  {
    name: 'dヒッツ',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#CC0033] flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-[10px] sm:text-xs">dヒッツ</span>
      </div>
    ),
  },
  {
    name: 'au うたパス',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FF6600] flex flex-col items-center justify-center shadow-md">
        <span className="text-white font-bold text-[8px] leading-tight">au</span>
        <span className="text-white text-[7px] leading-tight">うたパス</span>
      </div>
    ),
  },
  {
    name: 'music.jp',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#DC2626] flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-xs sm:text-sm">m.</span>
      </div>
    ),
  },
  {
    name: 'ドワンゴ',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0EA5E9] flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-[8px] sm:text-[9px] leading-tight text-center">ドワンゴ<br/>JP</span>
      </div>
    ),
  },
  {
    name: 'Shazam',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0088FF] flex items-center justify-center shadow-md">
        <span className="text-white font-black text-sm sm:text-base italic">S</span>
      </div>
    ),
  },
  {
    name: 'TikTok',
    renderIcon: () => (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black flex items-center justify-center shadow-md">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 6.33 6.32 6.33 6.33 0 0 0 6.34-6.32V8a8.3 8.3 0 0 0 4.92 1.6V6.15a4.83 4.83 0 0 1-1-.46z"/>
        </svg>
      </div>
    ),
  },
];

export function StreamingSection() {
  const LINKCORE_URL = "https://linkco.re/07Pp0aez";

  return (
    <section id="streaming" className="w-full py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl mb-6 tracking-[0.2em] text-solne-dark flex items-center gap-4 md:gap-6">
          <span className="w-8 md:w-16 h-[1px] bg-solne-gold/50"></span>
          Streaming
          <span className="w-8 md:w-16 h-[1px] bg-solne-gold/50"></span>
        </h2>

        <p className="text-xs md:text-sm tracking-[0.25em] text-solne-dark/60 mb-12 md:mb-16 font-light text-center">
          各社音楽配信サービスにて配信中
        </p>

        {/* Main Card Container */}
        <div className="w-full bg-white/40 backdrop-blur-md rounded-3xl border border-white/70 shadow-[0_20px_50px_rgba(32,45,70,0.06)] p-6 sm:p-8 md:p-12 transition-all duration-700 hover:shadow-[0_25px_60px_rgba(219,157,100,0.15)] relative overflow-hidden">
          
          {/* Subtle Decorative Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-solne-gold/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-solne-dark/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            
            {/* Left: LinkCore Embed Player Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-auto flex flex-col items-center shrink-0"
            >
              <div className="relative group">
                {/* Glow ring on hover */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-solne-gold/30 via-solne-gold/50 to-solne-gold/30 rounded-[26px] blur-sm opacity-50 group-hover:opacity-100 transition duration-700"></div>
                
                <div className="relative rounded-[22px] overflow-hidden bg-white shadow-2xl border border-white/80 w-[300px] h-[600px] flex items-center justify-center">
                  <iframe 
                    src="https://linkco.re/embed/07Pp0aez" 
                    width="300" 
                    height="600" 
                    frameBorder="0"
                    title="Solne 配信サービス (LinkCore)"
                    className="w-[300px] h-[600px] border-0"
                    loading="lazy"
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>

              {/* Direct Link button below widget */}
              <a
                href={LINKCORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs tracking-widest text-solne-dark/70 hover:text-solne-gold transition-colors duration-300 group"
              >
                <span>プレーヤーが表示されない方はこちら</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Right: Explanation & Streaming Service Logo Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solne-gold/15 text-solne-gold text-xs tracking-[0.2em] border border-solne-gold/30 mb-6 font-medium">
                <Headphones className="w-3.5 h-3.5" />
                <span>NOW STREAMING</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.15em] text-solne-dark mb-4 leading-snug">
                過去のオリジナル楽曲が<br className="hidden sm:inline" />
                各種サービスで配信開始
              </h3>

              <p className="text-xs sm:text-sm md:text-base leading-relaxed tracking-wider text-solne-dark/75 font-light mb-8 max-w-xl">
                Apple Music、Spotify、LINE MUSIC、YouTube Music、Amazon Musicをはじめとする主要な定額制聴き放題サービスおよびダウンロードストアにて、Solneの楽曲をお楽しみいただけます。
                <br className="hidden md:inline" />
                お使いのミュージックアプリでぜひライブラリ登録やプレイリスト追加をしてお聴きください。
              </p>

              {/* Primary Call to Action Button */}
              <div className="mb-10 w-full sm:w-auto">
                <a 
                  href={LINKCORE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-solne-gold text-white tracking-[0.2em] font-medium hover:bg-solne-gold/90 transition-all duration-300 shadow-[0_4px_20px_rgba(219,157,100,0.35)] hover:shadow-[0_6px_25px_rgba(219,157,100,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-3 border border-solne-gold"
                >
                  <Sparkles className="w-4 h-4 text-amber-100" />
                  <span>配信サービス一覧を開く (LinkCore)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Clean Visual Service Logos Grid (No Redundant Links) */}
              <div className="w-full pt-6 border-t border-solne-gold/20">
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="text-[11px] sm:text-xs tracking-[0.2em] text-solne-dark/70 font-medium flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-solne-gold" />
                    配信プラットフォーム一覧（35サービス以上）
                  </span>
                  <span className="text-[10px] tracking-wider text-solne-gold font-light">全サービス対応</span>
                </div>

                {/* Clean Logo Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 w-full">
                  {PLATFORM_LOGOS.map((platform, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white/60 border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(219,157,100,0.18)] hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 group select-none"
                    >
                      <div className="transform group-hover:scale-105 transition-transform duration-300">
                        {platform.renderIcon()}
                      </div>
                      <span className="text-[10px] sm:text-[11px] tracking-wider text-solne-dark/70 font-medium mt-2 text-center truncate max-w-full group-hover:text-solne-dark transition-colors">
                        {platform.name}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[10px] sm:text-[11px] tracking-wider text-solne-dark/50 text-center lg:text-left font-light">
                  ※ 各アプリ内にてアーティスト名「Solne」で検索してもご視聴いただけます。
                </p>
              </div>

            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
