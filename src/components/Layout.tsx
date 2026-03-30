import SEO from './SEO';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <>
      <SEO title={title} description={description} />
      {children}
    </>
  );
};

export default Layout;
