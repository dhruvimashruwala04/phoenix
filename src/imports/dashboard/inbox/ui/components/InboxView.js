"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Archive, Mail, Star, StarredMessage } from "../assets/Icons";
import useInboxStore from "../../store/useInboxStore";
import FallBackText from "@/imports/core/components/FallBackText";

const InboxView = () => {
  const {
    selectedId,
    reply,
    setReply,
    messages,
    handleMessageClick,
    handleStar,
    handleReply,
    selectedView,
    handleUnread,
    handleArchive,
  } = useInboxStore();

  const selectedMessage = messages.find((message) => message.id === selectedId);
  const filteredMessages =
    selectedView === "all"
      ? messages.filter((m) => !m.archive)
      : selectedView === "unread"
        ? messages.filter((m) => m.read === false)
        : messages.filter((m) => m.archive);

  return (
    <Wrapper>
      {filteredMessages.length === 0 ? (
        <FallBackText text="You're all caught up" />
      ) : (
        <MessageList>
          {filteredMessages.map((message) => (
            <MessageItem
              key={message.id}
              $active={message.id === selectedId}
              onClick={() => handleMessageClick(message.id)}
              gap="14px"
            >
              <Avatar align="center" justify="center" $color={message.color}>{message.initials}</Avatar>

              <MessageContent direction="column">
                <TopRow gap="12px" justify="space-between" align="center">
                  <Name $read={message.read}>{message.name}</Name>

                  <Time>{message.time}</Time>
                </TopRow>

                <Subject $read={message.read}>{message.subject}</Subject>

                <Meta align="center" gap="7px">
                  <Type $type={message.type}>{message.type}</Type>

                  {!message.read && <UnreadDot />}
                  {message.starred && <StarredMessage />}
                </Meta>
              </MessageContent>
            </MessageItem>
          ))}
        </MessageList>
      )}
      {selectedMessage && (
        <Conversation direction="column">
          <ConversationHeader justify="space-between" align="center">
            <HeaderTitle>{selectedMessage.subject}</HeaderTitle>

            <HeaderActions align="center" gap="14px">
              <IconButton onClick={handleStar}>
                <Star $starred={selectedMessage.starred} />
              </IconButton>

              <IconButton onClick={() => handleUnread(selectedMessage.id)}>
                <Mail />
              </IconButton>

              <IconButton
                $archive={selectedMessage?.archive}
                onClick={handleArchive}
              >
                <Archive />
              </IconButton>
            </HeaderActions>
          </ConversationHeader>

          <ConversationBody gap="5px" direction="column">
            <Sender align="center" gap="10px">
              <Avatar align="center" justify="center" $color={selectedMessage.color}>
                {selectedMessage.initials}
              </Avatar>

              <SenderDetails direction="column" gap="2px">
                <SenderName>{selectedMessage.name}</SenderName>

                <SenderMeta>
                  {selectedMessage.type} · {selectedMessage.time}
                </SenderMeta>
              </SenderDetails>
            </Sender>
            {selectedMessage.message?.map((m, i) => {
              const type = m.in ? "in" : "out";
              const text = m.in || m.out;
              return (
                <MessageText key={i} $type={type}>
                  {text}
                </MessageText>
              );
            })}
          </ConversationBody>

          <ReplyArea align="center" gap="8px">
            <ReplyInput
              placeholder="Write a reply..."
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleReply();
                }
              }}
            />

            <ReplyButton onClick={handleReply}>Reply</ReplyButton>
          </ReplyArea>
        </Conversation>
      )}
    </Wrapper>
  );
};

export default InboxView;

