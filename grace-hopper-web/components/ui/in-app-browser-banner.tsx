"use client";

import { useEffect, useState } from "react";

export function InAppBrowserBanner() {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      const ua = window.navigator.userAgent.toLowerCase();
      const isInApp =
        ua.includes("instagram") ||
        ua.includes("fbav") ||
        ua.includes("fban") ||
        ua.includes("linkedinapp") ||
        ua.includes("threads") ||
        ua.includes("gsa") ||
        /wv|webview|ip(hone|od|ad).*applewebkit(?!.*safari)/.test(ua);

      setIsInAppBrowser(isInApp);
    }
  }, []);

  if (!isInAppBrowser) return null;

  return (
    <div className="bg-[#D83B01] text-white px-4 py-3 text-xs sm:text-sm font-sans flex flex-col sm:flex-row items-center justify-center gap-2 relative z-50 text-center shadow-md">
      <span className="font-bold flex items-center gap-1.5 justify-center">
        ⚠️ Atenção: Recursos Limitados
      </span>
      <p className="leading-relaxed">
        Detectamos que você abriu a página de dentro de outro aplicativo. Para que o <strong>microfone</strong> e o <strong>login com o Google</strong> funcionem corretamente, por favor clique nos **três pontinhos** no topo direito do seu aplicativo e selecione <strong>"Abrir no navegador"</strong> (Safari ou Chrome).
      </p>
    </div>
  );
}
