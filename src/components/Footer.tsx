import React from 'react'

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        background: 'orange',
        padding: 0,
        margin: 0,
        height: '7vh',
        display: 'flex',
        justifyContent: 'stretch'
      }}
    >
      <div style={{ border: '1px solid grey', flex: 1 }}>トップ</div>
      <div style={{ border: '1px solid grey', flex: 1 }}>さがす</div>
      <div style={{ border: '1px solid grey', flex: 1 }}>おしゃべり</div>
      <div style={{ border: '1px solid grey', flex: 1 }}>マイページ</div>
    </div>
  )
}

export default Footer
