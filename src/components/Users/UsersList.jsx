import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { userDetail } from "./UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import Drawer from "../NavBar/Drawer/Drawer";

import {
  Loader,
  Center,
  List,
  Title,
  Text,
  Flex,
  Pagination,
  Image,
} from "@mantine/core";

function UsersList() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);
  let { type } = useParams();
  const [userdata, setUserdata] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = userdata.slice(indexOfFirstPage, indexOfLastPage);

  // const name = "super-admin";
  // console.log(name)

  const showUserDetail = (data) => {
    dispatch(
      userDetail({
        id: data.id,
      })
    );
    navigate(`/profile/${data.firstName}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Axios.get(`https://dummyjson.com/users`);
        setUserdata(data.data.users);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="h-screen bg-[#20212c]">
      <Drawer/>
      {isLoading ? (
        <Center
          sx={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <Loader size="xl" />
        </Center>
      ) : (
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="nowrap"
        >
          <ul>
            {currentPosts.map((data) => (
              <List
                key={data.id}
                className="flex items-center justify-start my-3 p-2 shadow-md shadow-[#686c741a] bg-list-blue rounded-md cursor-pointer h-1/4 w-[70vw]  hover:bg-slate-800"
                onClick={() => showUserDetail(data)}
              >
                <Image
                  height={80}
                  width={80}
                  withPlaceholder
                  src={data.image}
                  alt={data.firstName}
                  className="rounded-full bg-cyan-900 mr-12 overflow-hidden"
                />
                <Flex
                  justify="flex-start"
                  align="flex-start"
                  direction="column"
                  wrap="nowrap"
                >
                  <Title>
                    {data.firstName} {data.lastName}
                  </Title>
                  <Text>{data.email}</Text>
                </Flex>
              </List>
            ))}
          </ul>

          <Pagination
            total={5}
            size="xl"
            radius="xl"
            withEdges
            onChange={setCurrentPage}
          />
        </Flex>
      )}
    </div>
  );
}

export default UsersList;
