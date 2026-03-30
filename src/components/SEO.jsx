import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path, image }) => {
  const siteTitle = "Nahom Teklemariam";
  const siteUrl = "https://nahomtmariam.com";
  const defaultImage = `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || "Portfolio of Nahom Teklemariam - Quant Dev & Full Stack Developer"} />
      
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || "Portfolio of Nahom Teklemariam - Quant Dev & Full Stack Developer"} />
      <meta property="og:url" content={`${siteUrl}${path || ''}`} />
      <meta property="og:image" content={image || defaultImage} />
      
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || "Portfolio of Nahom Teklemariam - Quant Dev & Full Stack Developer"} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      <link rel="canonical" href={`${siteUrl}${path || ''}`} />
    </Helmet>
  );
};

export default SEO;
