import { Rings } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <Rings
      height="200"
      width="200"
      color="#3f51b5"
      radius="6"
      wrapperStyle={{}}
      wrapperClass={css.Loader}
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};

export default Loader;
