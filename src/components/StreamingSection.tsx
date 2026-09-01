import { motion } from 'motion/react';
import { ExternalLink, Headphones, Sparkles, Radio, Music } from 'lucide-react';

interface StreamingService {
  name: string;
  category: 'Subscription' | 'Store' | 'Radio';
  bgColor: string;
  textColor: string;
  borderColor?: string;
  iconType?: 'apple' | 'spotify' | 'ytmusic' | 'linemusic' | 'amazon' | 'awa' | 'itunes' | 'recochoku' | 'deezer' | 'default';
}

const STREAMING_SERVICES: StreamingService[] = [
  { name: 'Apple Music', category: 'Subscription', bgColor: 'bg-[#FA243C]/10 hover:bg-[#FA243C]/20', textColor: 'text-[#FA243C]', borderColor: 'border-[#FA243C]/30', iconType: 'apple' },
  { name: 'Spotify', category: 'Subscription', bgColor: 'bg-[#1DB954]/10 hover:bg-[#1DB954]/20', textColor: 'text-[#1DB954]', borderColor: 'border-[#1DB954]/30', iconType: 'spotify' },
  { name: 'YouTube Music', category: 'Subscription', bgColor: 'bg-[#FF0000]/10 hover:bg-[#FF0000]/20', textColor: 'text-[#FF0000]', borderColor: 'border-[#FF0000]/30', iconType: 'ytmusic' },
  { name: 'LINE MUSIC', category: 'Subscription', bgColor: 'bg-[#00C300]/10 hover:bg-[#00C300]/20', textColor: 'text-[#00C300]', borderColor: 'border-[#00C300]/30', iconType: 'linemusic' },
  { name: 'Amazon Music', category: 'Subscription', bgColor: 'bg-[#00A8E1]/10 hover:bg-[#00A8E1]/20', textColor: 'text-[#00A8E1]', borderColor: 'border-[#00A8E1]/30', iconType: 'amazon' },
  { name: 'AWA', category: 'Subscription', bgColor: 'bg-black/5 hover:bg-black/10', textColor: 'text-gray-900', borderColor: 'border-black/20', iconType: 'awa' },
  { name: 'iTunes Store', category: 'Store', bgColor: 'bg-[#EA4CC0]/10 hover:bg-[#EA4CC0]/20', textColor: 'text-[#EA4CC0]', borderColor: 'border-[#EA4CC0]/30', iconType: 'itunes' },
  { name: 'レコチョク', category: 'Store', bgColor: 'bg-[#E6007E]/10 hover:bg-[#E6007E]/20', textColor: 'text-[#E6007E]', borderColor: 'border-[#E6007E]/30', iconType: 'recochoku' },
  { name: 'mora', category: 'Store', bgColor: 'bg-solne-dark/5 hover:bg-solne-dark/15', textColor: 'text-solne-dark', borderColor: 'border-solne-dark/20' },
  { name: 'Rakuten Music', category: 'Subscription', bgColor: 'bg-[#BF0000]/10 hover:bg-[#BF0000]/20', textColor: 'text-[#BF0000]', borderColor: 'border-[#BF0000]/30' },
  { name: 'Deezer', category: 'Subscription', bgColor: 'bg-[#A238FF]/10 hover:bg-[#A238FF]/20', textColor: 'text-[#A238FF]', borderColor: 'border-[#A238FF]/30', iconType: 'deezer' },
  { name: 'KKBOX', category: 'Subscription', bgColor: 'bg-[#00B4D8]/10 hover:bg-[#00B4D8]/20', textColor: 'text-[#0077B6]', borderColor: 'border-[#00B4D8]/30' },
  { name: 'dヒッツ / dミュージック', category: 'Radio', bgColor: 'bg-[#CC0033]/10 hover:bg-[#CC0033]/20', textColor: 'text-[#CC0033]', borderColor: 'border-[#CC0033]/30' },
  { name: 'auスマートパス / うたパス', category: 'Subscription', bgColor: 'bg-[#FF6600]/10 hover:bg-[#FF6600]/20', textColor: 'text-[#FF6600]', borderColor: 'border-[#FF6600]/30' },
  { name: 'ドワンゴジェイピー / music.jp', category: 'Store', bgColor: 'bg-solne-gold/10 hover:bg-solne-gold/20', textColor: 'text-solne-gold', borderColor: 'border-solne-gold/30' },
  { name: 'TikTok / Instagram', category: 'Radio', bgColor: 'bg-black/5 hover:bg-black/10', textColor: 'text-gray-800', borderColor: 'border-black/20' },
];

