import Cursor                from '../../components/Cursor/Cursor'
import Navbar                from '../../components/Navbar/Navbar'
import Hero                  from '../../components/Hero/Hero'
import Contact from '../../components/Contact/Contact'
import ContactPage from '../../sections/ContactUsSections/ContactUsForm/ContactUsForm'
import MapSection from '../../sections/ContactUsSections/MapSection/MapSection'


export default function ContactUsPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero
          title="Contact Us"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' },
          ]}
        />
        <ContactPage />
        <MapSection />
      </main>
        <Contact />
    </>
  )
}