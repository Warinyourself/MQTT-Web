import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

const Wrapper = dynamic(() => import('../components/general/Wrapper'), {
  ssr: false,
});

function IndexPage() {
  return (
    <Layout title="Home | Next.js + TypeScript Example" showFooter={false}>
      <Wrapper />
    </Layout>
  );
}

export default IndexPage;
