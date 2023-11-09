import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function BoardView() {
  const [board, setBoard] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/board/remove/" + id)
      .then((response) => {
        toast({
          description: id + " 번 게시물이 삭제",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제 발생",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  return (
    <Box>
      <h1>{board.id}번 글 보기 </h1>ㅑ
      <FormControl>
        <FormLabel>제목</FormLabel>

        <Input value={board.title} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea value={board.content} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.writer} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성일시</FormLabel>
        <Input value={board.inserted} readOnly />
      </FormControl>
      <Button colorScheme={"purple"}>수정 </Button>
      <Button colorScheme="red" onClick={onOpen}>
        삭제
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인 </ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              삭제하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
