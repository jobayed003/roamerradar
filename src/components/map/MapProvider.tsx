import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

const MapProvider = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === 'undefined' || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: 'pk.eyJ1Ijoiam9iYXllZDAwMyIsImEiOiJjbHU0YnRtMzYxNmYzMnFwZDE4OHh2cWhiIn0.7LFNKJzuehCadWwkFCKWsQ',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div ref={mapNode} style={{ width: '100%', height: '100%' }} />;
};

export default MapProvider;
