import { Container, Toolbar } from '@mui/material'

import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import styles from './MainLayout.module.scss'

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

function Component({ className, children }) {
  const role = {
    user: false,
    admin: false,
  }

  return (
    <Container style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Header role={role} />
      {children}
      {/* <Footer /> */}
    </Container>
  )
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

Component.defaultProps = {
  children: null,
  className: '',
}

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
}
