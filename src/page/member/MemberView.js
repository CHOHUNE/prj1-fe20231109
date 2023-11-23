import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Spinner,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Card,
  Center,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberView() {
  const [member, setMember] = useState(null);
  // /member?id=userid
  const [params] = useSearchParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setMember(response.data))
      .catch((error) => {
        navigate("/login");
        toast({
          description: "권한이 없습니다.",
          status: "warning",
        });
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleDelete() {
    // axios
    // delete /api/member?id=userid
    // ok -> home 이동, toast 띄우기
    // error -> toast 띄우기
    // finally -> modal 닫기

    axios
      .delete("/api/member?" + params.toString())
      .then(() => {
        toast({
          description: "회원 탈퇴하였습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "탈퇴 처리 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  return (
    <Center>
      <Card w={"lg"}>
        <CardHeader>
          <Heading>{member.id}님 정보</Heading>
        </CardHeader>
        <CardBody>
          <FormControl mb={5}>
            <FormLabel>password</FormLabel>
            <Input type="text" value={member.password} readOnly />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>별명</FormLabel>
            <Input value={member.nickName} readOnly></Input>
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>email</FormLabel>
            <Input value={member.email} readOnly />
          </FormControl>
        </CardBody>
        <CardFooter>
          <Flex gap={2}>
            <Button
              colorScheme="purple"
              onClick={() => navigate("/member/edit?" + params.toString())}
            >
              수정
            </Button>
            <Button colorScheme="red" onClick={onOpen}>
              탈퇴
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      {/* 탈퇴 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>탈퇴 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              탈퇴
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
