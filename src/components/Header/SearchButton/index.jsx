import { useCallback } from "react";
import "./SearchIcon.scss";
import searchIconSvg from "assets/icons/search-icon.svg";
// import { useNavigate } from "react-router-dom";
import { useSearchModal } from "hooks/useSearchModal";

const SearchButton = ({ loggedIn }) => {
  const { toggleSearchModal: handleToggleModal } = useSearchModal();

  // let navigate = useNavigate();

  console.log("SearchButton render");

  const handleSearchClick = useCallback(() => {
    // if (!loggedIn) return navigate("/login");
    // if (!loggedIn) return alert("You must log in before searching");
    handleToggleModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, handleToggleModal /*navigate*/]);

  return (
    <button
      className="search-icon-btn ms-auto me-md-auto ms-md-0"
      onClick={handleSearchClick}
    >
      <img src={searchIconSvg} alt="search icon" />
    </button>
  );
};

export default SearchButton;
