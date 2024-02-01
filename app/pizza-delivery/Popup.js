import { OverlayView } from '@vis.gl/react-google-maps';

const Popup = ({ location, onCloseClick }) => {
  const popupStyle = {
    background: '#fff',
    borderRadius: '5px',
    padding: '10px',
  };

  return (
    <OverlayView
      position={{ lat: parseFloat(location.acf.latitude), lng: parseFloat(location.acf.longitude) }}
    >
      <div style={popupStyle}>
        <h5>{location.acf.name}</h5>
        <p>
          {location.acf.address}<br />
          {location.acf.city}, {location.acf.state} {location.acf.zip}
        </p>
        <button onClick={onCloseClick}>Close</button>
      </div>
    </OverlayView>
  );
};

export default Popup;