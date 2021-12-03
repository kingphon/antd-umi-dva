import { FC } from 'react';

import Main from '../components/templates/Main';

const IndexPage: FC = (props) => {
  return <Main>{props.children}</Main>;
};

export default IndexPage;
