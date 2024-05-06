import styled from "styled-components";
import { Link } from "react-router-dom";
import SuccessfulIcon from "../../assets/Images/thanks.png";

/**
 * Renders the success page for payment completion.
 * 
 * @returns JSX.Element representing the success page.
 */
const Success = () => {
  return (
    <SuccessWrap>
      <SuccessDiv>
        <img src={SuccessfulIcon} width={400} height={300} />
        <p>Your Payment is Successful!</p>
        <Link to="/fundraiser"><span>Go Back</span></Link>
      </SuccessDiv>
    </SuccessWrap>
  )
}

// Styling
const SuccessWrap = styled.article`
  width: 100%;
  height: 100%;
  text-align: center;

  p {
    margin: 40px 0;
    font-size: 28px;
  }

  span {
    font-size: 24px;
  }
`;

const SuccessDiv = styled.div`
  position: absolute;
  top: 25%;
  left: 40%;
`;

export default Success;