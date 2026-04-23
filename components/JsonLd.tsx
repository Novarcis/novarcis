export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Novarcis",
    url: "https://novarcis.dev",
    logo: "https://novarcis.dev/images/Logo-novarcis.webp",
    description:
      "Startup de desarrollo de software inteligente en Morelia, Michoacán. Especializada en automatización empresarial, agentes de IA, chatbots y soluciones tecnológicas a medida para negocios locales y de todo México.",
    foundingDate: "2024",
    knowsAbout: [
      "Inteligencia Artificial",
      "Automatización empresarial",
      "Agentes autónomos",
      "Chatbots para empresas",
      "Bots empresariales",
      "RAG pipelines",
      "N8N",
      "LLMs personalizados",
      "Automatización de negocios en Morelia",
      "Desarrollo de software en Morelia",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Morelia",
      addressRegion: "Michoacán",
      addressCountry: "MX",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Morelia",
        containedInPlace: {
          "@type": "State",
          name: "Michoacán",
        },
      },
      {
        "@type": "Country",
        name: "México",
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61582283014199",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Novarcis",
    url: "https://novarcis.dev",
    logo: "https://novarcis.dev/images/Logo-novarcis.webp",
    image: "https://novarcis.dev/images/Logo-novarcis.webp",
    description:
      "Automatización de agentes, chatbots y bots empresariales en Morelia, Michoacán. Llevamos los negocios locales al siguiente nivel con inteligencia artificial a medida.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Morelia",
      addressRegion: "Michoacán",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.7059,
      longitude: -101.1949,
    },
    areaServed: [
      { "@type": "City", name: "Morelia" },
      { "@type": "State", name: "Michoacán" },
      { "@type": "Country", name: "México" },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61582283014199",
    ],
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios de Novarcis en Morelia",
    description:
      "Soluciones de automatización, agentes IA y bots empresariales para negocios en Morelia y todo México",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Automatización No-Code",
          description:
            "Flujos de trabajo automatizados con N8N, Make y Zapier para empresas en Morelia. Integraciones entre apps, automatización de emails y workflows visuales sin código necesario.",
          provider: { "@type": "Organization", name: "Novarcis" },
          serviceType: "Automatización empresarial",
          areaServed: "Morelia, Michoacán, México",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Desarrollo de Agentes y Chatbots con IA",
          description:
            "Chatbots inteligentes, agentes autónomos, bots para WhatsApp y redes sociales, RAG pipelines y LLMs personalizados para empresas en Morelia y México.",
          provider: { "@type": "Organization", name: "Novarcis" },
          serviceType: "Desarrollo de Inteligencia Artificial",
          areaServed: "Morelia, Michoacán, México",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Ingeniería de Software Compleja",
          description:
            "Microservicios, APIs de alto rendimiento, arquitectura distribuida y DevOps avanzado. Código puro para soluciones de misión crítica.",
          provider: { "@type": "Organization", name: "Novarcis" },
          serviceType: "Ingeniería de software",
          areaServed: "Morelia, Michoacán, México",
        },
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Dónde puedo encontrar automatización de agentes en Morelia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Novarcis es una startup en Morelia, Michoacán, especializada en automatización de agentes de IA, chatbots empresariales y bots para WhatsApp. Ofrecemos soluciones a medida para negocios locales y de todo México.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo puedo tener un bot para mi empresa en Morelia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Novarcis desarrolla bots y chatbots personalizados para empresas en Morelia. Desde chatbots para atención al cliente en WhatsApp hasta agentes autónomos que automatizan procesos completos de tu negocio. Contáctanos por WhatsApp o redes sociales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tipo de soluciones de IA ofrece Novarcis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Novarcis ofrece tres niveles: Automatización No-Code con N8N, Make y Zapier; Desarrollo con IA incluyendo LLMs personalizados, agentes autónomos y RAG pipelines; e Ingeniería Compleja con microservicios y APIs de alto rendimiento.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo es el proceso de trabajo de Novarcis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "4 fases: Diagnóstico (análisis del stack y oportunidades), Diseño (arquitectura personalizada), Implementación (sprints cortos con demos frecuentes) y Escalado (monitoreo y soporte continuo).",
        },
      },
      {
        "@type": "Question",
        name: "¿Novarcis trabaja solo en Morelia o en todo México?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Novarcis opera desde Morelia, Michoacán, pero trabaja con empresas de todo México. Nuestra misión es llevar a otro nivel los negocios locales de Morelia y de todo el país con soluciones de inteligencia artificial a medida.",
        },
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Novarcis — Automatización y Agentes IA en Morelia",
    description:
      "Startup de software inteligente en Morelia. Automatización de agentes, chatbots, bots empresariales y soluciones de IA a medida para negocios locales y de todo México.",
    url: "https://novarcis.dev",
    inLanguage: "es-MX",
    isPartOf: {
      "@type": "WebSite",
      name: "Novarcis",
      url: "https://novarcis.dev",
    },
    about: {
      "@type": "Thing",
      name: "Automatización empresarial e inteligencia artificial en Morelia",
    },
    mainEntity: {
      "@type": "Organization",
      name: "Novarcis",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
