import type { Metadata } from 'next';

import AccountMenu from '@/components/accountMenu/AccountMenu';
import MenuButton from '@/components/menuButton/MenuButton';
import AccountSettings from '@/components/accountSettings/AccountSettings';

import './Profile.scss';

export const metadata: Metadata = {
  title: 'Burgers. App | User Profile',
};

const Profile = () => {
  return (
    <div className='profile'>
      <div className='container'>
        <h1 className='profileHeader'>Your profile</h1>
        <MenuButton />
        <div className='profileWrap'>
          <AccountMenu />
          <AccountSettings />
        </div>
      </div>
    </div>
  );
};

export default Profile;
