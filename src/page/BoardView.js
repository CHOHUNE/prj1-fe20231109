import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

export function BoardView() {
  const [board, setBoard] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <h1> 글 보기 </h1>ㅑ
      <FormControl>
        <FormLabel>
          제목
          <Input value={board.title} readOnly />
        </FormLabel>
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea value={board.content} readOnly>
          {" "}
        </Textarea>
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.writer} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성일시</FormLabel>
        <Input value={board.inserted} readOnly />
      </FormControl>
      <p>번호 :{board.id}</p>
      <p>제목: {board.title}</p>
      <p>본문 : {board.content}</p>
      <p>작성자 : {board.writer}</p>
      <p>작성일시 : {board.inserted}</p>
    </Box>
  );
}
