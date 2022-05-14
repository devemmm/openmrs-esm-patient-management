import { DatePicker, Form, FormGroup, NumberInput, Select, TextInput, Tile } from 'carbon-components-react';
import { color } from '../../constants';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h5`
  color: ${color.black};
`;

const Label = styled.div`
  display: flex;
  padding: 0.5em 1em 1em 0em;
  font-size: small;
  flex-direction: column;
  color: ${color.labelGrey};
`;
const Card = styled(Tile)`
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0em;
`;

const TextInputBox = styled(TextInput)`
  &:disabled {
    background-color: ${color.white};
    color: ${color.black};
  }
  display: flex;
  background-color: ${color.white};
  margin: 0.5em 0em;
`;

const Forms = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const GenderGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  flex: 5;
  margin-top: 0.7em;
  padding-top: 0.5em;
`;

const DatePickerBox = styled(DatePicker)`
  padding-top: 1.4em;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
`;

const SelectBox = styled(Select)`
  &:disabled {
    background-color: ${color.white};
    color: ${color.black};
  }
`;
const NumberInputBox = styled(NumberInput)`
  margin: 1em 0em;
  width: 100%;
`;

export {
  Wrapper,
  Heading,
  Label,
  Card,
  TextInputBox,
  Section,
  Forms,
  GenderGroup,
  Row,
  SelectBox,
  NumberInputBox,
  DatePickerBox,
};
