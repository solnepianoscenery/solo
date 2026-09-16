import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './Section';
import { Headphones, Youtube, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface NewsAction {
  text: string;
  href: string;
  icon?: 'Headphones' | 'Youtube' | 'FileText';
  primary?: boolean;
}

interface NewsItem {
  id: string;
  date: string;
  content: string | ReactNode;
  actions?: NewsAction[];
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 'news-togasumi-release-20260912',
    date: '2026.09.12',
    content: (
      <>
        <span className="font-sans">4</span>th. Original 作品「遠霞」をYouTubeにて公開しました。
      </>
    ),
    actions: [
      {
        text: 'MVを視聴する',
        href: 'https://youtu.be/1u4YRlJjqGM',
        icon: 'Youtube',
        primary: true,
      },
    ],
  },
  {
    id: 'news-streaming-20260901',
    date: '2026.09.01',
    content: '過去のオリジナル楽曲が各種音楽配信サービス（Apple Music、Spotify、LINE MUSIC、Amazon Musicなど）にて一挙配信開始となりました。',
    actions: [
      {
        text: '配信サービス一覧を見る',
        href: '#streaming',
        icon: 'Headphones',
        primary: true,
      },
    ],
  },
  {
    id: 'news-ao-perf-20260809',
    date: '2026.08.09',
    content: (
      <>
        <span className="font-sans">2</span>nd. Original 作品「碧に包まれて」の本人演奏動画をYouTubeにて公開しました。
      </>
    ),
    actions: [
      {
        text: '演奏動画を視聴する',
        href: 'https://youtu.be/gF1A2e0RqsE',
        icon: 'Youtube',
        primary: false,
      },
    ],
  },
  {
    id: 'news-hanabi-sheet-20260717',
    date: '2026.07.17',
    content: (
      <>
        <span className="font-sans">3</span>rd. Original 作品「夏灯花火」の楽譜を公開しました。mucomeにてお買い求めいただけます。
      </>
    ),
    actions: [
      {
        text: '楽譜を購入する',
        href: 'https://mucome.net/work?id=164509',
        icon: 'FileText',
        primary: true,
      },
      {
        text: 'MVを視聴する',
        href: 'https://youtu.be/uo7kyZqZD0k',
        icon: 'Youtube',
        primary: false,
      },
    ],
  },
  {
    id: 'news-hanabi-mv-20260711',
    date: '2026.07.11',
    content: (
      <>
        <span className="font-sans">3</span>rd. Original 作品「夏灯花火」を公開しました。
      </>
    ),
    actions: [
      {
        text: '視聴する',
        href: 'https://youtu.be/uo7kyZqZD0k',
        icon: 'Youtube',
        primary: false,
      },
    ],
  },
  {
    id: 'news-platform-mucome-20260629',
    date: '2026.06.29',
    content: '楽譜の公開場所をPiascoreからmucomeへと移行いたしました。今後はこちらからお買い求めいただけます。',
  },
  {
    id: 'news-hanabi-shorts-20260628',
    date: '2026.06.28',
    content: (
      <>
        <span className="font-sans">3</span>rd. Original 作品「夏灯花火」のショート予告動画をYouTubeにて公開しました。
      </>
    ),
  },
  {
    id: 'news-hanabi-teaser-20260621',
    date: '2026.06.21',
    content: (
      <>
        <span className="font-sans">3</span>rd. Original 作品「夏灯花火」の公開予告を発表しました。7月12日(日) 21:00 公開予定です。
      </>
    ),
  },
  {
    id: 'news-ao-sheet-20260519',
    date: '2026.05.19',
    content: (
      <>
        <span className="font-sans">2</span>nd. Original 作品「碧に包まれて」の楽譜を公開しました。
      </>
    ),
    actions: [
      {
        text: 'mucomeで購入',
        href: 'https://mucome.net/work?id=163660',
        icon: 'FileText',
        primary: false,
      },
    ],
  },
  {
    id: 'news-ao-mv-20260511',
    date: '2026.05.11',
    content: (
      <>
        <span className="font-sans">2</span>nd. Original 作品「碧に包まれて」フルMV公開しました。
      </>
    ),
  },
  {
    id: 'news-sakura-sheet-20260412',
    date: '2026.04.12',
    content: (
      <>
        <span className="font-sans">1</span>st. Original 作品「桜色の夢」の楽譜を公開しました。
      </>
    ),
  },
  {
    id: 'news-sakura-mv-20260411',
    date: '2026.04.11',
    content: (
      <>
        <span className="font-sans">1</span>st. Original 作品「桜色の夢」のフルMVを公開しました。
      </>
    ),
  },
  {
    id: 'news-tiktok-20260409',
    date: '2026.04.09',
    content: 'TikTokアカウントを開設しました。',
  },
  {
    id: 'news-sakura-teaser-20260407',
    date: '2026.04.07',
    content: (
      <>
        <span className="font-sans">1</span>st. Original 作品「桜色の夢」予告動画公開しました。
      </>
    ),
  },
  {
    id: 'news-site-launch-20260405',
    date: '2026.04.05',
    content: '公式サイトを公開しました。今後の新曲情報などはこちらでお知らせいたします。',
  },
];

