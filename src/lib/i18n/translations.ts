import type { Lang } from './config';

/**
 * Polish is the source dictionary; its shape defines the `Dictionary` type so
 * the English version is checked for completeness at compile time.
 */
const pl = {
  meta: {
    title: 'Sukces-24 | Budujemy technologię, która pracuje za Twój biznes',
    description:
      'Tworzymy nowoczesne strony internetowe, aplikacje webowe i mobilne, systemy CRM, automatyzacje AI oraz marketing online, które realnie zwiększają sprzedaż i optymalizują procesy.',
  },
  nav: {
    links: {
      uslugi: 'Usługi',
      dlaczego: 'Dlaczego my',
      realizacje: 'Realizacje',
      proces: 'Proces',
      kontakt: 'Kontakt',
    },
    cta: 'Bezpłatna wycena',
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
    changeLanguage: 'Zmień język',
  },
  hero: {
    breadcrumbs: ['Software', 'Automatyzacje', 'Marketing'],
    titleLines: ['Budujemy technologię,', 'która pracuje za', 'Twój biznes.'],
    description:
      'Projektujemy i budujemy strony, aplikacje webowe i mobilne, systemy CRM oraz automatyzacje – indywidualnie pod Twój biznes, na nowoczesnych technologiach i z niższymi kosztami utrzymania.',
    ctaPrimary: 'Umów konsultację',
    ctaSecondary: 'Zobacz realizacje',
    features: ['Strony WWW', 'Aplikacje', 'CRM', 'AI', 'Marketing'],
  },
  services: {
    heading: 'Co robimy',
    subheading:
      'Dostarczamy kompletne rozwiązania cyfrowe dopasowane do potrzeb Twojego biznesu.',
    items: [
      {
        title: 'Strony internetowe',
        desc: 'Szybkie, responsywne strony, które realnie pozyskują klientów – projektowane pod Twoją branżę, nie z gotowego szablonu.',
      },
      {
        title: 'Aplikacje webowe',
        desc: 'Dedykowane platformy i panele dopasowane do Twoich procesów, zbudowane na nowoczesnym, skalowalnym stacku.',
      },
      {
        title: 'Aplikacje mobilne',
        desc: 'Aplikacje na iOS i Android, wygodne dla użytkownika i tanie w utrzymaniu dzięki przemyślanej architekturze.',
      },
      {
        title: 'Systemy CRM',
        desc: 'Porządkujemy sprzedaż i obsługę: żaden lead nie ginie, a zespół zawsze wie, co robić dalej.',
      },
      {
        title: 'Automatyzacje AI',
        desc: 'Automatyzujemy powtarzalne zadania i wdrażamy AI tam, gdzie realnie oszczędza czas i pieniądze.',
      },
      {
        title: 'Marketing online',
        desc: 'Kampanie i prowadzenie kanałów, które dowożą ruch i realne zapytania – nie tylko polubienia.',
      },
    ],
  },
  whyUs: {
    heading: 'Dlaczego Sukces-24',
    subheading:
      'Nie sprzedajemy szablonów. Budujemy rozwiązania skrojone pod Twój biznes i dbamy, żeby ich utrzymanie nie rujnowało budżetu.',
    items: [
      {
        title: 'Indywidualne podejście',
        desc: 'Każdy projekt zaczynamy od rozmowy i analizy. Zakres, technologię i budżet dopasowujemy do Twoich realnych potrzeb – bez gotowców na siłę.',
      },
      {
        title: 'Nowoczesne technologie',
        desc: 'Pracujemy na aktualnym, wspieranym stacku. Twój produkt jest szybki, bezpieczny i gotowy na rozwój – bez długu technologicznego od pierwszego dnia.',
      },
      {
        title: 'Niższe koszty utrzymania',
        desc: 'Optymalizujemy infrastrukturę i kod, więc miesięczne rachunki za hosting i serwis są realnie niższe. Płacisz za wartość, nie za zaniedbania.',
      },
    ],
  },
  portfolio: {
    heading: 'Realizacje',
    subheading:
      'Wybrane projekty, które zbudowaliśmy dla klientów w Polsce i za granicą.',
    visit: 'Zobacz na żywo',
    projects: {
      MN: {
        description:
          'Strona dla biura nieruchomości premium z dostępem do ofert off-market i wyszukiwaniem wymarzonych nieruchomości.',
        tags: ['Strona WWW', 'Nieruchomości', 'Wyszukiwarka ofert'],
      },
      BN: {
        description:
          'System rezerwacji online dla firm usługowych - klienci rezerwują terminy samodzielnie, bez telefonów i maili.',
        tags: ['System rezerwacji', 'Aplikacja webowa', 'Rynek PL'],
      },
      TS: {
        description:
          'Sklep internetowy garbarni z naturalnymi skórami owczymi i wyrobami ze skóry, z myślą o klientach z zagranicy.',
        tags: ['Sklep e-commerce', 'Skóry naturalne', 'Eksport'],
      },
      FE: {
        description:
          'Strona firmy montującej okna i drzwi na rynku niemieckim, nastawiona na pozyskiwanie zapytań ofertowych.',
        tags: ['Strona WWW', 'Okna i drzwi', 'Rynek DE'],
      },
      LT: {
        description:
          'Aplikacja dla firm transportowych do planowania pracy autobusów, busów i kierowców, kontroli kosztów oraz codziennego wsparcia AI.',
        tags: ['Aplikacja webowa', 'Transport', 'Wsparcie AI'],
      },
      TK: {
        description:
          'Kompleksowa obsługa obiektu noclegowego: strona informacyjna, system zarządzania rezerwacjami, pozycjonowanie SEO oraz prowadzenie social media.',
        tags: ['Strona informacyjna', 'System rezerwacji', 'SEO', 'Social media'],
      },
      SN: {
        description:
          'Nowoczesna strona internetowa zbudowana indywidualnie pod potrzeby klienta.',
        tags: ['Strona WWW'],
      },
    },
  },
  costRescue: {
    eyebrow: 'Optymalizacja kosztów',
    heading: 'Przepłacasz za utrzymanie albo masz projekt, który trzeba uratować?',
    paragraph:
      'Znamy to z wielu rozmów: ktoś zapłacił dużo, a dostał aplikację, która ledwo działa, jest droga w utrzymaniu albo najlepiej napisać ją od nowa. Sprawdzimy Twoje rozwiązanie i pokażemy, co da się usprawnić – oraz ile możesz dzięki temu zaoszczędzić.',
    list: [
      'Audyt kodu, infrastruktury i kosztów',
      'Optymalizacja lub przepisanie tego, co się nie broni',
      'Stałe wsparcie i rozwój po wdrożeniu',
    ],
    cta: 'Zamów bezpłatny audyt',
  },
  howWeWork: {
    heading: 'Jak pracujemy',
    steps: [
      {
        title: 'Analiza',
        desc: 'Poznajemy Twój biznes, cele i budżet, zanim cokolwiek zaprojektujemy.',
      },
      {
        title: 'Strategia',
        desc: 'Dobieramy zakres i technologię tak, by rozwiązanie było tanie w utrzymaniu.',
      },
      {
        title: 'Projekt',
        desc: 'Projektujemy UX/UI i architekturę pod Twoje realne procesy.',
      },
      {
        title: 'Development',
        desc: 'Programujemy, testujemy i dbamy o jakość oraz bezpieczeństwo.',
      },
      {
        title: 'Wdrożenie',
        desc: 'Uruchamiamy, przenosimy dane i szkolimy Twój zespół.',
      },
      {
        title: 'Rozwój',
        desc: 'Zostajemy na pokładzie: monitorujemy, optymalizujemy koszty i rozwijamy.',
      },
    ],
  },
  testimonials: {
    heading: 'Opinie naszych klientów',
    more: 'Zobacz więcej opinii',
    cards: [
      {
        quote:
          'Profesjonalne podejście, świetna komunikacja i realne efekty. Nasza rezerwacyjna platforma działa bez zarzutu i znacząco zwiększyła nasze obłożenie.',
        name: 'Kamil',
        role: 'Właściciel obiektu noclegowego',
      },
      {
        quote:
          'Dzięki automatyzacjom i nowemu CRM zaoszczędziliśmy dziesiątki godzin miesięcznie. Procesy wreszcie działają tak, jak powinny.',
        name: 'Magdalena',
        role: 'Właścicielka salonu beauty',
      },
    ],
  },
  contact: {
    headingLines: ['Porozmawiajmy', 'o Twoim projekcie'],
    subheading:
      'Opowiedz nam o swoim pomyśle, a my przygotujemy bezpłatną wycenę.',
    placeholders: {
      name: 'Imię i nazwisko',
      email: 'Email',
      phone: 'Telefon',
      message: 'Opisz swój projekt...',
    },
    submit: 'Wyślij zapytanie',
    submitting: 'Wysyłanie...',
    success:
      'Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się w ciągu 24 godzin.',
    errors: {
      nameRequired: 'Imię i nazwisko jest wymagane.',
      emailInvalid: 'Podaj poprawny adres e-mail.',
      messageRequired: 'Opis projektu jest wymagany.',
      generic: 'Wystąpił błąd podczas wysyłki. Spróbuj ponownie.',
      tooMany: 'Zbyt wiele prób. Spróbuj ponownie za kilka minut.',
      delivery: 'Nie udało się dostarczyć wiadomości. Spróbuj ponownie później.',
      timeout: 'Przekroczono czas oczekiwania. Sprawdź połączenie i spróbuj ponownie.',
      network: 'Błąd sieci. Sprawdź połączenie i spróbuj ponownie.',
    },
    // Maps server validation codes (returned by /api/contact) to localized text.
    serverErrors: {
      invalidRequest: 'Nieprawidłowe żądanie.',
      'name.required': 'Imię i nazwisko jest wymagane.',
      'name.tooLong': 'Imię i nazwisko nie może przekraczać 100 znaków.',
      'email.required': 'Adres e-mail jest wymagany.',
      'email.tooLong': 'Adres e-mail nie może przekraczać 254 znaków.',
      'email.invalid': 'Adres e-mail ma nieprawidłowy format.',
      'message.required': 'Opis projektu jest wymagany.',
      'message.tooLong': 'Opis projektu nie może przekraczać 5000 znaków.',
      'phone.tooLong': 'Numer telefonu nie może przekraczać 20 znaków.',
      'phone.invalid':
        'Numer telefonu może zawierać wyłącznie cyfry, spacje oraz znaki +, -, (, ).',
    },
    info: {
      responseTime: 'Odpowiadamy w 24h',
      audit: 'Bezpłatny audyt i wycena',
      noObligation: 'Bez zobowiązań',
      hours: 'Pon - Pt: 09:00 - 17:00',
    },
  },
  footer: {
    rights: 'Wszelkie prawa zastrzeżone.',
  },
} as const;

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    links: { uslugi: string; dlaczego: string; realizacje: string; proces: string; kontakt: string };
    cta: string;
    openMenu: string;
    closeMenu: string;
    changeLanguage: string;
  };
  hero: {
    breadcrumbs: readonly string[];
    titleLines: readonly string[];
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    features: readonly string[];
  };
  services: {
    heading: string;
    subheading: string;
    items: readonly { title: string; desc: string }[];
  };
  whyUs: {
    heading: string;
    subheading: string;
    items: readonly { title: string; desc: string }[];
  };
  portfolio: {
    heading: string;
    subheading: string;
    visit: string;
    projects: Record<
      'MN' | 'BN' | 'TS' | 'FE' | 'LT' | 'SN' | 'TK',
      { description: string; tags: readonly string[] }
    >;
  };
  costRescue: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    list: readonly string[];
    cta: string;
  };
  howWeWork: {
    heading: string;
    steps: readonly { title: string; desc: string }[];
  };
  testimonials: {
    heading: string;
    more: string;
    cards: readonly { quote: string; name: string; role: string }[];
  };
  contact: {
    headingLines: readonly string[];
    subheading: string;
    placeholders: { name: string; email: string; phone: string; message: string };
    submit: string;
    submitting: string;
    success: string;
    errors: {
      nameRequired: string;
      emailInvalid: string;
      messageRequired: string;
      generic: string;
      tooMany: string;
      delivery: string;
      timeout: string;
      network: string;
    };
    serverErrors: Record<string, string>;
    info: { responseTime: string; audit: string; noObligation: string; hours: string };
  };
  footer: { rights: string };
};

