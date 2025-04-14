import { useState } from 'react';
import { signup } from '../api/user';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signup({ username, password });
      console.log("회원가입 성공");
      navigate("/login");
    } catch (err: any) {
      const message = err.response?.data?.message || '회원가입입에 실패했습니다.';
      console.error('회원가입 실패: ', message);
      setErrorMsg(message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 30, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 className='font-bold text-xl mb-4'>Signup</h2>
      <form onSubmit={handleSignup}>
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
          JOIN
        </button>
      </form>
    </div>
  );
}

export default Signup;
