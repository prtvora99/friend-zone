import { useContext } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { AppContext } from "../../context/app";
import { Friend } from "./friend";
import "./style/style.css";

export const FriendList = ({ list = [] }) => {

    const { handleFavorites, handleDelete, handleSearch, handleSort, handlePagination, isSort, pageData } = useContext(AppContext);
    const { total, perPage, currentPage } = pageData;

    const totalPage = Math.round(total / perPage);
    const start = perPage * (currentPage - 1);

    return (
        <div className="list">

            {/* Render the list */}
            {list.length ? (
                <div className="table-data">

                    <div className="search-box">
                        <p className="title">Friend List</p>
                        <Input placeholder={"Search your friends"} onChange={handleSearch} />
                        <a className="sort" onClick={handleSort}>
                            <i className="fa fa-sort" aria-hidden="true"></i>
                            {" "}
                            {isSort ?
                                <span>Sort by Created</span> :
                                <span>Sort by Favorite</span>
                            }
                        </a>
                    </div>

                    {list.slice(start, start + 4).map((frnd, index) =>
                        <Friend key={'my-frnd-' + index}
                            {...frnd}
                            index={index}
                            handleDelete={handleDelete}
                            handleFavorites={handleFavorites}
                        />
                    )}
                </div>
            ) : ""}

            {list.length > perPage && (
                <div className="pagination">
                    {Array.from(new Array(totalPage)).map((count, index) =>
                        <Button key={'page' + index} className={currentPage === (index + 1) ? 'active' : ''} onClick={() => handlePagination(index + 1)}>
                            {index + 1}
                        </Button>
                    )}
                </div>
            )}

            {/* Empty List UI */}
            {!list.length && (
                <div className="no-friends">
                    <h5>Add (+) your friends using the top right input</h5>
                    <ul>
                        <li>Either click on "Add" button or hit "Enter".</li>
                        <li>You can have multiple friends with same name.</li>
                        <li>Mark your friends as a favorite.</li>
                        <li>Remove them anytime.</li>
                    </ul>
                </div>
            )}

        </div>
    )
}