import { Button } from "@mui/material";
import {
  APIProvider,
  Map,
  MapMouseEvent,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { MarkerPosition } from "../../travelOrder/AddEditTravelOrder/types";
import "./GoogleMapsView.css";

interface GoogleMapsViewProps {
  markers: MarkerPosition[];
  setMarkers: Dispatch<SetStateAction<MarkerPosition[]>>;
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
}

const GoogleMapsView: FC<GoogleMapsViewProps> = (
  props: GoogleMapsViewProps,
) => {
  const getDefaultCenter = (): google.maps.LatLngLiteral | undefined => {
    const position = process.env.COMPANY_LOCATION?.split(",").map((value) =>
      parseFloat(value),
    );

    if (position) {
      return {
        lat: position[0],
        lng: position[1],
      };
    }
  };

  const handleClick = (
    event: MapMouseEvent | google.maps.IconMouseEvent | any,
  ) => {
    console.log(event);

    if (props.markers.length === 2) {
      return;
    }

    const markerPosition: MarkerPosition = {
      ...event.detail.latLng,
      placeId: event.placeId,
    };

    props.setMarkers([...props.markers, markerPosition]);
  };

  const resetMarkers = () => {
    props.setMarkers([]);
    props.setDistance(0);
  };

  return (
    <>
      <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY!}>
        <Map
          reuseMaps={true}
          style={{ width: "50vw", height: "50vh" }}
          defaultCenter={getDefaultCenter()}
          defaultZoom={16}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          //events
          onClick={handleClick}
        >
          <Directions
            markers={props.markers}
            distance={props.distance}
            setDistance={props.setDistance}
          />
          {props.markers.map((marker: MarkerPosition, index: number) => (
            <Marker key={index} position={marker} />
          ))}
        </Map>
      </APIProvider>
      <Button onClick={resetMarkers}>Reset</Button>
    </>
  );
};

interface DirectionsProps {
  markers: MarkerPosition[];
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
}

const Directions = (props: DirectionsProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map: map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (props.markers.length === 0) {
      setRoutes([]);
      return;
    }

    if (!directionsService || !directionsRenderer || props.markers.length !== 2)
      return;

    directionsService
      .route({
        origin: props.markers[0],
        destination: props.markers[1],
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.METRIC,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, props.markers]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) {
      return;
    }
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  useEffect(() => {
    if (!leg) {
      return;
    }
    props.setDistance(leg.distance?.value || 0);
  }, [leg]);

  //if (!leg) return null;

  return <div></div>;
  {
    /*return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2> 
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
    
  );*/
  }
};

export default GoogleMapsView;
