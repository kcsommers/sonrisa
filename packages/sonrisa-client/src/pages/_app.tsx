import { SharedHead } from '../components/shared-head/SharedHead';

export const App = ({ Component }) => {
  return (
    <>
      <SharedHead />
      <Component />
    </>
  );
};
