import { Row, Col, Collapse, Divider } from 'antd'
import './SectionFaq.scss'

const { Panel } = Collapse

const qna = [
  {
    question: `WHY ANGELSHARE?`,
    answer: `Angelshare is a play on Whisky, Angel Investing and a Shared Syndicate. “Angel’s Share” is otherwise also known as the amount of whisky that is lost to evaporation when the liquid is aged in porous barrels.`
  },
  {
    question: `ARE THERE PARALLELS TO WHAT ANGELSHARE IS TRYING TO DO?`,
    answer: `With Angelshare we are attempting to be at the intersection of a web3 investment syndicate and an exclusive whisky enthusiast club. There are projects that are trying to achieve one or the other, but we believe we are uniquely positioned to marry both, and that has not been done before!`
  },
  {
    question: `DO YOU PLAN TO EXPAND THE DAO MEMBERSHIP BEYOND 160 IN THE FUTURE?`,
    answer: `Yes! With every new cask (or asset) we source, we will mint a new series of NFTs and holders will join the Genesis Series as members of Angelshare. That way we can grow the influence and capital structure of our DAO. That said, Genesis members will always be honored as the OGs and therefore certain perks like ‘right of first refusal’ for future cask allocations or limited allocation seed investments will be open to Genesis members first before future members are notified.`
  },
  {
    question: `I WANT TO TRANSFER MY GENESIS NFT, HOW IS OWNERSHIP OF THE BOTTLE TRANSFERRED?`,
    answer: `First of all, you never sell a Genesis NFT. In the remote circumstance you do want to transfer ownership as a function of say, passing down inheritance, you can directly transfer it to another wallet of your choosing. The bottle moves along with the NFT. Conversely, if you’ve picked up the bottle from our warehouse previously, the NFT changes state to a “membership only” edition that can be traded or transferred, but without the bonded whisky bottle attached to it.`
  },
  {
    question: `WHAT IF I CLAIM THE BOTTLE AND OPEN IT?`,
    answer: `We salute you Sir & Madam, for you would’ve tasted an incredible dram! But, once a bottle is claimed, it alters the associated Class 1 Genesis NFT. This in turn boosts the value of the entire Genesis series too. But, fret not! The NFT will change state to a “membership only” edition, so you can continue to enjoy all applicable membership privileges that Genesis will offer, just that the bottle would be gone forever.`
  },
  {
    question: `ARE THERE ANY BENCHMARKS TO THE VALUE OF THE TALISKER COD BOTTLE BEING BONDED?`,
    answer: `While it is boorish to seek the value of a Cask of Distinction, we found some auctions and retail benchmarks for sub 30 year old Talisker CoD bottles. As a refresher, the bottle we have is a Talisker 32 year old CoD, which should outperform the benchmarks below, and potentially appreciate above the mint price of the genesis NFT. `
  }
]

const SectionFaq = () => {
  return (
    <div className="faq-section">
      <div className="faq-title">
        <Divider className="faq-title-divider">
          <h1>FAQ</h1>
        </Divider>
      </div>
      <div className="faq-content">
        <Row align="middle" justify="center">
          <Col>
            <Collapse
              ghost
              accordion
              defaultActiveKey={0}
              expandIconPosition="end"
              className="faq-content-container">
              {qna.map((item, index) => {
                return (
                  <Panel
                    header={<h2>{item.question}</h2>}
                    key={index}
                    className="faq-content-text">
                    <p>{item.answer}</p>
                    {index === 5 ? (
                      <ul>
                        <li>
                          Talisker 28 Year Old CoD #6559 ~ 3,208SGD -{' '}
                          <i>whiskyauctioneer.com</i>
                        </li>
                        <li>
                          Talisker 29 Year Old CoD ~ 4,724SGD -{' '}
                          <i>wine-searcher.com</i>
                        </li>
                        <li>
                          Talisker 26 Year Old CoD ~ 6,487SGD -{' '}
                          <i>wine-searcher.com</i>
                        </li>
                      </ul>
                    ) : null}
                  </Panel>
                )
              })}
            </Collapse>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default SectionFaq
