import Link from 'next/link';
import crown from '@/public/assets/icon/crown.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { Dashboard } from '@/src/util/zustand';
import React, { useState } from 'react';
import useDashboardList from '@/src/hooks/useDashboardList';
import { useDashboardListStore } from '@/src/util/zustand';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { TrashIcon } from '@heroicons/react/24/outline';
import instance from '@/src/util/axios';
import DashboardListPagination from './DashboardListPagination';

const DashboardListItem = () => {
  const dashboardListData = useDashboardListStore((state) => state.dashboardListData);
  const { selectedDashboard, handleClickDashboard, setDashboardListData, handleLoadDashboardList } = useDashboardList();
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    setIsDragging(false);

    if (!destination) {
      return;
    }

    if (destination.droppableId === 'bin') {
      const item = dashboardListData[source.index];
      await instance.delete(`/dashboards/${item.id}`);
      router.push('/my-dashboard');
      handleLoadDashboardList();
    } else {
      const items = Array.from(dashboardListData);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setDashboardListData(items);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable droppableId="dasboardList">
        {(droppableProvided) => (
          <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="dasboardList">
            {dashboardListData.map((data: Dashboard, index: number) => (
              <Draggable key={data.id.toString()} draggableId={data.id.toString()} index={index}>
                {(draggableProvided) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Link href={`/dashboard/${data.id}`} key={data.id}>
                      <div
                        className={` hover:bg-violet-8% transition-all duration-100 flex my-6 rounded-4 items-center justify-between ${data.id === selectedDashboard.id && ' text-white'}`}
                        role="button"
                        tabIndex={0}
                        style={{ backgroundColor: data.id === selectedDashboard.id ? data.color : undefined }}
                        onClick={() => handleClickDashboard(data)}
                      >
                        <div className="flex items-center">
                          <div style={{ backgroundColor: data.color }} className="w-8 h-8 rounded-99 flex-shrink-0" />
                          <p
                            className={`text-18 ml-16 mr-6 tablet:text-16 tablet:ml-10 tablet:mr-4 mobile:hidden ${data.id === selectedDashboard.id && ''}`}
                          >
                            {data.title}
                          </p>
                        </div>
                        {data.createdByMe && (
                          <Image src={crown} alt="crown" width={18} className="-translate-y-1 mobile:hidden" />
                        )}
                      </div>
                    </Link>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
      <DashboardListPagination />
      <Droppable droppableId="bin">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex justify-center p-10">
            {isDragging && <TrashIcon className="w-30 h-30  hover:text-red" />}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DashboardListItem;
