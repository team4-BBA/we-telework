import React from 'react'

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* <!-- Rakuten Web Services Attribution Snippet FROM HERE --> */}
      <a
        href="https://webservice.rakuten.co.jp/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://webservice.rakuten.co.jp/img/credit/200709/credit_22121.gif"
          // border="0"
          alt="楽天ウェブサービスセンター"
          title="楽天ウェブサービスセンター"
          width="221"
          height="21"
        />
      </a>
      {/* <!-- Rakuten Web Services Attribution Snippet TO HERE --> */}
    </div>
  )
}

export default Footer
