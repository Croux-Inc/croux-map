import "leaflet/dist/leaflet.css";
import style from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useState, useEffect } from "react";
import IconToggleButton from "../buttons/IconToggleButton";
import { BriefcaseIcon, UserIcon } from "@heroicons/react/24/outline";
import TalentPopup from "./TalentPopup";
import BusinessPopup from "./BusinessPopup";

export default function Map() {
  const talentIcon = new Icon({
    iconUrl: "https://i.imgur.com/BjDzCDS.png",
    iconSize: [25, 25],
  });
  const businessIcon = new Icon({
    iconUrl: "https://i.imgur.com/U19OoLb.png",
    iconSize: [25, 25],
  });
  //state
  const [talentData, setTalentData] = useState(null);
  const [businessData, setBusinessData] = useState(null);

  const [useTalent, setUseTalent] = useState(true);
  const [useBusiness, setUseBusiness] = useState(false);

  //on mount lifecycle, fetch data
  //on data fetch, set state
  useEffect(() => {
    fetchTalent();
    fetchBusinesses();
  }, []);

  //data fetch function
  const fetchTalent = async () => {
    let url = process.env.NEXT_PUBLIC_API_URL + "/admin/talent_map";
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_BEARER_TOKEN}`,
        AuthorizationUser: process.env.NEXT_PUBLIC_API_AUTH_USER,
      },
    };

    await fetch(url, options).then(async (res) => {
      let data = await res.json();
      setTalentData(data.data);
    });
  };

  //data fetch function
  const fetchBusinesses = async () => {
    let url = process.env.NEXT_PUBLIC_API_URL + "/admin/business_map";
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_BEARER_TOKEN}`,
        AuthorizationUser: process.env.NEXT_PUBLIC_API_AUTH_USER,
      },
    };

    await fetch(url, options).then(async (res) => {
      let data = await res.json();
      setBusinessData(data.data);
    });
  };

  const talentButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px",
    zIndex: "400",
  };

  const businessButtonStyle = {
    position: "absolute",
    top: "80px",
    right: "20px",
    padding: "10px",
    zIndex: "400",
  };

  return (
    <>
      <MapContainer
        center={[39.695769, -97.707045]}
        zoom={5}
        className={style.map}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {useTalent &&
          talentData?.map((user) => {
            return (
              <Marker
                key={user.id}
                position={[user.lat, user.long]}
                icon={talentIcon}
              >
                <Popup>
                  <TalentPopup talent={user} />
                </Popup>
              </Marker>
            );
          })}

        {useBusiness &&
          businessData?.map((user) => {
            return (
              <Marker
                key={user.id}
                position={[user.lat, user.long]}
                icon={businessIcon}
              >
                <Popup>
                  <BusinessPopup business={user} />
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
      <IconToggleButton
        style={talentButtonStyle}
        active={useTalent}
        setActive={setUseTalent}
      >
        <UserIcon className="h-6 w-6" />
      </IconToggleButton>
      <IconToggleButton
        style={businessButtonStyle}
        active={useBusiness}
        setActive={setUseBusiness}
      >
        <BriefcaseIcon className="h-6 w-6" />
      </IconToggleButton>
    </>
  );
}
