import { useState } from "react";

export function useTagBox(initialTags = []) {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(initialTags);
  const [tagInputError, setTagInputError] = useState("");

  const tagInputChange = e => {
    setTagInput(e.target.value);
    setTagInputError("");
  };

  const tagInputKeyDown = e => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();

      if (tagInput.length > 5) {
        setTagInputError("5글자 이내로 입력해주세요");
        return;
      }

      if (tags.includes(tagInput.trim())) {
        setTagInputError("이미 등록된 태그입니다.");
        return;
      }
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTagBox = tag => setTags(tags.filter(t => t !== tag));

  return {
    tagInput,
    tags,
    tagInputChange,
    tagInputKeyDown,
    removeTagBox,
    tagInputError,
  };
}
