import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ location }) => {
  return (
    <div className="flex mt-4 justify-center items-center h-full">
      <div className="w-full h-full" style={{ width: '600px', height: '300px' }}>
        <MapContainer
          center={location} // Use dynamic location for center
          zoom={13} // Default zoom level
          style={{ width: '100%', height: '100%' }} // Set map size
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tile layer
          />
          <Marker position={location}> {/* Use dynamic location for marker position */}
            <Popup>
              A popup that displays when you click the marker.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
