import logo from './logo.svg';
import React,{useState} from "react";
import axios from 'axios';
import jsonFile from "./example.json";
import ngeohash from 'ngeohash'
import { RenderAfterNavermapsLoaded, NaverMap, Marker,Rectangle } from "react-naver-maps";
// client id = 6qwkueng4z
  //MskYLQOWYg7kMTlwFD4oVJcmshWhhu5ehGfNq9s0
 // const NAVER_API_KEY = '6qwkueng4z';
let markArr=[];
function NaverMapAPI() {
  
  const navermaps = window.naver.maps;
  const min = {x: 126.5322317, y: 33.3572421};
  const max = {x: 126.5364907, y: 33.3608829};
  const bounds = {
    north: max.y,
    east: max.x,
    south: min.y,
    west: min.x
  };
  
  return (
    <div>
      <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '85vh' // 네이버지도 세로 길이
      }}
      defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
      defaultZoom={13} // 지도 초기 확대 배율
      
    >
      {markArr.map((data,i)=>{
        return(
            <Marker
              key={i}
              position={new navermaps.LatLng(data.latitude, data.longitude)}
              animation={2}
              onClick={() => {alert("여기는 ~ 입니다.");}}
            />
        )
      })}

    {/* <Rectangle 
        bounds={bounds}
        fillOpacity={0.5}
        fillColor={'#FF0000'}
        strokeColor={'red'}
        clickable={true} // click event를 다루기 위해서는 true로 설정되어야함.
        onClick={() => {
          alert('여기는 한라산 입니다.')
        }}
      /> */}
    </NaverMap>
    
    </div>
    
    
  );
}

const  App=()=> {
  const [jsonList,setJsonList] = useState([]);
  let arr=[];
  jsonFile.map((data,i)=>{
    arr.push(ngeohash.decode(data.geohash))
    //console.log(ngeohash.decode(data.geohash))
  })
  markArr=arr;
  console.log(markArr)
  // console.log(jsonFile.map((data,i)=>{
  //   return(
  //     data
  //   )
  // }))
  

  // var markerClustering = new MarkerClustering({
  //   minClusterSize: 2,
  //   maxZoom: 8,
  //   map: map,
  //   markers: markers,
  //   disableClickZoom: false,
  //   gridSize: 120,
  //   indexGenerator: [10, 100, 200, 500, 1000],
  //   stylingFunction: function(clusterMarker, count) {
  //       $(clusterMarker.getElement()).find('map').text(count);
  //   }
  // });
  
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={'6qwkueng4z'} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
    
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
}

export default App;
