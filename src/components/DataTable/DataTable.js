import React from 'react';
import './DataTable.css';
const DataTable = ({ rowData, columnData ,onScroll},ref) => {
    return (
        <div className='grid-container' >
            <div className="grid-header sticky">
                {columnData.map((column, index) => (
                    <div key={index} className="grid-header-cell">{column.title}</div>
                ))}
            </div>
            <div className="grid-body sticky">
                {rowData.map((row, index) => (
                    <div key={index} className="grid-row">
                        {columnData.map((column, index) => (
                            <div key={index} className="grid-cell">{row[column.field]}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataTable;
