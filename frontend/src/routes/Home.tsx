import { BellIcon } from "../components/BellIcon";
import { ReactElement, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { notify } from "../api/notification";
import { useNotificationStore } from "../store/notificationStore";

interface Menu {
  icon: ReactElement;
  link: string;
  label: string;
  indicator?: boolean;
}

const Home: React.FC = () => {
  const location = useLocation();
  const indicator = useNotificationStore((state) => state.indicator);
  
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const accessToken = sessionStorage.getItem("access_token");

  const bottomMenus : Menu[] = [
    {
      icon: <BellIcon className="w-8 h-8" />,
      link: "/notification",
      indicator: indicator,
      label: 'notification',
    },
  ];

  // useEffect(() => {
  //   if (location.pathname === "/notification") {
  //     // setBottomMenus(prevMenus =>
  //     //   prevMenus.map(menu =>
  //     //     menu.link === "/notification" ? { ...menu, indicator: true } : menu
  //     //   )
  //     // );
  //     setIndicator(false);
  //   }
  // }, [location.pathname, setIndicator]);

  const handleNotifyToAdmin = async () => {
    try {
      const res = await notify("admin");
      console.log(res.data);
    } catch (e: any) {
      console.error('알림 전송 실패:', e.response?.data?.message);
    }
  };

  const activeColor = 'text-amber-500';
  const inactiveColor = 'text-primary-content';

  const bottomMenuItems = bottomMenus.map((menu) => (
    <li key={menu.link} className="py-3 px-2 relative">
      {menu.indicator && (
        <span className="absolute top-3.5 right-8 w-2 h-2 bg-red-500 rounded-full shadow shadow-red-300"></span>
      )}

      <NavLink to={menu.link} className={({ isActive }) => isActive ? activeColor : inactiveColor}>
        <div className="flex flex-col justify-center">
          {menu.icon}
          <div className="text-[10px]">{menu.label}</div>
        </div>
      </NavLink>
    </li>
  ));

  return (
    <div style={{ margin: 'auto', padding: 30 }}>
      <h2 className="font-bold text-2xl mb-4">Home</h2>
      <div className="text-sm text-gray-600 mb-4">
        {username && role ? (
          <>
            <p className="mb-1 font-semibold">👤 사용자: <strong>{username}</strong></p>
            <p className="mb-1 font-semibold">🔑 권한: <strong>{role}</strong></p>
          </>
        ) : (
          <p>사용자 정보가 없습니다.</p>
        )}
      </div>

      {role === "ROLE_USER" && (
        <button
          className="bg-gray-900 hover:bg-gray-700 text-white text-xs mt-5 px-3 py-2 rounded"
          onClick={handleNotifyToAdmin}
        >
          관리자에게 알림 보내기
        </button>
      )}

      {role === "ROLE_ADMIN" && (
        <>
          <nav className="shrink-0 mt-5 box-border w-fit">
            <ul className="mb-8">{bottomMenuItems}</ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Home;
