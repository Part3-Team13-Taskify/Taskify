import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { getColumns } from '@/src/api/columnsApi';
import Image from 'next/image';
import setting from '@/public/assets/icon/setting.svg';
import addLarge from '@/public/assets/chip/addLarge.svg';
import Button from '@/src/components/common/button';
import useModal from '@/src/hooks/useModal';
import arrow from '@/public/assets/icon/arrow.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Violet from '@/public/assets/chip/ellipseVioletSmall.svg';
import ModalPortal from '../common/modalPortal';
import AddColumnModal from '../columnModal/addColumnModal';

type Columns = {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
};

const ColumnsList = () => {
  const {
    openModal: addColumnModal,
    handleModalClose: addColumnModalClose,
    handleModalOpen: addColumnModalOpen,
  } = useModal();

  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);

  const containerRef = useRef<HTMLDivElement>(null);

  const [columnsList, setColumnsList] = useState<Columns[]>([]);

  const getColumnsList = async () => {
    try {
      const columnsData = await getColumns(dashboardId);

      setColumnsList(columnsData.data);
    } catch (error) {
      console.error('Error fetching columns list:', error);
    }
  };

  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 354,
        behavior: 'smooth',
      });
    }
  };

  const scrollToLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 354,
        behavior: 'smooth',
      });
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
        className="flex overflow-auto h-[calc(100vh-7rem)] tablet:flex-col tablet:left-160 mobile:flex-col mobile:left-67"
      >
        {/* {MOCK_DATA.map((dataGroup) =>
          dataGroup.dashboards.map((dashboard) => ( */}
        {columnsList?.map((dashboard) => (
          <div
            key={dashboard.id}
            className="w-354 h-full p-20 border-solid border-1 border-gray-ee tablet:w-full mobile:w-full"
          >
            <div className="flex justify-between mb-25">
              <div className="flex justify-center items-center">
                <Image src={Violet} alt="컬럼 원 이미지" className="w-8 h-8 mr-8" />
                <h3 className="text-18 font-bold mr-12 mobile:text-16">{dashboard.title}</h3>
                {/* <p className="flex justify-center items-center w-20 h-20 text-12 font-medium text-gray-78 bg-gray-ee rounded">
                    {dataGroup.totalCount}
                  </p> */}
              </div>
              <button>
                <Image src={setting} alt="setting" />
              </button>
            </div>
            <div>
              <Button
                className="tablet:w-full mobile:w-full"
                buttonType="add"
                bgColor="white"
                textColor="black"
                type="button"
              >
                <Image src={addLarge} alt="addBox" className="w-22 h-22 p-3 rounded bg-violet-8%" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* )),
        )} */}
      <div className="fixed right-40 bottom-40">
        <ModalPortal>
          <AddColumnModal openModal={addColumnModal} handleModalClose={addColumnModalClose} dashboardId={dashboardId} />
        </ModalPortal>

        <Button
          className="hover:bg-violet-dark"
          buttonType="columnAdd"
          bgColor="violet"
          textColor="white"
          type="button"
          onClick={addColumnModalOpen}
        >
          <div className="flex items-center gap-12 tablet:hidden">새로운 컬럼추가</div>
          <Image src={addLarge} alt="addBox" className="w-25 h-25 p-3 rounded bg-white" />
        </Button>
      </div>

      <div className="fixed top-[50%] left-330 tablet:hidden">
        <Button
          className="w-40 h-40 hover:border-gray-78"
          buttonType="columnAdd"
          bgColor="white"
          textColor="black"
          type="button"
          onClick={scrollToLeft}
        >
          <Image src={arrow} alt="arrow" />
        </Button>
      </div>
      <div className="fixed top-[50%] right-30">
        <Button
          className="w-40 h-40 hover:border-gray-78"
          buttonType="columnAdd"
          bgColor="white"
          textColor="black"
          type="button"
          onClick={scrollToRight}
        >
          <Image src={arrowReverse} alt="arrow" />
        </Button>
      </div>
    </div>
  );
};

export default ColumnsList;
