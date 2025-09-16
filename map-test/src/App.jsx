import { use, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const kakaoKey = import.meta.env.VITE_APP_KEY;
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {

    if (mapInstance.current) return;

    if (!window.kakao) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const mapOptions = {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: 1
              };

            mapInstance.current = new window.kakao.maps.Map(mapRef.current, mapOptions);

              new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(latitude, longitude),
                map: mapInstance.current,
              });
            },
            (error) => {
              console.error("위치 정보를 가져올 수 없습니다.", error);
            }
          );
        } else {
          alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
        }
      });
    }
  }, []);
  return (
    <div>
      <h1>카카오맵</h1>
      <div ref={mapRef} style={{ width: '402px', height: '820px' }}></div>
    </div>
  );
}

export default App;
