import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Message from './Message';

export default function IdInput({ getId }) {
  const ID_MIN_LENGTH = 6;
  const ID_MAX_LENGTH = 10;
  const [id, setId] = useState('');
  const [msg, setMsg] = useState('');
  const [idDisabled, setIdDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  // props.setId(() => '자식에서 온 놈이다!!');
  const buttonStyle = {
    height: '56px',
    border: '1px solid black',
    fontSize: '16px',
  };

  const changeId = (event) => {
    if (
      // eslint-disable-next-line operator-linebreak
      event.target.value.length < ID_MIN_LENGTH ||
      event.target.value.length > ID_MAX_LENGTH
    ) {
      setMsg(
        `아이디는 ${ID_MIN_LENGTH}자 이상 ${ID_MAX_LENGTH}자 이하만 가능합니다.`,
      );
      // 버튼 disabled 먹여 놓고
      setBtnDisabled(() => true);
      //   console.log('현재 버튼 비활성화..');
      return;
    }
    setMsg(() => '');
    setBtnDisabled(() => false);
    // console.log('현재 버튼 활성화..');
    setId(() => event.target.value);
  };
  const checkExistId = () => {
    // 유효성 검사 한번 들어가자
    if (id.length !== id.trim().length) {
      // alert("아이디에 띄어쓰기를 포함할 수 없습니다.");
      setMsg(() => '아이디에 띄어쓰기를 포함할 수 없습니다,');
      return;
    }
    setBtnDisabled(() => true);
    // 아이디 중복 검사 axios 호출(일단은 random함수로 대체)
    if (Math.random() > 0.5) {
      // 중복이면 alert?
      alert('해당 아이디는 이미 존재합니다.');
      setBtnDisabled(() => false);
      return;
    }
    // 성공 했으면 아이디 input disabled
    alert('해당 아이디는 사용 가능합니다.');
    getId(id);
    setIdDisabled(() => true);
    setBtnDisabled(() => true);
  };

  return (
    <div>
      <InputDiv>
        <TextField
          id="outlined-basic"
          label="아이디"
          variant="outlined"
          required
          inputProps={{ minLength: 6, maxLength: 10 }}
          disabled={idDisabled}
          onChange={changeId}
        />
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={checkExistId}
          disabled={btnDisabled}
        >
          검사
        </Button>
      </InputDiv>
      <Message msg={msg} />
    </div>
  );
}

const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
