/**
 * KODARI EMPIRE - Sovereign SEO Engine
 * Automatic Schema and Meta injection.
 */
document.addEventListener('DOMContentLoaded', () => {
    const siteConfig = {
        name: "KODARI EMPIRE",
        url: "https://micro-sass-project.pages.dev",
        logo: "https://micro-sass-project.pages.dev/assets/images/logo.png"
    };

    // Inject JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": siteConfig.logo
    });
    document.head.appendChild(script);

    // Dynamic Meta Title check
    if (!document.title.includes("KODARI")) {
        document.title = siteConfig.name + " | " + document.title;
    }
});
