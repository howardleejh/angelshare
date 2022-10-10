import Intro from '../../Components/SectionIntro/SectionIntro'
import Description from '../../Components/SectionDescription/SectionDescription'
import Utility from '../../Components/SectionUtility/SectionUtility'
import Faq from '../../Components/SectionFaq/SectionFaq'
import WhitelistModal from '../../Components/WhitelistModal/WhitelistModal'
import { BackTop } from 'antd'

const HomePage = () => {
  return (
    <div className="home-page">
      <section id="/">
        <Intro />
      </section>
      <section id="introduction">
        <Description />
      </section>
      <section id="utility">
        <Utility />
      </section>
      <section id="faq">
        <Faq />
      </section>
      <BackTop
        visibilityHeight={100}
        style={{ bottom: '10vh', right: '5vw' }}
      />
      <WhitelistModal />
    </div>
  )
}
export default HomePage