const en: Dictionary = {
  meta: {
    title: 'Sukces-24 | We build technology that works for your business',
    description:
      'We build modern websites, web and mobile apps, CRM systems, AI automation and online marketing that genuinely grow sales and streamline your processes.',
  },
  nav: {
    links: {
      uslugi: 'Services',
      dlaczego: 'Why us',
      realizacje: 'Work',
      proces: 'Process',
      kontakt: 'Contact',
    },
    cta: 'Free quote',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    changeLanguage: 'Change language',
  },
  hero: {
    breadcrumbs: ['Software', 'Automation', 'Marketing'],
    titleLines: ['We build technology', 'that works for', 'your business.'],
    description:
      'We design and build websites, web and mobile apps, CRM systems and automations – tailored to your business, on modern technology and with lower maintenance costs.',
    ctaPrimary: 'Book a consultation',
    ctaSecondary: 'See our work',
    features: ['Websites', 'Apps', 'CRM', 'AI', 'Marketing'],
  },
  services: {
    heading: 'What we do',
    subheading:
      'We deliver complete digital solutions tailored to your business needs.',
    items: [
      {
        title: 'Websites',
        desc: 'Fast, responsive sites that genuinely win customers – designed for your industry, not from a ready-made template.',
      },
      {
        title: 'Web applications',
        desc: 'Dedicated platforms and dashboards matched to your processes, built on a modern, scalable stack.',
      },
      {
        title: 'Mobile apps',
        desc: 'iOS and Android apps that are easy to use and cheap to maintain thanks to thoughtful architecture.',
      },
      {
        title: 'CRM systems',
        desc: 'We bring order to sales and service: no lead gets lost and your team always knows the next step.',
      },
      {
        title: 'AI automation',
        desc: 'We automate repetitive tasks and apply AI where it genuinely saves time and money.',
      },
      {
        title: 'Online marketing',
        desc: 'Campaigns and channel management that deliver traffic and real enquiries – not just likes.',
      },
    ],
  },
  whyUs: {
    heading: 'Why Sukces-24',
    subheading:
      "We don't sell templates. We build solutions tailored to your business and make sure maintaining them doesn't wreck your budget.",
    items: [
      {
        title: 'Individual approach',
        desc: 'Every project starts with a conversation and analysis. We match scope, technology and budget to your real needs – no forced off-the-shelf solutions.',
      },
      {
        title: 'Modern technology',
        desc: 'We work on a current, supported stack. Your product is fast, secure and ready to grow – with no technical debt from day one.',
      },
      {
        title: 'Lower maintenance costs',
        desc: 'We optimize infrastructure and code, so monthly hosting and service bills are genuinely lower. You pay for value, not for neglect.',
      },
    ],
  },
  portfolio: {
    heading: 'Our work',
    subheading: "Selected projects we've built for clients in Poland and abroad.",
    visit: 'View live',
    projects: {
      MN: {
        description:
          'A site for a premium real-estate agency with access to off-market listings and search for dream properties.',
        tags: ['Website', 'Real estate', 'Listings search'],
      },
      BN: {
        description:
          'An online booking system for service businesses – clients book appointments themselves, without calls or emails.',
        tags: ['Booking system', 'Web app', 'PL market'],
      },
      TS: {
        description:
          'An online shop for a tannery offering natural sheepskins and leather goods, aimed at international customers.',
        tags: ['E-commerce', 'Natural leather', 'Export'],
      },
      FE: {
        description:
          'A site for a windows-and-doors installer on the German market, focused on generating sales enquiries.',
        tags: ['Website', 'Windows & doors', 'DE market'],
      },
      LT: {
        description:
          'An app for transport companies to plan buses, vans and drivers, control costs and get day-to-day AI support.',
        tags: ['Web app', 'Transport', 'AI support'],
      },
      TK: {
        description:
          'End-to-end support for an accommodation venue: informational website, reservation management system, SEO and social media management.',
        tags: ['Informational site', 'Booking system', 'SEO', 'Social media'],
      },
      SN: {
        description: "A modern website built individually to the client's needs.",
        tags: ['Website'],
      },
    },
  },
  costRescue: {
    eyebrow: 'Cost optimization',
    heading: 'Overpaying for maintenance or have a project that needs rescuing?',
    paragraph:
      "We've heard it many times: someone paid a lot and got an app that barely works, is expensive to maintain, or is best rewritten from scratch. We'll review your solution and show what can be improved – and how much you can save.",
    list: [
      'Audit of code, infrastructure and costs',
      'Optimizing or rewriting what no longer holds up',
      'Ongoing support and development after launch',
    ],
    cta: 'Request a free audit',
  },
  howWeWork: {
    heading: 'How we work',
    steps: [
      {
        title: 'Analysis',
        desc: 'We get to know your business, goals and budget before we design anything.',
      },
      {
        title: 'Strategy',
        desc: 'We choose scope and technology so the solution is cheap to maintain.',
      },
      {
        title: 'Design',
        desc: 'We design UX/UI and architecture around your real processes.',
      },
      {
        title: 'Development',
        desc: 'We build, test and take care of quality and security.',
      },
      {
        title: 'Launch',
        desc: 'We go live, migrate your data and train your team.',
      },
      {
        title: 'Growth',
        desc: 'We stay on board: monitoring, optimizing costs and developing further.',
      },
    ],
  },
  testimonials: {
    heading: 'What our clients say',
    more: 'See more reviews',
    cards: [
      {
        quote:
          'Professional approach, great communication and real results. Our booking platform works flawlessly and significantly increased our occupancy.',
        name: 'Kamil',
        role: 'Owner of an accommodation business',
      },
      {
        quote:
          'Thanks to automation and the new CRM we save dozens of hours every month. Our processes finally work the way they should.',
        name: 'Magdalena',
        role: 'Owner of a beauty salon',
      },
    ],
  },
  contact: {
    headingLines: ["Let's talk", 'about your project'],
    subheading: "Tell us about your idea and we'll prepare a free quote.",
    placeholders: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      message: 'Describe your project...',
    },
    submit: 'Send enquiry',
    submitting: 'Sending...',
    success:
      "Thank you! Your message has been sent. We'll be in touch within 24 hours.",
    errors: {
      nameRequired: 'Full name is required.',
      emailInvalid: 'Please enter a valid email address.',
      messageRequired: 'A project description is required.',
      generic: 'Something went wrong while sending. Please try again.',
      tooMany: 'Too many attempts. Please try again in a few minutes.',
      delivery: "We couldn't deliver your message. Please try again later.",
      timeout: 'The request timed out. Check your connection and try again.',
      network: 'Network error. Check your connection and try again.',
    },
    serverErrors: {
      invalidRequest: 'Invalid request.',
      'name.required': 'Full name is required.',
      'name.tooLong': 'Full name cannot exceed 100 characters.',
      'email.required': 'Email address is required.',
      'email.tooLong': 'Email address cannot exceed 254 characters.',
      'email.invalid': 'Email address has an invalid format.',
      'message.required': 'A project description is required.',
      'message.tooLong': 'Project description cannot exceed 5000 characters.',
      'phone.tooLong': 'Phone number cannot exceed 20 characters.',
      'phone.invalid':
        'Phone number may only contain digits, spaces and the characters +, -, (, ).',
    },
    info: {
      responseTime: 'We reply within 24h',
      audit: 'Free audit and quote',
      noObligation: 'No obligations',
      hours: 'Mon - Fri: 09:00 - 17:00',
    },
  },
  footer: {
    rights: 'All rights reserved.',
  },
};

export const dictionaries: Record<Lang, Dictionary> = {
  pl,
  en,
};

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
