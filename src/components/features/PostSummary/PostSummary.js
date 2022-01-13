import { Box, Card, CardActionArea, Typography } from '@mui/material'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

function Component({ post }) {
  return (
    <Card
      key={post.id}
      raised
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 3,
      }}
    >
      <CardActionArea component={Link} to={`post/${post.id}`}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" p={2}>
            {post.title}
          </Typography>
          {post.price ? (
            <Typography variant="h6" p={2}>
              {post.price} pln
            </Typography>
          ) : null}
        </Box>
      </CardActionArea>
    </Card>
  )
}

Component.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string,
  }).isRequired,
}

export { Component as PostSummary, Component as PostSummaryComponent }