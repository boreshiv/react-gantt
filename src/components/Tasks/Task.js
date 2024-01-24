// Task.js
import React, { memo, useImperativeHandle, useMemo, useRef } from 'react';
import config from '../../constant';
import { getScaleInPixel } from '../../utils';
import './Task.css';
import PropTypes from 'prop-types'
const Task = (props) => {
    const { task, onDoubleClick, onContextMenu, onTaskClick } = props;
    const top = useMemo(() => {
        // return (config.rowHeight - task.height) / 2 + (task.rowIndex * config.rowHeight) + task.offset;
        return (config.rowHeight - 25) / 2 + (task.rowIndex * config.rowHeight)
    }, [task.height, task.offset, task.rowIndex]);

    const util = useMemo(() => {
        const startLineHourDiff = (new Date(task.start) - new Date(props.timeLineStart)) / 60 / 60 / 1000;
        const diff = (new Date(task.end) - new Date(task.start)) / 60 / 60 / 1000;
        const left = startLineHourDiff * getScaleInPixel(config.scaleWidth);
        const width = diff * getScaleInPixel(config.scaleWidth);
        return {
            left,
            width
        };
    }, [props.timeLineStart, task.end, task.start]);

    return (
        <button
            ref={(e) => {
                const data = {
                    element: e,
                    data: { ...props.task }
                }
                props.taskMap.set(task.id, data);
            }}
            onClick={(e) => {
                e.data = { ...task }
                e.target.style.zIndex = 1;
                onTaskClick(e)
            }}
            className="task"
            style={{
                position: 'absolute',
                left: `${util.left}px`,
                width: `${util.width}px`,
                top: `${top}px`,
                background: `rgba(52, 152, 219, ${task.completion / 100})`,
                height: `${25}px`,
                backgroundColor: task.color,
                fontSize: '12px',
            }}
            onDoubleClick={(e) => {
                e.data = { ...task }
                onDoubleClick(e)
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                e.data = { ...task }
                onContextMenu(task.id);
            }}
        >
            {task.name}
            {/* <span>-</span> */}
            {/* - {task.completion.toFixed(2)}% */}
        </button>
    )
};

export default memo(Task);
// 24 hr 48 px
// 1px = how much hours ? 48 / 24
// 1px = how much milliseconds 48 / 1000

Task.prototype = {
    task: PropTypes.object.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    onTaskClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    start: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    end: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    completion: PropTypes.number,
    type: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rowHeight: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
};