var React = require('react');

function MapPage(props) {
  return (
    <div>
        <script type="text/javascript">
            var module = {};
        </script>
        <script type="text/javascript" src="src/constants/webview.js"></script>
        <div>Hello {props.title}</div>
        {props.contents}
    </div>
  );
}

module.exports = MapPage;