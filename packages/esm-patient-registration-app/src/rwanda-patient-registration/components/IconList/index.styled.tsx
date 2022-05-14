import styled from 'styled-components';
import { Link } from 'react-scroll';
import { color } from '../../constants';

const IconWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: 'flex-end';
`;

const LinkWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const LinkTo = styled(Link)`
  color: ${color.black};
  padding: 0.4em;
  align-self: center;
  cursor: pointer;
`;
const SubHeading = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.4em 0em;
  font-size: medium;
  flex-direction: column;
  font-weight: 550;
`;

export { IconWrapper, LinkWrapper, LinkTo, SubHeading };
