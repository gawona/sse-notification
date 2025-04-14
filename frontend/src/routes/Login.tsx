import React, { useEffect, useState } from 'react';
import { login } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, setAccessToken } = useUserStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await login({ username, password });
        const { username: id, role, token } = res.data.data;
        sessionStorage.setItem("access_token", token);
        sessionStorage.setItem("username", id);
        sessionStorage.setItem("role", role);

        setAccessToken(token);
        setRole(role);

        console.log("로그인 성공");
        navigate("/home");
    } catch (err: any) {
      const message = err.response?.data?.message || '로그인에 실패했습니다.';
      console.error('로그인 실패: ', message);
      setErrorMsg(message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 30, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 className='font-bold text-xl mb-4'>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 12 }}>
          {errorMsg && (<div className='text-xs text-red-500 mb-2'>{errorMsg}</div>)}
          <input
            type="username"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='text-sm'
            style={{ width: '100%', padding: 8, border: '1px solid black' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='text-sm'
            style={{ width: '100%', padding: 8, border: '1px solid black' }}
          />
        </div>
        <button type="submit" className='text-sm font-semibold' style={{ width: '100%', padding: 10, background: 'black', color: '#fff' }}>
          로그인
        </button>
      </form>
      <div style={{ marginTop: 10, textAlign: 'right' }}>
        <button
          onClick={() => navigate('/signup')}
          style={{ fontSize: 12, background: 'none', border: 'none', color: 'black', cursor: 'pointer' }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
