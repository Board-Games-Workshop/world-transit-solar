var React = require('react');

function MapPage(props) {
  return (
    <html>
      <head>
        <link href="stylesheets/style.css" rel="stylesheet" />
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