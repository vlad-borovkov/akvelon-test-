import React from "react";
import Spinner from "./Spinner";
import Card from "./Card";
import { api } from "../utils/Api";

const Main = (props) => {
  // getting usersInfo
  const [cards, setUsersCards] = React.useState([]);
  // do scroll pagination
  // current page position
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  // status of fetch
  const [fetching, setFetching] = React.useState(true);
  // status error
  // eslint-disable-next-line no-unused-vars
  const [isError, setIsError] = React.useState(false);
  // getting users from reqres server
  React.useEffect(() => {
    if (props.loggedIn && fetching) {
      api
        .getAllUsersFromServer(currentPage)
        .then((data) => {
          setUsersCards([...cards, ...data.data]);
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(data.total);
        })
        .catch((error) => setIsError(true))
        .finally(() => setFetching(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, cards]);

  const scrollHandler = (e) => {
    //calculating window size after scroll for pushing fetch function
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      cards.length < totalCount
    ) {
      setFetching(true);
    }
  };

  return (
    <>
      <></>
      <div className="photo-grid-container">
        <ul className="photo-grid">
          {cards ? (
            cards.map((cardItem) => (
              <Card
                key={cardItem.id}
                card={cardItem}
                onCardClick={props.handleClickOnCard}
              />
            ))
          ) : (
            <Spinner />
          )}
          {fetching ? <Spinner /> : ""}
        </ul>
      </div>
    </>
  );
};

export default Main;
