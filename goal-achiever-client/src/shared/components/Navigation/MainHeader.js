import classes from './MainHeader.module.scss';

const MainHeader = ({ children }) => {
  return <div className={classes.MainHeader}>{children}</div>;
};

export default MainHeader;
