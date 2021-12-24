import { BeatLoader } from 'react-spinners';
import { useTheme, css } from '@mui/material/styles';

const override = css`
  display: inline-block;
  margin: 2;
`;

const Loader = () => {
  const theme = useTheme();
  return (
    <BeatLoader color={theme.palette.grey[500]} css={override} size={10} />
  );
};

export default Loader;
