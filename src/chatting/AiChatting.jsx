import React from "react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const ChatContent = styled.div`
  width: 400px;
  height: 600px;
  overflow-y: scroll;
  background-color: #a9a9a9;
  border-radius: 10px;
  padding: 10px;
`;

const Line = styled.div`
  width: 100%;
  height: auto;
  margin: 0px 0px 0px 0px;
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.span`
  background: #2e2e2e;
  padding: 5px;
  max-width: 200px;
`;

const Mine = styled.span`
  display: block;
  margin-left: auto;
  background: #2e2e2e;
  padding: 10px;

  max-width: 200px;
  border-radius: 5px;
  word-break: break-all;
`;

const Other = styled.span`
  display: block;
  margin-right: auto;
  background: #6d6d6d;
  padding: 10px;
  max-width: 200px;
  border-radius: 5px;
  word-break: break-all;
`;
const WrapInput = styled.div`
  margin: -50px 0px 0px 0px;
`;
const Input = styled.input`
  width: 300px;
  height: 25px;
  border-radius: 5px;
`;
const Button = styled.button`
  font-size: 12px;
`;

const AiChatting = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      content: "안녕",
      type: "ai",
    },
  ]);

  const Ref = useRef();

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const onSendHandler = () => {
    setMessages((prev) => {
      return [...prev, { type: "mine", content: text }];
    });

    setText("");

    openai
      .createCompletion({
        model: "text-davinci-002",
        prompt: text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((res) => {
        setMessages((prev) => {
          return [...prev, { type: "ai", content: res.data.choices[0].text }];
        });
        // console.log(res.data.choices[0].text);
      });

    // const sendText = [...send];
    // sendText.push(text);
    // setSend(sendText);
    // console.log(sendText);
  };

  return (
    <>
      <p>AI</p>
      <ChatContent>
        <Line>
          {messages.map((message, idx) => {
            if (message.type === "mine") {
              return <Mine key={idx}>{message.content}</Mine>;
            } else {
              return <Other key={idx}>{message.content}</Other>;
            }
          })}
        </Line>
      </ChatContent>
      <WrapInput>
        <Input id="input" value={text} onChange={onChangeHandler} />
        <Button id="send" ref={Ref} onClick={onSendHandler}>
          전송
        </Button>
      </WrapInput>
    </>
  );
};

export default AiChatting;
