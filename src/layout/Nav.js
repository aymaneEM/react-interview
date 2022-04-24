import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'


export default function Nav() {
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
    <Container>
      <Navbar.Brand>Movie App</Navbar.Brand>
    </Container>
  </Navbar>
  )
}