const INITIAL_DISPLAY_COUNT = 4;

function ActionIcon({ icon }: { icon?: string }) {
  switch (icon) {
    case 'Headphones':
      return <Headphones className="w-3.5 h-3.5" />;
    case 'Youtube':
      return <Youtube className="w-3.5 h-3.5" />;
    case 'FileText':
      return <FileText className="w-3.5 h-3.5" />;
    default:
      return null;
  }
}

function NewsCard({ item, popInItem }: { item: NewsItem; popInItem?: any; key?: string | number }) {
  return (
    <motion.div 
      variants={popInItem}
      className="group flex flex-col md:flex-row gap-2 md:gap-12 border-b border-solne-gold/10 pb-4 transition-all duration-500 hover:border-solne-gold/40"
    >
      <time className="text-solne-gold tracking-widest shrink-0 w-32 font-light text-sm md:text-base">
        {item.date}
      </time>
      <div className="flex-1 text-solne-dark/70 group-hover:text-solne-dark transition-all duration-300">
        <p className="leading-relaxed tracking-wider font-light text-sm md:text-base mb-2">
          {item.content}
        </p>
        {item.actions && item.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.actions.map((act, actIdx) => (
              <a
                key={actIdx}
                href={act.href}
                target={act.href.startsWith('http') ? '_blank' : undefined}
                rel={act.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`inline-flex items-center gap-1.5 text-[10px] md:text-xs tracking-widest px-3 py-1 rounded-full transition-all ${
                  act.primary
                    ? 'text-white bg-solne-gold border border-solne-gold hover:bg-solne-gold/80 shadow-sm'
                    : 'text-solne-gold border border-solne-gold/30 hover:bg-solne-gold hover:text-white'
                }`}
              >
                <ActionIcon icon={act.icon} />
                <span>{act.text}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface NewsSectionProps {
  staggerContainer?: any;
  popInItem?: any;
}

export function NewsSection({ staggerContainer, popInItem }: NewsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialNews = NEWS_DATA.slice(0, INITIAL_DISPLAY_COUNT);
  const extraNews = NEWS_DATA.slice(INITIAL_DISPLAY_COUNT);
  const remainingCount = extraNews.length;

  const defaultStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const defaultPopIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const activePopIn = popInItem || defaultPopIn;

  return (
    <Section id="news" className="bg-white/30 backdrop-blur-md w-full max-w-none py-16 md:py-24 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
      <div className="max-w-3xl mx-auto w-full px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl mb-8 tracking-[0.2em] text-solne-dark flex items-center gap-6">
          <span className="w-12 h-[1px] bg-solne-gold/50"></span>
          News
          <span className="w-12 h-[1px] bg-solne-gold/50"></span>
        </h2>
        
        <motion.div 
          variants={staggerContainer || defaultStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full text-left space-y-4"
        >
          {/* Always Visible Top Items */}
          {initialNews.map((item) => (
            <NewsCard key={item.id} item={item} popInItem={activePopIn} />
          ))}

          {/* Expandable Extra Items */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="space-y-4 overflow-hidden"
              >
                {extraNews.map((item) => (
                  <NewsCard key={item.id} item={item} popInItem={activePopIn} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expand / Collapse Button */}
        {remainingCount > 0 && (
          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/70 hover:bg-white border border-solne-gold/30 hover:border-solne-gold text-xs md:text-sm tracking-[0.2em] text-solne-dark/80 hover:text-solne-dark shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <span className="font-light">
                {isExpanded ? '過去のお知らせを閉じる' : `過去のお知らせをもっと見る (+${remainingCount}件)`}
              </span>
              <div className="w-5 h-5 rounded-full bg-solne-gold/10 group-hover:bg-solne-gold/20 flex items-center justify-center text-solne-gold transition-colors">
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
