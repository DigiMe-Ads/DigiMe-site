import Cursor                from '../../components/Cursor/Cursor'
import Navbar                from '../../components/Navbar/Navbar'
import Hero                  from '../../components/Hero/Hero'
import Contact from '../../components/Contact/Contact'
import TeamGrid from '../../sections/TeamSections/TeamGrid/TeamGrid'



export default function TeamPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero
          title="Team"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Team' },
          ]}
        />
        <TeamGrid />
        
      </main>
        <Contact />
    </>
  )
}