import { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [list, setList] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/member/list").then((response) => setList(response.data));
  }, []);

  if (list === null) {
    return <Spinner />;
  }

  function handleTableRowClick(id) {
    const params = new URLSearchParams();
    params.set("id", id);
    // /member?id=id
    navigate("/member?" + params.toString());
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>pw</Th>
            <Th>별명</Th>
            <Th>email</Th>
            <Th>가입일시</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((member) => (
            <Tr
              _hover={{ cursor: "pointer" }}
              onClick={() => handleTableRowClick(member.id)}
              key={member.id}
            >
              <Td>{member.id}</Td>
              <Td>{member.password}</Td>
              <Td>{member.nickName}</Td>
              <Td>{member.email}</Td>
              <Td>{member.inserted}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