const Wrapper = styled.div`
  width: 100%;
  max-height: 550px;
  height: 100%;
  display: grid;
  grid-template-columns: 445px minmax(0, 1fr);
  background: white;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 12px;
  overflow: hidden;
`;
const MessageList = styled.div`
  min-width: 0;
  overflow-y: auto;
  border-right: 1px solid rgb(226, 232, 240);
`;
const MessageItem = styled(Flex)`
  position: relative;
  min-height: 78px;
  padding: 14px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(241, 245, 249);
  background: ${({ $active }) => ($active ? "rgb(248, 250, 255)" : "white")};
  cursor: pointer;
  ${({ $active }) =>
    $active &&
    `
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: rgb(79, 70, 229);
      }
    `}
  &:hover {
    background: rgb(248, 250, 252);
  }
`;
const Avatar = styled(Flex)`
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: white;
  font-size: 11px;
  font-weight: 700;
`;
const MessageContent = styled(Flex)`
  min-width: 0;
  flex: 1;
`;
const TopRow = styled(Flex)`
`;
const Name = styled.div`
  font-size: 13px;
  font-weight: ${({ $read }) => ($read ? 500 : 700)};
  color: rgb(15, 23, 42);
`;
const Time = styled.div`
  flex-shrink: 0;
  font-size: 11px;
  color: rgb(148, 163, 184);
`;
const Subject = styled.div`
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: ${({ $read }) => ($read ? 500 : 600)};
  color: rgb(15, 23, 42);
`;
const Meta = styled(Flex)`
  margin-top: 5px;
`;
const Type = styled.span`
  padding: 1px 5px;
  border-radius: 3px;
  background: rgb(238, 242, 255);
  font-size: 9px;
  font-weight: 600;
  ${({ $type }) => {
    switch ($type) {
      case "Mention":
        return `background: rgb(238, 242, 255); color: rgb(79, 70, 229)`;
      case "Request":
        return `background: rgb(255, 237, 197); color: rgb(245, 158, 11)`;
      case "Alert":
        return `background: rgb(255, 227, 225); color: rgb(239, 68, 68)`;
      case "Update":
        return `background: rgb(230, 232, 255); color: rgb(100, 116, 139);`;
    }
  }}
`;
const UnreadDot = styled.span`
  width: 5px;
  height: 5px;
  flex-shrink: 0;
  border-radius: 50%;
  background: rgb(79, 70, 229);
`;
const Conversation = styled(Flex)`
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: thin;
`;
const ConversationHeader = styled(Flex)`
  width: 100%;
  min-height: 58px;
  padding: 0 18px;
  border-bottom: 1px solid rgb(226, 232, 240);
`;
const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: rgb(15, 23, 42);
`;
const HeaderActions = styled(Flex)``;
const IconButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: rgb(100, 116, 139);
  cursor: pointer;

  ${({ $archive }) =>
    $archive &&
    `
    color: rgb(79, 70, 229);
    `}
`;
const ConversationBody = styled(Flex)`
  flex: 1;
  min-height: 0;
  padding: 22px 20px;
  overflow-y: auto;
  width: 100%;
`;
const Sender = styled(Flex)``;
const SenderDetails = styled(Flex)``;
const SenderName = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: rgb(15, 23, 42);
`;
const SenderMeta = styled.span`
  font-size: 11px;
  color: rgb(100, 116, 139);
`;
const MessageText = styled.p`
  max-width: 760px;
  font-size: 14px;
  line-height: 1.7;
  padding: 10px 14px;
  border-radius: 10px;
  align-self: ${({ $type }) => ($type === "in" ? "flex-start" : "flex-end")};

  background: ${({ $type }) =>
    $type === "in" ? "transparent" : "rgb(238, 242, 255)"};

  color: ${({ $type }) =>
    $type === "in" ? "rgb(51, 65, 85)" : "rgb(49, 46, 129)"};
`;
const ReplyArea = styled(Flex)`
  width: 100%;
  padding: 14px 18px;
  border-top: 1px solid rgb(226, 232, 240);
`;
const ReplyInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  box-sizing: border-box;
  border: 1px solid rgb(203, 213, 225);
  border-radius: 7px;
  outline: none;
  font-size: 12px;
  color: rgb(15, 23, 42);
  &::placeholder {
    color: rgb(148, 163, 184);
  }
  &:focus {
    border-color: rgb(99, 102, 241);
  }
`;
const ReplyButton = styled.button`
  height: 38px;
  padding: 0 18px;
  border: 0;
  border-radius: 7px;
  background: rgb(79, 70, 229);
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: rgb(67, 56, 202);
  }
`;
