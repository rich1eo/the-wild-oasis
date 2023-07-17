import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import {
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

type PositionType = {
  x: number;
  y: number;
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{
  $position: PositionType;
}>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${props => props.$position.x}px;
  top: ${props => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextType = {
  openId: string;
  position: PositionType | null;
  open: (id: string) => void;
  close: () => void;
  handlePosition: ({ x, y }: PositionType) => void;
};

const MenusContext = createContext<MenusContextType | null>(null);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState<PositionType | null>(null);

  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId('');
  const handlePosition = ({ x, y }: PositionType) => setPosition({ x, y });

  return (
    <MenusContext.Provider
      value={{ openId, position, close, open, handlePosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const { openId, open, close, handlePosition } = useContext(
    MenusContext
  ) as MenusContextType;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const rect = (event.target as HTMLElement)
      .closest('button')
      ?.getBoundingClientRect();

    if (rect)
      handlePosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: string; children: ReactNode }) {
  const { openId, position, close } = useContext(
    MenusContext
  ) as MenusContextType;
  const ref = useOutsideClick(close) as React.RefObject<HTMLUListElement>;

  if (id !== openId) return null;

  return createPortal(
    <StyledList $position={position!} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
}) {
  const { close } = useContext(MenusContext) as MenusContextType;

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
