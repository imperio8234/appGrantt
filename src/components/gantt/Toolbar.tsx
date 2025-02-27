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
            this.props.onZoomChange(newZoom);
        }
    };

    render() {
        const zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
            const isActive = this.props.zoom === value;
            return (
                <label
                    key={value}
                    className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    <input
                        type="radio"
                        className="hidden"
                        checked={isActive}
                        onChange={this.handleZoomChange}
                        value={value}
                    />
                    {value}
                </label>
            );
        });

        return (
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
                <b className="text-gray-800"></b>
                {zoomRadios}
            </div>
        );
    }
}
