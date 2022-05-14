import { Accordion, AccordionItem, ComposedModal, ModalBody, ModalHeader } from 'carbon-components-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ComposedModalBox = styled(ComposedModal)`
  display: flex;
  flex: 1;
`;

const ModalHeaderBox = styled(ModalHeader)`
  display: flex;
  flex: 1;
`;

const AccordionSection = styled(Accordion)`
  display: flex;
  flex: 1;
  padding: 0.3em 0em;
`;

const AccordionItemSection = styled(AccordionItem)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ModalBodySection = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0em;
  padding-right: 0%;
  .bx--accordion__content {
    padding: 1em;
  }
  .bx--modal-container {
    display: flex;
    padding: 0em;
    margin: 0em;
    .bx--modal-content .sc-gJvHvF .jTvbxB {
      padding: 0%;
    }
  }
`;

const EditButton = styled.div`
  background-color: green;
  padding: 0em 1em;
  border-radius: 5px;
  color: white;
`;
const AccordionTitle = styled.div``;

const RootSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  margin: 0.5em;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  width: 50%;
  flex: 0.3;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  padding: 1em 0em;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
`;

const RowItem = styled.div`
  display: flex;
  flex: 1;
  margin: 0em 1em;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0em;
`;

export {
  Wrapper,
  ComposedModalBox,
  ModalHeaderBox,
  AccordionItemSection,
  AccordionSection,
  AccordionTitle,
  EditButton,
  ModalBodySection,
  ItemSection,
  RootSection,
  Header,
  Row,
  Column,
  Section,
  RowItem,
};
