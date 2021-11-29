import { useContext, useEffect, useState } from "react";
import { Button } from ".";
import { getAttendance } from "../api";
import { AuthContext } from "../provider/authContext";

type ItemType = {
  userId: string;
  emotion: string;
  confidence: number;
  timestamp: string;
};

export const Attendance = () => {
  const [tableItems, setTableItems] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    console.log("token:", token);
  }, [token]);

  const onClick = async () => {
    const response = await getAttendance(token);
    console.log(response.data);
    setTableItems(response.data);
  };

  return (
    <>
      <Button onClick={onClick}>Get Attendance Information</Button>
      {tableItems.map((item: ItemType, index) => {
        return (
          <div key={index}>
            <div>User ID: {item.userId}</div>
            <div>Emotion: {item.emotion}</div>
            <div>Confidence: {item.confidence}</div>
          </div>
        );
      })}
    </>
  );
};
