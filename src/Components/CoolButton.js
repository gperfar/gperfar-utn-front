import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export const CoolButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 1,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    width: 100
    // padding: '0 30px',
  });