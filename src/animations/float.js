import styled, { keyframes } from "styled-components";
import { pulse } from "react-animations";

const pulseAnimation = keyframes`${pulse}`;

const PulsyDiv = styled.div`
	animation: 2s ${pulseAnimation} infinite;
`;

export default PulsyDiv;
