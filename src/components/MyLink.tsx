import React, { useState, ReactNode } from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
} as const;

interface MyLinkProps {
  children: ReactNode;
  page?: string;
}
export default function MyLink({ children, page }: MyLinkProps) {
  const [status, setStatus] = useState<string>(STATUS.NORMAL);

  const updateHoveredStatus = () => {
    setStatus(() => STATUS.HOVERED);
  };

  const updateNormalStatus = () => {
    setStatus(() => STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || '#'}
      onMouseEnter={updateHoveredStatus}
      onMouseLeave={updateNormalStatus}
    >
      {children}
    </a>
  );
}
MyLink.defaultProps = {
  page: undefined,
};
