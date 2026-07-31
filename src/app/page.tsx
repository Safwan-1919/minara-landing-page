import LoadingScreen from '@/components/LoadingScreen'
import HeroSection from '@/components/HeroSection'
import FeaturedSection from '@/components/FeaturedSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import FooterSection from '@/components/FooterSection'
import NavPill from '@/components/NavPill'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div id="home" style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}>
        <img
          src="/hero.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <HeroSection />
      </div>
      <div id="features">
        <FeaturedSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contact-faq" style={{ position: 'relative' }}>
        <ContactSection />
        <FooterSection />
      </div>
      <NavPill />
    </>
  )
}
