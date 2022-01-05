import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import styles from './Post.module.scss'

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

function Component({ className, children }) {
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Post</h2>
      {children}
    </div>
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
  Component as Post,
  // Container as Post,
  Component as PostComponent,
}
