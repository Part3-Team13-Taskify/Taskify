import Image from 'next/image';
import add from '@/public/assets/icon/addBox.svg';
import ellipse from '@/public/assets/chip/ellipseGreenLarge.svg';
import ColorPicker from '../common/colorpicker';
import ExampleInput from '../common/input/exampleInput';
import Button from '../common/button';
import Table from './table';
import TableHeader from './table/TableHeader';
import TableList from './table/TableList';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
  return (
    <>
      <DashboardCard>
        <div className="flex justify-between">
          <p className="font-bold text-20">비브리지</p>
          <ColorPicker />
        </div>
        {/* 인풋 컴포넌트로 대체 */}
        <ExampleInput />
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

      <DashboardCard className="px-0 pb-0">
        <TableHeader title="초대 내역">
          <Button buttonType="modal2" bgColor="violet" textColor="white">
            <Image src={add} alt="add" />
            초대하기
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
      <Button buttonType="dashboardDelete" bgColor="white">
        대시보드 삭제하기
      </Button>
    </>
  );
};

export default Dashboard;