function BrandIcon({ type }: { type?: string }) {
  switch (type) {
    case 'apple':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.92 1.07.08 2.14-.54 2.79-1.32z"/>
        </svg>
      );
    case 'spotify':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.348-1.435-5.304-1.76-8.785-.963-.335.077-.67-.133-.746-.469-.077-.334.132-.67.467-.746 3.808-.87 7.076-.496 9.714 1.115.295.18.387.563.207.856zm1.223-2.724c-.227.368-.711.484-1.08.257-2.688-1.652-6.785-2.131-9.965-1.166-.413.127-.85-.107-.977-.52-.127-.414.107-.851.52-.978 3.632-1.102 8.147-.568 11.245 1.327.369.227.484.712.257 1.08zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.13-1.168-.624-.15-.494.13-1.018.624-1.168 3.532-1.072 9.404-.866 13.115 1.337.445.264.59.838.327 1.282-.264.443-.838.59-1.281.326z"/>
        </svg>
      );
    case 'ytmusic':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2 1l5-3-5-3v6z"/>
        </svg>
      );
    case 'linemusic':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.499.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .626.285.626.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      );
    case 'amazon':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M13.958 10.09c0 1.25-.049 2.292-.708 3.375-.542.875-1.334 1.417-2.25 1.417-1.25 0-1.917-.958-1.917-2.375 0-2.792 2.5-3.333 4.875-3.333v.916zm3.417 6.75c-.208.167-.5.167-.708.042-.917-.75-1.084-1.125-1.584-1.833-.916 1.333-2.166 2.042-3.75 2.042-2.25 0-4.041-1.417-4.041-3.959 0-2 1.166-3.416 2.833-4.166 1.458-.667 3.5-.792 5.042-.959v-.375c0-.667.041-1.458-.375-2.041-.375-.542-1.084-.792-1.75-.792-1.25 0-2.375.625-2.667 1.916-.041.25-.25.459-.5.459l-2.083-.209c-.25-.041-.459-.25-.417-.541.5-2.459 2.708-3.625 5.583-3.625 1.459 0 3.375.416 4.417 1.583.958 1.083.875 2.458.875 3.917v4.625c0 1.25.5 1.791.958 2.458.167.208.167.5 0 .667-.458.416-1.291 1.208-1.833 1.75z"/>
        </svg>
      );
    default:
      return <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>;
  }
}

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

            {/* Right: Explanation & Streaming Service Grid */}
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

              {/* Service Logos / Platform Chips Showcase */}
              <div className="w-full pt-6 border-t border-solne-gold/20">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] tracking-[0.2em] text-solne-dark/60 font-medium flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-solne-gold" />
                    対応プラットフォーム一覧（一部抜粋）
                  </span>
                  <span className="text-[10px] tracking-wider text-solne-gold">全35+サービス対応</span>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5">
                  {STREAMING_SERVICES.map((service, index) => (
                    <a
                      key={index}
                      href={LINKCORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs tracking-wider transition-all duration-300 ${service.bgColor} ${service.textColor} ${service.borderColor || 'border-transparent'} hover:scale-105 shadow-sm`}
                    >
                      <BrandIcon type={service.iconType} />
                      <span className="font-medium">{service.name}</span>
                    </a>
                  ))}
                  
                  <div className="inline-flex items-center px-3 py-1.5 rounded-xl border border-dashed border-solne-dark/20 text-[11px] sm:text-xs tracking-wider text-solne-dark/50 bg-white/30">
                    <Music className="w-3 h-3 mr-1 text-solne-dark/40" />
                    <span>他多数のストア・配信先に対応</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
