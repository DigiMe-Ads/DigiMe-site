import Cursor     from '../../components/Cursor/Cursor'
import Navbar     from '../../components/Navbar/Navbar'
import PageFooter from '../../components/Contact/Contact'
import PortfolioHero    from '../../sections/PortfolioSections/PortfolioHero/PortfolioHero'
import PortfolioShowcase from '../../sections/PortfolioSections/PortfolioShowcase/PortfolioShowcase'

export default function PortfolioPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <PortfolioHero />
        <PortfolioShowcase />
      </main>
      <PageFooter />
    </>
  )
}