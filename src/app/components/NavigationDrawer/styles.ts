import styled from 'styled-components';
import images from '../../../shared/mixins/images';
import shadows from '../../../shared/mixins/shadows';
import opacity from '../../../shared/defaults/opacity';
import typography from '../../../shared/mixins/typography';

export interface StyledProps {
  visible: boolean;
  contentVisible: boolean;
}

const getRight = (props: StyledProps) => {
  if (!props.visible) {
    return '-320px';
  }
  return 0;
};

export const Styled = styled.div`
  height: 100%;
  position: fixed;
  display: flex;
  top: 0;
  background-color: white;
  z-index: 9999;
  transition: 0.4s right cubic-bezier(0.19, 1, 0.22, 1);
  box-sizing: border-box;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${shadows(16)};

  right: ${(props: StyledProps) => getRight(props)};
`;

export const Title = styled.div`
  font-size: 20px;
  margin-left: 16px;
  margin-top: 18px;
  margin-bottom: 10px;
  opacity: ${opacity.light.primaryText};

  letter-spacing: 0.007rem;
  ${typography.robotoMedium()};
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 8px;
`;

interface DarkProps {
  visible: boolean;
}

export const Dark = styled.div`
  background-color: rgba(0, 0, 0, 0.54);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  transition: 0.2s opacity;

  opacity: ${(props: DarkProps) => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};
`;

export const NavContent = styled.div`
  width: 300px;
  border-left: 1px solid rgba(0, 0, 0, ${opacity.light.dividers});
`;

interface ContentProps {
  visible: boolean;
}

const getWidth = () => {
  const maxWidth = 640 + 64;

  if (window.innerWidth - 300 - 96 > maxWidth) {
    return `${maxWidth}px`;
  }

  return 'calc(100vw - 300px - 96px)';
};

export const Content = styled.div`
  height: 100%;
  max-width: calc(640px + 64px);
  transition: 0.5s width cubic-bezier(0.19, 1, 0.22, 1);
  overflow: auto;

  width: ${(props: ContentProps) => (props.visible ? getWidth() : 0)};
`;
