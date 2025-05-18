import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: sans-serif;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background: #e2f3f4;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
`;

export const DocumentList = styled.div`
  flex-grow: 1;
`;

export const DocItem = styled.div`
  padding: 8px 12px;
  margin-bottom: 6px;
  cursor: pointer;
  background: ${(props) => (props.selected ? '#d1ecf1' : 'transparent')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  border-radius: 5px;

  &:hover {
    background-color: #d9f2f2;
  }
`;

export const MainPanel = styled.div`
  flex-grow: 1;
  padding: 30px;
  background: #fff;
  overflow-y: auto;
`;

export const ChunkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const ChunkBox = styled.div`
  position: relative;
  background: ${(props) => (props.highlighted ? '#fcebcf' : '#f9f9f9')};
  border: 1px solid #eee;
  padding: 1.2rem;
  border-radius: 8px;
`;

export const ChunkTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

export const ChunkNumber = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f0f0f0;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.9rem;
`;
