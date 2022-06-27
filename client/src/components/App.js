import React from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import browserHistory from '../history';
import {
  StreamCreate,
  StreamDelete,
  StreamEdit,
  StreamList,
  StreamShow,
} from './streams';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <HistoryRouter history={browserHistory}>
        <Header />
        <Routes>
          <Route path="/" exact element={<StreamList />} />
          <Route path="/streams/new" exact element={<StreamCreate />} />
          <Route path="/streams/edit/:id" exact element={<StreamEdit />} />
          <Route path="/streams/delete/:id" exact element={<StreamDelete />} />
          <Route path="/streams/:id" exact element={<StreamShow />} />
        </Routes>
      </HistoryRouter>
    </div>
  );
};

export default App;
