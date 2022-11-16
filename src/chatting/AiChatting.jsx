import React from "react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { Configuration, OpenAIApi } from "https://cdn.skypack.dev/openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const ChatContent = styled.div`
  height: 350px;
  overflow-y: scroll;
`;

const Line = styled.div`
  width: 100%;
  height: auto;
  margin-top: 10px;
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
`;

const Other = styled.span`
  display: block;
  margin-right: auto;
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
      <input id="input" value={text} onChange={onChangeHandler} />
      <button id="send" ref={Ref} onClick={onSendHandler}>
        전송
      </button>
    </>
  );
};

export default AiChatting;
