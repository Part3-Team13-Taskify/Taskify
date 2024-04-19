import Image from 'next/image';
import add from '@/public/assets/icon/addWhite.svg';
import ellipse from '@/public/assets/chip/ellipseGreenLarge.svg';
import ColorPicker from '../common/colorpicker';
// import ExampleInput from '../common/input/exampleInput';
import Button from '../common/button';
import Table from './table';
import TableHeader from './table/TableHeader';
import TableList from './table/TableList';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-25 tablet:gap-12">
      <DashboardCard>
        <div className="flex justify-between">
          <p className="font-bold text-20">비브리지</p>
          <ColorPicker />
        </div>
        {/* 인풋 컴포넌트로 대체 */}
        {/* <ExampleInput /> */}
        <div className="flex justify-end">
          <Button buttonType="modal1" bgColor="violet" textColor="white">
            변경
          </Button>
        </div>
      </DashboardCard>

      <DashboardCard className="px-0 pb-0">
        <TableHeader title="구성원" />
        <Table label="이름">
          <TableList
            src={ellipse}
            text="정만철"
            button={
              <Button buttonType="delete" textColor="violet" bgColor="white">
                삭제
              </Button>
            }
          />
          <TableList
            src={ellipse}
            text="정만철"
            button={
              <Button buttonType="delete" textColor="violet" bgColor="white">
                삭제
              </Button>
            }
          />
          <TableList
            src={ellipse}
            text="정만철"
            button={
              <Button buttonType="delete" textColor="violet" bgColor="white">
                삭제
              </Button>
            }
          />
          <TableList
            src={ellipse}
            text="정만철"
            button={
              <Button buttonType="delete" textColor="violet" bgColor="white">
                삭제
              </Button>
            }
          />
        </Table>
      </DashboardCard>

      <DashboardCard className="px-0 pb-0 relative">
        <TableHeader title="초대 내역">
          <Button
            buttonType="modal1"
            bgColor="violet"
            textColor="white"
            className="mobile:absolute mobile:right-20 mobile:top-90 w-105"
          >
            <div className="flex gap-6 items-center justify-center ">
              <Image src={add} alt="add" />
              초대하기
            </div>
          </Button>
        </TableHeader>
        <Table label="이메일">
          <TableList
            text="codeitA@codeit.com"
            button={
              <Button buttonType="delete" textColor="violet" bgColor="white">
                취소
              </Button>
            }
          />
          <TableList
            text="codeitA@codeit.com"
            button={
              <Button buttonType="delete" textColor="violet" bgColor="white">
                취소
              </Button>
            }
          />
          <TableList
            text="codeitA@codeit.com"
            button={
              <Button buttonType="delete" textColor="violet" bgColor="white">
                취소
              </Button>
            }
          />
          <TableList
            text="codeitA@codeit.com"
            button={
              <Button buttonType="delete" textColor="violet" bgColor="white">
                취소
              </Button>
            }
          />
        </Table>
      </DashboardCard>
      <Button buttonType="dashboardDelete" bgColor="white" className="mt-25">
        대시보드 삭제하기
      </Button>
    </div>
  );
};

export default Dashboard;
