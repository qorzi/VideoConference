import './App.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components'
import { normal } from './theme/theme';
import Home from './pages/homepage/home';

function App() {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={ normal }>
          <Main>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/detail' element={<div>상세페이지임</div>}/>
              <Route path='*' element={<div>404</div>}/>
            </Routes>
          </Main>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;

const Main = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${props => props.theme.color.defaultColor};
  background-image: 
    linear-gradient(to bottom, transparent, transparent 16.6667%, ${props => props.theme.color.defaultBgColor} 16.6667%),
    linear-gradient(to right, ${props => props.theme.color.defaultDotColor}, ${props => props.theme.color.defaultDotColor} 16.6667%, ${props => props.theme.color.defaultBgColor} 16.6667%);
  background-size: 6px 6px;
  font-size: 36px;
  line-height: 160%;
`