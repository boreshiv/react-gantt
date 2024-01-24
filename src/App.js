import { useCallback, useRef, useState } from 'react';
import './App.css';
import GanttChart from './components/Gantt/GanttChart';
import STAFFDATA from './data/staffs.json';
import TASKDATA from './data/tasks.json';

function App() {
  const [tasks, setTasks] = useState(TASKDATA);
  const [staffs, setStaffs] = useState(STAFFDATA);
  const [timelineScale] = useState('days'); // 'minutes' or 'days'
  const [startDate] = useState(()=>{
    const date = new Date()
    date.setHours(0,0,0,0)
    return date
  })
  const [endDate] = useState(() => {
    const date = new Date()
    date.setDate(startDate.getDate() + 45)
    return date
  })
  const ganttRef = useRef(null);

  const onTaskClick = useCallback((e) => {
    // Handle chart click event
    console.log('Chart clicked', e);
  }, []);

  const handleTaskDoubleClick = useCallback((taskId) => {
    // Handle task double-click event
    console.log(`Task ${taskId} double-clicked`);
  }, []);

  const handleTaskContextMenu = useCallback((taskId) => {
    // Handle task context-menu event
    console.log(`Task ${taskId} context-menu`);
  }, []);

  const handleStaffRowDoubleClick = useCallback((staffId) => {
    // Handle staff row double-click event
    console.log(`Staff ${staffId} row double-clicked`);
  }, []);

  const handleStaffRowContextMenu = useCallback((staffId) => {
    // Handle staff row context-menu event
    console.log(`Staff ${staffId} row context-menu`);
  } , []);

  const columnData = [
    {
      title: 'Name',
      field: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      field: 'role',
      key: 'role',
    },
  ];
  return (

      <GanttChart
        ref={ganttRef}
        tasks={tasks}
        staffs={staffs}
        timelineScale={timelineScale}
        timeLineStart={startDate}
        timeLineEnd={endDate}
        onTaskClick={onTaskClick}
        onTaskDoubleClick={handleTaskDoubleClick}
        onTaskContextMenu={handleTaskContextMenu}
        onStaffRowDoubleClick={handleStaffRowDoubleClick}
        onStaffRowContextMenu={handleStaffRowContextMenu}
        tableDefs={
          {
            columnData: columnData,
            onScroll: (e) => {
              if (ganttRef.current) {
                ganttRef.current.scrollTop = e.target.scrollTop;
              }
            },
          }
        }
      />
  );
}

export default App;
