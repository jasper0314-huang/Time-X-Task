/* eslint-disable no-use-before-define */
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
// import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

export class Highlights extends Component {
  render() {
    return (
      <Autocomplete
        id="highlights-demo"
        style={{ width: 300 }}
        options={this.props.data}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={this.props.label} variant="outlined" margin="normal" />
        )}
        autoHighlight={true}
        autoSelect={true}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />
    );
  }
}



export default Highlights;
