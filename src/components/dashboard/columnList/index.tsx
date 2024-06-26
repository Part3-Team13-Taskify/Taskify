import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getColumns } from '@/src/pages/api/columnsApi';
import Image from 'next/image';
import { useCardListStore, useColumnList } from '@/src/util/zustand';
import Violet from '@/public/assets/chip/ellipseVioletSmall.svg';
import ScrollButton from '../scrollButton';
import AddColumnButton from '../addColumnButton';
import EditColumnButton from '../editColumnButton';
import CreateTaskButton from '../createTaskButton';
import CardList from '../cardList';

type Columns = {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
};

const ColumnsList: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);

  const containerRef = useRef<HTMLDivElement>(null);

  const [columnsList, setColumnsList] = useState<Columns[]>([]);

  const { cardLists } = useCardListStore();

  const setColumnList = useColumnList((state) => state.setColumnList);

  // 컬럼리스트 불러오기
  const getColumnsList = async () => {
    try {
      const columnsData = await getColumns(dashboardId);
      setColumnsList(columnsData.data);
      setColumnList(columnsData.data);
    } catch (error) {
      console.error('Error fetching columns list:', error);
    }
  };

  useEffect(() => {
    if (dashboardId) {
      getColumnsList();
    }
  }, [dashboardId]);

  return (
    <div className="flex-1">
      <div
        ref={containerRef}
        className="flex overflow-x-hidden min-h-[calc(100vh-7.8rem)] bg-gray-fa tablet:flex-col tablet:left-160 mobile:flex-col mobile:left-67 "
      >
        {columnsList?.map((column) => (
          <div
            key={column.id}
            className="w-354 p-20 border-solid border-r-1 border-gray-ee tablet:w-full tablet:border-b-1 mobile:w-full"
          >
            <div className=" flex justify-between mb-25 ">
              <div className="flex justify-center items-center ">
                <Image src={Violet} alt="컬럼 원 이미지" className="w-8 h-8 mr-8" />
                <h3 className="text-18 font-bold mr-12 mobile:text-16">{column.title}</h3>
                <p className="flex justify-center items-center w-20 h-20 text-12 font-medium text-gray-78 bg-gray-ee rounded">
                  {cardLists[column.id]?.totalCount}
                </p>
              </div>
              <EditColumnButton
                dashboardId={dashboardId}
                columnsTitle={column.title}
                columnId={column.id}
                columnsList={columnsList}
                setColumnsList={setColumnsList}
              />
            </div>
            <div className="flex flex-col gap-16">
              <CreateTaskButton dashboardId={dashboardId} columnId={column.id} />
              <CardList columnId={column.id} />
            </div>
          </div>
        ))}
      </div>
      <AddColumnButton dashboardId={dashboardId} setColumnsList={setColumnsList} columnsList={columnsList} />
      <ScrollButton containerRef={containerRef} />
    </div>
  );
};

export default ColumnsList;
