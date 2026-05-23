import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "ar";

export const translations = {
  en: {
    brand: "STYLE HAVEN",
    tagline: "Discover the latest trends in fashion",
    nav: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
    },
    search: "Search products...",
    categories: {
      All: "All",
      "T-Shirts": "T-Shirts",
      Jeans: "Jeans",
      Hoodies: "Hoodies",
      Jackets: "Jackets",
    },
    newArrival: "New Arrival",
    addToCart: "Add to Cart",
    wishlist: "Wishlist",
    cart: {
      title: "Shopping Cart",
      items: "items",
      empty: "Your cart is empty",
      total: "Total",
      checkout: "Proceed to Checkout",
      continueShopping: "Continue Shopping",
    },
    checkout: {
      title: "Checkout",
      email: "Email",
      fullName: "Full Name",
      address: "Address",
      city: "City",
      postalCode: "Postal Code",
      country: "Country",
      proceedPayment: "Proceed to Payment",
      processing: "Processing...",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      tax: "Tax",
      total: "Total",
      size: "Size",
      color: "Color",
      quantity: "Quantity",
      emptyCart: "Your cart is empty",
    },
    success: {
      title: "Thank you for your order!",
      subtitle: "We'll send you a confirmation email with your order details.",
      continueShopping: "Continue Shopping",
    },
    auth: {
      login: "Sign In",
      register: "Create Account",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      loginBtn: "Sign In",
      registerBtn: "Create Account",
      loginSwitch: "Don't have an account?",
      registerSwitch: "Already have an account?",
      signUp: "Sign up",
      signIn: "Sign in",
      account: "My Account",
      profile: "Profile",
      orders: "My Orders",
      logout: "Sign Out",
    },
    about: {
      heroTitle: "Our Story",
      heroSubtitle: "Fashion that empowers, style that endures",
      missionTitle: "Our Mission",
      missionText:
        "At Style Haven, we believe fashion is more than clothing — it's a form of self-expression. We curate premium collections that blend timeless elegance with modern trends, making high-quality fashion accessible to everyone.",
      valuesTitle: "Our Values",
      values: [
        { icon: "🌿", title: "Sustainability", desc: "Committed to eco-friendly practices and ethical sourcing in every collection." },
        { icon: "✨", title: "Quality", desc: "Every piece is crafted with premium materials and meticulous attention to detail." },
        { icon: "🤝", title: "Inclusivity", desc: "Fashion for everybody — we celebrate all shapes, sizes, and styles." },
        { icon: "🚀", title: "Innovation", desc: "Constantly evolving to bring you the freshest trends and modern silhouettes." },
      ],
      statsTitle: "Style Haven in Numbers",
      stats: [
        { value: "10K+", label: "Happy Customers" },
        { value: "500+", label: "Products" },
        { value: "50+", label: "Brand Partners" },
        { value: "4.9★", label: "Average Rating" },
      ],
    },
    contact: {
      heroTitle: "Get in Touch",
      heroSubtitle: "We'd love to hear from you",
      formTitle: "Send a Message",
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      successMsg: "Message sent! We'll be in touch soon.",
      infoTitle: "Contact Info",
      info: [
        { icon: "📍", label: "Address", value: "123 Fashion Street, Style City, SC 10001" },
        { icon: "📞", label: "Phone", value: "+1 (555) 234-5678" },
        { icon: "✉️", label: "Email", value: "hello@stylehaven.com" },
        { icon: "🕐", label: "Hours", value: "Mon–Fri, 9am – 6pm" },
      ],
    },
    notFound: {
      code: "404",
      title: "Page Not Found",
      subtitle: "Looks like this page went out of style.",
      cta: "Back to Shop",
    },
    footer: {
      tagline: "Elevate your wardrobe with timeless fashion.",
      shop: "Shop",
      company: "Company",
      links: {
        newArrivals: "New Arrivals",
        tshirts: "T-Shirts",
        jeans: "Jeans",
        hoodies: "Hoodies",
        jackets: "Jackets",
        about: "About Us",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      rights: "All rights reserved.",
    },
  },
  ar: {
    brand: "ستايل هيفن",
    tagline: "اكتشف أحدث صيحات الموضة",
    nav: {
      home: "الرئيسية",
      shop: "المتجر",
      about: "من نحن",
      contact: "تواصل معنا",
    },
    search: "ابحث عن منتجات...",
    categories: {
      All: "الكل",
      "T-Shirts": "تي شيرت",
      Jeans: "جينز",
      Hoodies: "هودي",
      Jackets: "جاكيت",
    },
    newArrival: "وصل حديثاً",
    addToCart: "أضف للسلة",
    wishlist: "المفضلة",
    cart: {
      title: "سلة التسوق",
      items: "منتجات",
      empty: "سلة التسوق فارغة",
      total: "الإجمالي",
      checkout: "إتمام الشراء",
      continueShopping: "مواصلة التسوق",
    },
    checkout: {
      title: "الدفع",
      email: "البريد الإلكتروني",
      fullName: "الاسم الكامل",
      address: "العنوان",
      city: "المدينة",
      postalCode: "الرمز البريدي",
      country: "الدولة",
      proceedPayment: "المتابعة للدفع",
      processing: "جارٍ المعالجة...",
      orderSummary: "ملخص الطلب",
      subtotal: "المجموع الفرعي",
      shipping: "الشحن",
      tax: "الضريبة",
      total: "الإجمالي",
      size: "المقاس",
      color: "اللون",
      quantity: "الكمية",
      emptyCart: "سلة التسوق فارغة",
    },
    success: {
      title: "شكراً لطلبك!",
      subtitle: "سنرسل لك رسالة تأكيد تحتوي على تفاصيل طلبك.",
      continueShopping: "مواصلة التسوق",
    },
    auth: {
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      fullName: "الاسم الكامل",
      loginBtn: "دخول",
      registerBtn: "إنشاء حساب",
      loginSwitch: "ليس لديك حساب؟",
      registerSwitch: "لديك حساب بالفعل؟",
      signUp: "سجّل الآن",
      signIn: "سجّل دخولك",
      account: "حسابي",
      profile: "الملف الشخصي",
      orders: "طلباتي",
      logout: "تسجيل الخروج",
    },
    about: {
      heroTitle: "قصتنا",
      heroSubtitle: "موضة تمنحك القوة، وأناقة تدوم",
      missionTitle: "رسالتنا",
      missionText:
        "في ستايل هيفن، نؤمن بأن الموضة أكثر من مجرد ملابس — إنها شكل من أشكال التعبير عن الذات. نقدّم مجموعات مميزة تجمع بين الأناقة الخالدة والاتجاهات العصرية، لتجعل الموضة الراقية في متناول الجميع.",
      valuesTitle: "قيمنا",
      values: [
        { icon: "🌿", title: "الاستدامة", desc: "ملتزمون بالممارسات الصديقة للبيئة والمصادر الأخلاقية في كل مجموعة." },
        { icon: "✨", title: "الجودة", desc: "كل قطعة مصنوعة من أجود المواد مع الاهتمام الدقيق بكل التفاصيل." },
        { icon: "🤝", title: "الشمولية", desc: "الموضة للجميع — نحتفل بكل الأشكال والأحجام والأساليب." },
        { icon: "🚀", title: "الابتكار", desc: "نتطور باستمرار لنقدّم لك أحدث الاتجاهات والقصات العصرية." },
      ],
      statsTitle: "ستايل هيفن بالأرقام",
      stats: [
        { value: "+10K", label: "عميل سعيد" },
        { value: "+500", label: "منتج" },
        { value: "+50", label: "شريك تجاري" },
        { value: "4.9★", label: "متوسط التقييم" },
      ],
    },
    contact: {
      heroTitle: "تواصل معنا",
      heroSubtitle: "يسعدنا سماعك",
      formTitle: "أرسل رسالة",
      name: "اسمك",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال الرسالة",
      sending: "جارٍ الإرسال...",
      successMsg: "تم الإرسال! سنتواصل معك قريباً.",
      infoTitle: "معلومات التواصل",
      info: [
        { icon: "📍", label: "العنوان", value: "١٢٣ شارع الموضة، مدينة الأناقة" },
        { icon: "📞", label: "الهاتف", value: "٥٦٧٨-٢٣٤ (٥٥٥) ١+" },
        { icon: "✉️", label: "البريد", value: "hello@stylehaven.com" },
        { icon: "🕐", label: "ساعات العمل", value: "الإثنين–الجمعة، ٩ص – ٦م" },
      ],
    },
    notFound: {
      code: "404",
      title: "الصفحة غير موجودة",
      subtitle: "يبدو أن هذه الصفحة خرجت عن الموضة.",
      cta: "العودة للمتجر",
    },
    footer: {
      tagline: "ارتقِ بخزانتك مع أزياء خالدة.",
      shop: "المتجر",
      company: "الشركة",
      links: {
        newArrivals: "وصل حديثاً",
        tshirts: "تي شيرت",
        jeans: "جينز",
        hoodies: "هودي",
        jackets: "جاكيت",
        about: "من نحن",
        contact: "تواصل معنا",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
      },
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: typeof translations.en;
  isRTL: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggleLang: () => {},
  t: translations.en,
  isRTL: false,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("sh-lang") as Lang) || "en";
  });

  const isRTL = lang === "ar";
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    localStorage.setItem("sh-lang", lang);
    if (isRTL) {
      document.documentElement.style.setProperty("--app-font-sans", "'Cairo', sans-serif");
    } else {
      document.documentElement.style.setProperty("--app-font-sans", "'Inter', sans-serif");
    }
  }, [lang, isRTL]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
