export const Friend = ({ name, isFavorite, index, handleDelete, handleFavorites }) => {
    return (
        <div className="friend">
            <p>
                {name}
                <span className="help-text">is your friend</span>
            </p>

            <div title="Mark as favorite" className={`icon-frame favorite ${isFavorite ? 'marked' : ''}`} onClick={() => handleFavorites(index)}>
                <i className="fa fa-star-o" aria-hidden="true"></i>
            </div>

            <div title="Delete" className="icon-frame delete" onClick={() => handleDelete(index)}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
            </div>
        </div>
    )
}