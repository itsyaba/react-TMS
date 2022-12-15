import React from "react";
import { Table, Title } from "@mantine/core";
import Drawer from "../../components/NavBar/Drawer/Drawer";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function ActivityLog() {
  const activity = useSelector((state) => state.activity);
  console.log(activity);
  return (
    <div className="bg-[#20212c] h-screen w-screen">
      <Drawer name="super-admin" />
      <div className="ml-24 pt-12">
        <Title className="text-center">Monitor - Activity Log</Title>
        <div className="mt-36">
          <Table horizontalSpacing="lg" verticalSpacing="md" fontSize="md">
            <thead>
              <tr>
                <th>Operation Name</th>
                <th>Status</th>
                <th>Time</th>
                <th>Event Initiated By </th>
              </tr>
            </thead>
            <tbody>
              {activity?.map((item) => (
                <tr key={uuidv4()}>
                  <td>{item.operationName}</td>
                  <td>{item.completed}</td>
                  <td>{item.time}</td>
                  <td>{item.eventIntiatedBy}</td>
                </tr>
              ))}

            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
