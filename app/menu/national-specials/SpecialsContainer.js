'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../components/useThemeProvider';
import SpecialsList from './SpecialsList';
import OrderBtn from '@/app/components/OrderBtn';

const SpecialsContainer = ({ data, posts, postType }) => {
  const theme = useContext(ThemeContext);
  const isNight = theme === 'night';

  return (
    <section className={`viewport innermenu specials-background ${isNight ? 'white-text' : ''}`}>
      <div className="full-page-container">
        <div className='flex-align-center text-align-center' style={{ padding: '0 2rem' }}>
          <h2 dangerouslySetInnerHTML={{ __html: data.title.rendered || '' }} />
          <div style={{ maxWidth: '500px' }} dangerouslySetInnerHTML={{ __html: data.content.rendered || '' }} />
        </div>
        <SpecialsList
          posts={posts}
          postType={postType}
          categoryTitle={'Sort ' + postType} />
        <div className="text-align-center">
          <OrderBtn btnColor={isNight ? '' : 'dark'} />
        </div>
      </div>
    </section>

  )
}

export default SpecialsContainer;