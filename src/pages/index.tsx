import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Content from '../components/landing/Content';
import Footer from '../components/landing/Footer';
import Header from '../components/common/header';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      router.push('/my-dashboard');
    }
  });
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};

export default Home;
