import { React, useEffect, useState } from "react";
import "./App.css";
import Data from "./data.json";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function App() {
  const [filteredComment, setFilteredComment] = useState([]);
  const [clearInputBox, setClearInputBox] = useState("");
  const [scroll, setScroll] = useState("");

  useEffect(() => {
    if (filteredComment.length > 0 && clearInputBox.length > 0) {
      const searchResult = document.querySelector(".comment").clientHeight;
      if (searchResult > 200) {
        setScroll("setScroll");
      } else {
        setScroll("");
      }
    }
  }, [filteredComment, clearInputBox]);

  const handleInputChange = (event) => {
    const searchWord = event.target.value;
    const comment = Data.comments.filter((comment) => {
      return comment.body.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredComment(comment);
    setClearInputBox(searchWord);
  };

  const handleOnClose = (event) => {
    setFilteredComment(0);
    setClearInputBox("");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">React Search Filter App</h1>
        <div className="SearchArea">
          <input
            type="text"
            onChange={handleInputChange}
            className="SearchBox"
            value={clearInputBox}
            placeholder="Search your comments"
          />
          <div className="Search-Icon">
            {filteredComment.length > 0 && clearInputBox.length > 0 ? (
              <CloseIcon onClick={handleOnClose} />
            ) : (
              <SearchIcon />
            )}
          </div>
        </div>
        {filteredComment.length > 0 && clearInputBox.length > 0 && (
          <ul
            className={`comment ${
              scroll === "setScroll" ? "setScrollHeight" : ""
            }`}
          >
            {filteredComment.map((comment) => (
              <li
                key={comment.id}
                id={`id-${comment.id}`}
                className="CommentList"
              >
                {comment.body}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
