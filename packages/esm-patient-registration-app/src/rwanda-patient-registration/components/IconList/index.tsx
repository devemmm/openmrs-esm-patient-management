import { TextNewLine24 } from '@carbon/icons-react';
import React from 'react';
import { IconWrapper, SubHeading, LinkTo, LinkWrapper } from './index.styled';

function IconList({ title, link }) {
  return (
    <SubHeading>
      <IconWrapper>
        <TextNewLine24 />
        <LinkWrapper>
          <LinkTo to={link} smooth={'500'}>
            {title}
          </LinkTo>
        </LinkWrapper>
      </IconWrapper>
    </SubHeading>
  );
}

export default IconList;
