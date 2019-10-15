import React from "react";

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";

import FroalaEditor from 'react-froala-wysiwyg';

class MyStatefulEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return  <FroalaEditor   config={ { key: 'lA5C1D4A1uF2C1F1H2A10B1E7A1D6C4htdcB-16tumA-9C2hI-7cd1vjkkH4umgC-16jf1B-9==', height: 300 } }     tag='textarea' model={this.props.value} onModelChange={this.props.onChange} name={this.props.name ? this.props.name : 'texteditor_for_description'}/>;
  }
}

export default MyStatefulEditor;
