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
  const scalerRef = useRef(null)
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
  const guidleLineLeft = useMemo(() => {
    const today = new Date()
    const todayDiff = (today - timeLineStart) / 1000 / 60 / 60 / 24
    return todayDiff * config.scaleWidth
  }, [timeLineStart])
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
        <div onMouseMove={(e)=>{

          const left = e.target.getBoundingClientRect().left
          if(scalerRef.current){
            scalerRef.current.style.left = e.clientX - left  + "px"
            scalerRef.current.style.title = e.clientX - left  + "px"
            const date = new Date(timeLineStart) 
            const dayDiff = (e.clientX - left) / config.scaleWidth
            date.setDate(date.getDate() + dayDiff)
            const hourDiff = (e.clientX - left) / config.scaleWidth * 24
            date.setHours(hourDiff)
            scalerRef.current.querySelector('.chart-area-scaler-title').innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString()
          }
        }}
        onKeyDown={(e)=>{
          document.addEventListener('keydown', function (event) {
            // Check if the left arrow key is pressed
            if (event.key === 'ArrowLeft') {
              // Move the element to the left by a certain amount (e.g., 10 pixels)
              scalerRef.current.style.left = (parseFloat(scalerRef.current.style.left) - 1) + 'px';
            }
            // Check if the right arrow key is pressed
            else if (event.key === 'ArrowRight') {
              // Move the element to the right by a certain amount (e.g., 10 pixels)
              scalerRef.current.style.left = (parseFloat(scalerRef.current.style.left) + 1) + 'px';
            }
          });
        }}
         className="chart-area" style={{ width: chartAreaWidth + "px" }} >
            
          {/* Right chart area for tasks */}
          <div className="chart-area-guideline" style={{left: guidleLineLeft + "px",height: staffs.length * config.rowHeight }}></div>
          <div ref={scalerRef} className='chart-area-scaler' style={{ height: staffs.length * config.rowHeight }}>
            <div className='chart-area-scaler-title'></div>
          </div>
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