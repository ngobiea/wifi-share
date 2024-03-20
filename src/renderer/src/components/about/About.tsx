import Description from './Description';
import DeveloperContact from './DeveloperContact';
import ReleaseNote from './ReleaseNote';
import Features from './Features';
import { useAppSelector } from '../../store/hooks';
const About = (): JSX.Element => {
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <div
      className={`h-[calc(100vh-105px)] overflow-y-scroll px-2 overscroll-x-none ${isDarkMode?' text-white':''}`}
    >
      <Description />
      <Features />
      <ReleaseNote />
      <DeveloperContact />
    </div>
  );
};

export default About;
