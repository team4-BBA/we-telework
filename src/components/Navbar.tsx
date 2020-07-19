import React from 'react'

export interface NavbarProps {}

const Navbar: React.SFC<NavbarProps> = () => {
  return (
    <div>
      <div style={{ height: '2em', backgroundColor: 'orange' }}>
        We Telework!
      </div>
    </div>
  )
}

export default Navbar
