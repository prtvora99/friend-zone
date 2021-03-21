import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/button/button";
import { Input } from "./components/input/input";
import { FriendList } from "./containers/friends/list";
import { AppContext } from "./context/app";

const FriendZone = () => {
  // Hooks
  const [friendList, setFriendList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [friendData, setFriendData] = useState("");
  const [isSort, setSortList] = useState(false);
  const [pageData, setPageData] = useState({
    perPage: 4,
    total: 0,
    currentPage: 1,
  });

  // list to show
  const finalResult = searchList.length ? searchList : friendList;

  const handleAddFriend = () => {
    if (!friendData) return;

    const tempFriends = [...friendList];
    tempFriends.push({
      name: friendData,
      isFavorite: false,
      created: new Date(),
    });
    setFriendList(tempFriends);
    setFriendData(""); // reset input
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddFriend();
  };

  const handleFavorites = (index) => {
    const tempFriends = [...friendList];
    tempFriends.splice(index, 1, {
      ...tempFriends[index],
      isFavorite: !tempFriends[index].isFavorite,
    });
    setFriendList(tempFriends);
  };

  const handleDelete = (index) => {
    const tempFriends = [...friendList];
    tempFriends.splice(index, 1);
    setFriendList(tempFriends);
  };

  // returns true for matched search
  const getSearchResult = (original = "", searchString = "") =>
    original.toLowerCase().includes(searchString.toLowerCase());

  const handleSearch = (e) => {
    const searchString = e.target.value;
    if (!searchString) {
      setSearchList([]);
      return;
    }

    const tempFriends = [...friendList];
    setSearchList(
      tempFriends.filter((frnd) => getSearchResult(frnd.name, searchString))
    );
  };

  const handleSort = () => {
    const tempFriends = [...friendList];
    if (!isSort) {
      tempFriends.sort((a, b) => b.isFavorite - a.isFavorite);
    } else {
      tempFriends.sort((a, b) => a.created - b.created);
    }
    setSearchList(tempFriends);
    setSortList(!isSort);
  };

  const handlePagination = (newPage = 1) => {
    setPageData({ ...pageData, currentPage: newPage });
  };

  // change listeners
  useEffect(() => {
    setPageData({ ...pageData, total: finalResult.length });
  }, [finalResult]);

  return (
    <AppContext.Provider
      value={{
        handleFavorites,
        handleDelete,
        handleSearch,
        handleSort,
        handlePagination,
        isSort,
        pageData,
      }}
    >
      <div className="App">
        <header className="App-header">
          <h3 onClick={() => window.location.reload()}>Friend Zone</h3>
          <div>
            <form onSubmit={handleFormSubmit}>
              <Input
                className="add-friend"
                placeholder="Enter friend's name"
                value={friendData}
                onChange={(e) => setFriendData(e.target.value)}
              />
              <Button className="btn">Add to List</Button>
            </form>
          </div>
        </header>

        <div>
          <FriendList list={finalResult} />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default FriendZone;
