import React from "react";
import styles from './BuyFollowersCoverIcon.module.scss';
import CoverIcon from '../../public/icons/cover.svg';
import Image from 'next/image';

const BuyFollowersCoverIcon: React.FC = () => {
    return (
    <div className={styles.coverIconContainer}>
        <Image
            src={CoverIcon}
            alt="Buy Followers, Likes and Reactions on Twitter or Telegram"
        />
    </div>
    )
}

export default BuyFollowersCoverIcon
