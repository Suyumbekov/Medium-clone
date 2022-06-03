import React from 'react';
import { Link } from 'react-router-dom';

import urlHelper from '../../../../utils/urlHelper';
import styles from '../Header.module.scss';

const GuestLinks = () => {
  const encodedRedirectUrl = urlHelper.computeEncodedRedirectUrl();

  return (
    <div className={styles.guest}>
      <Link className={styles['sign-in']} to={`/blogs/1`}>Макалалар</Link>
      <Link className={styles['sign-in']} to={`/login?redirectUrl=${encodedRedirectUrl}`}>Вакансиялар</Link>
      <Link className={styles['sign-in']} to={`/login?redirectUrl=${encodedRedirectUrl}`}>Кирүү</Link>
      <Link className="btn" to={`/register?redirectUrl=${encodedRedirectUrl}`}>Катталуу</Link>
    </div>
  );
};

export default GuestLinks;
