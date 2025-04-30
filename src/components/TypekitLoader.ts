'use client';

import { useEffect } from 'react';

export default function TypekitLoader({ kitId }: { kitId: string }) {
  useEffect(() => {
    (function (d) {
      const config = {
        kitId,
        scriptTimeout: 3000,
        async: true,
      };
      const h = d.documentElement;
      const t = setTimeout(function () {
        h.className
          = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive';
      }, config.scriptTimeout);
      const tk = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];

      h.className += ' wf-loading';
      tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
      tk.async = true;
      tk.onload = function () {
        clearTimeout(t);
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).Typekit.load(config);
        } catch (e) {
          console.error(e);
        }
      };

      s.parentNode!.insertBefore(tk, s);
    }(document));
  }, [kitId]);

  return null;
}
