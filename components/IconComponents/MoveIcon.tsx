import React from 'react';

interface MoveProps {
  width?: string,
  height?: string
}

const MoveIcon: React.FunctionComponent<MoveProps> = ({ width = '126', height = '126' }) => (
  <svg width={width} height={height} viewBox="0 0 126 126" className="move-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M63 25V101" stroke="currentColor" strokeWidth="10"/>
    <path d="M25 63L101 63" stroke="currentColor" strokeWidth="10"/>
    <path d="M80.7574 25H45.2426C42.5699 25 41.2314 21.7686 43.1213 19.8787L60.8787 2.12132C62.0503 0.949748 63.9497 0.949748 65.1213 2.12132L82.8787 19.8787C84.7686 21.7686 83.4301 25 80.7574 25Z" fill="currentColor"/>
    <path d="M25 45.2426L25 80.7574C25 83.4301 21.7686 84.7686 19.8787 82.8787L2.12132 65.1213C0.949748 63.9497 0.949748 62.0503 2.12132 60.8787L19.8787 43.1213C21.7686 41.2314 25 42.5699 25 45.2426Z" fill="currentColor"/>
    <path d="M101 80.7574V45.2426C101 42.5699 104.231 41.2314 106.121 43.1213L123.879 60.8787C125.05 62.0503 125.05 63.9497 123.879 65.1213L106.121 82.8787C104.231 84.7686 101 83.4301 101 80.7574Z" fill="currentColor"/>
    <path d="M45.2426 101H80.7574C83.4301 101 84.7686 104.231 82.8787 106.121L65.1213 123.879C63.9497 125.05 62.0503 125.05 60.8787 123.879L43.1213 106.121C41.2314 104.231 42.5699 101 45.2426 101Z" fill="currentColor"/>
  </svg>
);

export default MoveIcon;
