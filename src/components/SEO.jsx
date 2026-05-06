import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path, image, article = false }) => {
  const siteTitle = "Nahom Teklemariam";
  const siteUrl = "https://nahomtmariam.com";
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const canonicalUrl = `${siteUrl}${path || ''}`;
  
  // This default description is KEY — it'll appear in Google search results
  const defaultDescription = "17-year-old self-taught quantitative developer in Ethiopia. Building algorithmic trading systems. Self-studying MIT OCW (Linear Algebra, Calculus I-III) because my school has no advanced math. GitHub: my real transcript. MUN Best Delegate who trained 30+ students (2 won intl scholarships).";
  
  const finalTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | 17, Self-Taught, Building in Public`;
  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="author" content="Nahom Natnael Teklemariam (17, Ethiopia)" />
      
      {/* For AOs who share internally — shows the good stuff */}
      <meta name="keywords" content="Nahom Teklemariam, 17-year-old developer, self-taught quant, algorithmic trading, MIT OCW, MUN Best Delegate, Ethiopia, admissions portfolio" />
      
      {/* Open Graph / Facebook (what shows on LinkedIn/Twitter when shared) */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Explicitly tell Google to index everything */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
    </Helmet>
  );
};

export default SEO;
