import React, { useState } from 'react';
import BuyFollowersCoverIcon from '@/components/BuyFollowersCoverIcon/BuyFollowersCoverIcon';
import Select from '@/components/CustomSelect/CustomSelect';
import styles from './BuyFollowers.module.scss';
import TgIcon from '@/public/icons/telegram.svg';
import TwIcon from '@/public/icons/twitter.svg';
import CashIcon from '@/public/icons/cashIcon.svg';
import CardIcon from '@/public/icons/cardIcon.svg';
import Image, { StaticImageData } from 'next/image';

interface Option {
    value: string;
    label: string;
    icon?: StaticImageData;
}

const socialNetworks: Option[] = [
    { value: 'Telegram', label: 'Telegram', icon: TgIcon },
    { value: 'Twitter', label: 'Twitter', icon: TwIcon },
];

const twitterActivities: Option[] = [
    { value: 'Followers', label: 'Followers' },
    { value: 'Likes', label: 'Likes' },
];

const telegramActivities: Option[] = [
    { value: 'Followers', label: 'Followers' },
    { value: 'Reactions', label: 'Reactions' },
    { value: 'Views', label: 'Views' },
];

const BuyFollowers: React.FC = () => {
    const [socialNetwork, setSocialNetwork] = useState<string>('Telegram');
    const [activity, setActivity] = useState<string>('Followers');
    const [subscribers, setSubscribers] = useState<number | ''>(0);
    const [error, setError] = useState<{ channel: boolean; subscriber: boolean }>({ channel: false, subscriber: false });
    const [channel, setChannel] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('card');

    const handleSubscribersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numberValue = value === '' ? '' : Number(value);

        if (numberValue > 1000 || numberValue < 1) {
            setError(prev => ({ ...prev, subscriber: true }));
        } else {
            setSubscribers(numberValue);
            setError(prev => ({ ...prev, subscriber: false }));
        }
    };

    const handleChannelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        try {
            new URL(value);
            setChannel(value);
            setError(prev => ({ ...prev, channel: false }));
        } catch {
            setError(prev => ({ ...prev, channel: true }));
        }
    };

    const choosePaymentMethod = (value: string) => {
        setPaymentMethod(value);
    };

    const createTask = () => {
        try {
            new URL(channel);
            setError(prev => ({ ...prev, channel: false }));
        } catch {
            setError(prev => ({ ...prev, channel: true }));
        }
        if (subscribers > 1000 || subscribers < 1) {
            setError(prev => ({...prev, subscriber: true}));
        }

        const data = {
            socialNetwork,
            activity,
            channel,
            subscribers,
            paymentMethod
        };

        console.log(data);
    };

    const activities = socialNetwork === 'twitter' ? twitterActivities : telegramActivities;

    return (
      <div className={styles.container}>
          <BuyFollowersCoverIcon />
          <div className={styles.formContainer}>
              <h2 className={styles.title}>Create Task</h2>
              <div className={styles.line} />
              <form>
                  <div className={styles.formGroup}>
                      <label className={styles.label}>Social Network</label>
                      <Select options={socialNetworks} setSelectedValue={setSocialNetwork}/>
                  </div>
                  <div className={styles.formGroup}>
                      <label className={styles.label}>Type of services</label>
                      <Select options={activities} setSelectedValue={setActivity}/>
                  </div>
                  <div className={styles.formGroup}>
                      <label className={styles.label}>
                          Channel<span className={styles.requiredIcon}>*</span>
                      </label>
                      <div className={styles.inputContainer}>
                          <input
                            type="text"
                            onChange={handleChannelChange}
                            className={error.channel ? styles.invalidInput : styles.formInput}
                            placeholder="https://t.me/channel"
                          />
                          {error.channel && (
                            <img
                              className={styles.icon}
                              src="/icons/warning.svg"
                              alt="Warning icon"
                            />
                          )}
                      </div>
                      <div className={styles.inputMessage}>
                          Provide a link to an open channel or group older than 14 days
                      </div>
                  </div>
                  <div className={styles.formGroup}>
                      <label className={styles.label}>
                          Number of subscribers<span className={styles.requiredIcon}>*</span>
                      </label>
                      <div className={styles.inputContainer}>
                          <input
                            type="number"
                            className={error.subscriber ? styles.invalidInput : styles.formInput}
                            placeholder="1000"
                            onChange={handleSubscribersChange}
                            min="1"
                            max="1000"
                          />
                          {error.subscriber && (
                            <img
                              className={styles.icon}
                              src="/icons/warning.svg"
                              alt="Warning icon"
                            />
                          )}
                      </div>
                      <div className={styles.inputMessage}>Limit 1-1000</div>
                  </div>
                  <div className={styles.paymentMethodsContainer}>
                      <div className={styles.label}>Choose your payment method</div>
                      <div className={styles.paymentBoxesContainer}>
                          <div
                            className={paymentMethod === 'card' ? styles.selectedPaymentBox : styles.paymentBox}
                            onClick={() => choosePaymentMethod('card')}
                          >
                              <div className={styles.boxTitleContainer}>
                                  <Image src={CardIcon} alt="Card" />
                                  <div className={styles.paymentTitle}>Card</div>
                              </div>
                              <div className={styles.paymentLine} />
                              <div className={styles.paymentOptions}>
                                  Visa, Mastercard
                              </div>
                          </div>
                          <div
                            className={paymentMethod === 'cash' ? styles.selectedPaymentBox : styles.paymentBox}
                            onClick={() => choosePaymentMethod('cash')}
                          >
                              <div className={styles.boxTitleContainer}>
                                  <Image src={CashIcon} alt="Cash" />
                                  <div className={styles.paymentTitle}>Cash</div>
                              </div>
                              <div className={styles.paymentLine} />
                              <div className={styles.paymentOptions}>
                                  USD, EUR, RUB
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
              <button className={styles.createTaskBtn} onClick={createTask}>
                  Create task
              </button>
          </div>
      </div>
    );
};

export default BuyFollowers;
