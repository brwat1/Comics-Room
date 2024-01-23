import React from 'react'
import { Card } from 'antd'
const { Meta } = Card

const ComicCard = ({ comic }) => {
  return (
    <div style={{ width: '34vh', margin: '1rem' }}>
        <Card
          cover={
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'scale-down'
              }}
              alt={'comic cover'}
              src={comic.cover}
            />
          }
        >
          <Meta
            title={comic.title}
            description={(comic.author !== '' ? 'Written by ' + comic.author : '') + (comic.page_count !== 0 ? ', ' + comic.page_count + ' pages.' : '')}
          />
        </Card>
    </div>
  )
}

export default ComicCard
