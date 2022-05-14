import React from 'react';
import {
  AccordionItemSection,
  AccordionSection,
  AccordionTitle,
  Column,
  ComposedModalBox,
  EditButton,
  Header,
  ItemSection,
  ModalBodySection,
  RootSection,
  Row,
  RowItem,
} from './index.styled';

function Modal({ visibility, data, selectHandler, escapeHandler, setForm }) {
  return (
    <>
      <ComposedModalBox open={visibility} onClose={escapeHandler}>
        <ModalBodySection>
          {data?.map((e, i) => {
            let selectedItem = {
              PRIMARY_CARE_ID: '',
              UPI: '',
              NID_APPLICATION_NUMBER: '',
              PASSPORT: '',
              NID: '',
              NIN: '',
            };
            e?.identifiers.forEach((element, index, array) => {
              selectedItem[element.system] = element.value;
            });
            return (
              <AccordionSection key={i}>
                <AccordionItemSection
                  title={
                    <AccordionTitle
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <div>Name : {e?.surName}</div>
                        <div>DOB : {e?.dateOfBirth}</div>
                        <EditButton
                          onClick={() => {
                            selectHandler(e);
                            setForm({ mode: 'edit' });
                          }}>
                          Edit
                        </EditButton>
                      </div>
                    </AccordionTitle>
                  }>
                  <RootSection>
                    <ItemSection>
                      <Header>
                        <h5
                          style={{
                            paddingLeft: '0.5em',
                            margin: '0.5em 0em',
                          }}>
                          Identifiers
                        </h5>
                      </Header>
                      <Column>
                        <Row>
                          <RowItem>UPI : {e?.identifiers[0]?.value}</RowItem>
                          <RowItem>PRIMARY_CARE_ID : {selectedItem.UPI}</RowItem>
                        </Row>
                      </Column>
                    </ItemSection>

                    <ItemSection>
                      <Header>
                        <h5
                          style={{
                            paddingLeft: '0.5em',
                            margin: '0.5em 0em',
                          }}>
                          Personal Details
                        </h5>
                      </Header>
                      <Column>
                        <Row>
                          <RowItem>SurNames : {e?.surName}</RowItem>
                          <RowItem>PostNames : {e?.postNames}</RowItem>
                        </Row>

                        <Row>
                          <RowItem> DOB : {e?.dateOfBirth}</RowItem>
                          <RowItem> Gender : {e?.gender}</RowItem>
                        </Row>

                        <Row>
                          <RowItem>Marital Status : {e?.maritalStatus}</RowItem>
                          <RowItem>Nationality : {e?.nationality}</RowItem>
                        </Row>
                      </Column>
                    </ItemSection>

                    <ItemSection>
                      <Header>
                        <h5
                          style={{
                            paddingLeft: '0.5em',
                            margin: '0.5em 0em',
                          }}>
                          Domicile Details
                        </h5>
                      </Header>

                      <Column>
                        <Row>
                          <RowItem>Country : {e?.addressList[e.addressList.length - 1].country}</RowItem>
                          <RowItem>Province : {e?.addressList[e.addressList.length - 1].state}</RowItem>
                        </Row>

                        <Row>
                          <RowItem>District : {e?.addressList[e.addressList.length - 1].district}</RowItem>
                          <RowItem>Sector : {e?.addressList[e.addressList.length - 1].sector}</RowItem>
                        </Row>

                        <Row>
                          <RowItem>Cell : {e?.addressList[e.addressList.length - 1].cell}</RowItem>
                          <RowItem>Village : {e?.addressList[e.addressList.length - 1].city}</RowItem>
                        </Row>
                      </Column>
                    </ItemSection>
                  </RootSection>
                </AccordionItemSection>
              </AccordionSection>
            );
          })}
        </ModalBodySection>
      </ComposedModalBox>
    </>
  );
}

export default Modal;
