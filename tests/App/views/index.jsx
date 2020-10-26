var React = require('react');

function MapPage(props) {
  return (
    <div>
        <div>Hello {props.title}</div>
        {props.contents}
    </div>
  );
}

module.exports = MapPage;