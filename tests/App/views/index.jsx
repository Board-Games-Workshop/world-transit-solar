var React = require('react');

function MapPage(props) {
  const mobile = new Boolean(props.user_agent.android || props.user_agent.mobile_safari);
  return (
    <html>
      <head>
        <link href="stylesheets/style.css" rel="stylesheet" />
        <script type="text/javascript">
          var GLOBALS = new Object();
          GLOBALS.return_value = false;
          GLOBALS.mobile = {mobile.toString()};
          window.GLOBALS = GLOBALS;
        </script>
        <script type="text/javascript" src="public/map.js"></script>
      </head>
      <body>
      <div>
          <div>Hello {props.title}</div>
          <iframe src="http://localhost:3000/public/index.html" id="iframe_src"></iframe>
      </div>
      </body>
    </html>
  );
}

module.exports = MapPage;