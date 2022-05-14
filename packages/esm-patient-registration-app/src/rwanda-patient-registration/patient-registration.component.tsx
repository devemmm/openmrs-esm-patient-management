import React from 'react';
import { SideWrapper, Wrapper, Content, Heading, Label, Section } from './index.styled';
import RegistrationForm from './components/Form';
import IconList from './components/IconList';

export const RwandaPatientRegistration = () => {
  const MenuItems = [
    {
      title: 'Identifiers',
      link: 'identifiers',
    },
    {
      title: 'Personal Details',
      link: 'personal-details',
    },
    {
      title: 'Domicile Details',
      link: 'domicile-details',
    },
    {
      title: 'Residence Details',
      link: 'residence-details',
    },
    {
      title: 'Other Details',
      link: 'Other Details',
    },
  ];

  return (
    <Wrapper>
      <SideWrapper>
        <Section>
          <Heading>Create New Patient</Heading>
          <Label> Jump to</Label>
          {MenuItems.map((item, i) => (
            <IconList title={item.title} link={item.link} key={i} />
          ))}
        </Section>
      </SideWrapper>
      <Content>
        <RegistrationForm />
      </Content>
    </Wrapper>
  );
};
