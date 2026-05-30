import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Bell, BellRing, Coffee, Music, Calendar, Radio, PlayCircle, LogIn, Edit2, CheckCircle2, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StreamInfo {
  status: 'scheduled' | 'finished';
  scheduledAt: string | null;
}

export default function TwitCastingPanel() {
  const [streamInfo, setStreamInfo] = useState<StreamInfo>({ status: 'finished', scheduledAt: null });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [actualLiveStatus, setActualLiveStatus] = useState<boolean>(false);
  
  const notificationsEnabledRef = React.useRef(notificationsEnabled);
  useEffect(() => {
    notificationsEnabledRef.current = notificationsEnabled;
  }, [notificationsEnabled]);

  const initialFetchRef = React.useRef(true);
  const prevDataRef = React.useRef<StreamInfo | null>(null);

  // Poll actual TwitCasting Live Status
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const res = await fetch('/api/twitcasting/status');
        const data = await res.json();
        setActualLiveStatus(!!data.live);
      } catch (e) {
        console.error('Failed to fetch live status', e);
      }
    };
    checkLiveStatus();
    const timer = setInterval(checkLiveStatus, 60000); // every minute
    return () => clearInterval(timer);
  }, []);

  // Edit Form State
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
    
    // Secret Admin URL bypass
    const urlParams = new URLSearchParams(window.location.search);
    const adminMode = urlParams.get('admin');
    if (adminMode === 'piano') {
      localStorage.setItem('solne_admin', 'true');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const isLocalAdmin = localStorage.getItem('solne_admin') === 'true';
    if (isLocalAdmin) setIsAdmin(true);
    
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      // Check if logged in user is admin
      if ((user && user.email === 'ziepiano@gmail.com') || isLocalAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    const docRef = doc(db, 'site', 'streamInfo');
    const unsubDB = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as StreamInfo;
        setStreamInfo(data);
        if (data.scheduledAt) {
          const d = new Date(data.scheduledAt);
          // Convert to local YYYY-MM-DD and HH:MM format for the input fields
          setEditDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
          setEditTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
        }
        
        // Notify on actual data change from remote 
        // Ignore the very first time we load the data
        if (!initialFetchRef.current && prevDataRef.current) {
          if (notificationsEnabledRef.current && 'Notification' in window && Notification.permission === 'granted') {
            const prev = prevDataRef.current;
            // Avoid duplicate notifications from local writes, only rely on diff
            if (data.status !== prev.status || data.scheduledAt !== prev.scheduledAt) {
              let body = '配信情報が更新されました！';
              if (data.status === 'scheduled' && data.scheduledAt) {
                 const d = new Date(data.scheduledAt);
                 body = `次回配信が ${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} に予定されました！`;
              } else if (data.status === 'finished') {
                 body = '配信が終了し、更新待ちになりました。';
              }
              new Notification('ほのぼのピアノ練習部屋', { body });
            }
          }
        }
        prevDataRef.current = data;
      }
      initialFetchRef.current = false;
      setLoading(false);
    });

    return () => {
      unsubAuth();
      unsubDB();
    };
  }, []);

  // Update effect to periodically check for "Live" transition
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  const clickCountRef = React.useRef(0);
  const clickTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTitleClick = () => {
    if (isAdmin) return;
    clickCountRef.current += 1;
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      setTimeout(() => {
        const pass = window.prompt("管理パスワードを入力してください: \n(キャンセルで閉じます)");
        if (pass === "piano") {
          localStorage.setItem('solne_admin', 'true');
          setIsAdmin(true);
          alert("管理者モードに切り替わりました！");
        } else if (pass !== null) {
          alert("パスワードが違います。");
        }
      }, 50);
    } else {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1000);
    }
  };

  const handleSave = async (status: 'scheduled' | 'finished') => {
    setIsEditing(false);
    let scheduledAt = streamInfo.scheduledAt;
    
    if (status === 'scheduled') {
      if (!editDate || !editTime) {
        alert('Date and Time are required to schedule a stream.');
        return;
      }
      const newDate = new Date(`${editDate}T${editTime}:00`);
      scheduledAt = newDate.toISOString();
    }

    try {
      await setDoc(doc(db, 'site', 'streamInfo'), {
        status,
        scheduledAt,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      console.error(e);
      alert('Failed to save stream info. Error: ' + JSON.stringify(e));
    }
  };

  let streamStatus: 'waiting' | 'scheduled' | 'live' = 'waiting';
  
  if (actualLiveStatus) {
    streamStatus = 'live';
  } else if (streamInfo.status === 'scheduled' && streamInfo.scheduledAt) {
    const streamTime = new Date(streamInfo.scheduledAt);
    if (now >= streamTime) {
      // If time passed but TwitCasting is NOT live yet, we keep showing 'scheduled'
      // Or maybe 'live' with a small disclaimer? Let's show scheduled but meaning "starting soon" or "live"
      // User says "連動して自動化するように" (Automate with TwitCasting). Therefore:
      // Since actualLiveStatus is false, we don't show "LIVE" even if scheduled time arrived.
      // Wait, if actualLiveStatus is false, let's keep it as 'scheduled' so they know when it was *supposed* to start.
      streamStatus = 'scheduled';
    } else {
      streamStatus = 'scheduled';
    }
  }

  // Monitor status transitons internally (Timer crossover)
  const prevStreamStatusRef = React.useRef<string>('waiting');
  useEffect(() => {
    if (!loading && prevStreamStatusRef.current !== 'live' && streamStatus === 'live') {
      if (notificationsEnabledRef.current && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('ほのぼのピアノ練習部屋', { body: '配信がスタートしました！' });
      }
    }
    if (!loading) {
      prevStreamStatusRef.current = streamStatus;
    }
  }, [streamStatus, loading]);

  if (loading) return null;

  const requestNotification = async () => {
    if (!('Notification' in window)) {
      alert('【通知設定について】\n\niOSをお使いの場合、現在Appleの制限により「Safari」から「ホーム画面に追加」をした場合のみ通知がサポートされています。Chrome等のアプリからは通知を受け取れません。\n\nお手数ですが、Safariでこのページを開き、共有メニューから「ホーム画面に追加」をお試しください。追加したアプリアイコンから開くと通知が許可できるようになります。');
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification('通知オン', { body: '配信情報が更新されるとお知らせします！' });
      } else {
        alert('通知がブロックされています。ブラウザの設定をご確認ください。');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formatSchedule = (isoString: string) => {
    const d = new Date(isoString);
    return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`mb-4 relative overflow-hidden bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(32,45,70,0.15)]
              ${isAdmin ? 'w-[280px] sm:w-80 md:w-96 rounded-[24px] md:rounded-[32px]' : 'rounded-full md:rounded-[32px] md:w-96 min-w-[220px] max-w-[260px] md:max-w-none'}`}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#2FDC46]/60 to-[#108AF9]/60 opacity-50 z-0"></div>
            
            {/* --- DESKTOP VIEW & ADMIN FULL VIEW --- */}
            <div className={`${!isAdmin ? 'hidden md:flex' : 'flex'} flex-col items-center justify-center py-4 px-5 md:py-6 md:px-6 relative z-10 w-full`}>
              
              <div className="flex flex-col items-center gap-2 mb-6 text-center">
                <span className="text-[10px] tracking-[0.3em] text-[#108AF9] mb-2 font-medium bg-blue-50/50 px-4 py-1 rounded-full border border-[#108AF9]/20 shadow-sm flex items-center gap-1.5">
                  <Radio className="w-3 h-3" /> TwitCasting
                </span>
                <div className="relative inline-block mt-2">
                  <Coffee className="absolute -left-6 -top-4 w-5 h-5 text-solne-gold/40 -rotate-12" strokeWidth={1.5} />
                  <Music className="absolute -right-5 -top-2 w-4 h-4 text-solne-gold/40 rotate-12" strokeWidth={1.5} />
                  <h3 
                    onClick={handleTitleClick}
                    className="text-lg md:text-xl tracking-[0.1em] text-solne-dark font-medium relative z-10 px-4 cursor-default select-none"
                  >
                    ほのぼのピアノ練習部屋
                  </h3>
                </div>
                
                {/* Notification Subscribe Button */}
                <button 
                  onClick={() => {
                    if (!notificationsEnabled) requestNotification();
                    else setNotificationsEnabled(false);
                  }}
                  className={`mt-3 inline-flex items-center gap-1.5 text-[10px] tracking-widest px-3 py-1.5 rounded-full transition-all duration-300 border ${
                    !notificationsEnabled 
                      ? 'text-[#108AF9]/80 border-[#108AF9]/30 hover:bg-[#108AF9] hover:text-white' 
                      : 'text-green-600/80 bg-green-50 border-green-200/50 hover:bg-gray-100 hover:text-gray-500 hover:border-gray-200'
                  }`}
                >
                  {!notificationsEnabled ? (
                    <>
                      <Bell className="w-3 h-3" /> 配信通知を受け取る
                    </>
                  ) : (
                     <>
                       <BellRing className="w-3 h-3" /> 通知オン
                     </>
                  )}
                </button>
              </div>

              <div className="w-full flex flex-col items-center gap-6">
                {/* Status Display */}
                <div className={`
                  w-full rounded-[20px] flex flex-col items-center gap-3 transition-all duration-500 relative overflow-hidden shadow-sm border
                  ${streamStatus === 'live' ? 'bg-gradient-to-r from-[#2FDC46]/10 to-[#108AF9]/10 border-[#108AF9]/30 shadow-[0_10px_30px_rgba(16,138,249,0.15)] py-6' : 
                    streamStatus === 'scheduled' ? 'bg-white border-blue-100 py-4' :
                    'bg-gray-50/50 border-gray-100 py-4'}
                `}>
                  
                  {streamStatus === 'live' && (
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2FDC46] to-[#108AF9]"></div>
                  )}

                  {streamStatus === 'live' && (
                    <>
                      <div className="relative flex h-5 w-5 mt-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#108AF9] opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-[#108AF9] shadow-[0_0_15px_rgba(16,138,249,0.8)] items-center justify-center">
                           <Radio className="w-2.5 h-2.5 text-white" />
                        </span>
                      </div>
                      <span className="text-lg tracking-[0.2em] font-medium text-[#108AF9] drop-shadow-sm">現在配信中！</span>
                    </>
                  )}
                  {streamStatus === 'scheduled' && streamInfo.scheduledAt && (
                    <>
                      <div className="flex items-center gap-1.5 text-blue-400 mb-0.5">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                        <span className="text-[10px] tracking-[0.2em] font-bold">NEXT STREAM</span>
                      </div>
                      <span className="text-lg tracking-wider font-semibold text-solne-dark">
                        {formatSchedule(streamInfo.scheduledAt)}
                      </span>
                      <span className="text-[10px] text-blue-500/80 tracking-[0.2em] font-bold border border-blue-200/50 px-2.5 py-0.5 rounded-full mt-0.5 shadow-sm bg-blue-50/50">START</span>
                    </>
                  )}
                  {streamStatus === 'waiting' && (
                    <>
                      <Radio className="w-4 h-4 text-gray-300 mb-0.5" strokeWidth={1.5} />
                      <span className="text-xs tracking-widest font-light text-gray-400 text-center leading-relaxed">
                        現在配信はお休み中です<br/>
                        次回の更新をお待ちください
                      </span>
                    </>
                  )}
                </div>

                {/* Visit Link */}
                <a 
                  href="https://twitcasting.tv/c:ziepiano" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`
                    group/btn relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-white rounded-full transition-all duration-500 overflow-hidden shadow-sm w-full
                    ${streamStatus === 'live' ? 'border-2 border-[#108AF9] text-[#108AF9] hover:shadow-[0_10px_30px_rgba(16,138,249,0.3)]' : 'border border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}
                  `}
                >
                  {streamStatus === 'live' && (
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#2FDC46]/10 to-[#108AF9]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
                  )}
                  <PlayCircle className="w-4 h-4 relative z-10" />
                  <span className="text-xs tracking-widest font-medium relative z-10 transition-colors">
                    配信ページへ
                  </span>
                </a>
              </div>

            </div>

            {/* --- MOBILE COMPACT VIEW (Visible only if NOT Admin) --- */}
            {!isAdmin && (
               <div className="md:hidden flex items-center gap-2.5 w-auto p-1.5 pr-8 relative z-10">
                 <a href="https://twitcasting.tv/c:ziepiano" target="_blank" rel="noopener noreferrer" 
                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${streamStatus === 'live' ? 'bg-[#108AF9] text-white' : 'bg-[#108AF9]/5 text-[#108AF9] border border-[#108AF9]/20 hover:bg-[#108AF9]/10'}`}>
                   <PlayCircle className="w-6 h-6 ml-0.5" />
                 </a>
                 <div className="flex flex-col flex-1 justify-center min-w-[120px]">
                    <span className="text-[9px] tracking-widest text-[#108AF9] font-medium flex items-center gap-1 mb-0.5">
                      <Radio className="w-2.5 h-2.5" /> TwitCasting
                    </span>
                    {streamStatus === 'live' ? (
                      <span className="text-[11px] font-bold text-[#108AF9] tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#108AF9] rounded-full animate-ping"></span>現在配信中！
                      </span>
                    ) : streamStatus === 'scheduled' && streamInfo.scheduledAt ? (
                      <span className="text-[11px] font-bold text-solne-dark tracking-wider flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-400" />
                        {formatSchedule(streamInfo.scheduledAt)}
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400 tracking-widest">お休み中</span>
                    )}
                 </div>
                 
                 {/* Mobile Notification Toggle */}
                 <button 
                  onClick={() => {
                    if (!notificationsEnabled) requestNotification();
                    else setNotificationsEnabled(false);
                  }}
                  className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm transition-colors
                    ${!notificationsEnabled ? 'text-gray-400 border-gray-200 bg-white hover:bg-gray-50' : 'text-green-500 border-green-200 bg-green-50 hover:bg-green-100'}`}
                 >
                   {!notificationsEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellRing className="w-3.5 h-3.5" />}
                 </button>
               </div>
            )}

            {/* Admin Controls Overlay */}
            <AnimatePresence>
              {isAdmin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t border-solne-dark/10 px-5 pb-5 md:px-6 md:pb-6 relative z-10"
                >
                  <div className="flex items-center justify-between mb-3">
                     <span className="text-[10px] font-semibold tracking-widest text-[#108AF9] bg-[#108AF9]/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                       <Edit2 className="w-2.5 h-2.5" /> Admin
                     </span>
                     <button onClick={() => auth.signOut()} className="text-[9px] text-gray-400 hover:text-gray-600 underline">Sign Out</button>
                  </div>

                  {!isEditing ? (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="text-[10px] tracking-widest px-3 py-2 bg-solne-dark text-white rounded-lg hover:bg-solne-dark/80 w-full"
                      >
                        次回配信をスケジュール
                      </button>
                      <button 
                        onClick={() => handleSave('finished')}
                        className="text-[10px] tracking-widest px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 w-full"
                      >
                        配信を終了する（更新待ち）
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-blue-50/50 rounded-xl flex flex-col gap-3 border border-blue-100">
                      <div className="flex gap-2">
                        <div className="flex flex-col gap-1 w-1/2">
                          <label className="text-[9px] tracking-widest text-solne-dark/60 font-medium">Date</label>
                          <input 
                            type="date" 
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            className="px-2 py-1 text-xs rounded border border-gray-200 bg-white w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2">
                          <label className="text-[9px] tracking-widest text-solne-dark/60 font-medium">Time</label>
                          <input 
                            type="time" 
                            value={editTime}
                            onChange={(e) => setEditTime(e.target.value)}
                            className="px-2 py-1 text-xs rounded border border-gray-200 bg-white w-full"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleSave('scheduled')}
                          className="flex-1 text-[10px] tracking-widest py-1.5 bg-[#108AF9] text-white rounded hover:bg-blue-600 flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> 保存
                        </button>
                        <button 
                         onClick={() => setIsEditing(false)}
                         className="flex-1 text-[10px] tracking-widest py-1.5 border border-gray-200 text-gray-500 rounded hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 relative group
          ${isOpen ? 'w-12 h-12 bg-white text-solne-dark border border-gray-200 hover:bg-gray-50' : 
            streamStatus === 'live' ? 'w-16 h-16 bg-[#108AF9] text-white shadow-[0_10px_20px_rgba(16,138,249,0.3)] animate-pulse' : 
            'w-14 h-14 bg-white text-solne-dark hover:bg-gray-50 border border-gray-100'}
        `}
      >
        {!isOpen && streamStatus === 'live' && (
           <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-tr from-[#2FDC46] to-[#108AF9] opacity-80 group-hover:opacity-100 transition-opacity"></span>
        )}
        
        {isOpen ? (
          <X className="w-5 h-5 relative z-10" />
        ) : (
          <Radio className={`${streamStatus === 'live' ? 'w-7 h-7 text-white' : 'w-6 h-6 text-[#108AF9]'} relative z-10 transition-transform duration-300 group-hover:scale-110`} />
        )}

        {!isOpen && streamStatus === 'live' && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white z-20"></span>
        )}
      </button>
    </div>
  );
}
