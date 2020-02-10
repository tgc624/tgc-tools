import React from "react";
import AlcoholPage from "./pages/Alcohol.page";
import VideoEditorPage from "./pages/video-editor/VideoEditor.page";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App: React.FC = () => {
  const pages = [
    { path: "/alcohol", name: "Alcohol", component: <AlcoholPage /> },
    {
      path: "/video-editor",
      name: "Video editor",
      component: <VideoEditorPage />
    }
  ];
  const Navi = (
    <nav>
      <ul>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <Link to={page.path}>{page.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
  return (
    <Router>
      <Switch>
        {pages.map((page, index) => (
          <Route key={index} path={page.path}>
            {page.component}
          </Route>
        ))}
        <Route path="*">{Navi}</Route>
      </Switch>
    </Router>
  );
};

export default App;
