import React, { useEffect, useRef, useState } from "react";
import styles from "./comments.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { axiosInstance } from "../../createInstance";
import styled from "@emotion/styled";
import { setUser } from "../../store/auth/auth-slice";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import EmojiPicker from "emoji-picker-react";

const StyledInput = styled.input`
  flex-grow: 1;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 15px;
  margin-left: 15px;
  margin-right: 5px;
`;
const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
`;
const Comment = ({ postSlug }) => {
  const [desc, setDesc] = useState("");
  const accessToken = useSelector(
    (state) => state.authSlice.auth.user?.access_token
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef();
  const [currentPosition, setCurrentPosition] = useState();

  const onEmojiClick = (emojiObject) => {
    const ref = inputRef.current;
    ref.focus();
    const start = desc.substring(0, ref.selectionStart);
    const end = desc.substring(ref.selectionStart);
    setDesc(start + emojiObject.emoji + end);
    inputRef.current.selectionEnd = start.length + emojiObject.emoji.length;
    setCurrentPosition(start.length + emojiObject.emoji.length);
  };
  const toggleEmojiPicker = () => {
    inputRef.current.focus();
    setShowEmojiPicker((prev) => !prev);
  };

  const dispatch = useDispatch();
  let axiosJwt = axiosInstance(accessToken, setUser, dispatch);
  const fetcher = async (url) => {
    const res = await axiosJwt.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  };
  const { data, mutate, isLoading } = useSWR(
    `/api/comment?postSlug=${postSlug}`,
    fetcher
  );
  const comment = {
    content: desc,
    postSlug,
  };
  const handleSubmit = async () => {
    await axiosJwt.post("/api/comment", comment, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setDesc("");
    mutate();
  };

  const sendMessageOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!desc) return;
      handleSubmit();
    }
  };
  const sendMessageOnClick = (e) => {
    e.preventDefault();
    if (desc) {
      handleSubmit();
    }
  };
  useEffect(() => {
    inputRef.current.selectionEnd = currentPosition;
  }, [currentPosition]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {showEmojiPicker && (
        <div className={styles.emotionCotainer}>
          <div className={styles.blockEmoji}>
            <EmojiPicker
              className={styles.picker}
              onEmojiClick={onEmojiClick}
            />
          </div>
        </div>
      )}
      <StyledInputContainer>
        <InsertEmoticonIcon
          sx={{
            marginLeft: "10px",
            cursor: "pointer",
            "&:hover": { filter: "invert(80%)" },
          }}
          onClick={toggleEmojiPicker}
        />

        <StyledInput
          ref={inputRef}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder='Write some comments if you like the post...'
          onKeyDown={sendMessageOnEnter}
        />
        <IconButton onClick={sendMessageOnClick} disabled={!desc}>
          <SendIcon />
        </IconButton>
        <IconButton>
          <MicIcon />
        </IconButton>
      </StyledInputContainer>

      <div className={styles.comments}>
        {isLoading
          ? "Loading..."
          : data?.map((comment) => (
              <div className={styles.comment} key={comment.id}>
                <div className={styles.user}>
                  <img
                    src={comment.user?.avatar || "/Harry Potter.jpg"}
                    className={styles.image}
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.username}>
                      {comment.user.username}
                    </span>
                    <span className={styles.date}>
                      {comment.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{comment.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comment;
