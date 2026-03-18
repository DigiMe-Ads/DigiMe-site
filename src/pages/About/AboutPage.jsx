import Cursor                from '../../components/Cursor/Cursor'
import Navbar                from '../../components/Navbar/Navbar'
import Hero                  from '../../components/Hero/Hero'
import Contact from '../../components/Contact/Contact'
import AboutIntro from '../../sections/AboutSections/AboutIntro/AboutIntro'
import OurFeatures from '../../sections/AboutSections/OurFeatures/OurFeatures'


export default function HomePage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero
          title="About Us"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'About Us' },
          ]}
        />
        <AboutIntro />
        <OurFeatures />
      </main>
        <Contact />
    </>
  )
}