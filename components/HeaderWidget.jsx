"use client";

import { useEffect } from "react";

const HeaderWidget = ({ domain, piwikId, accountGA, adsenseClientId }) => {
  const fWidget = () => {
    let widgetContainer = document.getElementsByClassName("fheader-script")[0];
    let script = document.createElement("script");
    script.src = `https://tools.contrib.com/widget/fheader?d=${domain}&container=fheader-script`;
    script.async = true;

    widgetContainer.appendChild(script);
  };

  const piwikScript = () => {
    console.log(piwikId, "im here piwik");
    let script = document.createElement("script");
    script.async = true;

    script.innerHTML = `var _paq = window._paq = window._paq || [];
                        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                        _paq.push(['trackPageView']);
                        _paq.push(['enableLinkTracking']);
                        (function() {
                          var u="//stats.numberchallenge.com/";
                          _paq.push(['setTrackerUrl', u+'matomo.php']);
                          _paq.push(['setSiteId', '${piwikId}']);
                          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                        })();`;

    document.getElementsByTagName("head")[0].appendChild(script);
  };

  const adsenseScript = () => {
    console.log(adsenseClientId, "im here adsenseClientId");
    let script = document.createElement("script");

    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
    script.async = true;

    document.getElementsByTagName("head")[0].appendChild(script);
  };

  const googleAnalyticsScript = () => {
    console.log(accountGA, "im here accountGA");
    let script = document.createElement("script");
    let scriptCode = document.createElement("script");

    script.src = `https://www.googletagmanager.com/gtag/js?id=${accountGA}`;
    script.async = true;

    scriptCode.innerHTML = `window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', '${accountGA}');`;

    document.getElementsByTagName("head")[0].appendChild(script);
    document.getElementsByTagName("head")[0].appendChild(scriptCode);
  };

  useEffect(() => {
    fWidget();

    if (piwikId) {
      piwikScript();
    }

    if (adsenseClientId) {
      adsenseScript();
    }

    if (accountGA) {
      googleAnalyticsScript();
    }

    // return () => {
    //   // Cleanup function to remove the script when the component is unmounted
    //   widgetContainer.removeChild(script);
    // };
  }, []);
  return <div className="fheader-script"></div>;
};

export default HeaderWidget;
