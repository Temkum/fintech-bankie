import React from 'react';
import HeaderBox from '../../components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const loggedIn = {
    firstName: 'Tem',
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently"
          />

          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={2500.39} />
        </header>
      </div>
    </section>
  );
};

export default Home;
