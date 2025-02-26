import React, { Component } from 'react';
import { zoomType } from '../../App';

interface ToolbarProps {
    zoom: zoomType;
    onZoomChange: (zoom: zoomType) => void;
}
export default class Toolbar extends Component<ToolbarProps> {
    handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newZoom = e.target.value as zoomType;
        if (this.props.onZoomChange) {
            this.props.onZoomChange(newZoom)
        }
    }
    render() {
        const zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
            const isActive = this.props.zoom === value;
            return (
                <label key={ value } className={ `radio-label ${isActive ? 'radio-label-active': ''}` }>
                    <input type='radio'
                        checked={ isActive }
                        onChange={ this.handleZoomChange }
                        value={ value }/>
                    { value }
                </label>
            );
        });

        return (
            <div className="tool-bar">
                <b>Zooming: </b>
                    { zoomRadios }
            </div>
        );
    }
}