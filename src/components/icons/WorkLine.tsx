export const WorkLine = ({ color }: { color?: string }) => {
  return (
    <svg width='839' height='137' viewBox='0 0 839 137' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M838 4.83887C823.237 25.0088 713.617 137.14 601.48 135.889C497.352 134.728 454.07 -36.7167 262.536 60.1723C94.2489 145.302 53.9174 52.5844 1.07634 1.99272'
        stroke={color ?? '#E6E8EC'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-dasharray='4 12'
      ></path>
    </svg>
  );
};
