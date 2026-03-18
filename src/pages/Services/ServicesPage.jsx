import Cursor                from '../../components/Cursor/Cursor'
import Navbar                from '../../components/Navbar/Navbar'
import Hero                  from '../../components/Hero/Hero'
import Contact from '../../components/Contact/Contact'
import ServiceCards from '../../sections/ServicesSection/SerivceCard/ServiceCard'



export default function ServicesPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero
          title="Services"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Services' },
          ]}
        />
        <ServiceCards />
      </main>
        <Contact />
    </>
  )
}