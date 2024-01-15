// Task.js
import React, { Fragment, memo, useMemo } from 'react';
import config from '../../constant';
import { getScaleInPixel } from '../../utils';
import './Task.css';
const Task = (props) => {
    const { task, onDoubleClick, onContextMenu,onTaskClick } = props;
    const top = useMemo(() => {
        return (config.rowHeight - task.height) / 2 + (task.rowIndex * config.rowHeight) + task.offset;
    }, [task.height, task.offset, task.rowIndex]);

    const util = useMemo(() => {
        // const start = new Date(task.start).getHours() * 60 * 60 * 1000;
        // const end = new Date(task.end).getHours() * 60 * 60 * 1000;
        // const startLineHourDiff = start - new Date(props.timeLineStart).getHours() * 60 * 60 * 1000;
        // const diff = end - start;
        // const left = startLineHourDiff * getScaleInPixel(config.scaleWith)
        const startLineHourDiff = (new Date(task.start) - new Date(props.timeLineStart)) / 60 / 60 / 1000;
        const diff = (new Date(task.end) - new Date(task.start)) / 60 / 60 / 1000;
        const left = startLineHourDiff * getScaleInPixel(config.scaleWidth);
        const width = diff * getScaleInPixel(config.scaleWidth);
        return  {
            left,
            width
        };
    }, [props.timeLineStart, task.end, task.start]);
    return (
        <>
            <div
                onClick={() => onTaskClick(task)}
                className="task"
                style={{
                    position: 'absolute',
                    left: `${util.left}px`,
                    width: `${util.width}px`,
                    top: `${top}px`,
                    background: `rgba(52, 152, 219, ${task.completion / 100})`,
                    height: `${task.height}px`,
                    backgroundColor: task.color,
                    fontSize: '12px',
                }}
                onDoubleClick={() => onDoubleClick(task.id)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    onContextMenu(task.id);
                }}
            >
                {task.name}
                {/* <span>-</span> */}
                {/* - {task.completion.toFixed(2)}% */}
            </div>
        </>
    )
};

export default memo(Task);
// 24 hr 48 px
// 1px = how much hours ? 48 / 24
// 1px = how much milliseconds 48 / 1000

