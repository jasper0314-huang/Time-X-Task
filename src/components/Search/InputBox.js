import React, { useEffect, useCallback, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export function Highlights(props) {
  return (
    <Autocomplete
      id="highlights-demo"
      style={{ width: 300 }}
      options={props.data}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" margin="normal" />
      )}
      Value={props.Value}
      onChange={(event, newValue) => {
        if (newValue) {
          props.setValue(newValue.name);
        } else {
          props.setValue(undefined);
        }
      }}
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



export default Highlights;
