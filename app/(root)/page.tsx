import React from 'react';
import HeaderBox from '../../components/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';

const Home = () => {
  const loggedIn = {
    firstName: 'Tem',
    lastName: 'Huang',
    email: 'tem@me.com',
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

          <TotalBalanceBox
            accounts={[]}
            totalBanks={3}
            totalCurrentBalance={2500.39}
          />
        </header>
      </div>

      <RightSidebar user={loggedIn} banks={['2', '3']} />
    </section>
  );
};

export default Home;
