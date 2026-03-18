import Cursor                from '../../components/Cursor/Cursor'
import Navbar                from '../../components/Navbar/Navbar'
import Hero                  from '../../components/Hero/Hero'
import Contact from '../../components/Contact/Contact'
import PricingCards from '../../sections/PricingSection/PricingCards/PricingCards'


export default function PricingPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero
          title="Pricing"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Pricing' },
          ]}
        />
        <PricingCards />
      </main>
        <Contact />
            
    </>
  )
}