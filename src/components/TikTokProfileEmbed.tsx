import { useEffect } from 'react';

export default function TikTokProfileEmbed() {
  useEffect(() => {
    // Load TikTok embed script if not already loaded
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script is already there, force a re-parse in case the component re-mounted
      // @ts-ignore
      if (window.tiktokEmbed) {
        // @ts-ignore
        window.tiktokEmbed.lib.render([]);
      }
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center overflow-hidden my-8">
      <blockquote 
        className="tiktok-embed" 
        cite="https://www.tiktok.com/@solne.piano.scenery" 
        data-unique-id="solne.piano.scenery" 
        data-embed-type="creator" 
        style={{ maxWidth: '780px', minWidth: '288px' }}
      >
        <section>
          <a target="_blank" href="https://www.tiktok.com/@solne.piano.scenery?refer=creator_embed">
            @solne.piano.scenery
          </a>
        </section>
      </blockquote>
    </div>
  );
}
