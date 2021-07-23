import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import Clock from './components/Clock';

function App() {
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1
  });
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    async function fetchPostList() {
      const paramString = queryString.stringify(filters);
      const fetchUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
      const response = await fetch(fetchUrl);
      const responseJSON = await response.json();
      const {data, pagination} = responseJSON

      setPostList(data)
      setPagination(pagination)
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  return (
    <div>
      <h1>React Hook</h1>
      {showClock ? <Clock/> : ''}
      <button onClick={() => setShowClock(false)}>Hide Clock</button>
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange}/>
    </div>
  );
}

export default App;