import { use, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const kakaoKey = import.meta.env.VITE_APP_KEY;
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [coords, setCoords] = useState("지도에서 위치를 클릭하면 좌표가 표시됩니다.");

  useEffect(() => {

    if (mapInstance.current) return;


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

              const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

              const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
              const imageSize = new kakao.maps.Size(64, 69) // 마커이미지의 크기입니다
              const imageOption = { offset: new kakao.maps.Point(27, 69) };
              const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

              window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                const latlng = mouseEvent.latLng;

                new window.kakao.maps.Marker({
                  position: latlng,
                  image: markerImage,
                  map: map,
                });

                setCoords(`클릭한 위치의 위도는 ${latlng.getLat().toFixed(2)} 이고, 경도는 ${latlng.getLng().toFixed(2)} 입니다`);
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
    if (!window.kakao) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);
  return (
    <div>
      <h2>카카오맵</h2>
      <div ref={mapRef} style={{ width: '400px', height: '650px' }}></div>
      <p>{coords}</p>
    </div>
  );
}

export default App;
