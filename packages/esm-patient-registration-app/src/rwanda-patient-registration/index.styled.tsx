import { color } from './constants';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 6rem;
  width: 80%;
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0em 2em;
`;
const Heading = styled.div`
  font-size: x-large;
  font-weight: 550;
`;

const Content = styled.div`
  display: flex;
  width: 50%;
  margin-left: 2em;
  flex-direction: column;
`;

const Label = styled.div`
  display: flex;
  padding: 1em 0em;
  font-size: small;
  flex-direction: column;
  color: ${color.labelGrey};
`;
const SubHeading = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.4em 0em;
  font-size: medium;
  flex-direction: column;
  font-weight: 550;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0em 2em;
`;

export { Wrapper, SideWrapper, Content, Heading, Label, SubHeading, Section };
