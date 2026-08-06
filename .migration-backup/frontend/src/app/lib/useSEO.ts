import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

const BASE_TITLE = "HAVEN — Premium Fashion Store";
const BASE_DESC =
  "HAVEN is your destination for premium clothing. Discover T-Shirts, Jeans, Hoodies, and Jackets. Free shipping on orders over $50.";

export function useSEO({ title, description, image }: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — HAVEN` : BASE_TITLE;
    document.title = fullTitle;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.content = content;
    };

    const desc = description ?? BASE_DESC;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', desc);
    if (image) {
      setMeta('meta[property="og:image"]', image);
      setMeta('meta[name="twitter:image"]', image);
    }

    return () => {
      document.title = BASE_TITLE;
      setMeta('meta[name="description"]', BASE_DESC);
      setMeta('meta[property="og:title"]', BASE_TITLE);
      setMeta('meta[property="og:description"]', BASE_DESC);
      setMeta('meta[name="twitter:title"]', BASE_TITLE);
      setMeta('meta[name="twitter:description"]', BASE_DESC);
    };
  }, [title, description, image]);
}
