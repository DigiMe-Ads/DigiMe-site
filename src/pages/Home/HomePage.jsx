import Cursor                from '../../components/Cursor/Cursor'
import Navbar                from '../../components/Navbar/Navbar'
import Hero                  from '../../sections/HomeSections/Hero/Hero'
import About                 from '../../sections/HomeSections/About/About'
import Services              from '../../sections/HomeSections/Services/Services'
import SharedGeometry        from '../../sections/HomeSections/SharedGeometry/SharedGeometry'
import Marquee               from '../../sections/HomeSections/Marquee/Marquee'
import Stats                 from '../../sections/HomeSections/Stats/Stats'
import Projects              from '../../sections/HomeSections/Projects/Projects'
import WhoWeAre              from '../../sections/HomeSections/WhoWeAre/WhoWeAre'
import ProcessAwardsWrapper  from '../../sections/HomeSections/ProcessAwardsWrapper/ProcessAwardsWrapper'
import Testimonials          from '../../sections/HomeSections/Testimonials/Testimonials'
import CinematicShowcase from '../../sections/HomeSections/CinematicShowcase/CinematicShowcase'
import ReputationWall from '../../sections/HomeSections/ReputationWall/ReputationWall'
import Contact               from '../../sections/HomeSections/Contact/Contact'
import Footer                from '../../sections/HomeSections/Footer/Footer'

export default function HomePage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <About />
          <Services />
          <SharedGeometry />
        </div>

        <Marquee />
        {/* <Stats /> */}
        <Projects />
        {/* <CinematicShowcase /> */}
        <WhoWeAre />
        <ProcessAwardsWrapper />
        <Testimonials />
        <ReputationWall />
        <Contact />
      </main>
      <Footer />
    </>
  )
}