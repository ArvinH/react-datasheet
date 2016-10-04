import React, { Component, PropTypes } from 'react';

export default class DataCell extends Component {
  constructor(props) {
    super(props);
    this.state = {updated: false}
  }
  componentWillUpdate(nextProps) {
    let prevProps = this.props;
    if (nextProps.value !== this.props.value) {
      this.setState({updated:true});
      setTimeout(() => {
        this.setState({updated:false});
      }, 700); 
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.editing === true && this.props.editing === false) {
      this.onChange(this._input.value);
    }
    if (prevProps.editing === false && this.props.editing === true) {
      this._input.focus();
      this._input.value = this.props.data == null ? this.props.value : this.props.data;
    }
  }

  onChange(value) {
    (this.props.data !== value) ? this.props.onChange(this.props.row, this.props.col, value) : null;
  }

  render() {
    let {row, col, rowSpan, colSpan, value, className, cellStyle, editing, selected, onMouseDown, onMouseOver, onDoubleClick} = this.props;

    return <td 
              className={`${className} cell ${selected ? 'selected': ''} ${this.state.updated ? 'updated': ''}`}
              onMouseDown={()=> onMouseDown(row,col)}
              onDoubleClick={()=> onDoubleClick(row,col)}
              onMouseOver={()=> onMouseOver(row,col)}
              colSpan={colSpan || 1}
              rowSpan={rowSpan || 1}
              style={cellStyle}
              ref={(r) => {
                this.domObject = r
              }} 
            > 
              <span  style={{display: (editing && selected) ? 'none':'block'}}>{value}</span>
              <input style={{display: (editing && selected) ? 'block':'none'}} ref={(input) => this._input = input} />
    </td>   
  }
}
DataCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  selected: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onDoubleClick:PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  updated: PropTypes.bool
}
