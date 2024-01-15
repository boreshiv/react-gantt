// GanttChart.js
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import './GanttChart.css';
import Task from '../Tasks/Task';
import Timeline from '../Timeline/Timeline';
import DataTable from '../DataTable/DataTable';
import config from '../../constant';
const GanttChart = (props, ref) => {
  const { tasks, staffs, timelineScale, timeLineStart, timeLineEnd, ...rest } = props // values
  const { onTaskClick, onTaskDoubleClick, onTaskContextMenu, onStaffRowDoubleClick, onStaffRowContextMenu } = props // functions 
  const {tableDefs:{columnData=[]}} = props // table column data
  const chartRef = useRef(ref);
  const dataRef = useRef(null);

  const chartAreaWidth = useMemo(() => {
    const dayDiff = (timeLineEnd - timeLineStart) / 1000 / 60 / 60 / 24
    return dayDiff * config.scaleWidth
  }, [timeLineStart, timeLineEnd])

  const handleDataScroll =(e) => {
    if (chartRef.current) {
      chartRef.current.scrollTop = e.target.scrollTop;
    }
  }

  const handleChartScroll = (e) => {
    if (dataRef.current) {
      dataRef.current.scrollTop = e.target.scrollTop;
    }
  }

  return (
    <div className="gantt-container">
      <div ref={dataRef} className="staff-table" onScroll={handleDataScroll}>
        <DataTable
          rowData={staffs}
          columnData={columnData}
          onScroll={handleDataScroll}
          onDoubleClick={onStaffRowDoubleClick}
          onContextMenu={onStaffRowContextMenu}
        />
      </div>
      <div ref={chartRef} className='chart' onScroll={handleChartScroll}>
        <div className="timeline sticky">
          {/* Render the timeline here */}
          <Timeline start={timeLineStart} end={timeLineEnd} chartAreaWidth={chartAreaWidth} timelineScale={timelineScale} />
        </div>
        <div className="chart-area" style={{ width: chartAreaWidth + "px" }} >
          {/* Right chart area for tasks */}
          {tasks.map((task) => (
            <Task
              onTaskClick={onTaskClick}
              timeLineStart={timeLineStart}
              timeLineEnd={timeLineEnd}
              key={task.id}
              task={task}
              onDoubleClick={onTaskDoubleClick}
              onContextMenu={onTaskContextMenu}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;