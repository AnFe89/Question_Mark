
import { Helmet } from 'react-helmet-async'
import { CustomCursor } from './components/ui/CustomCursor'
import { SmoothScroll } from './components/ui/SmoothScroll'
import { Header } from './components/layout/Header'
import { PageTransition } from './components/layout/PageTransition'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { CaseStudies } from './sections/CaseStudies'
import { Stats } from './sections/Stats'
import { Philosophy } from './sections/Philosophy'
import { Contact } from './sections/Contact'
import { Footer } from './components/layout/Footer'

function App() {
  return (
    <SmoothScroll>
      <Helmet>
        <title>QUESTION-MARK.AI | The Future of Intelligence</title>
        <meta name="description" content="AI Agency specializing in LLM integration, data analysis, and custom solutions." />
      </Helmet>
      <div className="min-h-screen bg-void text-pure font-sans selection:bg-electric selection:text-void">
        <CustomCursor />
        <Header />
        
        <PageTransition>
          <main>
            <Hero />
            <Services />
            <CaseStudies />
            <Stats />
            <Philosophy />
            <Contact />
          </main>
          <Footer />
        </PageTransition>
      </div>
    </SmoothScroll>
  )
}

export default App
